import React from 'react';
import gouravImg from '../assets/Dev.jpg';
import maheshImg from '../assets/Edit.jpeg';

function About() {
  const founders = [
    {
      name: 'Gourav Sharma',
      role: 'Developer & Founder',
      roleIcon: 'fa-code',
      socialUrl: 'https://linkedin.com/in/gourav-sharma8901',
      bio: 'Passionate developer and final year student at IGU Rewari. Created Exam Saarthi to help students access PYQs easily.',
      img: gouravImg,
    },
    {
      name: 'Mahesh Verma',
      role: 'Developer & Founder',
      roleIcon: 'fa-code',
      socialUrl: 'https://www.linkedin.com/in/mahesh-verma-0b7211419/',
      bio: 'Dedicated to curating and verifying quality content, ensuring every PYQ is accurate and helpful for students.',
      img: maheshImg,
    },
  ];

  const stats = [
    { number: '50+', label: 'Universities' },
    { number: '5000+', label: 'PYQs' },
    { number: '100+', label: 'Courses' },
    { number: '10k+', label: 'Active Users' },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>📖 Our Story</h1>
        <p>
          Exam Saarthi was born from a simple idea - every student deserves free
          access to quality study materials. What started as a small initiative by
          two passionate students has now become a trusted platform for thousands of
          learners across India.
        </p>
      </div>

      {/* Founders Section */}
      <div className="founders-section">
        {founders.map((founder, index) => (
          <div key={index} className="founder-card">
            <div className="founder-img-wrapper">
              <a href={founder.socialUrl} target="_blank" rel="noreferrer">
                <img
                  src={founder.img}
                  alt={founder.name}
                  className="founder-img"
                  onError={(e) => {
                    e.target.src = '/logo.png';
                  }}
                />
              </a>
            </div>
            <h2 className="founder-name">{founder.name}</h2>
            <div className="founder-role">
              <i className={`fas ${founder.roleIcon}`}></i> {founder.role}
            </div>
            <div className="founder-bio">{founder.bio}</div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="stats-about">
        {stats.map((stat, index) => (
          <div key={index} className="stat-about-card">
            <span className="stat-number-about">{stat.number}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* University Info */}
      <div className="mission-section">
        <div className="mission-icon">
          <i className="fas fa-university"></i>
        </div>
        <h2>Indira Gandhi University, Rewari</h2>
        <p>
          Both founders are proud students of Indira Gandhi University, Rewari,
          Haryana. Through Exam Saarthi, they aim to give back to the student
          community.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="mission-icon">
          <i className="fas fa-bullseye"></i>
        </div>
        <h2>Our Mission</h2>
        <p>
          To empower every student with free, easy, and reliable access to previous
          year question papers and exam resources.
        </p>
      </div>

      {/* Vision Section */}
      <div className="mission-section">
        <div className="mission-icon">
          <i className="fas fa-eye"></i>
        </div>
        <h2>Our Vision</h2>
        <p>
          To become India's most trusted platform for academic resources, helping
          millions of students achieve their educational goals.
        </p>
      </div>

      {/* Why We Do It Section */}
      <div className="mission-section">
        <div className="mission-icon">
          <i className="fas fa-heart"></i>
        </div>
        <h2>Why We Do It</h2>
        <p>
          As students ourselves, we know the struggles of exam preparation. Exam
          Saarthi is our way of making exam preparation simpler, more organized, and
          completely free for everyone.
        </p>
      </div>
    </div>
  );
}

export default About;