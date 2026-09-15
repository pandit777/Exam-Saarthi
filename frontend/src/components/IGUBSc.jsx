import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import iguLogo from '../assets/universities/igu.png';
import { loadAdminPapers } from '../utils/coursePapers';

function IGUBSc() {
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
    { id: '5122', name: 'Physics Properties of matter and kinetic theory of gases', sem: '1st', year: '2020', link: 'https://drive.google.com/file/d/1QzR_JUMEbEw9EeQXvEXP_L2HLp1gjp2y/view' },
    { id: '22999', name: 'Computer Awareness', sem: '1st', year: '2022', link: 'https://drive.google.com/file/d/1JcPaDYTfFZWkFp_5uOBV1_ttz2VJI0GB/view' },
    { id: '21222', name: 'Zoology-II', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1-f9TYlJ8-tjpVVpTCcvzARRzlQXXTwmH/view' },
    { id: '22703', name: 'Communication Skills and Personality Development', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1IQ2O0R6l-ss_85GYPjCnAM62dHgD2L3z/view' },
    { id: '22999', name: 'Computer Awareness', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1wX8M0V26BWSAWwXU-E6G8Zo4-SRPPaGL/view' },
    { id: '21211', name: 'Botany-I Diversity of Archegoniate', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1Fvy0szt8In0xJgF9keG56qWJezdOHSwJ/view' },
    { id: '21202', name: 'Chemistry-II Physical Chemistry', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1ugDAIrzcwQHi8YBEqD1zfB3WouBEe_3c/view' },
    { id: '21203', name: 'Chemistry-III Organic Chemistry', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1q7n13e37LuDNedt9H6B2aSskerBxiVjA/view' },
    { id: '21381', name: 'English', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1CGVWb1-SbF67MEgmg14ZBcGOX5nBKq6L/view' },
    { id: '21251', name: 'Hons - Mathematics Number Theory and Trigonometry', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1Vr8AjX7876EqUm4_kwHNwoT8hBRZRNES/view' },
    { id: '21201', name: 'Inorganic Chemistry', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1-wlHi4oVCmeUyd4ThRCgIk_p1879_qx0/view' },
    { id: '21221', name: 'Zoology-I Life and Diversity form Annelid to Hemichordate', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1eThZzw_pC66CPkSh-JNBBGfb3_sHra82/view' },
    { id: '21222', name: 'Zoology-II Genetics', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1Kh2Rbe2OLJlFHGAgzguFiIm4MFb0JWxf/view' },
    { id: '22999', name: 'Computer Education', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1B24ZNtkYkDkB3fVuep2MhrvH8olO8FnE/view' },
    { id: '21212', name: 'Botany-II Genetics', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/15C-v2QrFWrL0SP3hI1-RsHyHjYS2vAub/view' },
    { id: '21201', name: 'Chemistry-I Inorganic Chemistry', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1ImRJM-ipTg0YROODx8lXuNuqlCLKBjy6/view' },
    { id: '21202', name: 'Chemistry-II Physical Chemistry', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1UmQpaOICAKqy7yxr8VzImw_evsPDVUKV/view' },
    { id: '27652', name: 'Environmental Studies', sem: '1st', year: '2025', link: 'https://drive.google.com/file/d/18HahP-BaS--eQDIZ3VBL0wpg01abVFh5/view' },
    { id: '27084', name: 'Indian Society and Culture', sem: '1st', year: '2025', link: 'https://drive.google.com/file/d/1aP5rqqWJwbaaKFuThMPoJ86X23zKLte6/view' },
    { id: '27271', name: 'Pteridophytes Gymnosperms and Fossils', sem: '1st', year: '2025', link: 'https://drive.google.com/file/d/1373vwmvOUUhEgGUKr8rv0Q4XPudCRATz/view' },
    { id: '22999', name: 'Basic Computer Education', sem: '1st', year: '2025', link: 'https://drive.google.com/file/d/128VxRz_WWDEzOWZawavUxVwBgX8U60xH/view' },

    // ===== 2nd Year (Sem 3 & 4) =====
    { id: '31181', name: 'Advanced Calculus', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1oU9dQ3t4lNxLG8VTcloAj-rYk5iJbA0K/view' },
    { id: '5210', name: 'Organic Chemistry', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1UjVJA_EE3gq8JL-C7WedtVZ-svAQyu8q/view' },
    { id: '31561', name: 'Hindi', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1EmdX8HkJm99eXyngGoez80j6I5aDqUJN/view' },
    { id: '31201', name: 'Inorganic Chemistry', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1JlBACen1tlLpcDVFBFN-Gv7Tdx2WJ3Xc/view' },
    { id: '31182', name: 'Partial Differential Equations', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1HQbc-iwKu_rcvR-RbObeTeRPZStB-lv5/view' },
    { id: '31202', name: 'Physical Chemistry', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1XHEAHRi0VlNuRXoc-o_vCFf0hIxwevQV/view' },
    { id: '31192', name: 'Physics Optics', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1PI1TOBXW3jYNH0qOAJ9EijzpSGWiGWhs/view' },
    { id: '31183', name: 'Statics', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1jFX9VhwwZugvgXYV1zJFD03pfYKkG3dh/view' },
    { id: '31211', name: 'Botany-I Biology and Diversity of Seed Plant', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1_uQ6G5XdUqWtWtKAmH5qZ7fyHwdnN8km/view' },
    { id: '31212', name: 'Botany-II Plant Anatomy', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1qHKRn9d0Tj-Gfq2tRgNUFh2B3vRYaPws/view' },
    { id: '31201', name: 'Chemistry-I Inorganic Chemistry', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/15onmRePjJWsbjABzyXl4AmQ38Zc3I5BZ/view' },
    { id: '31202', name: 'Chemistry-II Physical Chemistry', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1KzU4-E5copoG5NjXm1BGG57OFWkXQ0JW/view' },
    { id: '31203', name: 'Chemistry-III Organic Chemistry', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1c3g0fZZ4IAM4fO5ovM8DzC-nTcpL99BE/view' },
    { id: '31561', name: 'Hindi', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/15A6DRSxuZghQ3WG9L5lBd4PsvWI3MGmL/view' },
    { id: '31181', name: 'Mathematics Advanced Calculus', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1pbTQiw9WDP-UtnDqPcWo7OJeJneqcY2H/view' },
    { id: '31192', name: 'Physics Optics', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1oqimopBRDhvYiOPeRmSURxmH7SnCMNA3/view' },
    { id: '31571', name: 'Sanskrit', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1GQFNUWikfrMue8WGHKixLmb1vM_dMT54/view' },
    { id: '31221', name: 'Zoology-I Life and Diversity of Chordates-I', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1TwrBx7MotoR7mI7TRSLhFZhU0U0W9izU/view' },
    { id: '31222', name: 'Zoology-II Mammalian Physiology', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1MlTfa9NETygzIaMJ5pO8bZ5Y89D2ZY1Z/view' },
    { id: '5212', name: 'Chemistry Inorganic Chemistry', sem: '4th', year: '2020', link: 'https://drive.google.com/file/d/1yx2TDqSzU9Z_gTsbTv3Vh2kMGaHVTg_L/view' },
    { id: '41202', name: 'Physical Chemistry', sem: '4th', year: '2020', link: 'https://drive.google.com/file/d/1fuvdjlEyt4WbNMQ1ZNb_yBM-HWDbITB9/view' },
    { id: '41201', name: 'Chemistry-I Inorganic Chemistry', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1l762tcS2CBZtV9bVP_ayzs93kycgWQ4b/view' },
    { id: '41202', name: 'Chemistry-II Physical Chemistry', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/10-TbEheI2MiU1nzxuPBwtN6-pRrDDZaK/view' },
    { id: '41203', name: 'Chemistry-III Organic Chemistry', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1f4tFZQVf1jXEtLOBWsS6j7lfIGRBfm4_/view' },
    { id: '41561', name: 'Hindi', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1HdENQYXErxUjIRcA0Zr3o9lqfKz30uIE/view' },
    { id: '41181', name: 'Mathematics-I Sequences and Series', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1mZwp7_Fkrig8KVTqHisngu2n0J7rB5bu/view' },
    { id: '41182', name: 'Mathematics-II Special Functions and Integral Transforms', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1xcKiMmCsC2JIEsWMdePui_iOTgILvDKq/view' },
    { id: '41183', name: 'Mathematics Programming in C and Numerical Methods', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1bkuz569wpZOdv0BdvDZtmCEdnYM3nRFx/view' },
    { id: '41191', name: 'Physics-I Statistical Mechanics', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1keh9rOXUnJ5BnN-AiuSNgxWoB_Nn4y08/view' },
    { id: '41212', name: 'Botany-II Plant Embryology', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1z2P6QC10UUK-QB9mcFIS8Z1BeP6RnIrb/view' },
    { id: '41211', name: 'Botany Biology and Diversity of Seed Plants-II', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1FFgVYpCIZDmIBM-R_XprmOTYzTGgZaMP/view' },
    { id: '41201', name: 'Chemistry-I Inorganic Chemistry', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1iJfNn3pE-24WVkIVhn5JtvZDakslKeV3/view' },
    { id: '41202', name: 'Chemistry-II Physical Chemistry', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/18p2tuEWtO38n2m7y3EP-0qrQV3htISte/view' },
    { id: '41203', name: 'Chemistry-III Organic Chemistry', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1KqVgumjQAOtlPic_fWivZZVNrysn52oa/view' },
    { id: '41232', name: 'Computer Science Operating System', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1UgBJFkb2GSSSn6K2OKmwfM1tFKmVlkOO/view' },
    { id: '41561', name: 'Hindi', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1M_kbmNMKMEhPo2hLMn0kSaD_ZWP8c0V0/view' },
    { id: '41221', name: 'Zoology-I Life and Diversity of Chordates-II', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1E6sy0qaG4QY5JrFgjeBnacxl6LVOpJFT/view' },
    { id: '41222', name: 'Zoology-II Mammalian Physiology-II', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1yuFBSO4IVWUNc8kInhgLqEfzfcssK3G4/view' },
    { id: '41201', name: 'Chemistry-I Inorganic Chemistry', sem: '4th', year: '2025', link: 'https://drive.google.com/file/d/1ouO-EdZc_1YCJxXSr5WQuMlFo0QxOXYp/view' },
    { id: '41202', name: 'Chemistry-II Physical Chemistry', sem: '4th', year: '2025', link: 'https://drive.google.com/file/d/12M6tl01hOS85kIbdvG9zoNfaNX7Cz0AP/view' },
    { id: '41203', name: 'Chemistry-III Organic Chemistry', sem: '4th', year: '2025', link: 'https://drive.google.com/file/d/1KKqSzWk_hthjZ04vyzYP6HPnHBne6Gxn/view' },
    { id: '41181', name: 'Mathematics-I Sequences and Series', sem: '4th', year: '2025', link: 'https://drive.google.com/file/d/1ILkBLh7nLLsvcq1cfvACRZweFn5QFXpT/view' },
    { id: '41182', name: 'Mathematics-II Special Functions and Transforms', sem: '4th', year: '2025', link: 'https://drive.google.com/file/d/1IMR8M_MvYNdit4lcAtSPl_Ug7OoRUYgu/view' },
    { id: '41191', name: 'Physics-I Statistical Mechanics', sem: '4th', year: '2025', link: 'https://drive.google.com/file/d/1CX0Yclcrk7NS4wXHnlgZ52MLBmNwip0_/view' },
    { id: '41192', name: 'Physics Optics-II', sem: '4th', year: '2025', link: 'https://drive.google.com/file/d/10G7adzNMVASg6eKc0dgXbbIax4RjfIyE/view' },
    { id: '41571', name: 'Sanskrit', sem: '4th', year: '2025', link: 'https://drive.google.com/file/d/1RA3Q5g-kBhvpFRPZwIQ6jI4DPs5gvfxV/view' },

    // ===== 3rd Year (Sem 5 & 6) — No papers available =====
  ];

  const [adminPapers, setAdminPapers] = useState([]);

  useEffect(() => {
    loadAdminPapers('B.Sc').then(setAdminPapers);
  }, []);

  const yearSections = [
    { id: '1', title: 'BSc 1st Year (Sem 1 & 2)', icon: 'fa-flask', sems: ['1st', '2nd'] },
    { id: '2', title: 'BSc 2nd Year (Sem 3 & 4)', icon: 'fa-dna', sems: ['3rd', '4th'] },
    { id: '3', title: 'BSc 3rd Year (Sem 5 & 6)', icon: 'fa-atom', sems: ['5th', '6th'] },
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
          <h1>IGU BSc PYQ Repository</h1>
          <p>Indira Gandhi University, Rewari • Physics • Chemistry • Maths • Botany • Zoology</p>
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
                              <i className="fas fa-lock"></i> Download
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
                        <i className="fas fa-lock"></i> Download
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

export default IGUBSc;