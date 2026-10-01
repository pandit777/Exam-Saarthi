import React from 'react';
import { Link, useParams } from 'react-router-dom';
import duQuestionPapers from '../data/duQuestionPapers';
import duLogo from '../assets/universities/du.png';

function DUCourse() {
  const { course } = useParams();

  const courseName = decodeURIComponent(course || '');

  const papers = duQuestionPapers[courseName] || {};

  return (
    <div className="igu-page">
      <div className="content-section">

        {/* Back Button */}
        <Link
          to="/du"
          className="du-back-button"
        >
          <i className="fas fa-arrow-left"></i>
          Back to Delhi University
        </Link>

        {/* Course Header */}
        <div className="uni-header-card">

          {/* DU Logo */}
          <div className="uni-logo-container">
            <img
              src={duLogo}
              alt="Delhi University Logo"
              className="uni-logo"
            />
          </div>

          <div className="uni-header-info">

            <h1>{courseName}</h1>

            <span className="uni-location-badge">
              <i className="fas fa-university"></i>
              Delhi University
            </span>

            <div className="uni-meta-stats">

              <div className="uni-stat">
                <i className="fas fa-file-pdf"></i>
                <span>Previous Year Papers</span>
              </div>

              <div className="uni-stat">
                <i className="fas fa-calendar-alt"></i>
                <span>2023-2026</span>
              </div>

              <div className="uni-stat">
                <i className="fas fa-download"></i>
                <span>Free Access</span>
              </div>

            </div>

          </div>

        </div>

        {/* Page Heading */}
        <div className="section-header">

          <h2>
            <i className="fas fa-folder-open"></i>
            Question Papers
          </h2>

          <span className="course-count">
            <i className="fas fa-file-alt"></i>
            Previous Year Papers
          </span>

        </div>

        {/* Papers */}
        <div className="du-paper-list">

          {Object.keys(papers).length === 0 ? (

            <div className="du-no-papers">

              <div className="du-empty-icon">
                📂
              </div>

              <h3>
                Question Papers Coming Soon
              </h3>

              <p>
                Is course ke question papers ke Google
                Drive links abhi add nahi kiye gaye hain.
              </p>

            </div>

          ) : (

            Object.entries(papers).map(
              ([examDate, years]) => (

                <div
                  className="du-exam-card"
                  key={examDate}
                >

                  {/* Exam Date */}
                  <div className="du-exam-header">

                    <div>
                      <i className="fas fa-calendar-alt"></i>

                      <h3>
                        {examDate}
                      </h3>
                    </div>

                  </div>

                  {/* Years */}
                  <div className="du-year-list">

                    {Object.entries(years).map(
                      ([year, driveLink]) => (

                        <div
                          className="du-year-row"
                          key={year}
                        >

                          <div className="du-year-info">

                            <div className="du-pdf-icon">
                              <i className="fas fa-file-pdf"></i>
                            </div>

                            <div>
                              <strong>
                                {year}
                              </strong>

                              <small>
                                Delhi University PYQ
                              </small>
                            </div>

                          </div>

                          {driveLink &&
                          driveLink !==
                            'PASTE_GOOGLE_DRIVE_LINK_HERE' ? (

                            <a
                              href={driveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="drive-button"
                            >
                              <i className="fab fa-google-drive"></i>
                              View PDF
                              <i className="fas fa-external-link-alt"></i>
                            </a>

                          ) : (

                            <span className="coming-soon">
                              Coming Soon
                            </span>

                          )}

                        </div>

                      )
                    )}

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>
    </div>
  );
}

export default DUCourse;
