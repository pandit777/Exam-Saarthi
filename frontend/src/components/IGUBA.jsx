import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import iguLogo from '../assets/universities/igu.png';
import { loadAdminPapers } from '../utils/coursePapers';

function IGUBA() {
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
    { id: '11001', name: 'English', sem: '1st', year: '2021', link: 'https://drive.google.com/file/d/1ewnoRKdVcWYyegxzYyDs22hlZRxEH2YN/view' },
    { id: '11011', name: 'Hindi', sem: '1st', year: '2021', link: 'https://drive.google.com/file/d/1GiIRhyjcUBxF8bBWPx5A2cYhmZucaQuy/view' },
    { id: '11121', name: 'Mathematics Algebra', sem: '1st', year: '2021', link: 'https://drive.google.com/file/d/1GsorZIhnDLlsFD2a7t96mQlEXsX0HfpP/view' },
    { id: '11122', name: 'Mathematics Calculus', sem: '1st', year: '2021', link: 'https://drive.google.com/file/d/1hmUD3B_WYZtHCKDfxu1mSrMgisaiXw3f/view' },
    { id: '11123', name: 'Mathematics Solid Geometry', sem: '1st', year: '2021', link: 'https://drive.google.com/file/d/1Xuwcfri7YInKqJsOaxj4TVDl76MVIfUr/view' },
    { id: '11001', name: 'English', sem: '1st', year: '2022', link: 'https://drive.google.com/file/d/1CH5QofP-2ZAvr04-FXM0Q0HZL3h-Z2yF/view' },
    { id: '11011', name: 'Hindi', sem: '1st', year: '2022', link: 'https://drive.google.com/file/d/13rJwLry0fns15VQfYX-IO1wKAYBUFfBa/view' },
    { id: '11041', name: 'History of India from earliest times to c 1200', sem: '1st', year: '2022', link: 'https://drive.google.com/file/d/1oZLRptro3AjHMlZ33ceGyCQnk4P23fY8/view' },
    { id: '10361', name: 'PS Indian Constitution', sem: '1st', year: '2022', link: 'https://drive.google.com/file/d/1-BL4mtAV5ytucWmFZcNTVIcrGFxIweue/view' },
    { id: '11081', name: 'Sociology Basic Concept of Sociology', sem: '1st', year: '2022', link: 'https://drive.google.com/file/d/1rQvlzP6sMe6i7YgccmOBP5KKQKNCLOG8/view' },
    { id: '11001', name: 'English', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1j93mChMAzikm2IdW--4Vye60t8cCZRK4/view' },
    { id: '11381', name: 'English', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1hI3TdtfXKWZemAjkdrx8U1aiFg9HU0Ud/view' },
    { id: '11062', name: 'Geography of India', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1H0-lcUdSiUetvDDS2sWYwlmjXaTL4W_T/view' },
    { id: '11011', name: 'Hindi', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1EjbLv7RxdEtkRXKf5ex5cil-phLDY4Pn/view' },
    { id: '11181', name: 'Mathematics-I Algebra', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1KmLA3XJswgSkV_ZS7DzZxctljKZ441Yr/view' },
    { id: '11071', name: 'Micro Economics', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1-djEoMWkObZ-9D-C5JHt5P9AiMPDJOa0/view' },
    { id: '10361', name: 'Political Science Indian Constitution', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/11gmin_t3x2r7ImZn0u6h6waewHFtFPBd/view' },
    { id: 'N/A', name: 'Environmental Studies', sem: '1st', year: '2023', link: 'https://drive.google.com/file/d/1s3njYbC0hid2TaaQXSbtLykbkd0ICr-2/view' },
    { id: '17671', name: 'English Language and Communication Level-I', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1zdwK8orGo9Tm_LwNrdtZGGdUvYlJ1BIr/view' },
    { id: '17672', name: 'Hindi Bhasha Aur Vyakaran', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1a5YRRsU0QcsPCEyoWOJ9LMbBuVKpn81b/view' },
    { id: '17652', name: 'Environmental Studies', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1rref_fHVCnB5527uwb0Ivh7BZYkBHss6/view' },
    { id: '17661', name: 'Skill Enhancement Courses', sem: '1st', year: '2024', link: 'https://drive.google.com/file/d/1cUHpfN-9FOImJ5ZbWTs1FxzbUIOZg3t-/view' },
    { id: '21001', name: 'English', sem: '2nd', year: '2021', link: 'https://drive.google.com/file/d/14lnEHkT5bVNYUr2aPsaveMS3q4zgfEN1/view' },
    { id: '21062', name: 'Geography Physical Geography-I', sem: '2nd', year: '2021', link: 'https://drive.google.com/file/d/1DwGbgajdunfA_1HvGvYt1yRHBu7pS_c_/view' },
    { id: '21011', name: 'Hindi', sem: '2nd', year: '2021', link: 'https://drive.google.com/file/d/19lOmGyNagsUO4-BUPFu_y_lyF5DXUPeI/view' },
    { id: '21121', name: 'Mathematics Number Theory and Trigonometry', sem: '2nd', year: '2021', link: 'https://drive.google.com/file/d/1sK247LtrLWPImjtoeTVOOKbKtdjFOqxS/view' },
    { id: '21122', name: 'Mathematics Ordinary Differential Equations', sem: '2nd', year: '2021', link: 'https://drive.google.com/file/d/1wUFUz_A4anu81ahDy9Oz57qnmmWW2YIv/view' },
    { id: '21123', name: 'Mathematics Vector Calculus', sem: '2nd', year: '2021', link: 'https://drive.google.com/file/d/1gOkwnWLGgbDDhKPmfq3ZUhAWiSD2SZkD/view' },
    { id: '22999', name: 'Computer Awareness-I', sem: '2nd', year: '2022', link: 'https://drive.google.com/file/d/150rq-zK0VOO41oddhdCO48dXlFA5zvBZ/view' },
    { id: '21062', name: 'Physical Geography', sem: '2nd', year: '2022', link: 'https://drive.google.com/file/d/1hjPRgCvOztL55cJQ1baELJXmbAjUqgj7/view' },
    { id: '31361', name: 'Defense Studies World Military History Modern', sem: '2nd', year: '2022', link: 'https://drive.google.com/file/d/1NhQzw30i7mxVbVFE--D3oFcBgZixxpcO/view' },
    { id: '31001', name: 'English', sem: '2nd', year: '2022', link: 'https://drive.google.com/file/d/1LBm-vT0jQJ-us2FV2YV1EC_EvEFHdL3F/view' },
    { id: '31011', name: 'Hindi', sem: '2nd', year: '2022', link: 'https://drive.google.com/file/d/1xrFhZAZm2xzzODfu-4yLWIoAIDtFmKAG/view' },
    { id: '31041', name: 'History of India C 1707 to 1947', sem: '2nd', year: '2022', link: 'https://drive.google.com/file/d/1Ww9ZC7JaACmYouHAqkhiK4-9qtjkA719/view' },
    { id: '22703', name: 'Communication Skills and Personality Development', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/12z59ys6xTAMS97TQez3nQHUhER0fKx39/view' },
    { id: '22999', name: 'Computer Awareness', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1RTfz_M7cUdgZnzTnt9_GbOJXp2gsGqFm/view' },
    { id: '21001', name: 'English', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1Eq_OpcXjnZYqc_kU91013HIpYMpgqj-P/view' },
    { id: '21071', name: 'Micro Economics-II', sem: '2nd', year: '2023', link: 'https://drive.google.com/file/d/1WcJ4mHnIX-NV_QjngJZgkGiElu_5Wv7G/view' },
    { id: '21001', name: 'English', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1h3BiYNZB8nz357HRhyjF16Zu-NOHR2aH/view' },
    { id: '21011', name: 'Hindi', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1FoM4w1hr4vQ2LPzf48xoUkoN9va4ek30/view' },
    { id: '21041', name: 'History of India c 1200 to 1707', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1phxRlxitPEJa4r7GdgvJAjrGPCODSiwL/view' },
    { id: '21051', name: 'Political Science', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1pK691IvWObbr5HYKIj8gQjY14TVD9GQf/view' },
    { id: '31101', name: 'Home Science Clothing and Textile', sem: '2nd', year: '2024', link: 'https://drive.google.com/file/d/1N4fNnzhWtn2eCpHQhFpF3y8S-1Sd_-rp/view' },
    { id: '27652', name: 'Environmental Studies', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1FjgHT8UfgR7EIpDKp7vmn2zLYrN_enke/view' },
    { id: '27084', name: 'Indian Society and Culture', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1WT60VKjBXAp6BQAiv1Ii2o6JfHT8QXfJ/view' },
    { id: '27271', name: 'Pteridophytes Gymnosperms and Fossils', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1QdZg-Ufv90wQa2bj6BxhK94stoRQTOUp/view' },
    { id: '22999', name: 'Basic Computer Education', sem: '2nd', year: '2025', link: 'https://drive.google.com/file/d/1_OL2lm8uCFkHNrYV2OOYfdL8GK0lNmkH/view' },

    // ===== 2nd Year (Sem 3 & 4) =====
    { id: '31361', name: 'Defense Studies World Military History Modern', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1oOf15S0McGiEqjdTYLckpp45C_lwMFKQ/view' },
    { id: '31001', name: 'English', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/11GUW4doZjak2Q5N57sx96ztl4DCyewe3/view' },
    { id: '31001', name: 'English December', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1lGLpRvfM4LkDNU6l1waegaofJkAKatLN/view' },
    { id: '31011', name: 'Hindi', sem: '3rd', year: '2022', link: 'https://drive.google.com/file/d/1VUGSlyAV2f99P9FHthOeUrerI9E5s20A/view' },
    { id: '31041', name: 'History of India c 1707 to 1947', sem: '3rd', year: '2023', link: 'https://drive.google.com/file/d/1plJdNSDnkp5XQo-0VZ870pZA_dgQEem1/view' },
    { id: '31101', name: 'Home Science Clothing and Textile', sem: '3rd', year: '2024', link: 'https://drive.google.com/file/d/1Qoiexot9aC1Z2KI48U2Saewbv8hh1SfQ/view' },
    { id: '41001', name: 'English', sem: '4th', year: '2022', link: 'https://drive.google.com/file/d/1kWiWHiow3Xmn_76uJPy70c8fDH-hFoFB/view' },
    { id: '41011', name: 'Hons-Hindi', sem: '4th', year: '2022', link: 'https://drive.google.com/file/d/1MjoQpdz9xY3orXz0f12BCQwP1bXRBa3T/view' },
    { id: '41062', name: 'Human Geography', sem: '4th', year: '2022', link: 'https://drive.google.com/file/d/1MTfvkP_lsgOkfSOn2V32c4k8wtdUR90w/view' },
    { id: '41123', name: 'Mathematics Programming in C and Numerical Methods', sem: '4th', year: '2022', link: 'https://drive.google.com/file/d/1DfsVTAUNT5rOOBvEQB3GVoHsPpq5_Ahq/view' },
    { id: '41122', name: 'Mathematics Special Function and Integral', sem: '4th', year: '2022', link: 'https://drive.google.com/file/d/1Ge3i-HvvophWGc4rZuL7LaLMXC7etrdQ/view' },
    { id: '41071', name: 'Economics Macro Economics', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1SrRUC69IOOdvoi9jGIncyZjM4gvimzDN/view' },
    { id: '41001', name: 'English', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1nznIHxJAjP4OsM31K3wxA04V-bSar9Is/view' },
    { id: '41062', name: 'Geography Human Geography', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1KkyycVorh-fu1vxkJOHBdvWjnpDO3sZb/view' },
    { id: '41011', name: 'Hindi', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/12ijMCfpyZKshrAALtYYuMntXxK9b53xM/view' },
    { id: '41041', name: 'History of Haryana Earliest Times to 1947', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1VAx9An84DRuuNY1NVE3qi6BtMQmSNuIH/view' },
    { id: '41121', name: 'Maths-I Sequences and Series', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1wNe93C3tiFIvYkxOOAUPAWsDQInkPhVr/view' },
    { id: '41122', name: 'Maths-II Special Functions and Integral Transforms', sem: '4th', year: '2023', link: 'https://drive.google.com/file/d/1La4GPmfpIwaw_YQDdEt0qY4NwtXxv0iV/view' },
    { id: '41123', name: 'Maths-III Programming in C and Numerical Methods', sem: '4th', year: '2024', link: 'https://drive.google.com/file/d/1LQuST14Cem0Pb3ROxY6zWmvfAztjFtAh/view' },

    // ===== 3rd Year (Sem 5 & 6) =====
    { id: '5240', name: 'Mathematics Group and Rings', sem: '5th', year: '2020', link: 'https://drive.google.com/file/d/1ODO7zgBYucvM2RI4soUttwdzmcVc8rv7/view' },
    { id: '5241', name: 'Mathematics Numerical Analysis', sem: '5th', year: '2020', link: 'https://drive.google.com/file/d/1mVVydVQssyNpEVIsNmiUbsFJC3i-pilO/view' },
    { id: '5241', name: 'Mathematics Numerical Analysis V2', sem: '5th', year: '2020', link: 'https://drive.google.com/file/d/1MIVDbvDdB4Pq1zJz9NDKOoOQknMsNW43/view' },
    { id: '51062', name: 'Economic geography', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1broyzG0vVZoxaCa3bAHZZw3xc_zHw3f7/view' },
    { id: '51001', name: 'English', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1MJkVKdDwEIxGiS89gk1nWdLS3kXd_H3S/view' },
    { id: '51122', name: 'Groups and Rings', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1YTFD2C4kEJow_V95tURrJAPobOEWVAst/view' },
    { id: '51011', name: 'Hindi', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1FjT2n2GclJCmfMEKHuPS8tyzRSwaJ_l_/view' },
    { id: '51123', name: 'Numerical Analysis', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1DMXeWhCntzgP5af-ADFkkXeD-SD6hGTc/view' },
    { id: '51121', name: 'Real Analysis', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1bE_4c0wNKuyWhUjW2_JLZiFb3lI-TWyz/view' },
    { id: '51391', name: 'Sanskrit', sem: '5th', year: '2022', link: 'https://drive.google.com/file/d/1Mdft5gEZEkADxFu8bOf-mA6FYMX4hCEH/view' },
    { id: '51011', name: 'Honors', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1oSZr4fpYsKv2y5MledT_rP_N63eCwvVW/view' },
    { id: '51071', name: 'Economics Development', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1qK3iwIFjltSlonpQkCJEUYYZpbRevWwV/view' },
    { id: '51001', name: 'English Compulsory', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1LrUsXIeC8vxtwB_0RZ8zLUQ2K-j3YWvU/view' },
    { id: '51062', name: 'Geography Economic Geography', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1SrRJkrrN2SwWDzj4lkGAauNchb4fA2Xe/view' },
    { id: '51011', name: 'Hindi', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1CJspOwUy0zCjSV-m4-4IdiCYziRVQ6xf/view' },
    { id: '51041', name: 'History Ancient and Medieval World', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/10fUG0uwybP8mZzGa-3c6WFTeKuDPj1KQ/view' },
    { id: '51121', name: 'Mathematics-I Real Analysis', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1t9RR-1OwNDrwk1oZZnwwsLvpMSYRZrjH/view' },
    { id: '51123', name: 'Mathematics-III Numerical Analysis', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1yvxhfI_qU-Yd5LAzxjHtVeOXf4HYubDI/view' },
    { id: '51122', name: 'Groups and Rings', sem: '5th', year: '2023', link: 'https://drive.google.com/file/d/1J4jW9NXp9uvUKdGlEV5-L3i4dWQI0xtL/view' },
    { id: '51071', name: 'Development Economics', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1PryWUTFjn9J845C-7pGAAkjY_aHdATOy/view' },
    { id: '51001', name: 'English', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1LB6y4sxZN2ht3it0zPr66SEkjRmP3Gbk/view' },
    { id: '51011', name: 'Hindi', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1Fe--A65v6mTs9nH-TUxYfIAnWy9nx2TH/view' },
    { id: '51041', name: 'History Ancient and Modern World', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1By1-s4vdQ7kH0u5MCUFw7DeGd1bPZnOB/view' },
    { id: '51101', name: 'Home Science Food and Nutrition', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/16tevBomHIckH7qJdP65UDKez17tG0aab/view' },
    { id: '51051', name: 'Political Science Comparative Politics', sem: '5th', year: '2024', link: 'https://drive.google.com/file/d/1h3rNiNSHoQjePyHaG1m89N_Fn5ov1TVq/view' },
    { id: '61061', name: 'Geography Remote Sensing GIS and Quantitative Method', sem: '6th', year: '2022', link: 'https://drive.google.com/file/d/1zK31ctXwefZi1erVNgNJX4fE_JTsl23z/view' },
    { id: '61051', name: 'Comparative Constitution of UK and USA Political Science', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/1fy1bUy8T4UF12_PwZtSbTPUQlnIH3ooc/view' },
    { id: '61071', name: 'International Economics', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/1XDG77Vru6WfdWBUuhb4qMeWq6Le1-PKS/view' },
    { id: '61001', name: 'English', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/1XwfhCFjJXWcOCiiZev0gxAk0MFBJzMhf/view' },
    { id: '61062', name: 'Geography Introduction to Remote Sensing GIS and Quantitative', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/1O-pc3akwnKiGXvwRgq3btT-w-3cDGoWh/view' },
    { id: '61011', name: 'Hindi', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/1ZzhSJS2zR9cobftMq51CaZSAwkWSGJW4/view' },
    { id: '61121', name: 'Maths-I Real and Complex Analysis', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/1MYMpB_i0ymgTOgUWa0CWvXz0exvYzegk/view' },
    { id: '61122', name: 'Maths-II Linear Algebra', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/1L6DBm4fYLq7Kh_oGTJIUeDg_nlDPyAkY/view' },
    { id: '61123', name: 'Maths-III Dynamics', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/18XIhBglJlqekv5p4y9W0D0GFqAKIl3BK/view' },
    { id: '61083', name: 'Sociology-III Rural Society Structure and Change', sem: '6th', year: '2025', link: 'https://drive.google.com/file/d/178DUMQJorPjMA1CoF0PWQY602AcSn2_C/view' },
  ];

  const [adminPapers, setAdminPapers] = useState([]);

  useEffect(() => {
    loadAdminPapers('BA').then(setAdminPapers);
  }, []);

  const yearSections = [
    { id: '1', title: 'BA 1st Year (Sem 1 & 2)', icon: 'fa-book', sems: ['1st', '2nd'] },
    { id: '2', title: 'BA 2nd Year (Sem 3 & 4)', icon: 'fa-landmark', sems: ['3rd', '4th'] },
    { id: '3', title: 'BA 3rd Year (Sem 5 & 6)', icon: 'fa-graduation-cap', sems: ['5th', '6th'] },
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
    <div className="igu-ba-page">
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
          <h1>IGU BA PYQ Repository</h1>
          <p>Indira Gandhi University, Rewari • Arts • Humanities • Social Sciences</p>
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
        <i className="fas fa-graduation-cap"></i> Exam Saarthi - IGU BA PYQ
        Repository | Free for all students
      </footer>
    </div>
  );
}

export default IGUBA;