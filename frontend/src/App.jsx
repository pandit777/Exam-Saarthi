import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import IGUMtech from './components/IGUMtech';
import IGUBCA from './components/IGUBCA';
import IGUBBA from './components/IGUBBA';
import IGUBSc from './components/IGUBSc';
import IGUBA from './components/IGUBA';
import IGUMA from './components/IGUMA';
import IGUBCom from './components/IGUBCom';
import IGUMCom from './components/IGUMCom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Universities from './components/Universities';
import IGU from './components/IGU';
import IGUBtech from './components/IGUBtech';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import logo from './assets/logo.png';

const siteUrl = 'https://www.examsaarthi.com';

const seoData = {
  '/': {
    title: 'Exam Saarthi | IGU PYQ & Previous Year Question Papers',
    description:
      'Access IGU previous year question papers, PYQ PDFs, and exam resources on Exam Saarthi. Find BTech, BCA, BBA, BSc, BA, MA, and more university paper solutions.',
    keywords:
      'Exam Saarthi, IGU PYQ, IGU previous year question papers, IGU BTech PYQ, exam papers, university question papers',
  },
  '/university': {
    title: 'Universities & Exam Papers | Exam Saarthi',
    description:
      'Explore university-wise exam papers and question bank solutions at Exam Saarthi. Find reliable PYQ resources and academic support for your course.',
    keywords: 'universities, university exam papers, previous year papers, Exam Saarthi',
  },
  '/igu': {
    title: 'IGU Previous Year Question Papers | Exam Saarthi',
    description:
      'Get IGU previous year question papers, exam papers, and study resources for university courses. Download question papers with ease on Exam Saarthi.',
    keywords: 'IGU PYQ, IGU previous year question papers, IGU exam papers, Exam Saarthi',
  },
  '/igu-btech': {
    title: 'IGU BTech PYQ | Previous Year Question Papers',
    description:
      'Download IGU BTech previous year question papers and PYQ PDFs on Exam Saarthi for better preparation and higher exam scores.',
    keywords: 'IGU BTech PYQ, IGU BTech previous year papers, BTech question papers, Exam Saarthi',
  },
  '/igu-mtech': {
    title: 'IGU MTech PYQ | Previous Year Question Papers',
    description:
      'Find IGU MTech previous year question papers and preparation resources on Exam Saarthi to support your exam preparation.',
    keywords: 'IGU MTech PYQ, MTech question papers, previous year papers, Exam Saarthi',
  },
  '/igu-bca': {
    title: 'IGU BCA Previous Year Papers | Exam Saarthi',
    description:
      'Download IGU BCA previous year question papers and PYQ resources on Exam Saarthi for successful exam preparation.',
    keywords: 'IGU BCA PYQ, BCA previous year papers, Exam Saarthi',
  },
  '/igu-bba': {
    title: 'IGU BBA Previous Year Papers | Exam Saarthi',
    description:
      'Access IGU BBA previous year question papers and exam resources to improve your study strategy and academic performance.',
    keywords: 'IGU BBA PYQ, BBA previous year papers, Exam Saarthi',
  },
  '/igu-bsc': {
    title: 'IGU BSc Previous Year Papers | Exam Saarthi',
    description:
      'Download IGU BSc previous year question papers and exam support material from Exam Saarthi for academic preparation.',
    keywords: 'IGU BSc PYQ, BSc question papers, previous year papers, Exam Saarthi',
  },
  '/igu-ba': {
    title: 'IGU BA Previous Year Papers | Exam Saarthi',
    description:
      'Browse IGU BA previous year papers and question resources on Exam Saarthi for exam preparation and revisions.',
    keywords: 'IGU BA PYQ, BA previous year papers, Exam Saarthi',
  },
  '/igu-ma': {
    title: 'IGU MA Previous Year Papers | Exam Saarthi',
    description:
      'Find IGU MA previous year question papers and study resources on Exam Saarthi for focused academic preparation.',
    keywords: 'IGU MA PYQ, MA previous year papers, Exam Saarthi',
  },
  '/igu-bcom': {
    title: 'IGU BCom Previous Year Papers | Exam Saarthi',
    description:
      'Download IGU BCom previous year question papers and revision resources on Exam Saarthi for better exam planning.',
    keywords: 'IGU BCom PYQ, BCom previous year papers, Exam Saarthi',
  },
  '/igu-mcom': {
    title: 'IGU MCom Previous Year Papers | Exam Saarthi',
    description:
      'Get IGU MCom previous year question papers and study help with Exam Saarthi for efficient academic preparation.',
    keywords: 'IGU MCom PYQ, MCom previous year papers, Exam Saarthi',
  },
  '/about': {
    title: 'About Exam Saarthi | Learn Our Mission',
    description:
      'Learn about Exam Saarthi, our mission, and our commitment to helping students access reliable exam papers and study resources.',
    keywords: 'about Exam Saarthi, educational mission, exam resources, study support',
  },
  '/contact': {
    title: 'Contact Exam Saarthi | Support & Enquiries',
    description:
      'Contact Exam Saarthi for questions, support, and academic resource assistance related to exam papers and study support.',
    keywords: 'contact Exam Saarthi, support, academic assistance, exam papers',
  },
};

function setMetaTag(name, value, type = 'name') {
  const selector = type === 'name' ? `meta[name="${name}"]` : `meta[property="${name}"]`;
  let tag = document.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');
    if (type === 'name') tag.setAttribute('name', name);
    else tag.setAttribute('property', name);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', value);
}

function Seo() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const page = seoData[path] || seoData['/'];
    const canonicalUrl = `${siteUrl}${path === '/' ? '' : path}`;

    document.title = page.title;
    setMetaTag('description', page.description);
    setMetaTag('keywords', page.keywords);
    setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('theme-color', '#0f172a');

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    setMetaTag('og:title', page.title, 'property');
    setMetaTag('og:description', page.description, 'property');
    setMetaTag('og:type', 'website', 'property');
    setMetaTag('og:url', canonicalUrl, 'property');
    setMetaTag('og:image', `${siteUrl}/icons.svg`, 'property');

    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', page.title);
    setMetaTag('twitter:description', page.description);
    setMetaTag('twitter:image', `${siteUrl}/icons.svg`);

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Exam Saarthi',
      url: siteUrl,
      description:
        'Exam Saarthi provides IGU previous year question papers, PYQ resources, and academic support for students preparing for university exams.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    let structuredData = document.querySelector('#exam-saarthi-schema');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'exam-saarthi-schema';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(schema);
  }, [location.pathname]);

  return null;
}

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  useEffect(() => {
    let favicon = document.querySelector('link[rel="icon"]');

    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }

    favicon.type = 'image/png';
    favicon.href = logo;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <AuthProvider>
      <AdminProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Seo />
          <div className="App">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/university" element={<Universities />} />
                <Route path="/igu" element={<IGU />} />
                <Route path="/igu-btech" element={<IGUBtech />} />
                <Route path="/igu-mtech" element={<IGUMtech />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/igu-bca" element={<IGUBCA />} />
                <Route path="/igu-bba" element={<IGUBBA />} />
                <Route path="/igu-bsc" element={<IGUBSc />} />
                <Route path="/igu-ba" element={<IGUBA />} />
                <Route path="/igu-ma" element={<IGUMA />} />
                <Route path="/igu-bcom" element={<IGUBCom />} />
                <Route path="/igu-mcom" element={<IGUMCom />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;