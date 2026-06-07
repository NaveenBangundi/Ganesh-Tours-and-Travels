import React, { useState } from 'react';

export default function PartnerSection({ onPartnerSuccess }) {
  const [partnerData, setPartnerData] = useState({
    name: '',
    phone: '',
    vehicleModel: '',
    vehicleNumber: '',
    city: 'Bangalore',
    experience: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartnerData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct WhatsApp message
    const message = `Hi Sri Ganesh Travels! I am a driver/owner interested in joining your travel network:
- *Partner Name:* ${partnerData.name}
- *Phone:* ${partnerData.phone}
- *Vehicle Model:* ${partnerData.vehicleModel}
- *Reg Number:* ${partnerData.vehicleNumber}
- *Base City:* ${partnerData.city}
- *Experience / Details:* ${partnerData.experience}`;

    // Send to WhatsApp API
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918105218893&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (onPartnerSuccess) {
      onPartnerSuccess();
    }

    // Reset Form
    setPartnerData({
      name: '',
      phone: '',
      vehicleModel: '',
      vehicleNumber: '',
      city: 'Bangalore',
      experience: ''
    });
  };

  return (
    <section id="partner" className="section-padding section-dark">
      <div className="container">
        
        <div className="join-network-banner">
          
          {/* Info Text Column */}
          <div>
            <p className="section-subtitle light-text">Business Expansion</p>
            <h2 className="join-network-title">Join Our Travel Network</h2>
            <p className="join-network-desc">
              Do you own a commercial vehicle or drive in Bangalore? Partner with Sri Ganesh Travels! We have regular bookings for outstation trips, airport transfers, and local rides. Join our community of trusted owners and grow your earnings.
            </p>

            <div className="join-network-points">
              <div className="join-network-point-item">
                <i className="fa-solid fa-circle-check"></i>
                <span>**Regular Bookings**: Constant flow of rides through our business.</span>
              </div>
              <div className="join-network-point-item">
                <i className="fa-solid fa-circle-check"></i>
                <span>**Fair Commissions**: Highly competitive payouts and transparent transactions.</span>
              </div>
              <div className="join-network-point-item">
                <i className="fa-solid fa-circle-check"></i>
                <span>**Flexible Timing**: Work at your convenience, select local or outstation runs.</span>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="join-network-form-box">
            <h3 
              className="receipt-title" 
              style={{ fontSize: '1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}
            >
              Partner Enrollment Form
            </h3>
            
            <form onSubmit={handleSubmit} className="calc-form">
              
              <div className="calc-form-group">
                <label style={{ color: 'var(--text-light-muted)' }} htmlFor="partner-name">Driver/Owner Name</label>
                <input
                  id="partner-name"
                  type="text"
                  name="name"
                  value={partnerData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="calc-input"
                  style={{ backgroundColor: 'var(--bg-slate-light)', color: 'white', borderColor: 'var(--border-gold)' }}
                />
              </div>

              <div className="calc-form-group">
                <label style={{ color: 'var(--text-light-muted)' }} htmlFor="partner-phone">Phone Number</label>
                <input
                  id="partner-phone"
                  type="tel"
                  name="phone"
                  value={partnerData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  required
                  className="calc-input"
                  style={{ backgroundColor: 'var(--bg-slate-light)', color: 'white', borderColor: 'var(--border-gold)' }}
                />
              </div>

              <div className="calc-toggle-group">
                
                <div className="calc-form-group">
                  <label style={{ color: 'var(--text-light-muted)' }} htmlFor="partner-model">Vehicle Model</label>
                  <input
                    id="partner-model"
                    type="text"
                    name="vehicleModel"
                    value={partnerData.vehicleModel}
                    onChange={handleChange}
                    placeholder="e.g. Dzire, Innova, Etios"
                    required
                    className="calc-input"
                    style={{ backgroundColor: 'var(--bg-slate-light)', color: 'white', borderColor: 'var(--border-gold)' }}
                  />
                </div>

                <div className="calc-form-group">
                  <label style={{ color: 'var(--text-light-muted)' }} htmlFor="partner-number">Registration No.</label>
                  <input
                    id="partner-number"
                    type="text"
                    name="vehicleNumber"
                    value={partnerData.vehicleNumber}
                    onChange={handleChange}
                    placeholder="e.g. KA 05 AB 1234"
                    required
                    className="calc-input"
                    style={{ backgroundColor: 'var(--bg-slate-light)', color: 'white', borderColor: 'var(--border-gold)' }}
                  />
                </div>

              </div>

              <div className="calc-form-group">
                <label style={{ color: 'var(--text-light-muted)' }} htmlFor="partner-experience">Experience / Remarks</label>
                <textarea
                  id="partner-experience"
                  name="experience"
                  value={partnerData.experience}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Tell us about your years of driving or vehicle condition"
                  className="calc-input"
                  style={{ backgroundColor: 'var(--bg-slate-light)', color: 'white', borderColor: 'var(--border-gold)', resize: 'vertical' }}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                Submit to Sri Ganesh Travels <i className="fa-solid fa-paper-plane"></i>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
