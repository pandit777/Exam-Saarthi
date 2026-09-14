import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import iguLogo from '../assets/universities/igu.png';
import { loadAdminPapers } from '../utils/coursePapers';

function IGUBBA() {
  const { isLoggedIn } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    '1': true,
    '2': true,
    '3': true,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // ============ PAPERS DATA ============
  const papersData = [
    // ===== 1st Year (Sem 1 & 2) =====
    { id: '11311', name: 'Business Organization', sem: '1st', year: '2017', link: 'https://drive.google.com/file/d/1CfoDJ5S3weSGkkMCUAX_DEoyAMARqFjb/view' },
    { id: '11313', name: 'Financial Accounting', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1u-9uYaI5dig9LlbHjdXzNeMjFnFGZLc5/view' },
    { id: '17671', name: 'English Language and Communication Level-1', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1Rte84fra3QckIRgs6p2Hrfap0DmdhTro/view' },
    { id: '17652', name: 'Environmental Studies', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1VArmh8NYp-JSJdScZQwH3Cf7gpHaOUsR/view' },
    { id: '17672', name: 'Hindi Bhasha aur Vyakaran', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1s3KXHv46NTkR-TotDAv7OWQLouUrEazO/view' },
    { id: '22999', name: 'Computer Awareness-I', sem: '2nd', year: '2022', link: 'https://drive.google.com/file/d/1dhEGUEBJjwpBQCDvwMX3M7dziIq0AGyj/view' },
    { id: '22999', name: 'Computer Awareness', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1o4XDicwQlZdbZ8ksQa_BGcrIFaFk56je/view' },
    { id: '22703', name: 'Communication Skills and Personality Development', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/186GjEgfdHF1BY0ZDEbkYqm-2GaH9uak5/view' },
    { id: '21314', name: 'Computer Application in Management', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1zZwkqxO4TMamZ6ishTHI3TCeTnnJNGyI/view' },
    { id: '21316', name: 'Business Statistics', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1ZDdGRY-iJ69cAmncqipvKmIn1FFvjxEM/view' },
    { id: '21312', name: 'Macro Economics and Policy', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1Is4sDwwfYkHGQH0uO49YaE6uFTLuF7Zl/view' },
    { id: '27652', name: 'Environmental Studies', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1CBSN26oKyDzk8kkHDMCADmQIwu8uifRi/view' },
    { id: '27084', name: 'Indian Society and Culture', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1iJImwqrBp89TZ3bUQ6HhY0MsTtxO2xzu/view' },
    { id: '27271', name: 'Pteridophytes Gymnosperms and Fossils', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/12pevH7LFPOcFAPo_VscWSLU3OLCjEpfQ/view' },

    // ===== 2nd Year (Sem 3 & 4) =====
    { id: '31316', name: 'Disaster Management', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1REKDk7Y4gRsGJu8V6mbSQhkPILLdEITu/view' },
    { id: '41314', name: 'Business Law', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1jIB3x8g64cf4i4haaudEaEe6wr6_dDN5/view' },

    // ===== 3rd Year (Sem 5 & 6) =====
    { id: '51315', name: 'Presentation Skills and Personality Development', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1HfvN16DGFUhr37XsvNa3F6Y5cGd_ubWR/view' },
  ];

  const [adminPapers, setAdminPapers] = useState([]);

  useEffect(() => {
    loadAdminPapers('BBA').then(setAdminPapers);
  }, []);

  const yearSections = [
    { id: '1', title: 'BBA 1st Year (Sem 1 & 2)', icon: 'fa-chart-pie', sems: ['1st', '2nd'] },
    { id: '2', title: 'BBA 2nd Year (Sem 3 & 4)', icon: 'fa-chart-line', sems: ['3rd', '4th'] },
    { id: '3', title: 'BBA 3rd Year (Sem 5 & 6)', icon: 'fa-briefcase', sems: ['5th', '6th'] },
  ];

  const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

  // ============ EFFECTS ============
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // ============ HELPERS ============
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filterPapers = (sems) => {
    const search = searchTerm.toLowerCase().trim();
    return [...papersData, ...adminPapers].filter((p) => {
      if (!sems.includes(p.sem)) return false;
      if (activeFilter !== 'all' && p.sem !== activeFilter) return false;
      if (search === '') return true;
      return (
        p.name.toLowerCase().includes(search) ||
        p.id.toLowerCase().includes(search) ||
        p.year.includes(search)
      );
    });
  };

  const hasAnyResults = () => {
    return yearSections.some((s) => filterPapers(s.sems).length > 0);
  };

  const hasPapersInSem = (sem) => papersData.some((p) => p.sem === sem);

  const handleDownload = (paperName) => {
    const downloads = JSON.parse(localStorage.getItem('userDownloads') || '[]');
    downloads.push({
      id: Date.now(),
      name: paperName,
      date: new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
    localStorage.setItem('userDownloads', JSON.stringify(downloads));
  };

  const visibleSections =
    activeFilter === 'all'
      ? yearSections
      : yearSections.filter((s) => s.sems.includes(activeFilter));

  // ============ RENDER ============
  return (
    <div className="igu-btech-page">
      {/* ===== HEADER ===== */}
      <div className="igu-header">
        <div className="igu-logo">
          <img
            src={iguLogo}
            alt="IGU Logo"
            onError={(e) => (e.target.style.display = 'none')}
          />
        </div>
        <div>
          <h1>IGU BBA PYQ Repository</h1>
          <p>Indira Gandhi University, Rewari • All Semesters • 2017-2025</p>
        </div>
        <div className="header-actions">
          <button className="theme-toggle-header" onClick={toggleTheme}>
            <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>{' '}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <Link to="/igu" className="back-link">
            <i className="fas fa-arrow-left"></i> Back
          </Link>
        </div>
      </div>

      {/* ===== MAIN ===== */}
      <div className="container">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-wrapper">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search by paper name, ID, semester or year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            {semesters.map((sem) => {
              if (!hasPapersInSem(sem)) return null;
              return (
                <button
                  key={sem}
                  className={`filter-btn ${
                    activeFilter === sem ? 'active' : ''
                  }`}
                  onClick={() =>
                    setActiveFilter(activeFilter === sem ? 'all' : sem)
                  }
                >
                  {sem} Sem
                </button>
              );
            })}
          </div>
        </div>

        {/* Year Sections */}
        {visibleSections.map((section) => {
          const papers = filterPapers(section.sems);
          const isExpanded = expandedSections[section.id];

          if (papers.length === 0) return null;

          return (
            <div key={section.id} className="year-section">
              <div
                className="section-header"
                onClick={() => toggleSection(section.id)}
              >
                <h2>
                  <i className={`fas ${section.icon}`}></i> {section.title}
                  <span className="paper-count">({papers.length})</span>
                </h2>
                <span
                  className={`toggle-icon ${isExpanded ? 'rotated' : ''}`}
                >
                  <i className="fas fa-chevron-down"></i>
                </span>
              </div>

              {/* Desktop Table */}
              <div
                className={`table-wrapper ${!isExpanded ? 'collapsed' : ''}`}
              >
                <table>
                  <thead>
                    <tr>
                      <th>Paper ID</th>
                      <th>Paper Name</th>
                      <th>Sem</th>
                      <th>Year</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {papers.map((paper, idx) => (
                      <tr key={idx}>
                        <td>{paper.id}</td>
                        <td>{paper.name}</td>
                        <td>
                          <span className="badge">{paper.sem}</span>
                        </td>
                        <td>{paper.year}</td>
                        <td>
                          {isLoggedIn ? (
                            <a
                              href={paper.link}
                              className="download-btn"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => handleDownload(paper.name)}
                            >
                              <i className="fas fa-download"></i> PDF
                            </a>
                          ) : (
                            <Link
                              to="/login"
                              className="download-btn login-required"
                            >
                              <i className="fas fa-lock"></i> Login
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div
                className={`card-grid ${
                  isExpanded && isMobile ? 'visible' : ''
                }`}
              >
                {papers.map((paper, idx) => (
                  <div key={idx} className="paper-card">
                    <div className="card-header">
                      <span className="card-title">{paper.name}</span>
                      <span className="card-sem">{paper.sem} Sem</span>
                    </div>
                    <div className="card-detail">
                      <span className="card-label">Paper ID:</span>
                      <span className="card-value">{paper.id}</span>
                    </div>
                    <div className="card-detail">
                      <span className="card-label">Year:</span>
                      <span className="card-value">{paper.year}</span>
                    </div>
                    {isLoggedIn ? (
                      <a
                        href={paper.link}
                        className="download-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleDownload(paper.name)}
                      >
                        <i className="fas fa-download"></i> Download
                      </a>
                    ) : (
                      <Link
                        to="/login"
                        className="download-btn login-required"
                      >
                        <i className="fas fa-lock"></i> Login to Download
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* No Results */}
        {!hasAnyResults() && (
          <div className="no-results" style={{ display: 'block' }}>
            <i className="fas fa-search"></i>
            <h3>No matching papers found</h3>
            <p>Try different keywords or semester filter</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default IGUBBA;