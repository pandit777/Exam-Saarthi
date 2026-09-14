import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

function Header({ theme, toggleTheme }) {
  const { isLoggedIn, user, userProfile, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Debug - console me dikhega
  console.log('🔵 HEADER RENDER - isLoggedIn:', isLoggedIn, 'user:', user?.email);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  const displayName =
    userProfile?.name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'User';

  const avatarUrl =
    userProfile?.avatar_url ||
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    null;

  const initial = displayName.charAt(0).toUpperCase();

  const isActive = (path) => location.pathname === path;

  const getMarqueeMessage = () => {
    const path = location.pathname;

    if (path === '/') return 'Welcome to Exam Saarthi — Your gateway to previous year question papers for all universities!';
    if (path === '/university') return '🎓 All Universities PYQ at one place — Search your university and download papers for free!';
    if (path === '/igu') return '📚 Indira Gandhi University (IGU) Previous Year Papers — Choose your course and semester.';
    if (path.startsWith('/igu-')) return '📝 IGU Previous Year Papers — Search by subject, semester or year and download after login.';
    if (path === '/about') return '💡 Learn more about Exam Saarthi — Making previous year papers simple and accessible.';
    if (path === '/contact') return '📩 Need help? Contact the Exam Saarthi team for support and suggestions.';
    if (path === '/login' || path === '/register') return '🔐 Login or register to access and download previous year question papers.';
    if (path === '/dashboard') return '📊 Your Exam Saarthi dashboard — Track your profile and downloaded papers.';
    if (path === '/profile') return '👤 Manage your Exam Saarthi profile and account details.';
    return 'Exam Saarthi — Free previous year question papers for all students.';
  };

  return (
    <header>
      <div className="header-content">
        {/* LOGO */}
        <Link to="/" className="logo-area">
          <img
            src={logo}
            alt="Exam Saarthi"
            className="logo-img"
            onError={(e) => (e.target.style.display = 'none')}
          />
          <h1 className="header-title">Exam Saarthi</h1>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="desktop-nav">
          <ul>
            <li>
              <Link to="/" className={isActive('/') ? 'active-nav-link' : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/university"
                className={isActive('/university') ? 'active-nav-link' : ''}
              >
                Universities
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={isActive('/about') ? 'active-nav-link' : ''}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={isActive('/contact') ? 'active-nav-link' : ''}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* ====== YE HAI MAIN PART ====== */}
          {isLoggedIn === true ? (
            // LOGGED IN - show profile
            <div
              className="user-info"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
            >
              <div className="user-avatar">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="user-avatar-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="user-avatar-initial">{initial}</span>
                )}
              </div>
              <span className="user-name">{displayName}</span>
              <i
                className="fas fa-chevron-down"
                style={{ fontSize: '0.7rem' }}
              ></i>

              {dropdownOpen && (
                <div
                  className="dropdown-menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="dropdown-user-header">
                    <div className="dropdown-avatar">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={displayName}
                          className="dropdown-avatar-img"
                        />
                      ) : (
                        <span className="dropdown-avatar-initial">
                          {initial}
                        </span>
                      )}
                    </div>
                    <div className="dropdown-user-info">
                      <span className="dropdown-user-name">{displayName}</span>
                      <span className="dropdown-user-email">{user?.email}</span>
                    </div>
                  </div>

                  <hr className="dropdown-divider" />

                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="fas fa-user"></i> My Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                  </Link>

                  <hr className="dropdown-divider" />

                  <button
                    onClick={handleLogout}
                    className="dropdown-item danger"
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // NOT LOGGED IN - show login button
            <Link to="/login" className="login-btn">
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          )}

          <div className="theme-toggle" onClick={toggleTheme}>
            <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
          </div>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <i className={mobileOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </div>

      {/* MARQUEE */}
      <marquee behavior="scroll" direction="left" scrollamount="6">
        <i className="fas fa-bullhorn"></i> {getMarqueeMessage()}
      </marquee>

      {/* MOBILE NAV */}
      {mobileOpen && (
        <nav className="mobile-nav" style={{ display: 'block' }}>
          {isLoggedIn && (
            <div className="mobile-user-card">
              <div className="mobile-user-avatar">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="mobile-avatar-img"
                  />
                ) : (
                  <span className="mobile-avatar-initial">{initial}</span>
                )}
              </div>
              <div className="mobile-user-details">
                <span className="mobile-user-name">{displayName}</span>
                <span className="mobile-user-email">{user?.email}</span>
              </div>
            </div>
          )}

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/university">Universities</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          {isLoggedIn ? (
            <>
              <div style={{ padding: '8px 15px' }}>
                <Link to="/profile" className="mobile-login-btn">
                  <i className="fas fa-user"></i> Profile
                </Link>
              </div>
              <div style={{ padding: '8px 15px' }}>
                <button
                  onClick={handleLogout}
                  className="mobile-login-btn mobile-logout-btn"
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </>
          ) : (
            <div style={{ padding: '15px' }}>
              <Link to="/login" className="mobile-login-btn">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;