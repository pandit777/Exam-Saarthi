import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import logo from './assets/logo.png';

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
        <Router>
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