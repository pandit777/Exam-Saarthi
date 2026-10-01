import React from 'react';
import { Link } from 'react-router-dom';
import duLogo from '../assets/universities/du.png';

function DU() {

  const courses = [
    {
      name: 'B.A. (H) Economics',
      icon: '📈',
    },
    {
      name: 'B.A. (H) English',
      icon: '📚',
    },
    {
      name: 'B.A. (H) Hindi',
      icon: '📝',
    },
    {
      name: 'B.A. (H) History',
      icon: '🏛️',
    },
    {
      name: 'B.A. (H) Political Science',
      icon: '⚖️',
    },
    {
      name: 'B.A. (H) Sanskrit',
      icon: '📜',
    },
    {
      name: 'B.A. (H) Sociology',
      icon: '👥',
    },
    {
      name: 'B.A. (Programme)',
      icon: '🎓',
    },
    {
      name: 'B.Com. (H)',
      icon: '💼',
    },
    {
      name: 'B.Com. (Programme)',
      icon: '🧾',
    },
    {
      name: 'B.Sc. (H) Botany',
      icon: '🌿',
    },
    {
      name: 'B.Sc. (H) Chemistry',
      icon: '🧪',
    },
    {
      name: 'B.Sc. (H) Computer Science',
      icon: '💻',
    },
    {
      name: 'B.Sc. (H) Mathematics',
      icon: '📐',
    },
    {
      name: 'B.Sc. (H) Physics',
      icon: '⚛️',
    },
    {
      name: 'B.Sc. (H) Zoology',
      icon: '🧬',
    },
    {
      name: 'B.Sc. (Prog.) Life Science',
      icon: '🔬',
    },
    {
      name: 'B.Sc. (Prog.) Physical Science',
      icon: '🔭',
    },
    {
      name: 'B.Sc. Life Sciences + Physical Science',
      icon: '🧫',
    },
    {
      name: 'B.Sc. Physical Science (PHY SC)',
      icon: '⚗️',
    },

    {
      name: 'All AEC',
      icon: '📘',
    },
    {
      name: 'All AECC',
      icon: '📗',
    },
    {
      name: 'All Common Group Programme',
      icon: '👨‍🎓',
    },
    {
      name: 'All DSE',
      icon: '📕',
    },
    {
      name: 'All GE',
      icon: '📙',
    },
    {
      name: 'All SEC',
      icon: '📒',
    },
    {
      name: 'All VAC',
      icon: '📓',
    },

    {
      name: 'Question Papers Mix (All Dates Folder)',
      icon: '📂',
    },

    {
      name: 'Question Papers Mix + Research Methodology',
      icon: '🔍',
    },

    {
      name: 'B.A./B.Sc. (Programme)',
      icon: '🎓',
    },
  ];

  return (
    <div className="igu-page">

      <div className="content-section">

        {/* University Header */}

        <div className="uni-header-card">

          <div className="uni-logo-container">

            <img
              src={duLogo}
              alt="Delhi University Logo"
              className="uni-logo"
            />

          </div>

          <div className="uni-header-info">

            <h1>Delhi University</h1>

            <span className="uni-location-badge">
              <i className="fas fa-map-pin"></i>
              Delhi · Est. 1922
            </span>

            <div className="uni-meta-stats">

              <div className="uni-stat">
                <i className="fas fa-book-open"></i>
                <span>30+ Courses</span>
              </div>

              <div className="uni-stat">
                <i className="fas fa-calendar-alt"></i>
                <span>PYQ 2023-2026</span>
              </div>

              <div className="uni-stat">
                <i className="fas fa-download"></i>
                <span>Free Access</span>
              </div>

            </div>

          </div>

        </div>


        {/* Section Header */}

        <div className="section-header">

          <h2>
            <i className="fas fa-graduation-cap"></i>
            Choose your course
          </h2>

          <span className="course-count">
            <i className="fas fa-eye"></i>
            {courses.length}+ Courses Available
          </span>

        </div>


        {/* Courses */}

        <div className="course-grid">

          {courses.map((course) => (

            <Link
              key={course.name}
              to={`/du-course/${encodeURIComponent(
                course.name
              )}`}
              className="course-card"
            >

              <span className="course-icon">
                {course.icon}
              </span>

              <div className="course-info">

                <div className="course-name">
                  {course.name}
                </div>

                <div className="course-meta">

                  <span>
                    <i className="far fa-calendar-alt"></i>
                    2023-2026
                  </span>

                  <span className="course-badge">
                    PYQs
                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}

export default DU;
