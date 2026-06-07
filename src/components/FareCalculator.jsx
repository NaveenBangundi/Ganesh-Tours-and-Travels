import React, { useState, useEffect } from 'react';
import { VEHICLE_FLEET, FARE_CALCULATOR_DEFAULT } from '../data/mockData';
import CustomSelect from './CustomSelect';

export default function FareCalculator({ onEstimateSubmit }) {
  const [calcTab, setCalcTab] = useState('outstation'); // 'outstation' or 'local'
  
  // Shared Form inputs
  const [days, setDays] = useState(1);
  const [distance, setDistance] = useState(300);
  
  // Outstation specific inputs
  const [useAc, setUseAc] = useState(true);
  
  // Local specific inputs
  const [fuelType, setFuelType] = useState('cng'); // 'cng' or 'petrol'

  // Results state
  const [breakdown, setBreakdown] = useState({
    baseCharge: 0,
    driverBata: 0,
    fuelCharge: 0,
    tollCharge: 0,
    total: 0,
    isMinDistanceEngage: false,
    rateApplied: 0,
    minimumDistanceApplied: 0
  });

  const [hasCalculated, setHasCalculated] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  // Empty defaults so the user must select class and model
  const [vehicleId, setVehicleId] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const selectedVehicle = VEHICLE_FLEET.find(v => v.id === vehicleId);

  // Clear selected model when vehicle class changes
  useEffect(() => {
    setSelectedModel('');
  }, [vehicleId]);

  // Adjust default distances based on tab
  useEffect(() => {
    if (calcTab === 'local') {
      setDistance(80); // Average city run
    } else {
      setDistance(300); // Outstation standard default is 300 KM
    }
  }, [calcTab]);

  // Recalculate whenever inputs change
  useEffect(() => {
    calculateFare();
  }, [calcTab, vehicleId, selectedModel, days, distance, useAc, fuelType]);

  // Reset calculations when user edits any input parameter
  useEffect(() => {
    setHasCalculated(false);
    setIsPrinting(false);
  }, [calcTab, vehicleId, selectedModel, days, distance, useAc, fuelType]);

  // Handle printing timer
  useEffect(() => {
    let timer;
    if (isPrinting) {
      timer = setTimeout(() => {
        setIsPrinting(false);
      }, 2200);
    }
    return () => clearTimeout(timer);
  }, [isPrinting]);

  const calculateFare = () => {
    if (!selectedVehicle || !selectedModel) {
      setBreakdown({
        baseCharge: 0,
        driverBata: 0,
        fuelCharge: 0,
        tollCharge: 0,
        total: 0,
        isMinDistanceEngage: false,
        rateApplied: 0,
        minimumDistanceApplied: 0
      });
      return;
    }

    const distanceVal = Math.max(10, parseInt(distance) || 10);
    const daysVal = Math.max(1, parseInt(days) || 1);

    const defaultFuelPrice = fuelType === 'cng' ? FARE_CALCULATOR_DEFAULT.fuelPriceCng : FARE_CALCULATOR_DEFAULT.fuelPricePetrol;
    let mileage = fuelType === 'cng' ? selectedVehicle.mileageCng : selectedVehicle.mileagePetrol;
    if (mileage === 0) mileage = selectedVehicle.mileagePetrol; // Fallback to petrol if CNG is 0 (like Innova)

    if (calcTab === 'outstation') {
      const minDistanceForTrip = daysVal * selectedVehicle.minKm;
      
      // Look up specific model rate from active selection
      const modelData = selectedVehicle.models.find(m => m.name === selectedModel) || selectedVehicle.models[0];
      const rate = useAc ? modelData.rateAc : modelData.rateNonAc;
      const driverBata = daysVal * selectedVehicle.driverBata;
      
      // Rule: If average distance per day is less than minimum, charge Flat Engage Rate + Driver Bata + Fuel
      if (distanceVal < minDistanceForTrip) {
        const baseCharge = daysVal * selectedVehicle.engageRate;
        const fuelCharge = Math.round(distanceVal * (defaultFuelPrice / mileage));
        const total = baseCharge + driverBata + fuelCharge;
        
        setBreakdown({
          baseCharge,
          driverBata,
          fuelCharge,
          tollCharge: 0, // Outstation tolls vary, noted in receipts
          total,
          isMinDistanceEngage: true,
          rateApplied: selectedVehicle.engageRate,
          minimumDistanceApplied: minDistanceForTrip
        });
      } else {
        // Charge Per-KM Rate + Driver Bata. Fuel is included in KM rate.
        const baseCharge = distanceVal * rate;
        const total = baseCharge + driverBata;

        setBreakdown({
          baseCharge,
          driverBata,
          fuelCharge: 0, // Fuel included in km rate
          tollCharge: 0,
          total,
          isMinDistanceEngage: false,
          rateApplied: rate,
          minimumDistanceApplied: 0
        });
      }
    } else {
      // Local City Bangalore Rules: 2000 engage + 1000 bata + fuel on customer (mileage based)
      const baseCharge = daysVal * 2000;
      const driverBata = daysVal * 1000;
      const fuelCharge = Math.round(distanceVal * (defaultFuelPrice / mileage));
      const total = baseCharge + driverBata + fuelCharge;

      setBreakdown({
        baseCharge,
        driverBata,
        fuelCharge,
        tollCharge: 0,
        total,
        isMinDistanceEngage: false,
        rateApplied: 2000,
        minimumDistanceApplied: 0
      });
    }
  };

  const handleBookEstimate = () => {
    // Compile summary
    const tripTypeString = calcTab === 'outstation' ? `Outstation (${useAc ? 'AC' : 'Non-AC'})` : 'Local City';
    const detailSummary = {
      tripType: tripTypeString,
      vehicle: selectedVehicle.name,
      days,
      distance,
      total: breakdown.total,
      breakdownText: `Model: ${selectedModel} | ` + (calcTab === 'outstation'
        ? breakdown.isMinDistanceEngage
          ? `Vehicle Rent: ₹${breakdown.baseCharge} + Driver Bata: ₹${breakdown.driverBata} + Fuel: ₹${breakdown.fuelCharge}`
          : `KM Charge: ${distance}km x ₹${breakdown.rateApplied}/km = ₹${breakdown.baseCharge} + Driver Bata: ₹${breakdown.driverBata}`
        : `Vehicle Rent: ₹${breakdown.baseCharge} + Driver Bata: ₹${breakdown.driverBata} + Fuel: ₹${breakdown.fuelCharge}`)
    };

    if (onEstimateSubmit) {
      onEstimateSubmit(detailSummary);
    }

    // Scroll to booking form
    const bookingForm = document.getElementById('booking');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculator" className="section-padding">
      <div className="container">
        
        <div className="section-title-wrapper">
          <p className="section-subtitle">Transparent Pricing</p>
          <h2 className="section-title">Fare Estimate Calculator</h2>
          <div className="section-title-divider"></div>
        </div>

        <div className="calculator-grid">
          
          {/* Input Form Card */}
          <div className="calculator-card">
            
            {/* Top Tabs */}
            <div className="calc-tabs">
              <button
                className={`calc-tab-btn ${calcTab === 'outstation' ? 'active' : ''}`}
                onClick={() => setCalcTab('outstation')}
              >
                <i className="fa-solid fa-route"></i> Outstation (Karnataka)
              </button>
              <button
                className={`calc-tab-btn ${calcTab === 'local' ? 'active' : ''}`}
                onClick={() => setCalcTab('local')}
              >
                <i className="fa-solid fa-city"></i> Local Bangalore
              </button>
            </div>

            {/* Core Calculator Fields */}
            <div className="calc-form">
              
                <div className="calc-form-group">
                  <label>Select Vehicle Class</label>
                  <CustomSelect
                    value={vehicleId}
                    onChange={(val) => setVehicleId(val)}
                    options={VEHICLE_FLEET.map(v => ({ value: v.id, label: v.name }))}
                    placeholder="Select Vehicle Class"
                  />
                </div>

                <div className="calc-form-group">
                  <label>Select Vehicle</label>
                  <CustomSelect
                    value={selectedModel}
                    onChange={(val) => setSelectedModel(val)}
                    options={selectedVehicle ? selectedVehicle.models.map(m => ({ value: m.name, label: m.name })) : []}
                    placeholder="Select Vehicle Model"
                    style={!selectedVehicle ? { opacity: 0.6, pointerEvents: 'none' } : {}}
                  />
                </div>

              <div className="calc-toggle-group">
                
                <div className="calc-form-group">
                  <label>Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={days}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDays(val === '' ? '' : Math.max(1, parseInt(val) || 1));
                    }}
                    className="calc-input"
                  />
                </div>

                <div className="calc-form-group">
                  <label>Estimated Distance (KM)</label>
                  <input
                    type="number"
                    min="10"
                    max="10000"
                    value={distance}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDistance(val === '' ? '' : Math.max(0, parseInt(val) || 0));
                    }}
                    className="calc-input"
                  />
                </div>

              </div>

              {calcTab === 'outstation' ? (
                /* Outstation Options */
                <div className="calc-form-group">
                  <label>A/C Preference</label>
                  <div className="calc-toggle-group">
                    <button
                      className={`calc-toggle-btn ${useAc ? 'active' : ''}`}
                      onClick={() => setUseAc(true)}
                    >
                      <i className="fa-solid fa-snowflake"></i> Air Conditioned (AC)
                    </button>
                    <button
                      className={`calc-toggle-btn ${!useAc ? 'active' : ''}`}
                      onClick={() => setUseAc(false)}
                    >
                      <i className="fa-solid fa-wind"></i> Non A/C
                    </button>
                  </div>
                </div>
              ) : (
                /* Local Bangalore Fuel Selector */
                <div className="calc-form-group">
                  <label>Fuel Type (Paid by Customer)</label>
                  <div className="calc-toggle-group">
                    <button
                      className={`calc-toggle-btn ${fuelType === 'cng' ? 'active' : ''}`}
                      onClick={() => setFuelType('cng')}
                       disabled={!selectedVehicle || selectedVehicle.id === 'tt'} // TT runs on diesel/petrol only
                      title={selectedVehicle?.id === 'tt' ? 'Tempo Traveller runs on Petrol/Diesel only' : ''}
                    >
                      <i className="fa-solid fa-gas-pump"></i> CNG (Ertiga/Sedan/Hatch)
                    </button>
                    <button
                      className={`calc-toggle-btn ${fuelType === 'petrol' ? 'active' : ''}`}
                      onClick={() => setFuelType('petrol')}
                    >
                      <i className="fa-solid fa-oil-can"></i> Petrol
                    </button>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  if (!vehicleId || !selectedModel) return;
                  setHasCalculated(true);
                  setIsPrinting(true);
                }}
                disabled={!vehicleId || !selectedModel}
                className="btn-primary calc-submit-btn"
                style={{
                  width: '100%',
                  marginTop: '1.5rem',
                  opacity: (!vehicleId || !selectedModel) ? 0.55 : 1,
                  cursor: (!vehicleId || !selectedModel) ? 'not-allowed' : 'pointer'
                }}
              >
                Calculate Fare <i className="fa-solid fa-calculator"></i>
              </button>

            </div>

          </div>

          {/* Right Column: Printer / Receipt Box */}
          <div className="calc-receipt-wrapper">
            <div className="printer-container">
              
              {/* Printer Header / Control Panel */}
              <div className="printer-header-panel">
                <div className="printer-slot-opening"></div>
                <div className="printer-control-bar">
                  <div className="printer-status-light">
                    <span className={`status-dot ${isPrinting ? 'printing' : hasCalculated ? 'complete' : 'ready'}`}></span>
                    <span className="status-text">
                      {isPrinting ? 'PRINTING INVOICE...' : hasCalculated ? 'PRINT COMPLETE' : 'PRINTER READY'}
                    </span>
                  </div>
                  <div className="printer-paper-indicator">
                    <i className="fa-solid fa-file-invoice"></i> FEED
                  </div>
                </div>
              </div>

              {/* Printer Content Area */}
              <div className="printer-output-viewport">
                {!hasCalculated ? (
                  /* Standby Info Screen */
                  <div className="printer-standby-screen">
                    <i className="fa-solid fa-print printer-icon"></i>
                    <h4>Fare Calculator Ready</h4>
                    <p>Adjust the travel parameters on the left and click <strong>"Calculate Fare"</strong> to print your receipt.</p>
                  </div>
                ) : (
                  /* Receipt Paper Viewport */
                  <div className="receipt-paper-viewport">
                    <div className={`receipt-paper-box ${isPrinting ? 'jitter' : ''}`}>
                      <div className="receipt-header">
                        <h3 className="receipt-title">Sri Ganesh Travels</h3>
                        <p className="receipt-subtitle">Estimated Invoice</p>
                      </div>

                      <div className="receipt-line-items">
                        <div className="receipt-item bold-text">
                          <span>Vehicle Tier</span>
                          <span>{selectedVehicle.name}</span>
                        </div>
                        <div className="receipt-item">
                          <span>Selected Vehicle</span>
                          <span style={{ fontWeight: 600 }}>{selectedModel}</span>
                        </div>
                        <div className="receipt-item">
                          <span>Trip Mode</span>
                          <span>{calcTab === 'outstation' ? 'Outstation' : 'Local City'}</span>
                        </div>
                        <div className="receipt-item">
                          <span>Duration</span>
                          <span>{days} Day(s)</span>
                        </div>
                        <div className="receipt-item">
                          <span>Distance Entered</span>
                          <span>{distance} KM</span>
                        </div>

                        {calcTab === 'outstation' ? (
                          <>
                            <div className="receipt-item">
                              <span>AC Preference</span>
                              <span>{useAc ? 'AC Enabled' : 'Non-AC'}</span>
                            </div>
                            {breakdown.isMinDistanceEngage ? (
                              <>
                                <div className="receipt-item">
                                  <span>Min Distance Alert</span>
                                  <span style={{ color: '#E53E3E' }}>&lt; {breakdown.minimumDistanceApplied}km (Engage Rate applied)</span>
                                </div>
                                <div className="receipt-item">
                                  <span>Vehicle Rent ({days} days x ₹1,500)</span>
                                  <span>₹{breakdown.baseCharge}</span>
                                </div>
                                <div className="receipt-item">
                                  <span>Estimated Fuel ({distance}km, Customer cost)</span>
                                  <span>₹{breakdown.fuelCharge}</span>
                                </div>
                              </>
                            ) : (
                              <div className="receipt-item">
                                <span>KM Fare ({distance}km x ₹{breakdown.rateApplied})</span>
                                <span>₹{breakdown.baseCharge}</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <div className="receipt-item">
                              <span>Vehicle Engage ({days} days x ₹2,000)</span>
                              <span>₹{breakdown.baseCharge}</span>
                            </div>
                            <div className="receipt-item">
                              <span>Est. Fuel ({distance}km @ {fuelType.toUpperCase()})</span>
                              <span>₹{breakdown.fuelCharge}</span>
                            </div>
                          </>
                        )}

                        <div className="receipt-item">
                          <span>Driver Allowance (Bata)</span>
                          <span>₹{breakdown.driverBata}</span>
                        </div>
                      </div>

                      <div className="receipt-total-block">
                        <span className="receipt-total-label">Estimated Total</span>
                        <span className="receipt-total-value">₹{breakdown.total.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="receipt-notes">
                        <p>
                          <i className="fa-solid fa-circle-info"></i>
                          <span>Toll charges, parking, and state permit entry taxes are extra as actuals.</span>
                        </p>
                        <p>
                          <i className="fa-solid fa-utensils"></i>
                          <span>Driver food & lodging is on the customer (or bata compensation of ₹300/day).</span>
                        </p>
                        {calcTab === 'local' && (
                          <p>
                            <i className="fa-solid fa-clock"></i>
                            <span>Standard local day window is 9:00 AM to 10:00 PM.</span>
                          </p>
                        )}
                      </div>

                      <div className="receipt-jagged-edge"></div>

                      <button onClick={handleBookEstimate} className="btn-primary receipt-book-btn">
                        Apply to Booking <i className="fa-solid fa-arrow-down"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
