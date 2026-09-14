import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AnimatedStat({ target, suffix = '' }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startedAt = performance.now();
    let animationFrame;

    const animate = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(target * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target]);

  return <span className="stat-number">{value.toLocaleString()}{suffix}</span>;
}

function Home() {

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="home-card home-hero-card">
        <h1 className="hero-title">Welcome to Exam Saarthi 🏆</h1>
        <p className="hero-subtitle">
          Your one-stop destination for previous year question papers from all universities!
        </p>
        <div style={{ textAlign: 'center' }}>
          <Link to="/university" className="explore-btn">
            Explore Universities →
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-grid" aria-label="Exam Saarthi statistics">
        <div className="stat-card">
          <AnimatedStat target={50} suffix="+" />
          <span className="stat-label">Universities</span>
        </div>
        <div className="stat-card">
          <AnimatedStat target={5000} suffix="+" />
          <span className="stat-label">PYQs</span>
        </div>
        <div className="stat-card">
          <AnimatedStat target={100} suffix="+" />
          <span className="stat-label">Courses</span>
        </div>
        <div className="stat-card">
          <AnimatedStat target={24} suffix="/7" />
          <span className="stat-label">Free Access</span>
        </div>
      </div>

      {/* Features Section */}
      <div className="home-card">
        <h2 className="section-title">What You'll Find Here</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <i className="fas fa-book-open feature-icon"></i>
            <h3>Comprehensive PYQs</h3>
            <p>All UG & PG courses from multiple universities.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-mobile-alt feature-icon"></i>
            <h3>Mobile Friendly</h3>
            <p>Smooth, responsive design for all devices.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-check-circle feature-icon"></i>
            <h3>Verified Content</h3>
            <p>Accurate papers from trusted sources.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-graduation-cap feature-icon"></i>
            <h3>Free Access</h3>
            <p>100% free for every student.</p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="home-card">
        <h2 className="section-title">Our Mission</h2>
        <p className="description-text">
          Empower all students with easy access to academic materials. Focus on
          understanding, not searching.
        </p>
      </div>
    </div>
  );
}

export default Home;