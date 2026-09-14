import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import iguLogo from '../assets/universities/igu.png';
import { loadAdminPapers } from '../utils/coursePapers';

function IGUMA() {
  const { isLoggedIn } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    '1': true,
    '2': true,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // ============ PAPERS DATA ============
  const papersData = [
    // ===== 1st Year (Sem 1 & 2) =====
    { id: '12203', name: 'English British Drama', sem: '1st', year: '2019', link: 'https://drive.google.com/file/d/1JIGC2GAsbTWXTxCsvcxPS_xwVIIgUDhZ/view' },
    { id: '12209', name: 'English British Novel', sem: '1st', year: '2019', link: 'https://drive.google.com/file/d/1wFAJRtayGTzd4hXylXFHb9c7weOtECw-/view' },
    { id: '12207', name: 'English British Poetry', sem: '1st', year: '2019', link: 'https://drive.google.com/file/d/1zC02DYNmdkbzjyNLgGHaXVpqKX-Hekdo/view' },
    { id: '12210', name: 'English British Prose', sem: '1st', year: '2019', link: 'https://drive.google.com/file/d/1pQHlRAK_En9ODam8ISZSb8UCC97BYfXs/view' },
    { id: '12201', name: 'English Reading Writing and Documentation Skills', sem: '1st', year: '2019', link: 'https://drive.google.com/file/d/16LzvRGrvcjsyQQi7IXi9DyX77TLdQOAd/view' },
    { id: '12704', name: 'Common Value Education', sem: '1st', year: '2019', link: 'https://drive.google.com/file/d/1G9OPneflnlJ_iv1FvXdsk9BnphNIwtta/view' },
    { id: '12705', name: 'Communication Skills and Personality Development', sem: '1st', year: '2019', link: 'https://drive.google.com/file/d/1VdyoYNAXDns_4rx1DmkkGhU5_2GyaGsE/view' },
    { id: '12706', name: 'Computer Application', sem: '1st', year: '2019', link: 'https://drive.google.com/file/d/1aK8g4lVgc1KR18rKOCpL_x5UTJQc-8Ul/view' },
    { id: '12706', name: 'Computer Application', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1BaeVpAz06KIn0jGWnTOZzAx8664Ne2ko/view' },
    { id: '12234', name: 'Medieval Societies', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1THsT0J970HpHtW28_t8JfURK6cOTHQoE/view' },
    { id: '12252', name: 'Western Political Thought', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1nu21ppcE1AEG8V_Bd2aWUnZviWsbl2zB/view' },
    { id: '12207/12213', name: 'British Poetry', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/17TREQrqR3W39DT2nUqgNImPtFuoj1p9t/view' },
    { id: '12227', name: 'Source of History', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1vf20cXDjANbHxwVCukb2aboXVRP8DiDI/view' },
    { id: '14201', name: 'History of English Literature', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1FEwG-ME-nuQHgFYZTjY4Iky-lFfNzqas/view' },
    { id: '12212', name: 'Reading of Writing Skill', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1hgXYGIN1fZaRgRcsfBbzvVAXwYxPkihw/view' },
    { id: '14225', name: 'State of India', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1J7LT4FbztHw2pmpiZrEFREpSE1rVPvO4/view' },
    { id: '12216', name: 'British Prose', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/18E4HrrS9HPvMSowKJcd62wqkragpNm29/view' },

    // ===== 2nd Year (Sem 3 & 4) — No papers available =====
  ];

  const [adminPapers, setAdminPapers] = useState([]);

  useEffect(() => {
    loadAdminPapers('MA').then(setAdminPapers);
  }, []);

  const yearSections = [
    { id: '1', title: 'MA 1st Year (Sem 1 & 2)', icon: 'fa-book', sems: ['1st', '2nd'] },
    { id: '2', title: 'MA 2nd Year (Sem 3 & 4)', icon: 'fa-graduation-cap', sems: ['3rd', '4th'] },
  ];

  const semesters = ['1st', '2nd', '3rd', '4th'];

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
    <div className="igu-ma-page">
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
          <h1>IGU MA PYQ Repository</h1>
          <p>Indira Gandhi University, Rewari • English • History • Political Science</p>
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

      {/* ===== FOOTER ===== */}
      <footer>
        <i className="fas fa-graduation-cap"></i> Exam Saarthi - IGU MA PYQ
        Repository | Free for all students
      </footer>
    </div>
  );
}

export default IGUMA;