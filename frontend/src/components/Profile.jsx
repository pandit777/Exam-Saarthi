import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';

function Profile() {
  const {
    user,
    userProfile,
    logout,
    getDisplayName,
    getAvatarUrl,
    getInitial,
  } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [downloads, setDownloads] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ===== FETCH FULL PROFILE + DOWNLOADS =====
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      setLoading(true);

      // Set from context (instant)
      setProfile(userProfile);

      // Fetch fresh from DB
      try {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) setProfile(data);
      } catch (err) {
        console.warn('Profile fetch failed:', err);
      }

      // Load downloads
      const localDownloads = JSON.parse(
        localStorage.getItem('userDownloads') || '[]'
      );
      setDownloads(localDownloads);

      setLoading(false);
    };

    loadProfile();
  }, [user, userProfile]);

  // ===== LOGOUT =====
  const handleLogout = async () => {
    await logout();
    setShowLogoutModal(false);
    navigate('/');
  };

  // ===== DISPLAY HELPERS =====
  const displayName = getDisplayName();
  const avatarUrl = getAvatarUrl();
  const initial = getInitial();

  const isGoogleUser = !!(
    user?.app_metadata?.provider === 'google' ||
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture
  );

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* ===== PROFILE HEADER ===== */}
        <div className="profile-header">
          <div className="profile-avatar">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="profile-avatar-img"
                onError={(e) => {
                  // If Google avatar fails, show initial
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
            ) : null}
            <div
              className="profile-avatar-initial"
              style={{ display: avatarUrl ? 'none' : 'flex' }}
            >
              {initial}
            </div>
          </div>

          <h2 className="profile-username">{displayName}</h2>
          <p className="profile-email">{user?.email || 'No email'}</p>

          {/* Badges */}
          <div className="profile-badges">
            <span className="profile-badge">
              {isGoogleUser ? (
                <>
                  <i className="fab fa-google"></i> Google Account
                </>
              ) : (
                <>
                  <i className="fas fa-envelope"></i> Email Account
                </>
              )}
            </span>
            {profile?.role === 'admin' && (
              <span className="profile-badge admin-badge">
                <i className="fas fa-shield-alt"></i> Admin
              </span>
            )}
          </div>
        </div>

        {/* ===== PROFILE DETAILS ===== */}
        {profile && (
          <div className="profile-details-grid">
            {profile.name && (
              <div className="profile-detail-item">
                <div className="profile-detail-icon">
                  <i className="fas fa-user"></i>
                </div>
                <div className="profile-detail-info">
                  <span className="profile-detail-label">Full Name</span>
                  <span className="profile-detail-value">{profile.name}</span>
                </div>
              </div>
            )}

            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="profile-detail-info">
                <span className="profile-detail-label">Email</span>
                <span className="profile-detail-value">
                  {profile.email || user?.email}
                </span>
              </div>
            </div>

            {profile.mobile && (
              <div className="profile-detail-item">
                <div className="profile-detail-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="profile-detail-info">
                  <span className="profile-detail-label">Mobile</span>
                  <span className="profile-detail-value">{profile.mobile}</span>
                </div>
              </div>
            )}

            {profile.university && (
              <div className="profile-detail-item">
                <div className="profile-detail-icon">
                  <i className="fas fa-university"></i>
                </div>
                <div className="profile-detail-info">
                  <span className="profile-detail-label">University</span>
                  <span className="profile-detail-value">
                    {profile.university}
                  </span>
                </div>
              </div>
            )}

            {profile.course && (
              <div className="profile-detail-item">
                <div className="profile-detail-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="profile-detail-info">
                  <span className="profile-detail-label">Course</span>
                  <span className="profile-detail-value">{profile.course}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== STATS GRID ===== */}
        <div className="profile-stats-grid">
          <div className="profile-stat-card">
            <div className="profile-stat-icon">
              <i className="fas fa-download"></i>
            </div>
            <div className="profile-stat-info">
              <span className="profile-stat-label">Downloads</span>
              <span className="profile-stat-value">{downloads.length}</span>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon">
              <i className="fas fa-calendar"></i>
            </div>
            <div className="profile-stat-info">
              <span className="profile-stat-label">Member Since</span>
              <span className="profile-stat-value">{memberSince}</span>
            </div>
          </div>
        </div>

        {/* ===== RECENT DOWNLOADS ===== */}
        {downloads.length > 0 && (
          <div className="profile-recent">
            <h3 className="profile-section-title">
              <i className="fas fa-history"></i> Recent Downloads
            </h3>
            <div className="profile-downloads-list">
              {downloads
                .slice(-3)
                .reverse()
                .map((d, i) => (
                  <div key={i} className="profile-download-item">
                    <i className="fas fa-file-pdf"></i>
                    <div>
                      <span className="profile-download-name">{d.name}</span>
                      <span className="profile-download-date">
                        {d.date} • {d.time}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ===== ACTIONS ===== */}
        <div className="profile-actions">
          <Link to="/dashboard" className="profile-action-btn dashboard">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
          <button
            className="profile-action-btn edit"
            onClick={() => alert('Edit feature coming soon!')}
          >
            <i className="fas fa-edit"></i> Edit
          </button>
          <button
            className="profile-action-btn logout"
            onClick={() => setShowLogoutModal(true)}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      {/* ===== LOGOUT MODAL ===== */}
      {showLogoutModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <i
                className="fas fa-sign-out-alt"
                style={{ fontSize: '3rem', color: '#dc2626' }}
              ></i>
              <h3>Confirm Logout</h3>
              <p>Are you sure you want to logout from {displayName}?</p>
            </div>
            <div className="modal-actions">
              <button
                className="modal-btn cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button className="modal-btn confirm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;