import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import university logos from assets folder
import iguLogo from '../assets/universities/igu.png';
import duLogo from '../assets/universities/du.png';
import puLogo from '../assets/universities/pu.png';
import jmiLogo from '../assets/universities/jmi.png';
import amuLogo from '../assets/universities/amu.png';
import bhuLogo from '../assets/universities/bhu.png';
import mumbaiLogo from '../assets/universities/mumbai.png';
import calcuttaLogo from '../assets/universities/calcutta.png';
import annaLogo from '../assets/universities/anna.png';
import osmaniaLogo from '../assets/universities/osmania.png';
import puneLogo from '../assets/universities/pune.png';
import gujaratLogo from '../assets/universities/gujarat.png';
import rajasthanLogo from '../assets/universities/rajasthan.png';
import kurukshetraLogo from '../assets/universities/kurukshetra.png';
import mduLogo from '../assets/universities/mdu.png';
import ignouLogo from '../assets/universities/ignou.png';
import bangaloreLogo from '../assets/universities/bangalore.png';

function Universities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const universities = [
    {
      name: 'Indira Gandhi University (IGU)',
      location: 'Rewari, Haryana',
      logo: iguLogo,
      fallbackIcon: '🏛️',
      page: '/igu',
      available: true,
    },
    {
      name: 'University of Delhi (DU)',
      location: 'Delhi',
      logo: duLogo,
      fallbackIcon: '📚',
      page: '/du',
      available: false,
    },
    {
      name: 'Punjab University (PU)',
      location: 'Chandigarh',
      logo: puLogo,
      fallbackIcon: '🎓',
      page: '/pu',
      available: false,
    },
    {
      name: 'Jamia Millia Islamia (JMI)',
      location: 'Delhi',
      logo: jmiLogo,
      fallbackIcon: '🏫',
      page: '/jmi',
      available: false,
    },
    {
      name: 'Aligarh Muslim University (AMU)',
      location: 'Aligarh, UP',
      logo: amuLogo,
      fallbackIcon: '🌙',
      page: '/amu',
      available: false,
    },
    {
      name: 'Banaras Hindu University (BHU)',
      location: 'Varanasi, UP',
      logo: bhuLogo,
      fallbackIcon: '🕉️',
      page: '/bhu',
      available: false,
    },
    {
      name: 'University of Mumbai',
      location: 'Mumbai, MH',
      logo: mumbaiLogo,
      fallbackIcon: '🏝️',
      page: '/mumbai',
      available: false,
    },
    {
      name: 'Calcutta University (CU)',
      location: 'Kolkata, WB',
      logo: calcuttaLogo,
      fallbackIcon: '🎭',
      page: '/calcutta',
      available: false,
    },
    {
      name: 'Anna University',
      location: 'Chennai, TN',
      logo: annaLogo,
      fallbackIcon: '⚙️',
      page: '/anna',
      available: false,
    },
    {
      name: 'Osmania University',
      location: 'Hyderabad, TS',
      logo: osmaniaLogo,
      fallbackIcon: '🌆',
      page: '/osmania',
      available: false,
    },
    {
      name: 'Savitribai Phule Pune University',
      location: 'Pune, MH',
      logo: puneLogo,
      fallbackIcon: '📖',
      page: '/pune',
      available: false,
    },
    {
      name: 'Gujarat University',
      location: 'Ahmedabad, GJ',
      logo: gujaratLogo,
      fallbackIcon: '🦁',
      page: '/gujarat',
      available: false,
    },
    {
      name: 'Rajasthan University (RU)',
      location: 'Jaipur, RJ',
      logo: rajasthanLogo,
      fallbackIcon: '🏜️',
      page: '/rajasthan',
      available: false,
    },
    {
      name: 'Kurukshetra University',
      location: 'Kurukshetra, HR',
      logo: kurukshetraLogo,
      fallbackIcon: '⚔️',
      page: '/kurukshetra',
      available: false,
    },
    {
      name: 'Maharshi Dayanand University (MDU)',
      location: 'Rohtak, HR',
      logo: mduLogo,
      fallbackIcon: '🧘',
      page: '/mdu',
      available: false,
    },
    {
      name: 'IGNOU',
      location: 'Delhi (Distance)',
      logo: ignouLogo,
      fallbackIcon: '📡',
      page: '/ignou',
      available: false,
    },
    {
      name: 'Bangalore University',
      location: 'Bengaluru, KA',
      logo: bangaloreLogo,
      fallbackIcon: '🌳',
      page: '/bangalore',
      available: false,
    },
  ];

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const filtered = searchTerm.trim()
    ? universities.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
          u.location.toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
    : universities;

  return (
    <div className="universities-page">
      <div className="content-section">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="hero-title">🏛️ All Universities</h1>
          <p className="hero-subtitle">
            Select your university to access semester-wise PYQs. Search below to
            filter.
          </p>
        </div>

        {/* Search Wrapper */}
        <div className="search-wrapper">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search university (e.g., IGU, DU, Punjab, ...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
          <button>
            <i className="fas fa-filter"></i> Filter
          </button>
        </div>

        {/* Universities Grid */}
        {filtered.length === 0 ? (
          <div className="no-result">
            <i className="fas fa-frown-open mr-2"></i> No university matches "
            {searchTerm}"
          </div>
        ) : (
          <div className="universities-grid">
            {filtered.map((uni, index) => {
              const CardWrapper = uni.available ? Link : 'div';
              const cardProps = uni.available
                ? { to: uni.page }
                : {
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      showToast(`📚 ${uni.name} - PYQs coming soon! Stay tuned.`);
                    },
                  };

              return (
                <CardWrapper
                  key={index}
                  className={`uni-card ${uni.available ? 'clickable' : 'disabled'}`}
                  {...cardProps}
                >
                  {/* Logo with fallback */}
                  <div className="uni-logo-wrapper">
                    <img
                      src={uni.logo}
                      alt={`${uni.name} logo`}
                      className="uni-logo-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                    <span
                      className="uni-logo-fallback"
                      style={{ display: 'none' }}
                    >
                      {uni.fallbackIcon}
                    </span>
                  </div>

                  <div className="uni-info">
                    <div className="uni-name">
                      {uni.name}
                      {!uni.available && (
                        <span style={{ fontSize: '0.8rem' }}> 🔜</span>
                      )}
                    </div>
                    <div className="uni-location">
                      <i className="fas fa-map-pin mr-1"></i> {uni.location}
                    </div>
                  </div>

                  <span
                    className={`uni-badge ${!uni.available ? 'coming-soon' : ''}`}
                  >
                    {uni.available ? 'PYQs Available' : 'Coming Soon'}
                  </span>
                </CardWrapper>
              );
            })}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <div className={`toast-notification ${toast.show ? 'show' : ''}`}>
        <i className="fas fa-hourglass-half"></i>
        <span>
          {toast.message || 'Coming Soon! PYQs will be available shortly.'}
        </span>
      </div>
    </div>
  );
}

export default Universities;