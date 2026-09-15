import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import iguLogo from '../assets/universities/igu.png';
import { loadAdminPapers } from '../utils/coursePapers';

function IGUBCom() {
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
    { id: '11343', name: 'Business Economics', sem: '1st', year: '2019', link: 'https://drive.google.com/file/d/1THrlm13jC0PwccdnpHgmR9ymbZreBOeO/view' },
    { id: '11344', name: 'Business Management', sem: '1st', year: '2019', link: 'https://drive.google.com/file/d/1f6jnRE7Vremrnlo7Nfjih7tP7Xw9dSqD/view' },
    { id: '50501', name: 'Environmental Studies', sem: '1st', year: '2020', link: 'https://drive.google.com/file/d/1NnNOhdMYK4H3FOmhbUF184RS8D18QrhP/view' },
    { id: '4056', name: 'Basic Of Computer', sem: '1st', year: '2021', link: 'https://drive.google.com/file/d/1Y9TT8inFX69OmEfkrKswZkRweiDpw5uE/view' },
    { id: '4803', name: 'Micro Economics', sem: '1st', year: '2021', link: 'https://drive.google.com/file/d/1EWJLp1U1IlEBRGdZ2nmEHYTsIkKatBJ_/view' },
    { id: '11345', name: 'Business Communication Skills', sem: '1st', year: '2022', link: 'https://drive.google.com/file/d/1d_am0jLdw9fjjdYvrjm049dN4Cq-OV1T/view' },
    { id: '11341', name: 'Financial Accounting', sem: '1st', year: '2022', link: 'https://drive.google.com/file/d/161vO2G0ZFXAoIILMAhb9EmFJZD7pUEtw/view' },
    { id: 'Not Available', name: 'Environmental Studies', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1t8mQvXDbumFUbq4pIhPCKZL86lOhLEwM/view' },
    { id: '11345', name: 'Business Communication Skills', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1GifJ6KwfhojZVOczlOdHXBnrsuyV05Q8/view' },
    { id: '13005', name: 'Indian Banking System', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1bPxhFTmtfY6BbMdsxLG_rICqN7Y5bG-L/view' },
    { id: '11343', name: 'Business Economics', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1loBVS8mexrBoSicB9qZeDLy7BFiRKVol/view' },
    { id: '11344', name: 'Business Management', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1EDdPYi-cNNAbNEhiaaUFX3irux_FDXyz/view' },
    { id: '11342', name: 'Business Mathematics', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1wxK8HQU6A_7mvMnfH9m0vXtSWhkgPRov/view' },
    { id: '11341', name: 'Financial Accounting-I DEC', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1-qnTzpCsoOKaLdt_UH6XSDi18WNE4InW/view' },
    { id: '11341', name: 'Financial Accounting-I JAN', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1qaL26_N8Y7GW3ZFOnXSMaRHVhI5SkK4F/view' },
    { id: '17652', name: 'Environmental Studies', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1VjBURlDR6M8mY0nxbmELK52yqf4DMhuI/view' },
    { id: '17671', name: 'English Language and Communication Level-I', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/146sDLc6no8AkWQ_irX6XVpwtbsaY1hwH/view' },
    { id: '17672', name: 'Hindi Bhasha Aur Vyakaran', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1zr9Xhv0U67IsUhO4Alnk5haJskIqZ_Ra/view' },
    { id: '4482', name: 'Corporate Accounting', sem: '2nd', year: '2020', link: 'https://drive.google.com/file/d/1C6ro0Zm2ztZ6HDBBBNFMscwjkmDhVExH/view' },
    { id: '4484', name: 'Micro Economics', sem: '2nd', year: '2020', link: 'https://drive.google.com/file/d/11wV2VpKWFUO4FAli-FtEGfKZcK-WZTm8/view' },
    { id: '22999', name: 'Computer Awareness-I', sem: '2nd', year: '2022', link: 'https://drive.google.com/file/d/1JeQTiUXZqhEE_TWqJyBJHA8WRJSMmYdG/view' },
    { id: '21341', name: 'Financial Accounting-II', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1Y-_c0owkVUBtfuU9QntKQEy2B-1AgPJJ/view' },
    { id: '21344', name: 'Business Mathematics-II', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1hNlWWNSpXyc6HD1eVzPsT_UES9u84-wh/view' },
    { id: '21342', name: 'Business Mathematics-II', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/15OEVvlmIuRtl41E0VQtxDHvXCazeNYbc/view' },
    { id: '21345', name: 'Business Environment-II', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1U6WKq9gMsIGUEN7oBEdg_mosf-hjg1uU/view' },
    { id: '21343', name: 'Business Economics-II', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1kdF4MMFjMznY7kVWWuU1IyZOlM5sjTsc/view' },
    { id: '21346', name: 'Basic of Computer-II', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/12gGIEtcBix52MQOiBeiN11C0-4Ha0D8L/view' },
    { id: '22999', name: 'Computer Awareness', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/11gEOsVBtUYrQz_VNoGylMlINMyWnlcfd/view' },
    { id: '22703', name: 'Communication Skills and Personality Development', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/15xLU2N6y4vWXOwrS0n816pUDrUDCF4vw/view' },
    { id: '23001', name: 'Financial Accounting', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/102eV763VcnW9D7fZct32MSImdvjMFa65/view' },
    { id: '21341', name: 'Financial Accounting-II', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1Pw5FMo-JPxmMLw4tVZg70-SLHSCLUBMh/view' },
    { id: '21652', name: 'Environmental Studies', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1zUt7a-ZY7xOFU2c64dKGRG7DweJc5ToX/view' },
    { id: '27084', name: 'Indian Society and Culture', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1KOBYrV061JXKvgVa-WB_3c-HrVqRjgPq/view' },
    { id: '27271', name: 'Pteridophytes Gymnosperms and Fossils', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/141RHZzb6ZQYEsvp8gVtfeukjO8xaaeLJ/view' },

    // ===== 2nd Year (Sem 3 & 4) =====
    { id: '31345', name: 'Human Resource Management', sem: '3rd', year: '2019', link: 'https://drive.google.com/file/d/1wAFaAmMBbijNXgSejl0wOyPwsfqwk6ir/view' },
    { id: '31342', name: 'Business Statistics-I', sem: '3rd', year: '2019', link: 'https://drive.google.com/file/d/1w4sqYch2Q5sTRPQq5fG_L0OjDzie25sv/view' },
    { id: '31346', name: 'Fundamental of Insurance', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1IQ8Jt0K9HChAjVGEx1NcqBXhyV4BTV3S/view' },
    { id: '31343', name: 'Business Regulatory Framework', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1Haxo4osZiv6puN_Yj2AHztlkMScASyqc/view' },
    { id: '33002', name: 'Cost Accounting', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1GmC7Mcjm-zaslv7RRfDQZLD_YmS6wrSw/view' },
    { id: '31343', name: 'Business Regulatory Framework', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1Un72HFkJ-jHsEhG9nj__wZrQuB9dGAzl/view' },
    { id: '31345', name: 'Human Resource Management', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1h5ygloRnstYmV94mFOX4TxCfDK75vpvV/view' },
    { id: '31348', name: 'Production Management', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/1zG8bAu6JYfIfk_3wgYqrSdnD-djkqKBV/view' },
    { id: '31346', name: 'Fundamental of Insurance', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/1OM3hhmnia4rdahsCQueGH6NgIEzfZunJ/view' },
    { id: '33006', name: 'Business Mathematics', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/1SUgYNpocMpPQkbm_WkVy2E6lxGBhisiN/view' },
    { id: '8618', name: 'Advertising', sem: '4th', year: '2020', link: 'https://drive.google.com/file/d/1EO0fyXUgoDbYKqTXb7itLyHWeZPHGypv/view' },
    { id: '41347', name: 'Banking and Banking Law', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1UnQfgNWzYYTQbMEIvZ0b_sAOXPnJFoJA/view' },
    { id: '41343', name: 'Business Regulatory Framework', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1JFX5o8_lyxZDEPmtyoONWAXhStkhTReR/view' },
    { id: '41342', name: 'Business Statistics-II', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1tcbcEo26dGo_ZniGuUTRBeCZB4YKxQ0z/view' },
    { id: '41341', name: 'Corporate Accounting', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1QBc9Ud7i6quTgsyELd-6ZBOPjEVmhIXZ/view' },
    { id: '41344', name: 'Corporate Law-II', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/13O0jYHZRqBv6XbaR2tVATFDXAH-BRN8b/view' },
    { id: '41345', name: 'Marketing Management', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1f13fA46vV8kCSPr2Ep2TkbfhY_obM0sM/view' },
    { id: '43004', name: 'Goods and Service Tax', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/14zfbm3tQJUxmxpHKr4TG4Wm2IQaearup/view' },
    { id: '41347', name: 'Banking and Banking Law', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1AGZYxg0OAwYYIIJzlp_xllLeC9lzMXtZ/view' },

    // ===== 3rd Year (Sem 5 & 6) =====
    { id: '51343', name: 'Accounting for Management', sem: '5th', year: '2021', link: 'https://drive.google.com/file/d/1uyTMAGZywEMYdWpJGDfO304QaSl9kNsU/view' },
    { id: '51342', name: 'Cost Accounting-I', sem: '5th', year: '2021', link: 'https://drive.google.com/file/d/1-_PoplCMuivnFDrFyRWAUZcmKdb7D9XJ/view' },
    { id: '51345', name: 'Entrepreneurship and Small Business', sem: '5th', year: '2021', link: 'https://drive.google.com/file/d/1cGud6BSPXAwhXX_cnQtPRKcdBT-3orXI/view' },
    { id: '51344', name: 'Financial Market Operations', sem: '5th', year: '2021', link: 'https://drive.google.com/file/d/1T-JMcZeYp18OOzUdY72b0Ho9g66TlGL7/view' },
    { id: '51349', name: 'International Business Environment', sem: '5th', year: '2021', link: 'https://drive.google.com/file/d/17w9qGICzanwrnn5YC-wft-4U2YzuWJ-I/view' },
    { id: '51341', name: 'Taxation Law', sem: '5th', year: '2021', link: 'https://drive.google.com/file/d/1Ig0l2GEGEl3SgO_sojuL826wuR4gi6mk/view' },
    { id: '51343', name: 'Accounting For MGT.', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1M6fx0Ua9bOw03pCqni1qKC0fysL9jtgR/view' },
    { id: '51342', name: 'Cost Accounting-I', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1WfK8ejq6eOOlkaM8f0EFecvRDbZYzoJQ/view' },
    { id: '51345', name: 'Entrepreneurship and Small Business', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1gQttsNirdMxtKhtB23qk_11xBsbHxbAO/view' },
    { id: '51346', name: 'International Trade', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1CCC9GYmTCa9WqYrjwPBJoLCLEEfElJeN/view' },
    { id: '53004', name: 'Business Environment', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1CrayG2KTBPzQuBQLmQrUUoEcoM_gSOnh/view' },
    { id: '53003', name: 'Business Law', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/15xdK8PHZvZog2CgR6UcTtTg8APHxeN4P/view' },
    { id: '53002', name: 'Financial Management', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1tBcs2XwZl7UkiQQgwL6cp2tMbm6ZaIci/view' },
    { id: '53005', name: 'Financial Market Operations', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1Rz6UuwROpVMklHxCOXX8FcWz13X2gqiw/view' },
    { id: '53001', name: 'Income Tax', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1MKLTEgLOC3p4bt_Ba-xy3-7gz4RIhZyi/view' },
    { id: '53007', name: 'Retail Management', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1__6SKbQbl_PaS3f1fgakcNEjVCz5gx5d/view' },
    { id: '51343', name: 'Accounting for Management', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1_bGrUhDVO4rkbkuydPOr8RT8BfVo6aY6/view' },
    { id: '51342', name: 'Cost Accounting-I', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1MVkJY0Q3GMFL2IcA33TwQwq9MFG0RkFj/view' },
    { id: '51341', name: 'Entrepreneurship and Small Scale Business Management', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1CfdV_eY34dQLRIXOdEH71uS7-4cuf5RK/view' },
    { id: '51344', name: 'Financial Market Operations', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1cct4KX7J_mFnMx-sPFMYbc03yLknVDge/view' },
    { id: '51349', name: 'International Business Environment', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1jGSyDB8b9TsBAJZyU7QY_9_7GxSon05Y/view' },
    { id: '51341', name: 'Taxation Law', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1sBHxI0zAqmLjaos2saT4RzmmtNoPHmlo/view' },
    { id: '61345', name: 'Goods and Service Taxes', sem: '6th', year: '2017', link: 'https://drive.google.com/file/d/1H1S_yF_KcPq4ncx9DAgPQJr0XSiXzv-D/view' },
    { id: '4553', name: 'Entrepreneurship Development', sem: '6th', year: '2022', link: 'https://drive.google.com/file/d/1WKwhICBqpr9MfgC23_5c9szvZ4_SYaHU/view' },
    { id: '61344', name: 'Auditing', sem: '6th', year: '2023', link: 'https://drive.google.com/file/d/1_3Qoex-S0E4sDmkw8OOS6nna57eqGDlx/view' },
    { id: '61342', name: 'Cost Accounting-II', sem: '6th', year: '2023', link: 'https://drive.google.com/file/d/1GR8jBLh4pHXvmgkdaKtpR4sRuObJSGMn/view' },
    { id: '61343', name: 'Financial Management', sem: '6th', year: '2023', link: 'https://drive.google.com/file/d/1Upiu6ZkKKy1k2YYf-SiRTLfTe3-vafIU/view' },
    { id: '61345', name: 'Goods and Service Tax and Customs Law', sem: '6th', year: '2023', link: 'https://drive.google.com/file/d/1lvvoPqOhPOMsMoib8a8IG_jG_GQUlKki/view' },
    { id: '61346', name: 'International Marketing', sem: '6th', year: '2023', link: 'https://drive.google.com/file/d/1Mkp_05wyuqthlGNu2rQfkm43SQav2Cqg/view' },
    { id: '61341', name: 'Taxation Law-II', sem: '6th', year: '2023', link: 'https://drive.google.com/file/d/1haodT70crkB4cRjodY4betuHDjOlKR14/view' },
    { id: '61344', name: 'Auditing', sem: '6th', year: '2024', link: 'https://drive.google.com/file/d/1JuQX1-kT4ghwgIq_iYGgSGjciWepXBKu/view' },
  ];

  const [adminPapers, setAdminPapers] = useState([]);

  useEffect(() => {
    loadAdminPapers('B.Com').then(setAdminPapers);
  }, []);

  const yearSections = [
    { id: '1', title: 'B.Com 1st Year (Sem 1 & 2)', icon: 'fa-calculator', sems: ['1st', '2nd'] },
    { id: '2', title: 'B.Com 2nd Year (Sem 3 & 4)', icon: 'fa-chart-line', sems: ['3rd', '4th'] },
    { id: '3', title: 'B.Com 3rd Year (Sem 5 & 6)', icon: 'fa-briefcase', sems: ['5th', '6th'] },
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
    <div className="igu-bcom-page">
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
          <h1>IGU B.Com PYQ Repository</h1>
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

export default IGUBCom;