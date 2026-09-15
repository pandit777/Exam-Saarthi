import React, { useState, useEffect } from 'react';
import { universitiesList as universitiesData } from '../data/universities';
import { supabase } from '../utils/supabase';

function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showQuickContact, setShowQuickContact] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    course: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Universities dropdown options
  const universityOptions = [
    ...universitiesData.map((uni) => ({
      value: uni.fullName,
      label: `${uni.fallbackIcon} ${uni.fullName}`,
    })),
    { value: 'Other University', label: '🎓 Other University' },
  ];

  // Show quick contact on mobile
  useEffect(() => {
    const handleResize = () => {
      setShowQuickContact(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (showForm || showSuccess) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showForm, showSuccess]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  // ✅ SUBMIT TO SUPABASE (No .select())
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, university, message } = formData;

    // Validation
    if (!name || !email || !university || !message) {
      showError('Please fill all required fields');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Please enter a valid email address');
      return;
    }

    setSubmitting(true);

    try {
      // ✅ Insert into Supabase — NO .select()
      const { error: dbError } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            university: formData.university,
            course: formData.course.trim() || null,
            message: formData.message.trim(),
            status: 'new',
          },
        ]);

      if (dbError) {
        console.error('Supabase error:', dbError);
        throw new Error(dbError.message || 'Failed to save message');
      }

      console.log('✅ Contact saved successfully');

      // Success
      setShowForm(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        university: '',
        course: '',
        message: '',
      });
      setError('');
    } catch (err) {
      console.error('Error submitting form:', err);
      showError(
        err.message || 'Failed to send message. Please try again later.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleContinue = () => {
    setShowSuccess(false);
  };

  return (
    <div className="contact-page">
      {/* Query Button Section */}
      <div className="contact-card">
        <h1 className="section-title">📬 Contact Exam Saarthi</h1>
        <p className="description-text">
          Have questions, feedback, or suggestions? Click the button below to reach
          out to the
          <br />
          <strong style={{ color: 'var(--accent-bright-yellow)' }}>
            Exam Saarthi
          </strong>{' '}
          team. We'll get back to you as soon as possible.
        </p>
        <div style={{ textAlign: 'center' }}>
          <button className="query-btn" onClick={() => setShowForm(true)}>
            <i className="fas fa-question-circle"></i> Submit Your Query
          </button>
        </div>
        <div className="help-text">
          <p>
            Need help with PYQs? Tell us which university and course you need help
            with
          </p>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="contact-card">
        <h2 className="section-title">📍 Get in Touch</h2>
        <p className="description-text">
          Exam Saarthi is your one-stop solution for all university previous year
          question papers (PYQs).
          <br />
          We provide comprehensive PYQs for multiple universities to help students
          excel in their exams.
        </p>

        <div className="contact-info-wrapper">
          <div className="contact-item">
            <p>
              <i className="fas fa-envelope"></i> Official Email
            </p>
            <a href="mailto:igupyq@gmail.com" className="contact-link">
              <i className="fas fa-envelope"></i> igupyq@gmail.com
            </a>
          </div>
          <div className="contact-item">
            <p>
              <i className="fas fa-headset"></i> Support Email
            </p>
            <a href="mailto:igupyq.support@gmail.com" className="contact-link">
              <i className="fas fa-headset"></i> igupyq.support@gmail.com
            </a>
          </div>
        </div>

        <div className="social-links">
          <a href="mailto:igupyq@gmail.com" className="social-link" title="Email">
            <i className="fas fa-envelope"></i>
          </a>
          <a
            href="mailto:igupyq.support@gmail.com"
            className="social-link"
            title="Support"
          >
            <i className="fas fa-headset"></i>
          </a>
        </div>
      </div>

      {/* Quick Contact Section for Mobile */}
      {showQuickContact && (
        <div className="contact-card" id="quickContactMobile">
          <h2 className="section-title">📱 Quick Contact</h2>
          <div className="quick-contact-grid">
            <a
              href="mailto:igupyq@gmail.com"
              className="contact-link"
              style={{ flexDirection: 'column', padding: '0.8rem' }}
            >
              <i className="fas fa-envelope fa-2x"></i>
              <span>Email</span>
            </a>
            <a
              href="mailto:igupyq.support@gmail.com"
              className="contact-link"
              style={{ flexDirection: 'column', padding: '0.8rem' }}
            >
              <i className="fas fa-headset fa-2x"></i>
              <span>Support</span>
            </a>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="form-overlay" onClick={() => setShowForm(false)}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowForm(false)}>
              <i className="fas fa-times"></i>
            </button>
            <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
              📝 Contact Form
            </h2>
            <p className="description-text">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            {error && (
              <div className="error-message" style={{ display: 'flex' }}>
                <i className="fas fa-exclamation-circle"></i> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  Full Name <span className="required-field">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label>
                  Email Address <span className="required-field">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label>
                  University <span className="required-field">*</span>
                </label>
                <select
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                >
                  <option value="" disabled>
                    Select your university
                  </option>
                  {universityOptions.map((uni, idx) => (
                    <option key={idx} value={uni.value}>
                      {uni.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Course/Subject</label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="e.g., B.Tech CSE, B.Com, M.A. English"
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label>
                  Your Message <span className="required-field">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Please describe your query in detail..."
                  required
                  disabled={submitting}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="success-modal" style={{ display: 'flex' }}>
          <div className="success-content">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2
              style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                marginBottom: '0.5rem',
              }}
            >
              Message Sent!
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Thank you for contacting Exam Saarthi. We'll get back to you soon.
            </p>
            <button className="continue-btn" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;