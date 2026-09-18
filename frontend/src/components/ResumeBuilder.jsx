import React, { useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ResumeBuilder.css';

const emptyEducation = { degree: '', institution: '', year: '', details: '' };
const emptyProject = { title: '', technology: '', description: '', link: '' };
const emptyExperience = { role: '', company: '', duration: '', description: '' };

const escapeLatex = (value = '') =>
  String(value)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([#$%&_{}])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');

const meaningful = (item) => Object.values(item).some((value) => value.trim());

function ResumeBuilder() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: user?.email || '',
    mobile: '',
    address: '',
    city: '',
    pinCode: '',
    headline: '',
    summary: '',
    skills: '',
    linkedin: '',
    github: '',
  });
  const [photo, setPhoto] = useState('');
  const [education, setEducation] = useState([{ ...emptyEducation }]);
  const [projects, setProjects] = useState([{ ...emptyProject }]);
  const [experience, setExperience] = useState([{ ...emptyExperience }]);
  const [message, setMessage] = useState('');

  const updateProfile = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const updateList = (setter, index, event) => {
    setter((items) =>
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [event.target.name]: event.target.value } : item
      )
    );
  };

  const readPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const latex = useMemo(() => {
    const contact = [profile.email, profile.mobile, profile.city, profile.pinCode]
      .filter(Boolean)
      .map(escapeLatex)
      .join(' \\textbar{} ');
    const links = [profile.linkedin, profile.github].filter(Boolean).map(escapeLatex).join(' \\textbar{} ');
    const section = (title, body) => body.trim() && `\\section*{${title}}\n${body}\n`;
    const educationBody = education
      .filter(meaningful)
      .map(
        (item) =>
          `\\textbf{${escapeLatex(item.degree)}}\\hfill ${escapeLatex(item.year)}\\\\\n${escapeLatex(item.institution)}\\\\\n${escapeLatex(item.details)}`
      )
      .join('\n\\vspace{4pt}\n');
    const projectBody = projects
      .filter(meaningful)
      .map(
        (item) =>
          `\\textbf{${escapeLatex(item.title)}} ${item.technology ? `(${escapeLatex(item.technology)})` : ''}\\\\\n${escapeLatex(item.description)}${item.link ? `\\\\\n\\href{${escapeLatex(item.link)}}{${escapeLatex(item.link)}}` : ''}`
      )
      .join('\n\\vspace{4pt}\n');
    const experienceBody = experience
      .filter(meaningful)
      .map(
        (item) =>
          `\\textbf{${escapeLatex(item.role)}} - ${escapeLatex(item.company)}\\hfill ${escapeLatex(item.duration)}\\\\\n${escapeLatex(item.description)}`
      )
      .join('\n\\vspace{4pt}\n');
    const skillsBody = profile.skills
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean)
      .map((skill) => `\\textbullet{} ${escapeLatex(skill)}`)
      .join(' \\quad ');

    return `\\documentclass[10pt,a4paper]{article}
\\usepackage[margin=0.65in]{geometry}
\\usepackage[hidelinks]{hyperref}
\\usepackage{titlesec}
\\pagenumbering{gobble}
\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]
\\begin{document}
\\begin{center}
{\\LARGE \\textbf{${escapeLatex(profile.name || 'Your Name')}}}\\\\
${escapeLatex(profile.headline)}\\\\
${contact}\\\\
${links}
\\end{center}
${section('Professional Summary', escapeLatex(profile.summary)) || ''}
${section('Education', educationBody) || ''}
${section('Experience', experienceBody) || ''}
${section('Projects', projectBody) || ''}
${section('Skills', skillsBody) || ''}
\\end{document}`;
  }, [education, experience, profile]);

  const validate = () => {
    if (!profile.name.trim()) return 'Please enter your full name.';
    if (!/^\S+@gmail\.com$/i.test(profile.email.trim())) return 'Please use a valid Gmail address.';
    if (!profile.mobile.trim()) return 'Please enter your mobile number.';
    return '';
  };

  const generatePdf = () => {
    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    const document = new jsPDF({ unit: 'mm', format: 'a4' });
    const margin = 16;
    const pageWidth = document.internal.pageSize.getWidth();
    const maxWidth = pageWidth - margin * 2;
    let y = 18;
    const addText = (text, size = 10, bold = false, color = [42, 52, 70]) => {
      document.setFont('helvetica', bold ? 'bold' : 'normal');
      document.setFontSize(size);
      document.setTextColor(...color);
      const lines = document.splitTextToSize(text || '', maxWidth);
      if (y + lines.length * 5 > 282) {
        document.addPage();
        y = 18;
      }
      document.text(lines, margin, y);
      y += lines.length * 5;
    };
    const addSection = (title) => {
      y += 5;
      addText(title.toUpperCase(), 11, true, [11, 30, 74]);
      document.setDrawColor(245, 158, 11);
      document.line(margin, y - 2, pageWidth - margin, y - 2);
      y += 2;
    };

    if (photo) {
      const imageFormat = photo.startsWith('data:image/png') ? 'PNG' : 'JPEG';
      document.addImage(photo, imageFormat, pageWidth - margin - 28, 14, 28, 28);
    }
    addText(profile.name, 20, true, [11, 30, 74]);
    addText(profile.headline, 11, false, [100, 116, 139]);
    addText([profile.email, profile.mobile, profile.city, profile.pinCode].filter(Boolean).join(' | '), 9);
    addText([profile.address, profile.linkedin, profile.github].filter(Boolean).join(' | '), 9);

    if (profile.summary.trim()) {
      addSection('Professional Summary');
      addText(profile.summary, 10);
    }
    const addEntries = (title, items, formatter) => {
      const entries = items.filter(meaningful);
      if (!entries.length) return;
      addSection(title);
      entries.forEach((item) => {
        addText(formatter(item), 10, true);
        addText(item.description || item.details || '', 9);
      });
    };
    addEntries('Education', education, (item) => `${item.degree} | ${item.institution} | ${item.year}`);
    addEntries('Experience', experience, (item) => `${item.role} | ${item.company} | ${item.duration}`);
    addEntries('Projects', projects, (item) => `${item.title}${item.technology ? ` | ${item.technology}` : ''}`);
    if (profile.skills.trim()) {
      addSection('Skills');
      addText(profile.skills, 10);
    }
    document.save(`${(profile.name || 'resume').trim().replace(/\s+/g, '-').toLowerCase()}.pdf`);
    setMessage('Resume PDF generated successfully.');
  };

  const downloadLatex = () => {
    const blob = new Blob([latex], { type: 'application/x-tex' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${(profile.name || 'resume').trim().replace(/\s+/g, '-').toLowerCase()}.tex`;
    link.click();
    URL.revokeObjectURL(link.href);
    setMessage('LaTeX source downloaded.');
  };

  const renderList = (items, setter, fields, title, addLabel) => (
    <section className="resume-form-section">
      <div className="resume-section-heading">
        <div><span className="resume-section-kicker">04</span><h2>{title}</h2></div>
        <button type="button" className="resume-add-btn" onClick={() => setter((current) => [...current, { ...fields }])}>
          <i className="fas fa-plus"></i> {addLabel}
        </button>
      </div>
      {items.map((item, index) => (
        <div className="resume-repeat-card" key={`${title}-${index}`}>
          <div className="resume-repeat-title"><span>{title.slice(0, -1)} {index + 1}</span>{items.length > 1 && <button type="button" className="resume-remove-btn" onClick={() => setter((current) => current.filter((_, itemIndex) => itemIndex !== index))}><i className="fas fa-trash"></i></button>}</div>
          <div className="resume-grid resume-grid-two">
            {Object.keys(fields).map((field) => (
              <label key={field} className={field === 'description' || field === 'details' ? 'resume-field resume-field-wide' : 'resume-field'}>
                <span>{field.replace(/([A-Z])/g, ' $1')}</span>
                {field === 'description' || field === 'details' ? <textarea name={field} value={item[field]} onChange={(event) => updateList(setter, index, event)} rows="3" placeholder="Add concise details" /> : <input name={field} value={item[field]} onChange={(event) => updateList(setter, index, event)} placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`} />}
              </label>
            ))}
          </div>
        </div>
      ))}
    </section>
  );

  return (
    <div className="resume-builder-page">
      <div className="resume-builder-intro">
        <div><Link to="/dashboard" className="resume-back-link"><i className="fas fa-arrow-left"></i> Dashboard</Link><p className="resume-eyebrow">Resume Studio</p><h1>Build a resume that gets noticed.</h1><p>Fill in your details once. Exam Saarthi will format them into a clean, downloadable PDF.</p></div>
        <div className="resume-intro-mark"><i className="fas fa-file-signature"></i><span>LaTeX<br />ready</span></div>
      </div>
      <form className="resume-builder-form" onSubmit={(event) => event.preventDefault()}>
        <section className="resume-form-section">
          <div className="resume-section-heading"><div><span className="resume-section-kicker">01</span><h2>Personal details</h2></div><span className="resume-required-note">* Required</span></div>
          <div className="resume-profile-layout">
            <label className="resume-photo-upload"><input type="file" accept="image/*" onChange={readPhoto} />{photo ? <img src={photo} alt="Resume profile" /> : <><i className="fas fa-camera"></i><span>Add photo</span></>}</label>
            <div className="resume-grid resume-grid-two">
              {['name', 'email', 'mobile', 'address', 'city', 'pinCode', 'headline'].map((field) => <label key={field} className="resume-field"><span>{field.replace(/([A-Z])/g, ' $1')} {['name', 'email', 'mobile'].includes(field) && '*'}</span><input name={field} type={field === 'email' ? 'email' : 'text'} value={profile[field]} onChange={updateProfile} placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`} /></label>)}
              <label className="resume-field resume-field-wide"><span>Professional summary</span><textarea name="summary" value={profile.summary} onChange={updateProfile} rows="4" placeholder="Write 2-4 lines about your strengths and goals" /></label>
            </div>
          </div>
        </section>
        <section className="resume-form-section">
          <div className="resume-section-heading"><div><span className="resume-section-kicker">02</span><h2>Links and skills</h2></div></div>
          <div className="resume-grid resume-grid-two">{['skills', 'linkedin', 'github'].map((field) => <label key={field} className="resume-field"><span>{field}</span><input name={field} value={profile[field]} onChange={updateProfile} placeholder={field === 'skills' ? 'React, JavaScript, SQL' : 'https://'} /></label>)}</div>
        </section>
        {renderList(education, setEducation, emptyEducation, 'Education', 'Add education')}
        {renderList(experience, setExperience, emptyExperience, 'Experience', 'Add experience')}
        {renderList(projects, setProjects, emptyProject, 'Projects', 'Add project')}
        <section className="resume-actions"><div>{message && <p className="resume-message"><i className="fas fa-circle-info"></i> {message}</p>}<p>Your information stays in this browser and is not uploaded.</p></div><div className="resume-action-buttons"><button type="button" className="resume-secondary-btn" onClick={downloadLatex}><i className="fas fa-code"></i> Download .tex</button><button type="button" className="resume-primary-btn" onClick={generatePdf}><i className="fas fa-file-pdf"></i> Generate PDF</button></div></section>
      </form>
    </div>
  );
}

export default ResumeBuilder;