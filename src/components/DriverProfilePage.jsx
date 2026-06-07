import React from 'react';

export default function DriverProfilePage({ driver }) {
  const handleBackToDrivers = () => {
    window.location.href = '/#drivers';
  };

  // Pre-fill WhatsApp message for booking this specific driver
  const whatsappUrl = `https://api.whatsapp.com/send?phone=918105218893&text=${encodeURIComponent(
    `Hi Sri Ganesh Travels! I'd like to book a ride and prefer driver ${driver.name} (${driver.nicknameTag.match(/'([^']+)'/)?.[1] || driver.name}).`
  )}`;

  return (
    <div className="driver-profile-page-wrapper">
      {/* 1. Header Bar */}
      <header className="profile-header">
        <div className="profile-header-container">
          <div className="profile-logo-brand" onClick={handleBackToDrivers} style={{ cursor: 'pointer' }}>
            <img src="/ganesha_logo.png" alt="Sri Ganesh Travels Logo" className="profile-logo-img" />
            <div className="profile-brand-text">
              <span className="profile-brand-title">Sri Ganesh Travels</span>
              <span className="profile-brand-tagline">Bangalore</span>
            </div>
          </div>
          <button className="btn-secondary profile-back-btn" onClick={handleBackToDrivers}>
            <i className="fa-solid fa-arrow-left"></i> Back to Drivers
          </button>
        </div>
      </header>

      {/* 2. Main Profile Content */}
      <main className="profile-main-content">
        <div className="profile-container">
          
          <div className="profile-grid">
            
            {/* Left Column: Photo & Direct booking CTA */}
            <div className="profile-left-col">
              <div className="profile-photo-card">
                <div className="profile-photo-frame">
                  {driver.photo ? (
                    <img src={driver.photo} alt={driver.name} className="profile-driver-img" />
                  ) : (
                    <div className="profile-avatar-placeholder">
                      <i className="fa-solid fa-user-tie"></i>
                    </div>
                  )}
                  <span className={`profile-badge-category ${
                    driver.travelerFit.toLowerCase().includes('family') ? 'family' : 
                    driver.travelerFit.toLowerCase().includes('group') || driver.travelerFit.toLowerCase().includes('adventure') ? 'youth' : 'all-rounder'
                  }`}>
                    {driver.travelerFit}
                  </span>
                </div>

                <div className="profile-quick-rating">
                  <div className="profile-stars-wrap">
                    {Array.from({ length: Math.floor(driver.rating) }).map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-gold"></i>
                    ))}
                    {driver.rating % 1 !== 0 && <i className="fa-solid fa-star-half-stroke text-gold"></i>}
                  </div>
                  <span className="profile-rating-num"><strong>{driver.rating}</strong> / 5.0 Rating</span>
                </div>

                <div className="profile-divider"></div>

                <div className="profile-award-badge">
                  <i className="fa-solid fa-shield-heart text-gold"></i>
                  <span>{driver.safetyRating}</span>
                </div>
              </div>

              {/* Book Chauffeur Button */}
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary profile-book-btn">
                <i className="fa-brands fa-whatsapp"></i> Book This Driver
              </a>
            </div>

            {/* Right Column: Name, Tagline, Details */}
            <div className="profile-right-col">
              <div className="profile-identity-section">
                <h1 className="profile-name-heading">{driver.name}</h1>
                
                {driver.nicknameTag && (
                  <div className="profile-nickname-tagline">
                    <i className="fa-solid fa-heart animate-heart"></i>
                    <span className="profile-nickname-text">{driver.nicknameTag}</span>
                  </div>
                )}
              </div>

              <div className="profile-details-section">
                <h2 className="profile-section-title">Professional Profile</h2>
                <p className="profile-about-text">{driver.aboutMe}</p>

                {/* Grid of Key Metrics */}
                <div className="profile-metrics-grid">
                  <div className="profile-metric-card">
                    <span className="pm-label">Driving Experience</span>
                    <span className="pm-value">{driver.experience}</span>
                  </div>
                  <div className="profile-metric-card">
                    <span className="pm-label">KMs Safely Driven</span>
                    <span className="pm-value">{driver.kmsDriven}</span>
                  </div>
                  <div className="profile-metric-card">
                    <span className="pm-label">Accident Record</span>
                    <span className="pm-value safety-green">{driver.accidentHistory}</span>
                  </div>
                  <div className="profile-metric-card">
                    <span className="pm-label">Primary Vehicle Class</span>
                    <span className="pm-value">{driver.vehicle}</span>
                  </div>
                </div>

                {/* Custom Details Block */}
                <div className="profile-attributes-list">
                  <div className="profile-attr-item">
                    <i className="fa-solid fa-award text-gold"></i>
                    <div className="profile-attr-content">
                      <strong>Driving Style & Philosophy:</strong>
                      <p>{driver.drivingStyle}</p>
                    </div>
                  </div>

                  <div className="profile-attr-item">
                    <i className="fa-solid fa-route text-gold"></i>
                    <div className="profile-attr-content">
                      <strong>Specialty Routes & Regions:</strong>
                      <p>{driver.routesKnown}</p>
                    </div>
                  </div>

                  <div className="profile-attr-item">
                    <i className="fa-solid fa-language text-gold"></i>
                    <div className="profile-attr-content">
                      <strong>Languages Spoken:</strong>
                      <div className="profile-lang-pills">
                        {driver.languages.split(', ').map((lang, idx) => (
                          <span key={idx} className="lang-pill">{lang}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* 3. Testimonials Section */}
          <div className="profile-testimonials-section">
            <h2 className="profile-section-title centered">What Passengers Say About Him</h2>
            <div className="profile-reviews-grid">
              {driver.reviews.map((rev, idx) => (
                <div key={idx} className="profile-review-card">
                  <div className="pr-stars">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <p className="pr-text">"{rev.text}"</p>
                  <div className="pr-author">
                    <div className="pr-avatar">{rev.name.charAt(0)}</div>
                    <div>
                      <span className="pr-name">{rev.name}</span>
                      <span className="pr-verified"><i className="fa-solid fa-circle-check"></i> Verified Rider</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* 4. Footer */}
      <footer className="profile-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Sri Ganesh Travels. All Chauffeurs are safety verified and commercially licensed.</p>
        </div>
      </footer>
    </div>
  );
}
