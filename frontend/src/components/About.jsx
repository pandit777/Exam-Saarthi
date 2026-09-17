import React, { useEffect, useState } from 'react';
import gouravImg from '../assets/Dev.jpg';
import maheshImg from '../assets/Edit.jpeg';

function About() {
  const [selectedFounder, setSelectedFounder] = useState(null);

  const founders = [
    {
      name: 'Gourav Sharma',
      role: 'Developer & Founder',
      roleIcon: 'fa-code',
      socials: {
        linkedin: 'https://linkedin.com/in/gourav-sharma8901',
        instagram: 'https://instagram.com/velogourav',
      },
      bio: 'Passionate developer and final year student at IGU Rewari. Created Exam Saarthi to help students access PYQs easily.',
      img: gouravImg,
    },
    {
      name: 'Mahesh Verma',
      role: 'Developer & Founder',
      roleIcon: 'fa-code',
      socials: {
        linkedin: 'https://www.linkedin.com/in/mahesh-verma-0b7211419/',
        instagram: 'https://instagram.com/maheshverma8371',
      },
      bio: 'Dedicated to curating and verifying quality content, ensuring every PYQ is accurate and helpful for students.',
      img: maheshImg,
    },
  ];

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedFounder(null);
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

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
              <button
                type="button"
                className="founder-img-button"
                aria-label={`View social profiles for ${founder.name}`}
                onClick={() => setSelectedFounder(founder)}
              >
                <img
                  src={founder.img}
                  alt={founder.name}
                  className="founder-img"
                  onError={(e) => {
                    e.target.src = '/logo.png';
                  }}
                />
                <span className="founder-img-hint">
                  <i className="fas fa-share-nodes"></i>
                </span>
              </button>
            </div>
            <h2 className="founder-name">{founder.name}</h2>
            <div className="founder-role">
              <i className={`fas ${founder.roleIcon}`}></i> {founder.role}
            </div>
            <div className="founder-bio">{founder.bio}</div>
          </div>
        ))}
      </div>

      {selectedFounder && (
        <div
          className="social-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedFounder(null)}
        >
          <div
            className="social-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="social-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="social-modal-close"
              aria-label="Close social profiles"
              onClick={() => setSelectedFounder(null)}
            >
              <i className="fas fa-xmark"></i>
            </button>
            <div className="social-modal-avatar">
              <img src={selectedFounder.img} alt="" />
            </div>
            <p className="social-modal-eyebrow">Connect with</p>
            <h2 id="social-modal-title">{selectedFounder.name}</h2>
            <div className="social-modal-links">
              <a
                href={selectedFounder.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="social-modal-link linkedin-link"
              >
                <i className="fab fa-linkedin-in"></i>
                <span>LinkedIn</span>
                <i className="fas fa-arrow-up-right-from-square"></i>
              </a>
              <a
                href={selectedFounder.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="social-modal-link instagram-link"
              >
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
                <i className="fas fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>
        </div>
      )}

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