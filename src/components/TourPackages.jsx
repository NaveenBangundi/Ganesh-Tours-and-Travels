import React, { useState } from 'react';
import { TOUR_PACKAGES } from '../data/mockData';

export default function TourPackages() {
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'karnataka', 'interstate'

  const filteredPackages = TOUR_PACKAGES.filter(pkg => {
    if (activeCategory === 'all') return true;
    return pkg.category === activeCategory;
  });

  const handleInquireClick = (pkg) => {
    const message = `Hi Sri Ganesh Travels! I'm interested in booking the *${pkg.title}* tour package (${pkg.duration}). Please let me know the availability, final pricing, and detailed itinerary. Thanks!`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918105218893&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="packages" className="section-padding">
      <div className="container">
        
        <div className="section-title-wrapper">
          <p className="section-subtitle">Curated Trips</p>
          <h2 className="section-title">Popular Tour Packages</h2>
          <div className="section-title-divider"></div>
        </div>

        {/* Category Filter Tabs */}
        <div className="tour-category-tabs">
          <button
            className={`tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Packages
          </button>
          <button
            className={`tab-btn ${activeCategory === 'karnataka' ? 'active' : ''}`}
            onClick={() => setActiveCategory('karnataka')}
          >
            Karnataka Tours
          </button>
          <button
            className={`tab-btn ${activeCategory === 'interstate' ? 'active' : ''}`}
            onClick={() => setActiveCategory('interstate')}
          >
            Interstate Tours (Kerala/TN)
          </button>
        </div>

        {/* Packages Grid */}
        <div className="tour-grid">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="tour-card">
              
              {/* Header */}
              <div className="tour-card-header">
                <span className="tour-card-duration-badge">{pkg.duration}</span>
                <p className="tour-card-subtitle">
                  {pkg.category === 'karnataka' ? 'Intrastate' : 'Interstate Tour'}
                </p>
                <h3 className="tour-card-title">{pkg.title}</h3>
                <p className="tour-card-tagline">"{pkg.tagline}"</p>
              </div>

              {/* Body */}
              <div className="tour-card-body">
                <p className="tour-section-title">Places Covered:</p>
                <ul className="tour-places-list">
                  {pkg.placesCovered.map((place, index) => (
                    <li key={index}>
                      <i className="fa-solid fa-map-pin"></i> {place}
                    </li>
                  ))}
                </ul>

                {/* Inclusions & Exclusions */}
                <div className="tour-inclusions-exclusions">
                  <div>
                    <p className="tour-section-title" style={{ fontSize: '0.7rem' }}>Included:</p>
                    <ul className="tour-fineprint-list inc">
                      {pkg.inclusions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="tour-section-title" style={{ fontSize: '0.7rem' }}>Excluded:</p>
                    <ul className="tour-fineprint-list exc">
                      {pkg.exclusions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer block inside card */}
                <div className="tour-card-footer">
                  <div className="tour-price-box">
                    <span className="tour-price-label">Starting From</span>
                    <span className="tour-price-val">
                      ₹{pkg.startingPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="tour-price-unit">*Excluding state taxes</span>
                  </div>
                  <button 
                    onClick={() => handleInquireClick(pkg)} 
                    className="btn-sm-whatsapp"
                  >
                    <i className="fa-brands fa-whatsapp"></i> Inquire
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
