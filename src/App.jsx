import React, { useState, useEffect } from 'react';
import VehicleAlbum from './components/VehicleAlbum';
import FareCalculator from './components/FareCalculator';
import TourPackages from './components/TourPackages';
import BookingForm from './components/BookingForm';
import PartnerSection from './components/PartnerSection';
import DriverProfilePage from './components/DriverProfilePage';

import { 
  SERVICES, 
  TESTIMONIALS, 
  VEHICLE_SPECS_ERTIGA,
  FARE_CALCULATOR_DEFAULT,
  DRIVER_PARTNERS
} from './data/mockData';

export default function App() {
  const [estimate, setEstimate] = useState(null);
  const [selectedVehicleName, setSelectedVehicleName] = useState('');
  const [activeErtigaTab, setActiveErtigaTab] = useState('front');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Handle hash scrolling on initial page load (e.g. /#drivers)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 180);
      return () => clearTimeout(timer);
    }
  }, []);

  // Check if a driver parameter is in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const driverId = urlParams.get('driver');

  if (driverId) {
    const selectedDriver = DRIVER_PARTNERS.find(d => d.id === driverId);
    if (selectedDriver) {
      return <DriverProfilePage driver={selectedDriver} />;
    }
  }

  // Handle Ertiga Gallery Tab Details
  const getErtigaTabDetail = (tab) => {
    switch (tab) {
      case 'front':
        return {
          icon: 'fa-car',
          caption: 'Front Look',
          title: 'Maruti Suzuki Ertiga VXI S-CNG',
          image: '/Ertiga Front.png',
          desc: 'Imposing front chrome grille with sleek halogen projector headlamps, decorated with traditional marigold garlands for auspicious tours.'
        };
      case 'rear':
        return {
          icon: 'fa-truck-pickup',
          caption: 'Rear Look',
          title: 'Premium Styling & Safety',
          image: '/Ertiga Rear.png',
          desc: 'Equipped with LED tail lamps, reverse parking sensors, and chrome highlights to ensure absolute road safety and aesthetics.'
        };
      case 'interior':
        return {
          icon: 'fa-circle-dot',
          caption: 'Premium Interior',
          title: 'Comfortable Cabin Experience',
          image: '/Ertiga Interior.png',
          desc: 'Premium dashboard finish, wooden panel accents, steering mounted controls, and a high-end music system with Bluetooth integration.'
        };
      case 'seating':
        return {
          icon: 'fa-users',
          caption: 'Spacious 7 Seater',
          title: 'Flexible Seating Layout',
          image: '/Ertiga Interior 2.png',
          desc: 'Plush fabric upholstery, individual reclining rows, and roof-mounted dual AC vents to keep all 7 passengers comfortable and cool.'
        };
      case 'boot':
        return {
          icon: 'fa-suitcase',
          caption: 'Ample Boot Space',
          title: 'Roof Carrier + Trunk',
          image: '/Ertiga Boot.png',
          desc: 'Accommodates multiple airport suitcases. Need more room? Our high-grade luggage roof carrier handles extra bags with ease.'
        };
      default:
        return {};
    }
  };

  const currentErtigaDetail = getErtigaTabDetail(activeErtigaTab);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const handleBookingSuccess = () => {
    showToast('Redirecting you to WhatsApp with your booking details...');
  };

  const handlePartnerSuccess = () => {
    showToast('Opening WhatsApp to send your partner registration...');
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-msg-success">
          <i className="fa-solid fa-circle-check" style={{ color: '#25D366', fontSize: '1.2rem' }}></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating WhatsApp Chat */}
      <a 
        href="https://api.whatsapp.com/send?phone=918105218893&text=Hi%20Sri%20Ganesh%20Travels!%20I'd%20like%20to%20enquire%20about%20your%20cab%20services." 
        target="_blank" 
        rel="noreferrer"
        className="whatsapp-float"
        title="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* Header & Sticky Navigation */}
      <header className="navbar-header">
        <div className="nav-container">
          
          <a href="#home" className="nav-logo-wrapper">
            <img src="/ganesha_logo.png" alt="Sri Ganesh Travels Logo" className="nav-logo-img" />
            <div className="nav-brand">
              <span className="nav-brand-title">Sri Ganesh Travels</span>
              <span className="nav-brand-tagline">Bangalore</span>
            </div>
          </a>

          {/* Right Group (Links + CTA Button) */}
          <div className="nav-right-group">
            <nav>
              <ul className="nav-links">
                <li className="nav-link-item"><a href="#home">Home</a></li>
                <li className="nav-link-item"><a href="#about">About</a></li>
                <li className="nav-link-item"><a href="#fleet">Fleet</a></li>
                <li className="nav-link-item"><a href="#owner">Owner</a></li>
                <li className="nav-link-item"><a href="#drivers">Drivers</a></li>
                <li className="nav-link-item"><a href="#packages">Tours</a></li>
                <li className="nav-link-item"><a href="#services">Services</a></li>
                <li className="nav-link-item"><a href="#calculator">Calculator</a></li>
                <li className="nav-link-item"><a href="#partner">Join Fleet</a></li>
                <li className="nav-link-item"><a href="#contact">Contact</a></li>
              </ul>
            </nav>

            {/* WhatsApp Call to Action */}
            <a 
              href="https://api.whatsapp.com/send?phone=918105218893&text=Hi%20Sri%20Ganesh%20Travels,%20I'd%20like%20to%20book%20a%20ride." 
              target="_blank" 
              rel="noreferrer"
              className="nav-cta-btn"
            >
              <i className="fa-brands fa-whatsapp"></i> Book Cab
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#fleet" onClick={() => setMobileMenuOpen(false)}>Fleet</a>
            <a href="#owner" onClick={() => setMobileMenuOpen(false)}>Owner Profile</a>
            <a href="#drivers" onClick={() => setMobileMenuOpen(false)}>Driver Partners</a>
            <a href="#packages" onClick={() => setMobileMenuOpen(false)}>Tours</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)}>Calculator</a>
            <a href="#partner" onClick={() => setMobileMenuOpen(false)}>Join Fleet</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        )}
      </header>

      {/* 1. Hero / Home Section */}
      <section id="home" className="hero-wrapper">
        <div className="hero-background-art"></div>
        <div className="container">
          <div className="hero-grid">
            
            {/* Hero Left Content */}
            <div className="hero-content">
              <div className="hero-ganesha-badge">
                <img src="/ganesha_logo.png" alt="Sri Ganesh Travels Logo" className="hero-badge-logo-img" />
                <span className="hero-badge-text">Sri Ganesh Travels</span>
              </div>
              
              <h1 className="hero-title">
                Travel with Trust.<br />
                <span className="text-gold-gradient">Arrive with Comfort.</span>
              </h1>
              
              <p className="hero-tagline">
                Safe, clean, and reliable commercial cab services in Bangalore. Whether it's airport transfers, family outings, corporate duties, or interstate holidays, we provide premium comfort under expert supervision.
              </p>
              
              <div className="hero-cta-group">
                <a href="#booking" className="btn-primary">
                  Book Ride Now <i className="fa-solid fa-car"></i>
                </a>
                <a 
                  href="https://api.whatsapp.com/send?phone=918105218893&text=Hi%20Sri%20Ganesh%20Travels!%20I'd%20like%20to%20enquire%20about%20a%20trip."
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  <i className="fa-brands fa-whatsapp" style={{ color: '#25D366', fontSize: '1.2rem' }}></i> WhatsApp Us
                </a>
              </div>

              {/* Flyer Highlights */}
              <div className="hero-highlights">
                <div className="hero-highlight-item">
                  <div className="hero-highlight-icon-box">
                    <i className="fa-solid fa-clock-rotate-left"></i>
                  </div>
                  <span className="hero-highlight-text">24/7 Service</span>
                </div>
                <div className="hero-highlight-item">
                  <div className="hero-highlight-icon-box">
                    <i className="fa-solid fa-plane"></i>
                  </div>
                  <span className="hero-highlight-text">Airport Pick & Drop</span>
                </div>
                <div className="hero-highlight-item">
                  <div className="hero-highlight-icon-box">
                    <i className="fa-solid fa-user-tie"></i>
                  </div>
                  <span className="hero-highlight-text">20+ Years Exp</span>
                </div>
                <div className="hero-highlight-item">
                  <div className="hero-highlight-icon-box">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <span className="hero-highlight-text">Clean & Safe Cars</span>
                </div>
              </div>
            </div>

            {/* Hero Right Media Showcase */}
            <div className="hero-media-showcase">
              <div className="hero-card-glow"></div>
              <div className="hero-image-wrapper">
                <div className="car-vector-fallback">
                  <img
                    src="/Ertiga Front 2.png"
                    alt="Maruti Suzuki Ertiga Flagship KA 05 AN 8381"
                    className="hero-car-image-embed"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. About Us Section */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="about-grid">
            

        {/* Left Column — Premium Visual Stats Panel */}
        <div className="about-visual-panel">
          
          {/* Top: Brand Identity Card */}
          <div className="about-brand-card">
            <div className="about-brand-logo-wrap">
              <img src="/ganesha_logo.png" alt="Sri Ganesh Travels" className="about-brand-logo" />
            </div>
            <div className="about-brand-info">
              <span className="about-brand-name">Sri Ganesh Travels</span>
              <span className="about-brand-tag">Bangalore, Karnataka</span>
            </div>
            <div className="about-verified-badge">
              <i className="fa-solid fa-circle-check"></i>
              <span>Verified</span>
            </div>
          </div>

          {/* Middle: Key Stats Grid */}
          <div className="about-stats-visual-grid">
            <div className="about-stat-visual-card gold">
              <span className="about-sv-num">20+</span>
              <span className="about-sv-label">Years of Driving</span>
              <i className="fa-solid fa-road about-sv-icon"></i>
            </div>
            <div className="about-stat-visual-card dark">
              <span className="about-sv-num">500+</span>
              <span className="about-sv-label">Trips Completed</span>
              <i className="fa-solid fa-flag-checkered about-sv-icon"></i>
            </div>
            <div className="about-stat-visual-card dark">
              <span className="about-sv-num">4</span>
              <span className="about-sv-label">Vehicle Categories</span>
              <i className="fa-solid fa-car-side about-sv-icon"></i>
            </div>
            <div className="about-stat-visual-card accent">
              <span className="about-sv-num">100%</span>
              <span className="about-sv-label">Safety Record</span>
              <i className="fa-solid fa-shield-halved about-sv-icon"></i>
            </div>
          </div>

          {/* Bottom: Flagship Vehicle Plate */}
          <div className="about-flagship-strip">
            <i className="fa-solid fa-car"></i>
            <div className="about-flagship-texts">
              <span className="about-flagship-model">Maruti Suzuki Ertiga VXI (O) S-CNG</span>
              <span className="about-flagship-reg">KA 05 AN 8381 · Pearl White · 7 Seater</span>
            </div>
            <span className="about-flagship-badge">Our Car</span>
          </div>

        </div>


            {/* Right Column Text */}
            <div>
              <p className="section-subtitle">Our Journey</p>
              <h2 className="section-title">About Sri Ganesh Travels</h2>
              <div className="section-title-divider" style={{ margin: '0' }}></div>
              <p className="about-content-desc" style={{ marginTop: '1.5rem' }}>
                Sri Ganesh Travels is a trusted, Bangalore-based boutique travel service owned and personally managed by <strong>Dayanand Bangundi</strong>. 
              </p>
              <p className="about-content-desc">
                With a deep commitment to passenger safety and punctual arrivals, we run a flagship Maruti Suzuki Ertiga S-CNG vehicle. Additionally, we collaborate with a network of experienced local drivers and car owners to fulfill any fleet requirement—from budget hatchbacks to luxury Innovas. We ensure clean cabins, sanitized seating, and professional service for every single journey.
              </p>

              {/* Mini Stats Grid */}
              <div className="about-stats-grid">
                
                <div className="about-stat-card">
                  <div className="about-stat-icon-wrapper">
                    <i className="fa-solid fa-route"></i>
                  </div>
                  <div>
                    <h4 className="about-stat-title">Safe & Reliable</h4>
                    <p className="about-stat-desc">Experienced highway driving and standard speed rules followed.</p>
                  </div>
                </div>

                <div className="about-stat-card">
                  <div className="about-stat-icon-wrapper">
                    <i className="fa-solid fa-shield-heart"></i>
                  </div>
                  <div>
                    <h4 className="about-stat-title">Family Focused</h4>
                    <p className="about-stat-desc">Spacious 7-seater cabs designed with individual AC and music for family comfort.</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2b. Meet the Owner */}
      <section id="owner" className="section-padding" style={{ backgroundColor: 'var(--bg-cream-dark)' }}>
        <div className="container">
          
          <div className="owner-grid">
            
            {/* Left Column: Portrait Placeholders */}
            <div className="owner-media-col">
              <div className="owner-portrait-frame">
                {/* Fallback stylized gold/slate profile block */}
                <div className="owner-avatar-placeholder">
                  <i className="fa-solid fa-user-tie owner-placeholder-icon"></i>
                  <span className="owner-placeholder-tag">Sri Ganesh Travels</span>
                </div>
                <div className="owner-exp-badge">
                  <span className="owner-badge-num">20+</span>
                  <span className="owner-badge-txt">Yrs Experience</span>
                </div>
              </div>
            </div>

            {/* Right Column: Profile bio details */}
            <div className="owner-content-col">
              <p className="section-subtitle" style={{ textAlign: 'left' }}>Chauffeur & Founder</p>
              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 1.5rem' }}>Meet the Owner</h2>
              
              <h3 className="owner-name-title">Mr. Dayanand Bangundi</h3>
              <p className="owner-quote">"Your safety, comfort, and peace of mind are the foundations of Sri Ganesh Travels. Every trip is a personal responsibility."</p>
              
              <div className="owner-bio-paragraphs">
                <p>
                  With more than <strong>20 years of professional highway driving experience</strong> across South India, Mr. Dayanand Bangundi established Sri Ganesh Travels to bring premium standards and hospitality back to local travel.
                </p>
                <p>
                  <strong>What makes him special:</strong> Mr. Dayanand is not just a highly skilled defensive driver with a spotless safety record; he is also a trusted route guide and local historian. He knows all the scenic highway detours, clean rest stops, and best local eateries throughout Karnataka. Families and pilgrim groups choose to travel with him because of his gentle demeanor, absolute punctuality, and unwavering care for children and senior citizens.
                </p>
              </div>

              <div className="owner-qualities-strip">
                <div className="owner-quality-tag">
                  <i className="fa-solid fa-shield-heart"></i> Defensive Driving Specialist
                </div>
                <div className="owner-quality-tag">
                  <i className="fa-solid fa-route"></i> Scenic Karnataka Guide
                </div>
                <div className="owner-quality-tag">
                  <i className="fa-solid fa-clock"></i> 100% Punctual Record
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. Vehicle Album (Network Fleet) */}
      <VehicleAlbum onSelectVehicle={setSelectedVehicleName} />

      {/* Ertiga Spotlight (Specifications and detailed tabs) */}
      <section id="ertiga-spotlight" className="section-padding section-dark">
        <div className="container">
          
          <div className="section-title-wrapper bg-dark">
            <p className="section-subtitle light-text">Our Flagship Car</p>
            <h2 className="section-title light-text">Maruti Suzuki Ertiga Details</h2>
            <div className="section-title-divider"></div>
          </div>

          <div className="ertiga-spotlight-wrapper">
            
            {/* Interactive Image Viewports */}
            <div className="ertiga-tabbed-gallery">
              
              <div className="ertiga-main-image-viewport">
                <div className="ertiga-image-container">
                  <img
                    key={currentErtigaDetail.image}
                    src={currentErtigaDetail.image}
                    alt={currentErtigaDetail.title}
                    className="ertiga-viewport-img"
                    style={{
                      objectFit: (currentErtigaDetail.caption.toLowerCase().includes('interior') || 
                                  currentErtigaDetail.caption.toLowerCase().includes('seating'))
                                    ? 'cover' 
                                    : 'contain',
                      borderRadius: '10px'
                    }}
                  />
                  <div className="ertiga-viewport-badge">
                    <i className={`fa-solid ${currentErtigaDetail.icon}`}></i>
                    <span>{currentErtigaDetail.caption}</span>
                  </div>
                </div>
              </div>

              <div className="ertiga-viewport-info-panel">
                <h4 className="ertiga-info-title">{currentErtigaDetail.title}</h4>
                <p className="ertiga-info-desc">{currentErtigaDetail.desc}</p>
              </div>

              {/* Gallery Control Tabs */}
              <div className="ertiga-gallery-tabs">
                {['front', 'rear', 'interior', 'seating', 'boot'].map((tab) => (
                  <button
                    key={tab}
                    className={`ertiga-gallery-tab-btn ${activeErtigaTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveErtigaTab(tab)}
                  >
                    {tab === 'boot' ? 'Boot Space' : tab === 'seating' ? '7 Seater' : tab}
                  </button>
                ))}
              </div>

            </div>

            {/* Specifications Details */}
            <div className="ertiga-spec-card">
              <div className="ertiga-spec-header">
                <p className="ertiga-spec-owner">Owned & Maintained By</p>
                <h3 className="ertiga-spec-title">{VEHICLE_SPECS_ERTIGA.owner}</h3>
                <span className="ertiga-spec-reg">Registration No: {VEHICLE_SPECS_ERTIGA.registration} ({VEHICLE_SPECS_ERTIGA.model})</span>
              </div>

              <div className="ertiga-bullet-list">
                {VEHICLE_SPECS_ERTIGA.features.map((feature, idx) => (
                  <div key={idx} className="ertiga-bullet-item">
                    <span className="ertiga-bullet-bullet">♦</span>
                    <div>
                      <span className="ertiga-bullet-label">{feature.label}: </span>
                      <span className="ertiga-bullet-desc">{feature.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--primary-gold-light)' }}>
                  <i className="fa-solid fa-circle-check"></i> Dual AC vents
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--primary-gold-light)' }}>
                  <i className="fa-solid fa-circle-check"></i> AUX/USB Music System
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--primary-gold-light)' }}>
                  <i className="fa-solid fa-circle-check"></i> Airport Carrier
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3b. Driver cum Partners Section */}
      <section id="drivers" className="section-padding section-dark">
        <div className="container">
          
          <div className="section-title-wrapper bg-dark">
            <p className="section-subtitle light-text">Our Chauffeurs</p>
            <h2 className="section-title light-text">Driver cum Partners</h2>
            <div className="section-title-divider"></div>
          </div>

          <div className="drivers-grid">
            {DRIVER_PARTNERS.map((driver, idx) => (
              <div 
                key={idx} 
                className="driver-card"
                onClick={() => window.open(`?driver=${driver.id}`, '_blank')}
                style={{ cursor: 'pointer' }}
              >
                
                {/* Header: Driver Name, Fit badge, Rating */}
                <div className="driver-card-header">
                  <div className="driver-avatar-circle">
                    <i className="fa-solid fa-user-tie"></i>
                  </div>
                  <div>
                    <h3 className="driver-card-name">{driver.name}</h3>
                    {driver.nicknameTag && (
                      <span className="driver-nickname-tag">
                        <i className="fa-solid fa-heart"></i>
                        <span className="driver-nickname-text">{driver.nicknameTag}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="driver-fit-badge-wrapper">
                  <span className={`driver-fit-badge ${
                    driver.travelerFit.toLowerCase().includes('family') ? 'family' : 
                    driver.travelerFit.toLowerCase().includes('group') || driver.travelerFit.toLowerCase().includes('adventure') ? 'youth' : 'all-rounder'
                  }`}>
                    {driver.travelerFit}
                  </span>
                </div>

                {/* Star rating */}
                <div className="driver-card-rating">
                  <i className="fa-solid fa-star text-gold"></i>
                  <span><strong>{driver.rating}</strong> / 5.0 Rating</span>
                </div>

                {/* Metrics Details */}
                <div className="driver-metrics-box">
                  <div className="driver-metric-row">
                    <span className="driver-metric-label">Experience:</span>
                    <span className="driver-metric-val">{driver.experience}</span>
                  </div>
                  <div className="driver-metric-row">
                    <span className="driver-metric-label">KMs Driven:</span>
                    <span className="driver-metric-val">{driver.kmsDriven}</span>
                  </div>
                  <div className="driver-metric-row">
                    <span className="driver-metric-label">Safety Record:</span>
                    <span className="driver-metric-val safety-clean">
                      <span className="safety-text">{driver.accidentHistory}</span>
                    </span>
                  </div>
                </div>

                {/* Footer specs details */}
                <div className="driver-specs-box">
                  <p className="driver-spec-item">
                    <i className="fa-solid fa-language"></i>
                    <span><strong>Languages:</strong> {driver.languages}</span>
                  </p>
                  <p className="driver-spec-item">
                    <i className="fa-solid fa-award"></i>
                    <span><strong>Specialty:</strong> {driver.specialty}</span>
                  </p>
                </div>

                {/* View Profile Action Link */}
                <div className="driver-card-action">
                  <span>View Full Profile & Reviews</span>
                  <i className="fa-solid fa-arrow-right-long animate-arrow"></i>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Tour Packages Section */}
      <TourPackages />

      {/* 5. Services Section */}
      <section id="services" className="section-padding" style={{ backgroundColor: 'var(--bg-cream-dark)' }}>
        <div className="container">
          
          <div className="section-title-wrapper">
            <p className="section-subtitle">What We Do</p>
            <h2 className="section-title">Our Cab Services</h2>
            <div className="section-title-divider"></div>
          </div>

          <div className="services-grid">
            {SERVICES.map((srv) => (
              <div key={srv.id} className="service-card">
                <div className="service-icon-box">
                  <i className={`fa-solid ${srv.icon}`}></i>
                </div>
                <h3 className="service-title">{srv.title}</h3>
                <p className="service-desc">{srv.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Fare Calculator */}
      <FareCalculator onEstimateSubmit={setEstimate} />

      {/* 7. Online Booking Form */}
      <BookingForm estimateData={estimate} onBookingSuccess={handleBookingSuccess} />

      {/* 8. Customer Reviews */}
      <section id="reviews" className="section-padding">
        <div className="container">
          
          <div className="section-title-wrapper">
            <p className="section-subtitle">Feedback</p>
            <h2 className="section-title">Customer Reviews</h2>
            <div className="section-title-divider"></div>
          </div>

          <div className="testimonials-slider">
            {TESTIMONIALS.map((review) => (
              <div key={review.id} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <p className="testimonial-text">"{review.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {review.name.charAt(0)}
                  </div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">{review.name}</span>
                    <span className="testimonial-loc">{review.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Join Fleet / Network Section */}
      <PartnerSection onPartnerSuccess={handlePartnerSuccess} />

      {/* 10. Contact Page & Google Maps */}
      <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-cream-dark)' }}>
        <div className="container">
          
          <div className="section-title-wrapper">
            <p className="section-subtitle">Get In Touch</p>
            <h2 className="section-title">Contact Information</h2>
            <div className="section-title-divider"></div>
          </div>

          <div className="contact-details-grid">
            
            {/* Information Cards */}
            <div className="contact-info-cards">
              
              <div className="contact-card-item">
                <div className="contact-card-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="contact-card-texts">
                  <span className="contact-card-title">Call Us Directly</span>
                  <a href="tel:8105218893" className="contact-card-value">8105218893</a>
                  <span className="contact-card-desc">Call Dayanand Bangundi (24/7 service available)</span>
                </div>
              </div>

              <div className="contact-card-item">
                <div className="contact-card-icon" style={{ color: '#25D366', background: 'rgba(37,211,102,0.1)' }}>
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <div className="contact-card-texts">
                  <span className="contact-card-title">WhatsApp Booking</span>
                  <a 
                    href="https://api.whatsapp.com/send?phone=918105218893&text=Hi%20Sri%20Ganesh%20Travels,%20I'd%20like%20to%20inquire%20about%20booking%20a%20ride." 
                    target="_blank" 
                    rel="noreferrer"
                    className="contact-card-value"
                    style={{ color: '#25D366' }}
                  >
                    8105218893
                  </a>
                  <span className="contact-card-desc">Instant replies for cab availability.</span>
                </div>
              </div>

              <div className="contact-card-item">
                <div className="contact-card-icon" style={{ color: '#E28743' }}>
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="contact-card-texts">
                  <span className="contact-card-title">Location Base</span>
                  <span className="contact-card-value">Bangalore, India</span>
                  <span className="contact-card-desc">Providing Airport, Outstation, and local trips in Bangalore & Karnataka.</span>
                </div>
              </div>

            </div>

            {/* Google Map Box */}
            <div className="map-container-box">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.8865391295!2d77.46612660086966!3d12.972442223709669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e897e09855!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1717765100000!5m2!1sen!2sin" 
                title="Sri Ganesh Travels Location Map"
                className="map-iframe" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            
            {/* Logo and About col */}
            <div className="footer-col-about">
              <div className="footer-logo-row">
                <img src="/ganesha_logo.png" alt="Sri Ganesh Travels Logo" className="footer-logo-img" />
                <div className="footer-logo-texts">
                  <h3>Sri Ganesh Travels</h3>
                  <p>Travel with Trust. Arrive with Comfort.</p>
                </div>
              </div>
              <p className="footer-desc">
                Bangalore's premium commercial cab provider. Specializing in comfortable 7-seater Ertiga CNG trips and collaborative outstation fleets. Providing reliable airport taxis, holiday tours, corporate contracts, and family rides since 20 years.
              </p>
            </div>

            {/* Quick Links col */}
            <div className="footer-col-links">
              <h4>Quick Links</h4>
              <ul className="footer-links-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Dayanand</a></li>
                <li><a href="#fleet">Our Fleet Album</a></li>
                <li><a href="#packages">Tour Packages</a></li>
                <li><a href="#calculator">Price Calculator</a></li>
                <li><a href="#partner">Join Network</a></li>
              </ul>
            </div>

            {/* Contact details col */}
            <div className="footer-col-contact">
              <h4>Contact Info</h4>
              <ul className="footer-contact-list">
                <li>
                  <i className="fa-solid fa-phone"></i>
                  <span>Call: +91 8105218893</span>
                </li>
                <li>
                  <i className="fa-brands fa-whatsapp"></i>
                  <span>WhatsApp: +91 8105218893</span>
                </li>
                <li>
                  <i className="fa-solid fa-map-location-dot"></i>
                  <span>Office: Bangalore City, Karnataka, India</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} Sri Ganesh Travels. All Rights Reserved.
            </p>
            <p className="footer-attribution">
              Designed with care by <a href="#home">Antigravity AI</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
