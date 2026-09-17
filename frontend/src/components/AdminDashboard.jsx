import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';
import { supabase } from '../utils/supabase';
import { api } from '../utils/api';
import { iguCourseOptions, semesterOptions } from '../utils/coursePapers';

const initialPaperForm = {
  paper_id: '',
  paper_name: '',
  course_name: '',
  semester: '',
  year: '',
  google_drive_link: '',
};

function AdminDashboard() {
  const { user, logout } = useAuth();
  const { isAdminUser, loading } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ totalUsers: 0, totalDownloads: 0, totalPapers: 0, recentDownloads: [] });
  const [users, setUsers] = useState([]);
  const [papers, setPapers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [paperForm, setPaperForm] = useState(initialPaperForm);
  const [paperSaving, setPaperSaving] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!loading && !isAdminUser) navigate('/admin/login');
  }, [loading, isAdminUser, navigate]);

  useEffect(() => {
    if (isAdminUser) fetchData();
  }, [isAdminUser]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [usersResult, papersResult, logsResult, recentDownloadsResult] = await Promise.allSettled([
        supabase.from('users').select('*').order('created_at', { ascending: false }),
        api.getAdminPapers(),
        api.getAdminLogs(),
        supabase.from('downloads').select('*').order('created_at', { ascending: false }).limit(10),
      ]);

      const usersData = usersResult.status === 'fulfilled' ? usersResult.value.data || [] : [];
      const papersData = papersResult.status === 'fulfilled' ? papersResult.value.papers || [] : [];
      const logsData = logsResult.status === 'fulfilled' ? logsResult.value.logs || [] : [];
      const recentDownloads = recentDownloadsResult.status === 'fulfilled' ? recentDownloadsResult.value.data || [] : [];

      const userCount = usersData.length;
      const paperCount = papersData.length;
      const downloadCount = recentDownloads.length;

      setUsers(usersData);
      setPapers(papersData);
      setLogs(logsData);
      setStats({
        totalUsers: userCount,
        totalDownloads: downloadCount,
        totalPapers: paperCount,
        recentDownloads,
      });
    } catch (err) {
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const getLogSummary = (log) => {
    if (!log?.details) return 'No details';

    try {
      const parsed = JSON.parse(log.details);
      return parsed.source || parsed.reset_by || parsed.action || 'No details';
    } catch {
      return log.details;
    }
  };

  const handlePaperChange = (e) => {
    const { name, value } = e.target;
    setPaperForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaperSubmit = async (saveAndContinue = false) => {
    setPaperSaving(true);
    setFormMessage({ type: '', text: '' });

    try {
      const payload = {
        paper_id: paperForm.paper_id.trim(),
        paper_name: paperForm.paper_name.trim(),
        course_name: paperForm.course_name.trim(),
        semester: paperForm.semester.trim(),
        year: paperForm.year.trim(),
        google_drive_link: paperForm.google_drive_link.trim(),
      };

      if (!payload.paper_id || !payload.paper_name || !payload.course_name || !payload.semester || !payload.year || !payload.google_drive_link) {
        throw new Error('Please fill all paper fields before saving.');
      }

      const response = await api.createPaper(payload);
      if (response.paper) {
        setPapers((prev) => [response.paper, ...prev]);
      }

      if (saveAndContinue) {
        setPaperForm(initialPaperForm);
        setFormMessage({ type: 'success', text: 'Paper saved. You can add another paper.' });
      } else {
        setPaperForm(initialPaperForm);
        setActiveTab('papers');
        setFormMessage({ type: 'success', text: 'Paper saved successfully.' });
      }
    } catch (error) {
      setFormMessage({ type: 'error', text: error.message || 'Unable to save paper.' });
    } finally {
      setPaperSaving(false);
    }
  };

  const handleCancelPaper = () => {
    setPaperForm(initialPaperForm);
    setFormMessage({ type: '', text: '' });
    setActiveTab('papers');
  };

  const handlePasswordReset = async (targetUser) => {
    const newPassword = window.prompt(`Enter new password for ${targetUser.email}:`, '');
    if (!newPassword || newPassword.trim().length < 6) {
      if (newPassword !== null) {
        window.alert('Password must be at least 6 characters long.');
      }
      return;
    }

    try {
      await api.resetUserPassword(targetUser.id, newPassword.trim());
      setFormMessage({ type: 'success', text: `Password reset for ${targetUser.email} was successful.` });
      setActiveTab('users');
    } catch (error) {
      setFormMessage({ type: 'error', text: error.message || 'Password reset failed.' });
    }
  };

  if (loading || loadingData) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <i className="fas fa-shield-alt"></i>
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            <i className="fas fa-chart-pie"></i> Dashboard
          </button>
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            <i className="fas fa-users"></i> Users
          </button>
          <button className={activeTab === 'papers' ? 'active' : ''} onClick={() => setActiveTab('papers')}>
            <i className="fas fa-file-pdf"></i> Papers
          </button>
          <button className={activeTab === 'logs' ? 'active' : ''} onClick={() => setActiveTab('logs')}>
            <i className="fas fa-history"></i> User Logs
          </button>
        </nav>
        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-topbar">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="admin-user-info">
            <i className="fas fa-user-circle"></i>
            <span>{user?.email}</span>
          </div>
        </div>

        <div className="admin-content">
          {formMessage.text && (
            <div className={`alert ${formMessage.type === 'error' ? 'alert-error' : 'alert-success'}`}>
              {formMessage.text}
            </div>
          )}

          {activeTab === 'dashboard' && (
            <>
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="admin-stat-icon users"><i className="fas fa-users"></i></div>
                  <div className="admin-stat-info"><h3>{stats.totalUsers}</h3><p>Total Users</p></div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-icon papers"><i className="fas fa-file-pdf"></i></div>
                  <div className="admin-stat-info"><h3>{stats.totalPapers}</h3><p>Total Papers</p></div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-icon downloads"><i className="fas fa-download"></i></div>
                  <div className="admin-stat-info"><h3>{stats.totalDownloads}</h3><p>Recent Downloads</p></div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-icon active"><i className="fas fa-user-check"></i></div>
                  <div className="admin-stat-info"><h3>{users.filter((u) => u.active !== false).length}</h3><p>Active Users</p></div>
                </div>
              </div>

              <div className="admin-section">
                <h2>Recent Downloads</h2>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead><tr><th>User</th><th>Paper</th><th>Date</th></tr></thead>
                    <tbody>
                      {stats.recentDownloads.length > 0 ? stats.recentDownloads.map((d, i) => (
                        <tr key={i}>
                          <td>{d.user_email || 'Unknown'}</td>
                          <td>{d.paper_name}</td>
                          <td>{new Date(d.created_at).toLocaleDateString()}</td>
                        </tr>
                      )) : <tr><td colSpan="3" className="text-center">No recent downloads</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div className="admin-section">
              <h2>All Users ({users.length})</h2>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Action</th></tr></thead>
                  <tbody>
                    {users.length > 0 ? users.map((u) => (
                      <tr key={u.id}>
                        <td>{u.name || 'N/A'}</td>
                        <td>{u.email}</td>
                        <td><span className={`badge-role ${u.role || 'user'}`}>{u.role || 'user'}</span></td>
                        <td>{u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}</td>
                        <td>
                          <button className="admin-action-btn" onClick={() => handlePasswordReset(u)}>
                            Reset Password
                          </button>
                        </td>
                      </tr>
                    )) : <tr><td colSpan="5" className="text-center">No users found</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'papers' && (
            <div className="admin-section admin-paper-layout">
              <div className="admin-paper-form-panel">
                <h2>Add New Paper</h2>
                <div className="admin-form-grid">
                  <label>
                    Paper ID
                    <input name="paper_id" value={paperForm.paper_id} onChange={handlePaperChange} placeholder="P-101" />
                  </label>
                  <label>
                    Paper Name
                    <input name="paper_name" value={paperForm.paper_name} onChange={handlePaperChange} placeholder="Database Management" />
                  </label>
                  <label>
                    Course Name
                    <select name="course_name" value={paperForm.course_name} onChange={handlePaperChange}>
                      <option value="">Select IGU course</option>
                      {iguCourseOptions.map((course) => (
                        <option key={course.value} value={course.value}>{course.label}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Semester
                    <select name="semester" value={paperForm.semester} onChange={handlePaperChange}>
                      <option value="">Select semester</option>
                      {semesterOptions.map((semester) => (
                        <option key={semester} value={semester}>{semester} Semester</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Paper Year
                    <input name="year" value={paperForm.year} onChange={handlePaperChange} placeholder="2025" inputMode="numeric" maxLength="4" />
                  </label>
                  <label className="full-width">
                    Google Drive Link
                    <input name="google_drive_link" value={paperForm.google_drive_link} onChange={handlePaperChange} placeholder="https://drive.google.com/..." />
                  </label>
                </div>

                <div className="admin-form-actions">
                  <button className="admin-primary-btn" onClick={() => handlePaperSubmit(false)} disabled={paperSaving}>
                    {paperSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button className="admin-secondary-btn" onClick={() => handlePaperSubmit(true)} disabled={paperSaving}>
                    Save & Continue
                  </button>
                  <button className="admin-cancel-btn" onClick={handleCancelPaper} disabled={paperSaving}>
                    Cancel
                  </button>
                </div>
              </div>

              <div className="admin-paper-list-panel">
                <h2>All Papers ({papers.length})</h2>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead><tr><th>Paper ID</th><th>Name</th><th>Course</th><th>Semester</th><th>Year</th></tr></thead>
                    <tbody>
                      {papers.length > 0 ? papers.map((p) => (
                        <tr key={p.id || p.paper_id}>
                          <td>{p.paper_id}</td>
                          <td>{p.paper_name}</td>
                          <td>{p.course_name || p.course}</td>
                          <td>{p.semester}</td>
                          <td>{p.year || 'N/A'}</td>
                        </tr>
                      )) : <tr><td colSpan="5" className="text-center">No papers found</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="admin-section">
              <h2>User Activity Logs</h2>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead><tr><th>User</th><th>Email</th><th>Action</th><th>Details</th><th>Time</th></tr></thead>
                  <tbody>
                    {logs.length > 0 ? logs.map((log) => (
                      <tr key={log.id || `${log.user_id}-${log.created_at}`}>
                        <td>{log.name || 'Unknown'}</td>
                        <td>{log.user_email || 'N/A'}</td>
                        <td><span className="badge-role admin">{log.action || 'activity'}</span></td>
                        <td>{getLogSummary(log)}</td>
                        <td>{log.created_at ? new Date(log.created_at).toLocaleString() : 'N/A'}</td>
                      </tr>
                    )) : <tr><td colSpan="5" className="text-center">No logs found</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;