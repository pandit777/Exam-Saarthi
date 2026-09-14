import React from 'react';
import { Link } from 'react-router-dom';
import iguLogo from '../assets/universities/igu.png';

function IGU() {
  const courses = [
    {
      name: 'B.Tech (All Branches)',
      icon: '⚙️',
      years: '2018-2025',
      page: '/igu-btech',
      available: true,
    },
    {
      name: 'M.Tech (All Branches)',
      icon: '⚙️',
      years: '2019-2025',
      page: '/igu-mtech',
      available: true,
    },
    {
      name: 'BCA (Bachelor of Computer Applications)',
      icon: '💻',
      years: '2019-2025',
      page: '/igu-bca',
      available: true,
    },
    {
      name: 'BBA (Bachelor of Business Administration)',
      icon: '📊',
      years: '2018-2025',
      page: '/igu-bba',
      available: true,
    },
    {
      name: 'B.Sc (All Branches)',
      icon: '🔬',
      years: '2018-2025',
      page: '/igu-bsc',
      available: true,
    },
    {
      name: 'M.Sc (All Branches)',
      icon: '🧪',
      years: '2019-2025',
      page: '/igu-msc',
      available: true,
    },
    {
      name: 'BA (Bachelor of Arts)',
      icon: '🎭',
      years: '2018-2025',
      page: '/igu-ba',
      available: true,
    },
    {
      name: 'MA (Master of Arts)',
      icon: '📖',
      years: '2019-2025',
      page: '/igu-ma',
      available: true,
    },
    {
      name: 'B.Com (Bachelor of Commerce)',
      icon: '🧾',
      years: '2018-2025',
      page: '/igu-bcom',
      available: true,
    },
    {
      name: 'M.Com (Master of Commerce)',
      icon: '📋',
      years: '2019-2025',
      page: '/igu-mcom',
      available: true,
    },
  ];

  return (
    <div className="igu-page">
      <div className="content-section">
        {/* IGU Header Card with Logo */}
        <div className="uni-header-card">
          <div className="uni-logo-container">
            <img
              src={iguLogo}
              alt="Indira Gandhi University Logo"
              className="uni-logo"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="uni-header-info">
            <h1>Indira Gandhi University, Rewari</h1>
            <span className="uni-location-badge">
              <i className="fas fa-map-pin"></i> Rewari, Haryana · Est. 2013
            </span>
            <div className="uni-meta-stats">
              <div className="uni-stat">
                <i className="fas fa-book-open"></i> <span>36+ Courses</span>
              </div>
              <div className="uni-stat">
                <i className="fas fa-calendar-alt"></i> <span>PYQ 2018-2025</span>
              </div>
              <div className="uni-stat">
                <i className="fas fa-download"></i> <span>Free Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="section-header">
          <h2>
            <i className="fas fa-graduation-cap"></i> Choose your course
          </h2>
          <span className="course-count">
            <i className="fas fa-eye"></i> 30+ Courses Available
          </span>
        </div>

        {/* Courses Grid */}
        <div className="course-grid">
          {courses.map((course, index) => (
            <Link
              key={index}
              to={course.page}
              className="course-card"
            >
              <span className="course-icon">{course.icon}</span>
              <div className="course-info">
                <div className="course-name">{course.name}</div>
                <div className="course-meta">
                  <span>
                    <i className="far fa-calendar-alt"></i> {course.years}
                  </span>
                  <span className="course-badge">PYQs</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IGU;