import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import iguLogo from '../assets/universities/igu.png';
import { loadAdminPapers } from '../utils/coursePapers';

function IGUBCA() {
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
    { id: '11321', name: 'Computer and Programming Fundamental', sem: '1st', year: '2022', link: 'https://drive.google.com/file/d/1DtnZ_OwG7pUV675v8NKR4pu1DlbCBCNu/view' },
    { id: '11324', name: 'Logical Organization of Computer', sem: '1st', year: '2022', link: 'https://drive.google.com/file/d/1v4-OTp3UpgHaz_qBopJyiHRbhA93Nvds/view' },
    { id: '11323', name: 'Mathematics', sem: '1st', year: '2022', link: 'https://drive.google.com/file/d/1su5F1jpOEhRHfyDLG6B1KDaGauhQB-CH/view' },
    { id: '11322', name: 'PC Software', sem: '1st', year: '2022', link: 'https://drive.google.com/file/d/11WWC1Jz6GXpU6JSG-ItVm5mFSQ16bMTa/view' },
    { id: '11321', name: 'Computer and Programming Fundamental', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/105TKMGB10THYdl9HrjtpksEGFUgwJ9lv/view' },
    { id: '11321', name: 'Computer and Programming Fundamental', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1r6RfddKUaNMG_UnZH85LD8MZYjDyRYHu/view' },
    { id: '11322', name: 'PC Software', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1TKQfLmFksld7QvgNYehaw1PBboUw2m9C/view' },
    { id: '11323', name: 'Mathematics', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1cFc9w5m53IgJ33tso9vL7_tEZxg7t-_T/view' },
    { id: '11323', name: 'Mathematics', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1VgNITfpYyO_LGguoiwOZ8KQbFaLL-bLj/view' },
    { id: '11324', name: 'Logical Organization of Computer', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/18FG6FBnj-ntTiQYLCRRxs7xdT9KBmmt9/view' },
    { id: '11324', name: 'Logical Organization of Computer', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1flG2p3dw0ld1OtJXkJmj8AhoLuRaDJoO/view' },
    { id: '11324', name: 'Logical Organization of Computer', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1y8bfRzPny_huDTu2GXzm39ntCmJnr-x9/view' },
    { id: '11323', name: 'Mathematics', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1LwuOzUFzai101IETrZAGj9oKByDnm4ZE/view' },
    { id: '17671', name: 'English Language and Communication', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1yi5tiJ9LNVQtIwlbxZNo-2LTWQvO0UjR/view' },
    { id: '17672', name: 'Hindi Bhasha aur Vyakaran', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1tydCfVC-y4ROhQwcJO9-wRIqVz0ToEbc/view' },
    { id: '11321', name: 'Computer And Programming Fundamental', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1v58Ov94dRkN-EU7anGBo3MoUnlpqJ_QM/view' },
    { id: '17652', name: 'Environmental Studies', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1rPQjYUB3pci12WaN4nsdQ0XYu_IYYoT5/view' },
    { id: '22999', name: 'Computer Awareness-I', sem: '2nd', year: '2022', link: 'https://drive.google.com/file/d/1C13C7p0UZoGb19GMVoJWt4MAgVvJgVui/view' },
    { id: '22703', name: 'Communication Skills and Personality', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1QlIClYc14dtTHKT-scBpnyTLMXyWrQhj/view' },
    { id: '22999', name: 'Computer Awareness', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1QuqcR6h7SrvWEq9Co2OtX3YDFn0YYAH5/view' },
    { id: '21321', name: 'C Programming', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/13L689dvbw_EMyApW2Tg8ZlAK4cz3fqy2/view' },
    { id: '21322', name: 'Logical Organization of Computer-II', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1Om6gvcWjYgu4iMdz5IZ8iBM5AdkuvPki/view' },
    { id: '21323', name: 'Mathematical Foundation of Computer Science', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1i3Awz_oHKPV1A6T4md5PVH-6ARYbO6pn/view' },
    { id: '21324', name: 'Structure System Analysis and Design', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1e_OcTrnSvmL8GqbnFXWr_eqnS78KuZ7K/view' },
    { id: '21321', name: 'C Programming', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1XiDC4dNbq39o83B59PW61bNfhYS84Zja/view' },
    { id: '21324', name: 'Structure System Analysis and Design', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1-iefqBqAZBfzWWvGJ4oc-xNZUbtyktv4/view' },
    { id: '21324', name: 'Structure System Analysis and Design', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1wuct3kEX7wrLWXAI0IkcOaUH5rmgpny7/view' },
    { id: '21322', name: 'Logical Organization of Computer-II', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1EgxvfpngGs0Ij0STn-Uec92ENjmUGQBM/view' },
    { id: '21322', name: 'Logical Organization of Computer-II', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1TJgdLXDKcLT0toBZp-T-d0GokiO6Zfci/view' },
    { id: '27652', name: 'Environmental Studies', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1M2OKe2YCRnaaavvb7B2s5jg_YtZbBGXR/view' },
    { id: '27084', name: 'Indian Society and Culture', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1MoXc5w7aGGo2VcE-9WMZ8pDPwxdaHjO1/view' },
    { id: '21271', name: 'Pteridophytes Gymnosperms and Fossils', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1vb2CQLTRPEKi8Zwu3ILM-23OeICMVoY4/view' },

    // ===== 2nd Year (Sem 3 & 4) =====
    { id: '31322', name: 'Data Structures', sem: '3rd', year: '2019', link: 'https://drive.google.com/file/d/1BfEX4-bH5lKHXx12xaS2TvpyrgVgYhkH/view' },
    { id: '31322', name: 'Data Structures', sem: '3rd', year: '2019', link: 'https://drive.google.com/file/d/1RB4s6rjchXE4_g8eJsTzOTJLRD0HNC7w/view' },
    { id: '31323', name: 'Introduction to Database System', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/18ttX0eMXK_oHqfRAqeNah4SVosj7OTXR/view' },
    { id: '31321', name: 'Introduction to Operating Systems', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1H_VOR1LM8LQ6cM-s_7GpNJouSOTNsf-2/view' },
    { id: '31324', name: 'Communication Skills English', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1nFG8KZvnWIcCAuaaYyrek5NT65SO79nL/view' },
    { id: '31322', name: 'Data Structures', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1mh41uYlpgwk4Kt0yCqLm-ol1h0842G2a/view' },
    { id: '31323', name: 'Introduction to Database System', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1zU5buv-5BSsWJVY1mljOcBr6gY_XkzS_/view' },
    { id: '31323', name: 'Introduction to Database System', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1XNkNrNzN0H63F9NsYq4Y0A7eSrfy6fHG/view' },
    { id: '31321', name: 'Introduction to Operating Systems', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1d77pc7Fk3A2Zrmf2KGB2gT0QbIlsnYk9/view' },
    { id: '31321', name: 'Introduction to Operating Systems', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/1S78qRdwNDB1Txw0-lER6diKIFn4r-VUO/view' },
    { id: '31322', name: 'Data Structures', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/1v1VugKJvjMwZscbzSe80r9vuTHaNCrsn/view' },
    { id: '31324', name: 'Communication Skills English', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/1bM_WZZ3xUPqQtKG8m8QNpkEjBPqq8w_S/view' },
    { id: '41322', name: 'Data Structure-II', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1ISKHBLpQcGdY7c2rHQ2HUsFmb66qGjw0/view' },
    { id: '41323', name: 'Object-Oriented Programming Using C++', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1ttKqPatJBo33vx1ufzuttFxeEHi6vdC_/view' },
    { id: '41324', name: 'Software Engineering', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1txV1y9z-MbjQ55zE3HqjfKKMnRGIHlU_/view' },
    { id: '41321', name: 'Web Designing', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1Mz733Gu2Qf-ssTGwT5WsGaN2oqdOBFWw/view' },

    // ===== 3rd Year (Sem 5 & 6) =====
    { id: '97678', name: 'Computer Graphic', sem: '5th', year: '2017', link: 'https://drive.google.com/file/d/1J5oB3ejFWIg7uFE-lIPEmnHMGHphThyd/view' },
    { id: '51321', name: 'Management Information System', sem: '5th', year: '2021', link: 'https://drive.google.com/file/d/1Uulka_fmjXXeLqENNwiew6qtciKbWbp6/view' },
    { id: '51324', name: 'Visual Basic', sem: '5th', year: '2021', link: 'https://drive.google.com/file/d/16ncp7xltljNOlZxToSau8wuK-rjrMXAz/view' },
    { id: '51322', name: 'Computer Graphic', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1lpeCYnDJeQX1oWU8-2aFW025JbgoFpyM/view' },
    { id: '51322', name: 'Computer Graphic', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/16T0MYd_L434YX-bypTTn6_GxEWT-n3Ib/view' },
    { id: '51323', name: 'Data Communication and Networking', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1yoNRC0vIBDM0qB_zNAmoRYxsqOIbprFN/view' },
    { id: '51324', name: 'Visual Basic', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1-HDKoygDM-eUQ0LxSSoa2Rbj4hlyxDOy/view' },
    { id: '51323', name: 'Data Communication and Networking', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1gIw0kTJ47S9uSHuRh6f_ISgy1FOlSOD2/view' },
    { id: '51322', name: 'Computer Graphic', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1AtzbVevMPg3ZQsIf3XZGjS5N2KJj9uHp/view' },
    { id: '51321', name: 'Management Information System', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1IaXDEUaPk41zSXA7G9v0A3EuV71F1Htn/view' },
    { id: '51324', name: 'Visual Basic', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1Hjp-CKDVjIKhDGM5Ov_ymPAQNtmtgRGQ/view' },
    { id: '51323', name: 'Data Communication and Networking', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1dp4oaBEjdvE3kx4xh985CNB7RIOuyHLf/view' },
    { id: '51322', name: 'Computer Graphic', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1NKMlNmCezd563WLi_pdgptwge9RluIE_/view' },
    { id: '51321', name: 'Management Information System', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1Jk121rj8q4uIJUiJiTmgmDy9ZFGhifTp/view' },
    { id: '61323', name: 'Artificial Intelligence', sem: '6th', year: '2024', link: 'https://drive.google.com/file/d/1gUtJcG625-ysik1894IjjjcrC_YVY_Dd/view' },
    { id: '61321', name: 'E-Commerce', sem: '6th', year: '2024', link: 'https://drive.google.com/file/d/1lPg0wP1JaKgEgtwUkwNbBWPhUr5z65H4/view' },
    { id: '61324', name: 'Introduction to Dot-Net', sem: '6th', year: '2024', link: 'https://drive.google.com/file/d/1udxQfn2-7FHJ-iJ5HOafhsmuPkm1dkSG/view' },
    { id: '61322', name: 'Object Technologies and Programming', sem: '6th', year: '2024', link: 'https://drive.google.com/file/d/1ZYftzSZPktv27QfJyLbPKu2iD4xEqfAg/view' },
  ];

  const [adminPapers, setAdminPapers] = useState([]);

  useEffect(() => {
    loadAdminPapers('BCA').then(setAdminPapers);
  }, []);

  const yearSections = [
    { id: '1', title: 'BCA 1st Year (Sem 1 & 2)', icon: 'fa-laptop-code', sems: ['1st', '2nd'] },
    { id: '2', title: 'BCA 2nd Year (Sem 3 & 4)', icon: 'fa-code', sems: ['3rd', '4th'] },
    { id: '3', title: 'BCA 3rd Year (Sem 5 & 6)', icon: 'fa-database', sems: ['5th', '6th'] },
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
          <h1>IGU BCA PYQ Repository</h1>
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

export default IGUBCA;