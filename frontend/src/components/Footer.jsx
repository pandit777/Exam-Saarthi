import React from 'react';
import { Link } from 'react-router-dom';
import devImg from '../assets/Dev.jpg';
import editImg from '../assets/Edit.jpeg';

function Footer() {
  return (
    <footer>
      <div className="footer-links">
        <Link to="/university">Universities</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* ===== CONTACT NUMBERS ===== */}
      <div className="footer-contacts">
        <a href="tel:8901346287" className="footer-contact-item">
          <i className="fas fa-phone-alt"></i> +91 8901346287
        </a>
        <a href="tel:7742973491" className="footer-contact-item">
          <i className="fas fa-phone-alt"></i> +91 7742973491
        </a>
      </div>

      {/* ===== TEAM / CREDITS ===== */}
      <div className="footer-team">
        <div className="team-member">
          <img
            src={devImg}
            alt="Developer"
            className="team-img"
            onError={(e) => (e.target.style.display = 'none')}
          />
          <div className="team-info">
            <span className="team-role">Developer</span>
            <span className="team-name">Mahesh Verma</span>
          </div>
        </div>

        <div className="team-member">
          <img
            src={editImg}
            alt="Content Manager"
            className="team-img"
            onError={(e) => (e.target.style.display = 'none')}
          />
          <div className="team-info">
            <span className="team-role">Content Manager</span>
            <span className="team-name">Mahesh Verma</span>
          </div>
        </div>
      </div>

      <p className="footer-tagline">
        <i className="fas fa-graduation-cap"></i> Exam Saarthi — Previous Year
        Papers Repository | Free for all students
      </p>
    </footer>
  );
}

export default Footer;
