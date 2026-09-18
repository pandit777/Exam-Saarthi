import React, { useEffect, useMemo, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ResumeBuilder.css';

const emptyEducation = { degree: '', institution: '', year: '', details: '' };
const emptyProject = { title: '', technology: '', description: '', link: '' };
const emptyExperience = { role: '', company: '', duration: '', description: '' };
const templateOptions = [
  { id: 'classic', label: 'Classic', accent: [11, 30, 74] },
  { id: 'minimal', label: 'Minimal', accent: [51, 65, 85] },
  { id: 'modern', label: 'Modern', accent: [13, 116, 144] },
  { id: 'creative', label: 'Creative', accent: [126, 34, 206] },
];

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
  const [template, setTemplate] = useState('classic');
  const [draftLoaded, setDraftLoaded] = useState(false);
  const photoInputRef = useRef(null);

  const storageKey = `resumeDraft:${user?.id || 'guest'}`;

  useEffect(() => {
    try {
      const savedDraft = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (savedDraft) {
        setProfile((current) => ({ ...current, ...savedDraft.profile, email: savedDraft.profile?.email || current.email }));
        setPhoto(savedDraft.photo || '');
        setEducation(savedDraft.education?.length ? savedDraft.education : [{ ...emptyEducation }]);
        setProjects(savedDraft.projects?.length ? savedDraft.projects : [{ ...emptyProject }]);
        setExperience(savedDraft.experience?.length ? savedDraft.experience : [{ ...emptyExperience }]);
        setTemplate(savedDraft.template || 'classic');
      }
    } catch (error) {
      localStorage.removeItem(storageKey);
    } finally {
      setDraftLoaded(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!draftLoaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ profile, photo, education, projects, experience, template }));
    } catch (error) {
      setMessage('Draft is too large to save locally. You can still download the PDF.');
    }
  }, [draftLoaded, education, experience, photo, profile, projects, storageKey, template]);

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

  const removePhoto = () => {
    setPhoto('');
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  const latex = useMemo(() => {
    const contact = [profile.email, profile.mobile, profile.city, profile.pinCode]
      .filter(Boolean)
      .map(escapeLatex)
      .join(' \\textbar{} ');
    const links = [profile.linkedin, profile.github].filter(Boolean).map(escapeLatex).join(' \\textbar{} ');
    const selectedTemplate = templateOptions.find((option) => option.id === template) || templateOptions[0];
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
\\usepackage{xcolor}
\\definecolor{accent}{RGB}{${selectedTemplate.accent.join(',')}}
\\pagenumbering{gobble}
\\titleformat{\\section}{\\large\\bfseries\\color{accent}}{}{0em}{}[\\color{accent}\\titlerule]
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
  }, [education, experience, profile, template]);

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
    const activeTemplate = templateOptions.find((option) => option.id === template) || templateOptions[0];
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
      addText(title.toUpperCase(), 11, true, activeTemplate.accent);
      document.setDrawColor(...activeTemplate.accent);
      document.line(margin, y - 2, pageWidth - margin, y - 2);
      y += 2;
    };

    if (photo) {
      const imageFormat = photo.startsWith('data:image/png') ? 'PNG' : 'JPEG';
      document.addImage(photo, imageFormat, pageWidth - margin - 28, 14, 28, 28);
    }
    addText(profile.name, 20, true, activeTemplate.accent);
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

  const clearDraft = () => {
    localStorage.removeItem(storageKey);
    setProfile((current) => ({ ...current, name: '', mobile: '', address: '', city: '', pinCode: '', headline: '', summary: '', skills: '', linkedin: '', github: '' }));
    setPhoto('');
    setEducation([{ ...emptyEducation }]);
    setProjects([{ ...emptyProject }]);
    setExperience([{ ...emptyExperience }]);
    setTemplate('classic');
    setMessage('Draft cleared.');
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
      <section className="resume-studio-tools">
        <div>
          <span className="resume-tools-label">Choose a template</span>
          <div className="resume-template-picker">
            {templateOptions.map((option) => <button type="button" key={option.id} className={`resume-template-option ${template === option.id ? 'active' : ''}`} onClick={() => setTemplate(option.id)}><span style={{ backgroundColor: `rgb(${option.accent.join(',')})` }}></span>{option.label}</button>)}
          </div>
        </div>
        <div className="resume-tools-actions"><span><i className="fas fa-cloud-check"></i> Auto-saved in this browser</span><button type="button" className="resume-clear-btn" onClick={clearDraft}>Clear draft</button></div>
      </section>
      <div className="resume-builder-workspace">
        <section className={`resume-live-preview resume-preview-${template}`}>
          <div className="resume-preview-label"><i className="fas fa-eye"></i> Live preview</div>
          <div className="resume-preview-paper">
            {photo && <img src={photo} alt="" className="resume-preview-photo" />}
            <h2>{profile.name || 'Your Name'}</h2>
            <p className="resume-preview-headline">{profile.headline || 'Professional headline'}</p>
            <p className="resume-preview-contact">{[profile.email, profile.mobile, profile.city].filter(Boolean).join(' | ') || 'email@gmail.com | +91 mobile | City'}</p>
            {profile.summary && <div><h3>Summary</h3><p>{profile.summary}</p></div>}
            {(education.some(meaningful) || experience.some(meaningful) || projects.some(meaningful) || profile.skills) && <div className="resume-preview-columns"><div>{education.some(meaningful) && <><h3>Education</h3>{education.filter(meaningful).map((item, index) => <p key={index}><strong>{item.degree || 'Degree'}</strong><br />{item.institution} {item.year && `| ${item.year}`}</p>)}</>}{experience.some(meaningful) && <><h3>Experience</h3>{experience.filter(meaningful).map((item, index) => <p key={index}><strong>{item.role || 'Role'}</strong><br />{item.company} {item.duration && `| ${item.duration}`}</p>)}</>}</div><div>{projects.some(meaningful) && <><h3>Projects</h3>{projects.filter(meaningful).map((item, index) => <p key={index}><strong>{item.title || 'Project'}</strong><br />{item.technology || item.description}</p>)}</>}{profile.skills && <><h3>Skills</h3><p>{profile.skills}</p></>}</div></div>}
          </div>
        </section>
        <form className="resume-builder-form" onSubmit={(event) => event.preventDefault()}>
        <section className="resume-form-section">
          <div className="resume-section-heading"><div><span className="resume-section-kicker">01</span><h2>Personal details</h2></div><span className="resume-required-note">* Required</span></div>
          <div className="resume-profile-layout">
            <div className="resume-photo-area">
              <label className="resume-photo-upload"><input ref={photoInputRef} type="file" accept="image/*" onChange={readPhoto} />{photo ? <img src={photo} alt="Resume profile" /> : <><i className="fas fa-camera"></i><span>Add photo</span></>}</label>
              <div className="resume-photo-actions">{photo && <button type="button" onClick={() => photoInputRef.current?.click()}><i className="fas fa-repeat"></i> Change</button>}{photo && <button type="button" className="remove" onClick={removePhoto}><i className="fas fa-trash"></i> Remove</button>}</div>
            </div>
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
    </div>
  );
}

export default ResumeBuilder;