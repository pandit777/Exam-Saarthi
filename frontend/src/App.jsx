import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

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
import IGUBtech from './components/IGUBtech';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Universities from './components/Universities';

import IGU from './components/IGU';

import DU from './pages/DU';
import DUCourse from './pages/DUCourse';

import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';

import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

import ResumeBuilder from './components/ResumeBuilder';

import logo from './assets/logo.png';

const siteUrl = 'https://www.examsaarthi.com';

/* =========================================================
   SEO DATA — har page ka unique title (sitelinks ke liye)
   Format: "[Page Name] | Exam Saarthi - [Tagline]"
   ========================================================= */
const seoData = {
  // ==================== HOME ====================
  '/': {
    title: 'Home | Exam Saarthi - Previous Year Question Papers',
    description:
      'Download free previous year question papers (PYQ) for IGU, DU and other universities. Exam Saarthi — your one-stop PYQ repository for all students.',
    keywords:
      'Exam Saarthi, Exam Saarthi home, PYQ download, previous year question papers, free exam papers',
  },

  // ==================== UNIVERSITIES ====================
  '/university': {
    title: 'Universities | Exam Saarthi - Explore All Universities',
    description:
      'Browse previous year question papers by university. IGU, DU and more — all PYQs at one place on Exam Saarthi.',
    keywords:
      'universities, university PYQ, university exam papers, previous year papers, Exam Saarthi universities',
  },

  // ==================== IGU MAIN ====================
  '/igu': {
    title: 'IGU Papers | Exam Saarthi - Indira Gandhi University PYQ',
    description:
      'Access Indira Gandhi University (IGU) previous year question papers for all courses and semesters. Free download on Exam Saarthi.',
    keywords:
      'IGU PYQ, IGU previous year question papers, Indira Gandhi University papers, IGU exam papers',
  },

  // ==================== IGU COURSES ====================
  '/igu-btech': {
    title: 'IGU B.Tech Papers | Exam Saarthi - B.Tech PYQ Download',
    description:
      'Download IGU B.Tech previous year question papers for all semesters — free PDFs on Exam Saarthi.',
    keywords:
      'IGU B.Tech PYQ, IGU B.Tech previous year papers, B.Tech question papers, IGU engineering papers',
  },

  '/igu-mtech': {
    title: 'IGU M.Tech Papers | Exam Saarthi - M.Tech PYQ Download',
    description:
      'Download IGU M.Tech previous year question papers for all semesters — free PDFs on Exam Saarthi.',
    keywords:
      'IGU M.Tech PYQ, IGU M.Tech previous year papers, M.Tech question papers',
  },

  '/igu-bca': {
    title: 'IGU BCA Papers | Exam Saarthi - BCA PYQ Download',
    description:
      'Download IGU BCA previous year question papers for all semesters — free PDFs on Exam Saarthi.',
    keywords:
      'IGU BCA PYQ, IGU BCA previous year papers, BCA question papers',
  },

  '/igu-bba': {
    title: 'IGU BBA Papers | Exam Saarthi - BBA PYQ Download',
    description:
      'Download IGU BBA previous year question papers for all semesters — free PDFs on Exam Saarthi.',
    keywords:
      'IGU BBA PYQ, IGU BBA previous year papers, BBA question papers',
  },

  '/igu-bsc': {
    title: 'IGU B.Sc Papers | Exam Saarthi - B.Sc PYQ Download',
    description:
      'Download IGU B.Sc previous year question papers for all semesters — free PDFs on Exam Saarthi.',
    keywords:
      'IGU BSc PYQ, IGU BSc previous year papers, BSc question papers',
  },

  '/igu-ba': {
    title: 'IGU BA Papers | Exam Saarthi - BA PYQ Download',
    description:
      'Download IGU BA previous year question papers for all semesters — free PDFs on Exam Saarthi.',
    keywords:
      'IGU BA PYQ, IGU BA previous year papers, BA question papers',
  },

  '/igu-ma': {
    title: 'IGU MA Papers | Exam Saarthi - MA PYQ Download',
    description:
      'Download IGU MA previous year question papers for all semesters — free PDFs on Exam Saarthi.',
    keywords:
      'IGU MA PYQ, IGU MA previous year papers, MA question papers',
  },

  '/igu-bcom': {
    title: 'IGU B.Com Papers | Exam Saarthi - B.Com PYQ Download',
    description:
      'Download IGU B.Com previous year question papers for all semesters — free PDFs on Exam Saarthi.',
    keywords:
      'IGU BCom PYQ, IGU BCom previous year papers, BCom question papers',
  },

  '/igu-mcom': {
    title: 'IGU M.Com Papers | Exam Saarthi - M.Com PYQ Download',
    description:
      'Download IGU M.Com previous year question papers for all semesters — free PDFs on Exam Saarthi.',
    keywords:
      'IGU MCom PYQ, IGU MCom previous year papers, MCom question papers',
  },

  // ==================== DELHI UNIVERSITY ====================
  '/du': {
    title: 'DU Papers | Exam Saarthi - Delhi University PYQ Download',
    description:
      'Access Delhi University (DU) previous year question papers for all courses — free PDFs on Exam Saarthi.',
    keywords:
      'DU PYQ, DU previous year question papers, Delhi University papers, DU exam papers',
  },

  '/pages/du': {
    title: 'DU Papers | Exam Saarthi - Delhi University PYQ Download',
    description:
      'Access Delhi University (DU) previous year question papers for all courses — free PDFs on Exam Saarthi.',
    keywords:
      'DU PYQ, Delhi University PYQ, DU previous year papers',
  },

  // ==================== ABOUT ====================
  '/about': {
    title: 'About | Exam Saarthi - Our Mission & Story',
    description:
      'Learn about Exam Saarthi — our mission to make previous year question papers free and accessible for every student in India.',
    keywords:
      'about Exam Saarthi, Exam Saarthi mission, educational platform',
  },

  // ==================== CONTACT ====================
  '/contact': {
    title: 'Contact | Exam Saarthi - Support & Enquiries',
    description:
      'Contact Exam Saarthi for support, suggestions, or queries. Reach us at 8901346287 or 7742973491.',
    keywords:
      'contact Exam Saarthi, Exam Saarthi support, Exam Saarthi phone number',
  },

  // ==================== AUTH ====================
  '/login': {
    title: 'Login | Exam Saarthi - Access Your Account',
    description:
      'Login to Exam Saarthi to download previous year question papers for free. Access IGU, DU and other university PYQs.',
    keywords:
      'Exam Saarthi login, student login, PYQ download login, Exam Saarthi account',
  },

  '/register': {
    title: 'Register | Exam Saarthi - Create Free Account',
    description:
      'Create a free Exam Saarthi account and start downloading previous year question papers for IGU, DU and more.',
    keywords:
      'Exam Saarthi register, Exam Saarthi signup, free student account',
  },

  // ==================== PRIVATE (noindex) ====================
  '/forgot-password': {
    title: 'Forgot Password | Exam Saarthi',
    description: 'Reset your Exam Saarthi password.',
    keywords: 'forgot password, Exam Saarthi reset',
  },

  '/reset-password': {
    title: 'Reset Password | Exam Saarthi',
    description: 'Set a new password for your Exam Saarthi account.',
    keywords: 'reset password, Exam Saarthi',
  },

  '/profile': {
    title: 'My Profile | Exam Saarthi',
    description: 'Manage your Exam Saarthi profile.',
    keywords: 'profile, Exam Saarthi account',
  },

  '/dashboard': {
    title: 'Dashboard | Exam Saarthi',
    description: 'Your Exam Saarthi dashboard.',
    keywords: 'dashboard, Exam Saarthi',
  },

  '/resume-builder': {
    title: 'Resume Builder | Exam Saarthi',
    description: 'Build your resume with Exam Saarthi.',
    keywords: 'resume builder, Exam Saarthi',
  },
};

/* =========================================================
   META TAG HELPER
   ========================================================= */
function setMetaTag(name, value, type = 'name') {
  const selector =
    type === 'name'
      ? `meta[name="${name}"]`
      : `meta[property="${name}"]`;

  let tag = document.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');

    if (type === 'name') {
      tag.setAttribute('name', name);
    } else {
      tag.setAttribute('property', name);
    }

    document.head.appendChild(tag);
  }

  tag.setAttribute('content', value);
}

/* =========================================================
   SEO COMPONENT — route change pe meta tags update
   ========================================================= */
function Seo() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Private/noindex pages (Google ko index nahi karne dena)
    const noIndexPages = [
      '/forgot-password',
      '/reset-password',
      '/profile',
      '/dashboard',
      '/resume-builder',
    ];

    const isNoIndex =
      noIndexPages.includes(path) || path.startsWith('/admin');

    const page = seoData[path] || seoData['/'];

    const canonicalUrl = `${siteUrl}${path === '/' ? '' : path}`;

    document.title = page.title;

    setMetaTag('description', page.description);
    setMetaTag('keywords', page.keywords);

    // Conditional robots
    setMetaTag(
      'robots',
      isNoIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

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
        'Exam Saarthi provides previous year question papers and academic resources.',
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

/* =========================================
   SCROLL TO TOP (route change par top pe)
   ========================================= */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* =========================================================
   APP
   ========================================================= */
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
          <ScrollToTop />

          <div className="App">
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main>
              <Routes>
                {/* Home */}
                <Route path="/" element={<Home />} />

                {/* Universities */}
                <Route path="/university" element={<Universities />} />

                {/* IGU */}
                <Route path="/igu" element={<IGU />} />

                {/* =========================
                    DELHI UNIVERSITY
                   ========================= */}
                <Route path="/du" element={<DU />} />
                <Route path="/pages/du" element={<DU />} />

                {/* DU COURSE PAGE */}
                <Route path="/du-course/:course" element={<DUCourse />} />

                {/* Old DU route support */}
                <Route path="/du/:course" element={<DUCourse />} />

                {/* IGU COURSES */}
                <Route path="/igu-btech" element={<IGUBtech />} />
                <Route path="/igu-mtech" element={<IGUMtech />} />
                <Route path="/igu-bca" element={<IGUBCA />} />
                <Route path="/igu-bba" element={<IGUBBA />} />
                <Route path="/igu-bsc" element={<IGUBSc />} />
                <Route path="/igu-ba" element={<IGUBA />} />
                <Route path="/igu-ma" element={<IGUMA />} />
                <Route path="/igu-bcom" element={<IGUBCom />} />
                <Route path="/igu-mcom" element={<IGUMCom />} />

                {/* OTHER PAGES */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* AUTH */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<Profile />} />

                {/* DASHBOARD */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/resume-builder" element={<ResumeBuilder />} />

                {/* ADMIN */}
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
