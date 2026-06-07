import React, { useState, useEffect } from 'react';
import { VEHICLE_FLEET } from '../data/mockData';
import CustomSelect from './CustomSelect';

export default function BookingForm({ estimateData, onBookingSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    drop: '',
    date: '',
    time: '',
    tripType: 'Airport Pickup & Drop',
    vehicleClass: 'MPV',
    notes: ''
  });

  // Sync with calculator estimates
  useEffect(() => {
    if (estimateData) {
      const parsedTripType = estimateData.tripType.includes('Outstation') 
        ? 'Outstation Travel' 
        : 'Local City Travel';
      
      setFormData(prev => ({
        ...prev,
        tripType: parsedTripType,
        vehicleClass: estimateData.vehicle || 'MPV',
        notes: `Estimated Distance: ${estimateData.distance} km. Calculated price: ₹${estimateData.total} (${estimateData.breakdownText})`
      }));
    }
  }, [estimateData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const message = `Hi Sri Ganesh Travels! I would like to book a ride:
- *Name:* ${formData.name}
- *Phone:* ${formData.phone}
- *Trip Type:* ${formData.tripType}
- *Vehicle:* ${formData.vehicleClass}
- *Pickup:* ${formData.pickup}
- *Drop:* ${formData.drop}
- *Date & Time:* ${formData.date} at ${formData.time}
${formData.notes ? `- *Additional Details:* ${formData.notes}` : ''}`;

    // Send to WhatsApp API
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918105218893&text=${encodeURIComponent(message)}`;
    
    // Open in new window
    window.open(whatsappUrl, '_blank');

    if (onBookingSuccess) {
      onBookingSuccess();
    }

    // Reset Form
    setFormData({
      name: '',
      phone: '',
      pickup: '',
      drop: '',
      date: '',
      time: '',
      tripType: 'Airport Pickup & Drop',
      vehicleClass: 'MPV',
      notes: ''
    });
  };

  return (
    <section id="booking" className="section-padding" style={{ backgroundColor: 'var(--bg-cream-dark)' }}>
      <div className="container">
        
        <div className="section-title-wrapper">
          <p className="section-subtitle">Easy Booking</p>
          <h2 className="section-title">Online Booking Enquiry</h2>
          <div className="section-title-divider"></div>
        </div>

        <div className="booking-grid">
          
          {/* Form Card */}
          <div className="booking-card">
            <form onSubmit={handleSubmit} className="calc-form">
              
              <div className="booking-form-grid">
                
                <div className="calc-form-group">
                  <label htmlFor="booking-name">Full Name</label>
                  <input
                    id="booking-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="calc-input"
                  />
                </div>

                <div className="calc-form-group">
                  <label htmlFor="booking-phone">Phone Number</label>
                  <input
                    id="booking-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit number"
                    required
                    className="calc-input"
                  />
                </div>

                <div className="calc-form-group">
                  <label htmlFor="booking-triptype">Trip Type</label>
                  <CustomSelect
                    name="tripType"
                    value={formData.tripType}
                    onChange={handleChange}
                    options={[
                      'Airport Pickup & Drop',
                      'Outstation Travel',
                      'Family Trips',
                      'Corporate Travel',
                      'Wedding & Event Transport',
                      'Local City Travel'
                    ]}
                  />
                </div>

                <div className="calc-form-group">
                  <label htmlFor="booking-vehicle">Preferred Vehicle</label>
                  <CustomSelect
                    name="vehicleClass"
                    value={formData.vehicleClass}
                    onChange={handleChange}
                    options={VEHICLE_FLEET.map(v => v.name)}
                  />
                </div>

                <div className="calc-form-group">
                  <label htmlFor="booking-pickup">Pickup Location</label>
                  <input
                    id="booking-pickup"
                    type="text"
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleChange}
                    placeholder="Address, Hotel or Airport"
                    required
                    className="calc-input"
                  />
                </div>

                <div className="calc-form-group">
                  <label htmlFor="booking-drop">Drop Location</label>
                  <input
                    id="booking-drop"
                    type="text"
                    name="drop"
                    value={formData.drop}
                    onChange={handleChange}
                    placeholder="Destination details"
                    required
                    className="calc-input"
                  />
                </div>

                <div className="calc-form-group">
                  <label htmlFor="booking-date">Date of Journey</label>
                  <input
                    id="booking-date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="calc-input"
                  />
                </div>

                <div className="calc-form-group">
                  <label htmlFor="booking-time">Pickup Time</label>
                  <input
                    id="booking-time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="calc-input"
                  />
                </div>

                <div className="calc-form-group form-full-width">
                  <label htmlFor="booking-notes">Additional Details / Notes</label>
                  <textarea
                    id="booking-notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Mention luggage details, AC/Non-AC request, or estimated price calculated."
                    className="calc-input"
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Send Booking to WhatsApp <i className="fa-brands fa-whatsapp"></i>
              </button>

            </form>
          </div>

          {/* Quick Contact Info Block */}
          <div className="booking-cta-box">
            <div className="booking-cta-watermark">GANESH</div>
            <h3 className="booking-cta-title">Prefer Direct Booking?</h3>
            <p className="booking-cta-desc">
              You can instantly skip the form and call us directly or drop a simple WhatsApp text. We respond in under 5 minutes.
            </p>

            <div className="booking-contact-method">
              <div className="booking-contact-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div>
                <p className="booking-contact-label">Call Owner</p>
                <a href="tel:8105218893" className="booking-contact-val">8105218893</a>
              </div>
            </div>

            <div className="booking-contact-method">
              <div className="booking-contact-icon" style={{ color: '#25D366', background: 'rgba(37,211,102,0.1)' }}>
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div>
                <p className="booking-contact-label">Chat WhatsApp</p>
                <a 
                  href="https://api.whatsapp.com/send?phone=918105218893&text=Hi%20Sri%20Ganesh%20Travels!%20I'd%20like%20to%20enquire%20about%20a%20cab." 
                  target="_blank"
                  rel="noreferrer"
                  className="booking-contact-val"
                  style={{ color: '#25D366' }}
                >
                  Click to Chat
                </a>
              </div>
            </div>

            <div className="booking-contact-method">
              <div className="booking-contact-icon" style={{ color: '#FFD700' }}>
                <i className="fa-solid fa-clock"></i>
              </div>
              <div>
                <p className="booking-contact-label">Service Window</p>
                <p className="booking-contact-val">24 Hours / 7 Days</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
