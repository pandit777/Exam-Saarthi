import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import iguLogo from '../assets/universities/igu.png';
import { loadAdminPapers } from '../utils/coursePapers';

function IGUBtech() {
  const { isLoggedIn } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  // ============ PAPERS DATA ============
  const papersData = [
    // ===== 1st Year (Sem 1 & 2) =====
    { id: '12731', name: 'Humanities English Language Skill', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1zoT5Zulsxoz_ewXCz8y4xYInuF_ymuU1/view' },
    { id: '12731', name: 'Humanities English and Literature', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1zn9qhDZsGGTucbfu2VxfCdMp9KwFSHLc/view' },
    { id: '12476', name: 'Calculus and Linear Algebra', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1OaA8SO3oPSUc4tbw4mve-8UVsx0ozwWm/view' },
    { id: '12477', name: 'Basic Electrical Engineering', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1nggK3htInbjiL0IH8l86I1C2leKjp7AG/view' },
    { id: '12472', name: 'Semiconductor Physics', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1MLSSZ1rsXR7XTCDWJGWlCd1axosd-PCQ/view' },
    { id: '12476', name: 'Calculus and Linear Algebra', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1wZvOzDdxVddptPW42a1sOuoUjol0ZEF_/view' },
    { id: '12474', name: 'Chemistry - I', sem: '2nd', year: '2019', link: 'https://drive.google.com/file/d/11MtNfJnjAGZ_bAwimR5C2-ze4WtQmxmG/view' },
    { id: '22480', name: 'Workshop', sem: '2nd', year: '2022', link: 'https://drive.google.com/file/d/1Tu5fRQhmFLENmxY6aK3V_MbXJT53xJHZ/view' },
    { id: '22999', name: 'Computer Awareness', sem: '2nd', year: '2022', link: 'https://drive.google.com/file/d/1cWAIh_e3WA11QR6MJvK6ClMmx_pPaXs1/view' },
    { id: '22480', name: 'Workshop', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1W0gjE7eXDHIjrhxhqxYZt2fT8DHRJo0H/view' },
    { id: '22476', name: 'Mathematics - II', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1hsChMXQv4Q2urLpoKW29M8DdHjzKWLjm/view' },
    { id: '22703', name: 'Communication Skills', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1G4OMSAQmfkiyZRDe8l_zRBRYWZw3RoLP/view' },
    { id: '22999', name: 'Computer Awareness', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1yN9oIVPY2EOiQnPN6QlfCZIM87RA3ott/view' },
    { id: '22474', name: 'Chemistry', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1Y3O_FcbOb0H1zyOUR4zc-e4xj1rMAjWY/view' },
    { id: '22470', name: 'Introduction to Electromagnetic', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1_9AZdM_jurZmCMqa6FH1O3sVMqefOn7f/view' },
    { id: '22475', name: 'Multivariable Calculus', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1vwMW1cziktRSB_x41_JqlvsgSJxaMOoE/view' },
    { id: '22474', name: 'Chemistry', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1cXJdMIx-dSRtavOwdHG0SqfZJ0edzwVN/view' },
    { id: '22476', name: 'Math Probabilities & Stats', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1QUefYwGsf-S7HxptgbyeEczZ3U8OVGwA/view' },
    { id: '22478', name: 'Programming For Problem Solving', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1V7WxNkNCpsThBAPbTaY7KBsLnZNbWKwk/view' },

    // ===== 2nd Year (Sem 3 & 4) =====
    { id: '24043', name: 'Digital Electronics', sem: '3rd', year: '2013', link: 'https://drive.google.com/file/d/15RGgi1apomKhbgOMtOHVJzvuSgKHLuO1/view' },
    { id: '32768', name: 'Electric Circuit Analysis', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/150eoDLBZoPMKDfvLf3B2YTfOoXVpwkBz/view' },
    { id: '32466', name: 'Fundamental of Management', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1X529nf3fLTRcoQgq6plPdXv7fin-fYEs/view' },
    { id: '32769', name: 'Analog Electronics', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1Xz1fYAEMowppMAzEYans7AIGWN9dJJZI/view' },
    { id: '32464', name: 'Digital & Analog Comm', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1miUWmyoce0WlBr9rcHY-ksoyUnF130Mc/view' },
    { id: '32473', name: 'Economics for Engineers', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1424pCNmMh1JSbova6vjVVIlvqLIWLVpq/view' },
    { id: '32922', name: 'Thermodynamics', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/17tWoq5XwFPvaaNeWkRIlTV5lWlaaJKLv/view' },
    { id: '32469', name: 'Data Structures & Algorithms', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1iMwpwLyqxHSBVLxFylwNPFAAx7PAQbWi/view' },
    { id: '32747', name: 'Electronic Devices', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1MhGkIZ1scKB4xlF_MaVH7qZFpxobdwrb/view' },
    { id: '32468', name: 'DBMS', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1FwtBkSFH2HHKVlftWQuK9as_x7k_ZkLN/view' },
    { id: '32743', name: 'Engineering Mechanics', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1RrRF82JOT__HYzViXQy80ldrXuqtNKSv/view' },
    { id: '32748', name: 'Digital System Design', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1VCLQh1ACYeR056XBLCIi3nHDmRxlghXj/view' },
    { id: '32921', name: 'Basic of Mechanical Engg', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1IQ0JK6Eqs2MzTXxP-s3mgY9t9y8BSj2W/view' },
    { id: '32770', name: 'Electrical Machine', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1PivHO8dfxqQfFyoOXRb9Mn6pT_JCuD9Q/view' },
    { id: '32468', name: 'Database Management System', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1_mtbhZ97KF9QLvCBdvAlVs9rnDP3z43n/view' },
    { id: '32473', name: 'Economics of Engineering', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1xCWnw-I-cn-n_Yw5j-WE37SecWINSsWL/view' },
    { id: '32469', name: 'Data Structure & Algorithms', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1d-Eu94C6jmoelnQulKQDl8Ku3TPeymym/view' },
    { id: '32794', name: 'Fluid Mechanics', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1Oemc9j2JErdR0vTluz3EVSuNm0EZTjqu/view' },
    { id: '32795', name: 'Surveying', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/18iB8bJU_r4gP6zLmJkGwQhrVZICKPP_D/view' },
    { id: '32921', name: 'Basic of Mechanical Engg', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1Hp9ss-XcW-MQIRB331V_4eSuqW_UoCFT/view' },
    { id: '32472', name: 'Math - III', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/10CEpWTOzXIoLkXWzjphEdYJQlKVn5SYK/view' },
    { id: '32793', name: 'Environmental Science', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1XKtfPV_YcsY_rfMimyvayhfuoIlcop0J/view' },
    { id: '32768', name: 'Electrical Circuit Analysis', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1J-A0_NvTUbxo9H_ucMkkoIbLZ3g-U_G8/view' },
    { id: '32770', name: 'Electronical Machine', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1h5jA_kXs89JBehNKcGMR8K0sRmZ4dsTq/view' },
    { id: '32468', name: 'DBMS', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/1zXidEN3t601ZRq0bkqe3llbMzOX1fCii/view' },
    { id: '32740', name: 'Mathematics-III', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/13gqnr2HCFM_0VsVo5NNdqCBtXriQfdZx/view' },
    { id: '32769', name: 'Analog Electronics', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/1F6NB9-gd7y8J01Ee66Fx0R_GwVag1DDh/view' },
    { id: '32472', name: 'Mathematics-III', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/1Lb8mXDu4NAsi2RXeJZ72xxMSusq3gbMI/view' },
    { id: '32469', name: 'Data Structure & Algorithm', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/1i4GaKxaW_9WjuXHLHskj9cC8IufB8XUr/view' },
    { id: '32473', name: 'Economics for Engineers', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/1FTq_aNt2SZvxCQa3el-7rrPXFlWu6lgy/view' },
    { id: '32470', name: 'Digital Electronics', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/1ghs7wABAiOp8vpnC_-7fljFh-8hrstB9/view' },
    { id: '42749', name: 'Microcontroller', sem: '4th', year: '2022', link: 'https://drive.google.com/file/d/1pNlCG73Nv4kjPl3hBhkWgTsukqFFLp68/view' },
    { id: '42468', name: 'Discrete Mathematics', sem: '4th', year: '2022', link: 'https://drive.google.com/file/d/1D3wiI9U1rTKCBFaiRfUHrc8x75PGTF0t/view' },
    { id: '42769', name: 'Electrical Machine-II', sem: '4th', year: '2022', link: 'https://drive.google.com/file/d/1o1gPFGOiq01vdmicfYPg6WjYMqFyzh9w/view' },
    { id: '42734', name: 'Kinetics of Machines', sem: '4th', year: '2022', link: 'https://drive.google.com/file/d/1pj-knorkEHHx4ehKSpSY8NTzcpAfGOO3/view' },
    { id: '42468', name: 'Discrete Mathematics', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/16GmxStnUCutAPrVftBmtVcagPd0W3H0y/view' },
    { id: '42472', name: 'Organizational Behavior', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1ff0b1CD4TKSLVzQqrTRoy1yZopDlomub/view' },
    { id: '42469', name: 'Computer Organization', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1Ke5OMIFdKyrXvBbvCbyuYHj-2L8mBWcM/view' },
    { id: '42471', name: 'Object Oriented Programming', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1uTPFg1pwwyLGsEnGFZDtWPrCAHw3QDmZ/view' },
    { id: '42474', name: 'Web Technology', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1RJNxmvMWUn3SOlW5M7-nwHorrBcOLiXd/view' },
    { id: '43741', name: 'Material Engineering', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1rkCEm_1l2HwY0LrouqtNn3DXupQKtqVU/view' },
    { id: '42473', name: 'Environmental Science', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1nDPQgYW8CICf_gp6NKIOsl4H-igHLuHa/view' },
    { id: '42772', name: 'Math-III (Prob & Stats)', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1_iMcuLcAX5hEijMZv8xBMCr1sq382Goo/view' },
    { id: '42468', name: 'Discrete Mathematics', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1f_-cTxmWqTPAoE-fS8kuG5UH-cHjX1io/view' },
    { id: '42472', name: 'Organizational Behavior', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1gOrE4BHLF10dwj-pOcQ_3q26RCyfZmBK/view' },
    { id: '42474', name: 'Web Technology', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1dfF6cap7kGmhl-ywAEn7mmNO-IK-F_NC/view' },
    { id: '42473', name: 'Environmental Science', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1WaWVTwE1Ix9I1r6unmN2Es7kBEx1rKgH/view' },
    { id: '42471', name: 'Object Oriented Programming', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1qwVCBxpg1lpUEQA4BKjGQ1LKTHTtKKfO/view' },
    { id: '42773', name: 'Biology', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1Ae6M0gxpdIdkEFjGAG3d3_2gn624C6dk/view' },
    { id: '42469', name: 'Computer Organization', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1HdpT09QtrfsAvK2hN5pdNyEGLVF6-79k/view' },
    { id: '42470', name: 'Operating System', sem: '4th', year: '2025', link: 'https://drive.google.com/file/d/1ogQjXvsfeBg5IGlrv6hseR7aL1hajzH4/view' },
    { id: '42471', name: 'OOP', sem: '4th', year: '2025', link: 'https://drive.google.com/file/d/1JvBRhNcr17EJVPHrm7attBljjVxX9dBR/view' },
    { id: '41472', name: 'Organizational Behavior', sem: '4th', year: '2025', link: 'https://drive.google.com/file/d/1nByPFjjPzPQs_2C5gTnpRMgi7K8dy2aZ/view' },
    { id: '42473', name: 'Environmental Science', sem: '4th', year: '2025', link: 'https://drive.google.com/file/d/1obd2XXxTXat4Ux7yIdzERXsWsrVxsFyc/view' },
    { id: '42474', name: 'Web Technology', sem: '4th', year: '2025', link: 'https://drive.google.com/file/d/1zQS9_ItPr13iE6usJZZDg_biKRyK6vMB/view' },

    // ===== 3rd Year (Sem 5 & 6) =====
    { id: '24166/24268', name: 'Multi Media Technology', sem: '5th', year: '2013', link: 'https://drive.google.com/file/d/1eWND9AkartbDtsoPjiiNY-abRnDZ0M9i/view' },
    { id: '56009', name: 'Electrical Material', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1Q46YO3jD138U_TDPWVGXAIWIGNzLLPrL/view' },
    { id: '54054', name: 'Digital Signal Processing', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1-RW3Di2IvCC4I1Tv3yco3ggohI5rAnwN/view' },
    { id: '54053', name: 'Communication Theory', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1e5wJzePJ9mPI5ehhLA9ykDHIaR5U73_m/view' },
    { id: '54003', name: 'Formal Language & Automata', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1C0fpmZG7FHZE2oNGUZ43c1FzcHASKJok/view' },
    { id: '54055', name: 'Power Electronics', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1nKp-D-H2VHTAqyAjBubeHXRePvPrXxGv/view' },
    { id: '54002', name: 'Computer Network', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1wevQESCqLrggUltfiBeNv2rcGJiwit9c/view' },
    { id: '55055', name: 'Fluid Mechanics', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/17BBDjghNSeZ7BBG7ZlEmWMlWVaRdrulw/view' },
    { id: '54055', name: 'Measurement & Presentation', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/14jatZB2JiseiBKpHwRqwVBPTMqAmpRrN/view' },
    { id: '56012', name: 'Power Plant Engineering', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1SBbRvSsaPqJ-6o2Rh-o-aRsaHgbmQbBW/view' },
    { id: '54001', name: 'Microprocessor', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1iAUZeKQAZuQUJbdx4LyKkJfPB24PvdAS/view' },
    { id: '54065', name: 'Measurement & Instrumentation', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1Ar03Axfm1KE7I07O3exDxNr5hSBncwva/view' },
    { id: '55053', name: 'Manufacturing Technology', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1Fecp3uQL_q6JGqlAiqaUEpDty8CEEHyJ/view' },
    { id: '55001', name: 'Hydrology & Water Resource', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1GdR392Dtk8sQ3vMrOBSwRTDZHf9Nz4am/view' },
    { id: '55005', name: 'Design of Steel Structures', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1vLJ3AaI1Qt4xKRS9hQkcuQv4huPrB1FY/view' },
    { id: '55053', name: 'Manufacturing Technology', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1afn7hucXh_8XcoKtOH3fVU8Hou0sM93Y/view' },
    { id: '56003', name: 'Microprocessor & Controller', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1h6QHjy4k1x2TmckJO3CDZ8tqBwa5xsq0/view' },
    { id: '54007', name: 'System Programming', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1v7F5Kl6FImEzBPyvvMJz0JGOQ_X_TEqs/view' },
    { id: '54004', name: 'Design & Analysis of Algorithms', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1Bu8GqsZUjXf1PIdeNZraLMGULzvu43Sl/view' },
    { id: '54002', name: 'Computer Network', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1_hd1T1e4swa9mBOeW_B7cp7ZcG8peDru/view' },
    { id: '54006', name: 'Software Engineering', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/11195ZCop4vye5Q9wURZHhHyNT7Y0Z3lQ/view' },
    { id: '54003', name: 'Formal Language & Automata', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1kA8x0QD1JGNuyGi3-_E_ob7MuoP_pj8Y/view' },
    { id: '54001', name: 'Microprocessor', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1rM14S9g93kZFR3y9g-53VmXJZYd-ECY9/view' },
    { id: '54005', name: 'Programming in Java', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1uz4JYcdvhN8Qw7xFxcln93i-VfslfwiQ/view' },
    { id: '64004', name: 'Data Science', sem: '6th', year: '2023', link: 'https://drive.google.com/file/d/1nVyx74FnR1pJhRNKGGVN0ySKoYeciCVm/view' },
    { id: '64054', name: 'CMOS Design', sem: '6th', year: '2023', link: 'https://drive.google.com/file/d/12cIwdmcwJ4l-eawbQW4bWUsb94upXHx0/view' },
    { id: '64051', name: 'Control System', sem: '6th', year: '2023', link: 'https://drive.google.com/file/d/1y6bdv-RUR2Aklt3U220yEXtsRpSAwtf-/view' },
    { id: '64002', name: 'Artificial Intelligence', sem: '6th', year: '2023', link: 'https://drive.google.com/file/d/1Apl-dOU8jQRwAksDBoL3rLTlmZZpFvAg/view' },
    { id: '65059', name: 'Organizational Behavior', sem: '6th', year: '2024', link: 'https://drive.google.com/file/d/1CtjinHOSZb12QltAlZYUJqpMuNRDYVX8/view' },
    { id: '64004', name: 'Data Science', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/1dRcINgb3jJDUZc9RXQMHDdP6oAfFP_Ub/view' },
    { id: '64002', name: 'Artificial Intelligence', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/1f_e99k03PVFOnvmGcgw_o2v96pm-Q2Yy/view' },
    { id: '64003', name: 'Advance Java', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/1O1DrAl1wuOoxG4EySeBvwyldiYdlM0KG/view' },
    { id: '64011', name: 'Mobile & Wireless Comm', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/1n2tU7A61bikAO6R4eAi71ytkzTKj4TiG/view' },
    { id: '64006', name: 'Mobile Application Dev', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/152eM6mgZXQSfkvxItJLmKs2qM0eXEUfO/view' },
    { id: '64001', name: 'Compiler Design', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/153EnYpjmLZ1FPf3mHS3r3Lihx_UZOS7V/view' },
    { id: '66004', name: 'Power System Protection', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/191Q18a6wiN4nrztEFNAuA98HK3bq3LHX/view' },

    // ===== 4th Year (Sem 7 & 8) =====
    { id: '72461', name: 'Advanced Computer Architecture', sem: '7th', year: '2019', link: 'https://drive.google.com/file/d/1MreEAGoaXmagUEKuwjEkGkRfYCOO_IUV/view' },
    { id: '72466', name: 'Advanced DBMS', sem: '7th', year: '2019', link: 'https://drive.google.com/file/d/1yBSl3_-ROLW4lHhZEcCvR2W-0lzcLfQ4/view' },
    { id: '72465', name: 'Advanced Java', sem: '7th', year: '2019', link: 'https://drive.google.com/file/d/1jWAxuFS-c3j0w9pbl88MPrRfd4XDs1m5/view' },
    { id: '72463', name: 'Compiler Design', sem: '7th', year: '2019', link: 'https://drive.google.com/file/d/1jaA6ao7dypZ_fxEmpC864a3PR1yCZR_H/view' },
    { id: '72464', name: 'Neural Networks', sem: '7th', year: '2019', link: 'https://drive.google.com/file/d/1mDAK_CqiZcWzvrLoQGtRNUR8ennPsGUL/view' },
    { id: '74007', name: 'Network Security & Cryptography', sem: '7th', year: '2022', link: 'https://drive.google.com/file/d/1wpsZ-0BO5UoKzRoNoadFD-HTvN7v2n06/view' },
    { id: '72783', name: 'Estimating and Costing', sem: '7th', year: '2022', link: 'https://drive.google.com/file/d/1rmYFlQDdCrRxMSGteov1hBY5ytXm0Gxz/view' },
    { id: '72770', name: 'Extra High Voltage AC/DC', sem: '7th', year: '2022', link: 'https://drive.google.com/file/d/1wQwk4YyEuFQLDlz1S9DbULVDcraVZPoB/view' },
    { id: '72753', name: 'Digital Signal Processing', sem: '7th', year: '2022', link: 'https://drive.google.com/file/d/1LspDYHY9jK2JoW9NfE-gsadIfaMpOV7r/view' },
    { id: '72766', name: 'Renewable Energy Resources', sem: '7th', year: '2022', link: 'https://drive.google.com/file/d/1BCNs75pEBwOLrBb8WeknsQqjYhG-MZfW/view' },
    { id: '74058', name: 'Microwave Theory', sem: '7th', year: '2023', link: 'https://drive.google.com/file/d/1kiEA6HtMw4EHcNVnYTKJ8YkxyZU4UixB/view' },
    { id: '74003', name: 'Software Project Management', sem: '7th', year: '2023', link: 'https://drive.google.com/file/d/1YCWLOYBm7p9QLy1jPDYgOXenewFIlDvk/view' },
    { id: '76025', name: 'Fundamentals of Management', sem: '7th', year: '2023', link: 'https://drive.google.com/file/d/1jtkwrEio78-ubNSPqF9SoXHZXooYK0mM/view' },
    { id: '76015', name: 'Intelligence System & Control', sem: '7th', year: '2023', link: 'https://drive.google.com/file/d/1cRapOj7Y8cauyl8P61Q-fdWXk8szE3wI/view' },
    { id: '76009', name: 'Computer Aided Power System', sem: '7th', year: '2024', link: 'https://drive.google.com/file/d/1L43MikOZ39Fbq5S92xInFfUSqmZw-ivH/view' },
    { id: '74001', name: 'Neural Network', sem: '7th', year: '2024', link: 'https://drive.google.com/file/d/1tpZLO91fzE4vblZVJaFJQGh_UPB-kk8b/view' },
    { id: '74003', name: 'Software Project Management', sem: '7th', year: '2024', link: 'https://drive.google.com/file/d/1arxkqpFX4P44uuETznDqXlC2SDRvo835/view' },
    { id: '75056', name: 'Automobile Engineering', sem: '7th', year: '2024', link: 'https://drive.google.com/file/d/1lkBTz0v3hB-1Y8BmpGhfGXjjGU48DyfA/view' },
    { id: '75055', name: 'Design of Machine Elements', sem: '7th', year: '2024', link: 'https://drive.google.com/file/d/1IBp7DuPdRvreXwaB5VP3rE8Nw-sp8_Y3/view' },
    { id: '76001', name: 'Power Management', sem: '7th', year: '2024', link: 'https://drive.google.com/file/d/1KVxAQ7zrqN_4JBDujmOp419PDW0uwnXE/view' },
  ];

  const [adminPapers, setAdminPapers] = useState([]);

  useEffect(() => {
    loadAdminPapers('B.Tech').then(setAdminPapers);
  }, []);

  const yearSections = [
    { id: 1, title: 'B.Tech 1st Year (Sem 1 & 2)', icon: 'fa-book-open', sems: ['1st', '2nd'] },
    { id: 2, title: 'B.Tech 2nd Year (Sem 3 & 4)', icon: 'fa-laptop', sems: ['3rd', '4th'] },
    { id: 3, title: 'B.Tech 3rd Year (Sem 5 & 6)', icon: 'fa-microchip', sems: ['5th', '6th'] },
    { id: 4, title: 'B.Tech 4th Year (Sem 7 & 8)', icon: 'fa-project-diagram', sems: ['7th', '8th'] },
  ];

  const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

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
          <h1>IGU B.Tech PYQ Repository</h1>
          <p>Indira Gandhi University, Rewari • All Branches • 2013-2025</p>
        </div>
        <div className="header-actions">
          <button className="theme-toggle-header" onClick={toggleTheme}>
            <i
              className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}
            ></i>{' '}
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
                </h2>
                <span
                  className={`toggle-icon ${isExpanded ? 'rotated' : ''}`}
                >
                  <i className="fas fa-chevron-up"></i>
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
        <i className="fas fa-graduation-cap"></i> Exam Saarthi - IGU B.Tech PYQ
        Repository | Free for all students
      </footer>
    </div>
  );
}

export default IGUBtech;