import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
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

const seoData = {
  '/': {
    title: 'Exam Saarthi | IGU PYQ & Previous Year Question Papers',
    description:
      'Access IGU previous year question papers, PYQ PDFs, and exam resources on Exam Saarthi.',
    keywords:
      'Exam Saarthi, IGU PYQ, IGU previous year question papers, exam papers',
  },

  '/university': {
    title: 'Universities & Exam Papers | Exam Saarthi',
    description:
      'Explore university-wise exam papers and question bank solutions at Exam Saarthi.',
    keywords:
      'universities, university exam papers, previous year papers, Exam Saarthi',
  },

  '/igu': {
    title: 'IGU Previous Year Question Papers | Exam Saarthi',
    description:
      'Get IGU previous year question papers and exam resources.',
    keywords:
      'IGU PYQ, IGU previous year question papers, IGU exam papers',
  },

  '/du': {
    title: 'DU Previous Year Question Papers | Exam Saarthi',
    description:
      'Access Delhi University previous year question papers and PYQ PDFs.',
    keywords:
      'DU PYQ, DU previous year question papers, DU exam papers',
  },

  '/pages/du': {
    title: 'Delhi University Previous Year Question Papers | Exam Saarthi',
    description:
      'Access Delhi University previous year question papers and PYQ PDFs.',
    keywords:
      'DU PYQ, Delhi University PYQ, DU previous year papers',
  },

  '/about': {
    title: 'About Exam Saarthi | Learn Our Mission',
    description:
      'Learn about Exam Saarthi and our mission.',
    keywords:
      'about Exam Saarthi, educational mission',
  },

  '/contact': {
    title: 'Contact Exam Saarthi | Support & Enquiries',
    description:
      'Contact Exam Saarthi for questions and support.',
    keywords:
      'contact Exam Saarthi, support',
  },
};

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

function Seo() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // ⭐ Agar page exist nahi karta to noindex lagao (SEO friendly)
    const page = seoData[path];

    if (!page) {
      document.title = 'Exam Saarthi';
      setMetaTag('robots', 'noindex, nofollow');
      return;
    }

    const canonicalUrl =
      `${siteUrl}${path === '/' ? '' : path}`;

    document.title = page.title;

    setMetaTag(
      'description',
      page.description
    );

    setMetaTag(
      'keywords',
      page.keywords
    );

    setMetaTag(
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    setMetaTag(
      'theme-color',
      '#0f172a'
    );

    let canonical =
      document.querySelector(
        "link[rel='canonical']"
      );

    if (!canonical) {
      canonical =
        document.createElement('link');

      canonical.rel = 'canonical';

      document.head.appendChild(
        canonical
      );
    }

    canonical.href = canonicalUrl;

    setMetaTag(
      'og:title',
      page.title,
      'property'
    );

    setMetaTag(
      'og:description',
      page.description,
      'property'
    );

    setMetaTag(
      'og:type',
      'website',
      'property'
    );

    setMetaTag(
      'og:url',
      canonicalUrl,
      'property'
    );

    setMetaTag(
      'og:image',
      `${siteUrl}/icons.svg`,
      'property'
    );

    setMetaTag(
      'twitter:card',
      'summary_large_image'
    );

    setMetaTag(
      'twitter:title',
      page.title
    );

    setMetaTag(
      'twitter:description',
      page.description
    );

    setMetaTag(
      'twitter:image',
      `${siteUrl}/icons.svg`
    );

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Exam Saarthi',
      url: siteUrl,
      description:
        'Exam Saarthi provides previous year question papers and academic resources.',
    };

    let structuredData =
      document.querySelector(
        '#exam-saarthi-schema'
      );

    if (!structuredData) {
      structuredData =
        document.createElement('script');

      structuredData.id =
        'exam-saarthi-schema';

      structuredData.type =
        'application/ld+json';

      document.head.appendChild(
        structuredData
      );
    }

    structuredData.textContent =
      JSON.stringify(schema);

  }, [location.pathname]);

  return null;
}

/* =========================================
   SCROLL TO TOP (route change par top pe le jaata hai)
   ========================================= */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [theme, setTheme] =
    useState('light');

  useEffect(() => {
    const saved =
      localStorage.getItem('theme') ||
      'light';

    setTheme(saved);

    document.documentElement
      .setAttribute(
        'data-theme',
        saved
      );
  }, []);

  useEffect(() => {
    let favicon =
      document.querySelector(
        'link[rel="icon"]'
      );

    if (!favicon) {
      favicon =
        document.createElement('link');

      favicon.rel = 'icon';

      document.head.appendChild(
        favicon
      );
    }

    favicon.type = 'image/png';
    favicon.href = logo;

  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme === 'light'
        ? 'dark'
        : 'light';

    setTheme(newTheme);

    document.documentElement
      .setAttribute(
        'data-theme',
        newTheme
      );

    localStorage.setItem(
      'theme',
      newTheme
    );
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

            <Header
              theme={theme}
              toggleTheme={toggleTheme}
            />

            <main>

              <Routes>

                {/* Home */}
                <Route
                  path="/"
                  element={<Home />}
                />

                {/* Universities */}
                <Route
                  path="/university"
                  element={<Universities />}
                />

                {/* IGU */}
                <Route
                  path="/igu"
                  element={<IGU />}
                />

                {/* =========================
                    DELHI UNIVERSITY
                   ========================= */}

                <Route
                  path="/du"
                  element={<DU />}
                />

                <Route
                  path="/pages/du"
                  element={<DU />}
                />

                {/* DU COURSE PAGE */}
                <Route
                  path="/du-course/:course"
                  element={<DUCourse />}
                />

                {/* Old DU route support */}
                <Route
                  path="/du/:course"
                  element={<DUCourse />}
                />

                {/* IGU COURSES */}
                <Route
                  path="/igu-btech"
                  element={<IGUBtech />}
                />

                <Route
                  path="/igu-mtech"
                  element={<IGUMtech />}
                />

                <Route
                  path="/igu-bca"
                  element={<IGUBCA />}
                />

                <Route
                  path="/igu-bba"
                  element={<IGUBBA />}
                />

                <Route
                  path="/igu-bsc"
                  element={<IGUBSc />}
                />

                <Route
                  path="/igu-ba"
                  element={<IGUBA />}
                />

                <Route
                  path="/igu-ma"
                  element={<IGUMA />}
                />

                <Route
                  path="/igu-bcom"
                  element={<IGUBCom />}
                />

                <Route
                  path="/igu-mcom"
                  element={<IGUMCom />}
                />

                {/* OTHER PAGES */}
                <Route
                  path="/about"
                  element={<About />}
                />

                <Route
                  path="/contact"
                  element={<Contact />}
                />

                {/* AUTH */}
                <Route
                  path="/login"
                  element={<Login />}
                />

                <Route
                  path="/register"
                  element={<Register />}
                />

                <Route
                  path="/forgot-password"
                  element={<ForgotPassword />}
                />

                <Route
                  path="/reset-password"
                  element={<ResetPassword />}
                />

                <Route
                  path="/profile"
                  element={<Profile />}
                />

                {/* DASHBOARD */}
                <Route
                  path="/dashboard"
                  element={<Dashboard />}
                />

                <Route
                  path="/resume-builder"
                  element={<ResumeBuilder />}
                />

                {/* ADMIN */}
                <Route
                  path="/admin/login"
                  element={<AdminLogin />}
                />

                <Route
                  path="/admin/dashboard"
                  element={<AdminDashboard />}
                />

                {/* ⭐⭐⭐ CATCH-ALL ROUTE ⭐⭐⭐ */}
                {/* Invalid URL → Home par redirect */}
                {/* SABSE NEECHE hona chahiye */}
                <Route
                  path="*"
                  element={<Navigate to="/" replace />}
                />
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