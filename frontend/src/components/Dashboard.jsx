import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const downloads = JSON.parse(localStorage.getItem('userDownloads') || '[]');

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <h1>
            <i className="fas fa-hand-wave"></i> Welcome,{' '}
            {user?.email?.split('@')[0] || 'Student'}
          </h1>
          <p>Track your activity and access papers</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/resume-builder" className="dashboard-action-btn resume-dashboard-btn">
            <i className="fas fa-file-signature"></i> Build Resume
          </Link>
          <Link to="/university" className="dashboard-action-btn primary">
            <i className="fas fa-search"></i> Browse Papers
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <div className="stat-icon downloads">
            <i className="fas fa-download"></i>
          </div>
          <div className="stat-info">
            <span className="stat-number">{downloads.length}</span>
            <span className="stat-label">Downloads</span>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon universities">
            <i className="fas fa-university"></i>
          </div>
          <div className="stat-info">
            <span className="stat-number">1</span>
            <span className="stat-label">Universities</span>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon courses">
            <i className="fas fa-book"></i>
          </div>
          <div className="stat-info">
            <span className="stat-number">10</span>
            <span className="stat-label">Courses</span>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon streak">
            <i className="fas fa-fire"></i>
          </div>
          <div className="stat-info">
            <span className="stat-number">0</span>
            <span className="stat-label">Day Streak</span>
          </div>
        </div>
      </div>

      {/* Recent Downloads */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>
            <i className="fas fa-history"></i> Recent Downloads
          </h2>
          <span className="section-count">{downloads.length} total</span>
        </div>

        {downloads.length > 0 ? (
          <div className="downloads-list">
            {downloads
              .slice(-5)
              .reverse()
              .map((d, i) => (
                <div key={i} className="download-item">
                  <div className="download-info">
                    <i className="fas fa-file-pdf"></i>
                    <div>
                      <span className="download-name">{d.name}</span>
                      <span className="download-date">
                        <i className="far fa-clock"></i> {d.date} • {d.time}
                      </span>
                    </div>
                  </div>
                  <span className="download-badge">Completed</span>
                </div>
              ))}
          </div>
        ) : (
          <div className="empty-state">
            <i className="fas fa-inbox"></i>
            <p>No downloads yet</p>
            <Link to="/university" className="empty-state-btn">
              Start Browsing
            </Link>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>
            <i className="fas fa-bolt"></i> Quick Links
          </h2>
        </div>
        <div className="quick-links-grid">
          <Link to="/igu-btech" className="quick-link-card">
            <i className="fas fa-laptop-code"></i>
            <h3>B.Tech</h3>
            <p>Papers</p>
          </Link>
          <Link to="/igu-bca" className="quick-link-card">
            <i className="fas fa-code"></i>
            <h3>BCA</h3>
            <p>Papers</p>
          </Link>
          <Link to="/igu-bba" className="quick-link-card">
            <i className="fas fa-chart-line"></i>
            <h3>BBA</h3>
            <p>Papers</p>
          </Link>
          <Link to="/igu-bcom" className="quick-link-card">
            <i className="fas fa-calculator"></i>
            <h3>B.Com</h3>
            <p>Papers</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ✅ IMPORTANT: Default export at the end
export default Dashboard;