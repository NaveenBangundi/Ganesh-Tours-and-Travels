import React, { useState } from 'react';

// Angle views from a 3x3 collage image
// background-size: 300% 300% means full image = 3 cols x 3 rows
// background-position: colX% rowY% where each step = 50% (0, 50, 100)
const COLLAGE_ANGLES = [
  { key: 'front',   label: 'Front',      icon: 'fa-car',        bgPos: '0% 0%'     },
  { key: 'rear',    label: 'Rear',       icon: 'fa-car',        bgPos: '50% 0%'    },
  { key: 'side',    label: 'Side',       icon: 'fa-car-side',   bgPos: '100% 0%'   },
  { key: 'front3q', label: 'Front ¾',   icon: 'fa-car',        bgPos: '0% 50%'    },
  { key: 'rear3q',  label: 'Rear ¾',    icon: 'fa-car',        bgPos: '50% 50%'   },
  { key: 'profile', label: 'Profile',   icon: 'fa-car-side',   bgPos: '100% 50%'  },
  { key: 'dash',    label: 'Dashboard', icon: 'fa-gauge-high', bgPos: '0% 100%'   },
  { key: 'seating', label: 'Seating',   icon: 'fa-couch',      bgPos: '50% 100%'  },
  { key: 'boot',    label: 'Boot Space',icon: 'fa-suitcase',   bgPos: '100% 100%' },
];

const VEHICLE_CATEGORIES = [
  {
    id: 'hatchbacks',
    label: 'Hatchbacks',
    icon: 'fa-car-side',
    type: 'Budget Friendly',
    seating: '4 + 1',
    luggage: '2 Bags',
    rateNonAc: 11,
    rateAc: 13,
    tagline: 'Compact, fuel-efficient city rides',
    models: [
      {
        name: 'Maruti Suzuki Swift',
        image: '/Maruti Swift Front 2.png',
        tag: 'Most Popular',
        color: 'Red / White / Blue',
        fuel: 'Petrol / CNG',
        hasGallery: true,
        photos: [
          { src: '/Maruti Swift Front 2.png',    label: 'Front',      icon: 'fa-car'         },
          { src: '/Maruti Swift Side.png',       label: 'Side View',  icon: 'fa-car-side'    },
          { src: '/Maruti Swift Side 2.png',     label: 'Side ¾',     icon: 'fa-car-side'    },
          { src: '/Maruti Swift Rear.png',       label: 'Rear',       icon: 'fa-car'         },
          { src: '/Maruti Swift Rear 2.png',     label: 'Rear ¾',     icon: 'fa-car'         },
          { src: '/Maruti Swift Interior.png',   label: 'Dashboard',  icon: 'fa-gauge-high'  },
          { src: '/Maruti Swift Interior 2.png', label: 'Seating',    icon: 'fa-couch'       },
          { src: '/Maruti Swift Boot.png',       label: 'Boot Space', icon: 'fa-suitcase'     },
        ],
      },
    ],
  },
  {
    id: 'sedans',
    label: 'Sedans',
    icon: 'fa-car',
    type: 'Comfort & Economy',
    seating: '4 + 1',
    luggage: '3 Bags (Spacious Boot)',
    rateNonAc: 13,
    rateAc: 15,
    tagline: 'Premium comfort for airport & outstation',
    models: [
      {
        name: 'Maruti Suzuki Dzire',
        image: '/Maruti Dzire Front.png',
        tag: 'Best Seller',
        color: 'White / Silver / Grey',
        fuel: 'Petrol / CNG',
        hasGallery: true,
        photos: [
          { src: '/Maruti Dzire Front.png',       label: 'Front',      icon: 'fa-car'         },
          { src: '/Maruti Dzire Front 2.png',     label: 'Front ¾',    icon: 'fa-car'         },
          { src: '/Maruti Dzire Side.png',        label: 'Side View',  icon: 'fa-car-side'    },
          { src: '/Maruti Dzire Rear.png',        label: 'Rear',       icon: 'fa-car'         },
          { src: '/Maruti Dzire Rear 2.png',      label: 'Rear ¾',     icon: 'fa-car'         },
          { src: '/Maruti Dzire Interior.png',    label: 'Dashboard',  icon: 'fa-gauge-high'  },
          { src: '/Maruti Dzire Interior 2.png',  label: 'Seating',    icon: 'fa-couch'       },
          { src: '/Maruti Dzire Boot.png',        label: 'Boot Space', icon: 'fa-suitcase'     },
        ],
      },
      {
        name: 'Honda Amaze',
        image: '',
        tag: 'Spacious Boot',
        color: 'White / Red',
        fuel: 'Petrol / Diesel',
        hasGallery: false,
      },
      {
        name: 'Hyundai Aura',
        image: '/Hyundai Aura Front.png',
        tag: 'Smooth Ride',
        color: 'White / Blue / Silver',
        fuel: 'Petrol / CNG',
        hasGallery: true,
        photos: [
          { src: '/Hyundai Aura Front.png',       label: 'Front',      icon: 'fa-car'         },
          { src: '/Hyundai Aura Front 2.png',     label: 'Front ¾',    icon: 'fa-car'         },
          { src: '/Hyundai Aura Side.png',        label: 'Side View',  icon: 'fa-car-side'    },
          { src: '/Hyundai Aura Side 2.png',      label: 'Side ¾',     icon: 'fa-car-side'    },
          { src: '/Hyundai Aura Rear.png',        label: 'Rear',       icon: 'fa-car'         },
          { src: '/Hyundai Aura Rear 2.png',      label: 'Rear ¾',     icon: 'fa-car'         },
          { src: '/Hyundai Aura Interior.png',    label: 'Dashboard',  icon: 'fa-gauge-high'  },
          { src: '/Hyundai Aura Interior 2.png',  label: 'Seating',    icon: 'fa-couch'       },
          { src: '/Hyundai Aura Boot.png',        label: 'Boot Space', icon: 'fa-suitcase'     },
        ],
      },
      {
        name: 'Toyota Etios',
        image: '/Toyota Etios Front.png',
        tag: 'Reliable & Sturdy',
        color: 'White / Silver',
        fuel: 'Petrol / Diesel',
        hasGallery: true,
        photos: [
          { src: '/Toyota Etios Front.png',       label: 'Front',      icon: 'fa-car'         },
          { src: '/Toyota Etios Front 2.png',     label: 'Front ¾',    icon: 'fa-car'         },
          { src: '/Toyota Etios Side.png',        label: 'Side View',  icon: 'fa-car-side'    },
          { src: '/Toyota Etios Side 2.png',      label: 'Side ¾',     icon: 'fa-car-side'    },
          { src: '/Toyota Etios Rear.png',        label: 'Rear',       icon: 'fa-car'         },
          { src: '/Toyota Etios Rear 2.png',      label: 'Rear ¾',     icon: 'fa-car'         },
          { src: '/Toyota Etios Interior.png',    label: 'Dashboard',  icon: 'fa-gauge-high'  },
          { src: '/Toyota Etios Interior 2.png',  label: 'Seating',    icon: 'fa-couch'       },
          { src: '/Toyota Etios Boot.png',        label: 'Boot Space', icon: 'fa-suitcase'     },
        ],
      },
    ],
  },
  {
    id: 'mpv',
    label: 'MPV',
    icon: 'fa-shuttle-van',
    type: 'Premium Family Comfort',
    seating: '6+1 / 7+1',
    luggage: '4-5 Bags + Roof Carrier',
    rateNonAc: 16,
    rateAc: 18,
    tagline: 'The ideal choice for family getaways',
    models: [
      {
        name: 'Maruti Suzuki Ertiga',
        image: '/Ertiga Front.png',
        tag: '★ Our Flagship',
        color: 'Pearl White — KA 05 AN 8381',
        fuel: 'CNG / Petrol',
        isFlagnship: true,
        hasGallery: true,
        photos: [
          { src: '/Ertiga Front.png',       label: 'Front',      icon: 'fa-car'         },
          { src: '/Ertiga Front 2.png',     label: 'Front ¾',    icon: 'fa-car'         },
          { src: '/Ertiga Side.png',        label: 'Side View',  icon: 'fa-car-side'    },
          { src: '/Ertiga Side 2.png',      label: 'Side ¾',     icon: 'fa-car-side'    },
          { src: '/Ertiga Rear.png',        label: 'Rear',       icon: 'fa-car'         },
          { src: '/Ertiga Rear 2.png',      label: 'Rear ¾',     icon: 'fa-car'         },
          { src: '/Ertiga Interior.png',    label: 'Dashboard',  icon: 'fa-gauge-high'  },
          { src: '/Ertiga Interior 2.png',  label: 'Seating',    icon: 'fa-couch'       },
          { src: '/Ertiga Boot.png',        label: 'Boot Space', icon: 'fa-suitcase'     },
        ],
      },
      {
        name: 'Toyota Innova Crysta',
        image: '/Innova Crysta Front.png',
        tag: 'Luxury MPV',
        color: 'Pearl White / Silver',
        fuel: 'Diesel',
        hasGallery: true,
        photos: [
          { src: '/Innova Crysta Front.png',       label: 'Front',      icon: 'fa-car'         },
          { src: '/Innova Crysta Front 2.png',     label: 'Front ¾',    icon: 'fa-car'         },
          { src: '/Innova Crysta Side.png',        label: 'Side View',  icon: 'fa-car-side'    },
          { src: '/Innova Crysta Side 2.png',      label: 'Side ¾',     icon: 'fa-car-side'    },
          { src: '/Innova Crysta Rear.png',        label: 'Rear',       icon: 'fa-car'         },
          { src: '/Innova Crysta Rear 2.png',      label: 'Rear ¾',     icon: 'fa-car'         },
          { src: '/Innova Crysta Interior.png',    label: 'Dashboard',  icon: 'fa-gauge-high'  },
          { src: '/Innova Crysta Interior 2.png',  label: 'Seating',    icon: 'fa-couch'       },
          { src: '/Innova Crysta Boot.png',        label: 'Boot Space', icon: 'fa-suitcase'     },
        ],
      },
      {
        name: 'Toyota Innova',
        image: '',
        tag: 'Premium',
        color: 'White / Silver',
        fuel: 'Diesel',
        hasGallery: false,
      },
    ],
  },
  {
    id: 'tt',
    label: 'TT (Tempo Traveller)',
    icon: 'fa-bus',
    type: 'Group Travel Coach',
    seating: '12 to 26 Seater',
    luggage: '10+ Bags (Roof Carrier)',
    rateNonAc: 22,
    rateAc: 25,
    tagline: 'Perfect for group tours & pilgrimages',
    models: [
      {
        name: 'Force Traveller',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/IMG-20190215-WA0015.jpg/330px-IMG-20190215-WA0015.jpg',
        tag: 'Group Coach',
        color: 'White',
        fuel: 'Diesel',
        hasGallery: false,
      },
    ],
  },
];

// Photo Gallery using individual real images with smooth transitions
function PhotoGallery({ photos, modelName, isFlagnship }) {
  const [active, setActive] = useState(0);
  const photo = photos[active];

  return (
    <div className="pg-gallery">
      {/* Main large photo */}
      <div className="pg-main-wrap">
        {isFlagnship && (
          <span className="va-flagship-ribbon">★ Our Flagship — KA 05 AN 8381</span>
        )}
        <img
          key={photo.src}           /* key forces re-render fade on change */
          src={photo.src}
          alt={`${modelName} — ${photo.label}`}
          className="pg-main-img"
          style={{
            objectFit: (photo.label.toLowerCase().includes('interior') || 
                        photo.label.toLowerCase().includes('dashboard') || 
                        photo.label.toLowerCase().includes('seating')) 
                          ? 'cover' 
                          : 'contain',
            borderRadius: '10px'
          }}
        />
        {/* Label overlay */}
        <div className="pg-label-overlay">
          <i className={`fa-solid ${photo.icon}`}></i>
          <span>{photo.label}</span>
          <span className="pg-count">{active + 1} / {photos.length}</span>
        </div>
        {/* Prev / Next arrow buttons */}
        <button
          className="pg-arrow pg-arrow-prev"
          onClick={() => setActive((p) => (p - 1 + photos.length) % photos.length)}
          title="Previous"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className="pg-arrow pg-arrow-next"
          onClick={() => setActive((p) => (p + 1) % photos.length)}
          title="Next"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="pg-thumb-strip">
        {photos.map((p, idx) => (
          <button
            key={idx}
            className={`pg-thumb ${active === idx ? 'active' : ''}`}
            onClick={() => setActive(idx)}
            title={p.label}
          >
            <img 
              src={p.src} 
              alt={p.label} 
              className="pg-thumb-img" 
              style={{
                objectFit: (p.label.toLowerCase().includes('interior') || 
                            p.label.toLowerCase().includes('dashboard') || 
                            p.label.toLowerCase().includes('seating')) 
                              ? 'cover' 
                              : 'contain',
                borderRadius: '4px'
              }}
            />
            <span className="pg-thumb-label">{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function VehicleAlbum({ onSelectVehicle }) {
  const [activeTab, setActiveTab] = useState('mpv'); // default to MPV to show gallery
  const [activeModelIndex, setActiveModelIndex] = useState(0);

  const category = VEHICLE_CATEGORIES.find((c) => c.id === activeTab) || VEHICLE_CATEGORIES[2];
  const currentModel = category.models[activeModelIndex] || category.models[0];

  const handleTabChange = (id) => {
    setActiveTab(id);
    setActiveModelIndex(0);
  };

  const handleBookClick = () => {
    if (onSelectVehicle) onSelectVehicle(category.label);
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="fleet" className="section-padding vehicle-album-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrapper">
          <p className="section-subtitle">Our Fleet</p>
          <h2 className="section-title">Vehicle Categories</h2>
          <div className="section-title-divider"></div>
          <p style={{ color: 'var(--text-muted)', maxWidth: '620px', margin: '0 auto', fontSize: '1rem' }}>
            Choose from our wide range of vehicles — from budget hatchbacks to luxury group coaches.
            Click on <strong style={{ color: 'var(--primary-gold-dark)' }}>MPV</strong> to explore all 9 angles of our Ertiga & Innova Crysta!
          </p>
        </div>

        {/* Category Tab Pills */}
        <div className="va-category-tabs">
          {VEHICLE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`va-cat-tab ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => handleTabChange(cat.id)}
            >
              <i className={`fa-solid ${cat.icon}`}></i>
              <span>{cat.label}</span>
              {(cat.id === 'mpv') && <span className="va-cat-badge">9 Views</span>}
            </button>
          ))}
        </div>

        {/* Main Display Area */}
        <div className="va-display-grid">

          {/* Left: Image Showcase */}
          <div className="va-image-showcase">

            {currentModel.photos ? (
              /* Individual Photo Gallery (9 real shots) */
              <PhotoGallery
                photos={currentModel.photos}
                modelName={currentModel.name}
                isFlagnship={currentModel.isFlagnship}
              />
            ) : (
              /* Standard single image view */
              <>
                <div className="va-main-img-wrapper">
                  {currentModel.isFlagnship && (
                    <span className="va-flagship-ribbon">★ Our Flagship Vehicle</span>
                  )}
                  <img
                    src={currentModel.image}
                    alt={currentModel.name}
                    className="va-main-car-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fb = e.target.closest('.va-main-img-wrapper').querySelector('.va-img-fallback');
                      if (fb) fb.style.display = 'flex';
                    }}
                  />
                  <div className="va-img-fallback" style={{ display: 'none' }}>
                    <i className={`fa-solid ${category.icon}`}></i>
                    <span>{currentModel.name}</span>
                  </div>
                  <div className="va-img-overlay-badge">
                    <span className="va-model-tag">{currentModel.tag}</span>
                  </div>
                </div>

                {/* Model Thumbnails */}
                {category.models.length > 1 && (
                  <div className="va-model-thumbs">
                    {category.models.map((model, idx) => (
                      <button
                        key={idx}
                        className={`va-thumb-btn ${activeModelIndex === idx ? 'active' : ''}`}
                        onClick={() => setActiveModelIndex(idx)}
                        title={model.name}
                      >
                        <img
                          src={model.image}
                          alt={model.name}
                          className="va-thumb-img"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fb = e.target.parentElement.querySelector('.va-thumb-fallback');
                            if (fb) fb.style.display = 'flex';
                          }}
                        />
                        <span className="va-thumb-fallback" style={{ display: 'none' }}>
                          <i className={`fa-solid ${category.icon}`}></i>
                        </span>
                        <span className="va-thumb-label">{model.name.split(' ').slice(-1)[0]}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Model selector for MPV (below gallery) */}
            {currentModel.hasGallery && category.models.length > 1 && (
              <div className="va-model-thumbs" style={{ marginTop: '0.5rem' }}>
                {category.models.map((model, idx) => (
                  <button
                    key={idx}
                    className={`va-thumb-btn ${activeModelIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveModelIndex(idx)}
                    title={model.name}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem', maxWidth: '100%', flex: 'none', width: 'auto', padding: '0.5rem 1rem' }}
                  >
                    <i className={`fa-solid ${category.icon}`} style={{ color: activeModelIndex === idx ? 'var(--primary-gold)' : 'var(--text-muted)', fontSize: '0.9rem' }}></i>
                    <span className="va-thumb-label" style={{ fontSize: '0.82rem', fontWeight: 600, color: activeModelIndex === idx ? 'var(--text-dark)' : 'var(--text-muted)' }}>
                      {model.name}
                    </span>
                    {model.hasGallery && (
                      <span style={{ fontSize: '0.65rem', background: 'var(--primary-gold)', color: 'white', borderRadius: '4px', padding: '1px 5px', fontWeight: 700 }}>9 Views</span>
                    )}
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Right: Info Panel */}
          <div className="va-info-panel">
            <span className="va-type-badge">{category.type}</span>
            <h3 className="va-model-name">{currentModel.name}</h3>
            <p className="va-tagline">{category.tagline}</p>

            {/* Key Specs Grid */}
            <div className="va-specs-grid">
              <div className="va-spec-item">
                <i className="fa-solid fa-users"></i>
                <div>
                  <span className="va-spec-label">Seating</span>
                  <span className="va-spec-value">{category.seating}</span>
                </div>
              </div>
              <div className="va-spec-item">
                <i className="fa-solid fa-suitcase"></i>
                <div>
                  <span className="va-spec-label">Luggage</span>
                  <span className="va-spec-value">{category.luggage}</span>
                </div>
              </div>
              <div className="va-spec-item">
                <i className="fa-solid fa-gas-pump"></i>
                <div>
                  <span className="va-spec-label">Fuel Type</span>
                  <span className="va-spec-value">{currentModel.fuel}</span>
                </div>
              </div>
              <div className="va-spec-item">
                <i className="fa-solid fa-palette"></i>
                <div>
                  <span className="va-spec-label">Color</span>
                  <span className="va-spec-value">{currentModel.color}</span>
                </div>
              </div>
            </div>

            {/* Rate Box */}
            <div className="va-rate-box">
              <div className="va-rate-col">
                <span className="va-rate-label">Non-AC Rate</span>
                <span className="va-rate-value">₹{category.rateNonAc}<small>/km</small></span>
              </div>
              <div className="va-rate-divider"></div>
              <div className="va-rate-col">
                <span className="va-rate-label">AC Rate</span>
                <span className="va-rate-value va-rate-ac">₹{category.rateAc}<small>/km</small></span>
              </div>
            </div>

            {/* Gallery Info Badge (for gallery models) */}
            {currentModel.photos && (
              <div className="va-gallery-badge-info">
                <i className="fa-solid fa-images"></i>
                <div>
                  <strong>{currentModel.photos.length} Real Photos {currentModel.isFlagnship ? '— KA 05 AN 8381' : ''}</strong>
                  <p>
                    {currentModel.isFlagnship 
                      ? 'Use the arrows or thumbnails below to explore the exterior, interior, and seating layout of our flagship Ertiga.'
                      : `Use the arrows or thumbnails below to explore the various angles, interior cabin, and seating space of the ${currentModel.name}.`}
                  </p>
                </div>
              </div>
            )}

            {/* Available models text (non-gallery categories) */}
            {!currentModel.hasGallery && category.models.length > 1 && (
              <div className="va-models-list">
                <span className="va-models-label">Available Models:</span>
                <div className="va-model-pills">
                  {category.models.map((m, i) => (
                    <span
                      key={i}
                      className={`va-model-pill ${i === activeModelIndex ? 'active' : ''}`}
                      onClick={() => setActiveModelIndex(i)}
                    >
                      {m.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="va-cta-group">
              <button onClick={handleBookClick} className="btn-primary" id={`book-${activeTab}`}>
                Book {category.label} <i className="fa-solid fa-arrow-right"></i>
              </button>
              <a
                href={`https://api.whatsapp.com/send?phone=918105218893&text=Hi%20Sri%20Ganesh%20Travels!%20I'd%20like%20to%20book%20the%20${encodeURIComponent(currentModel.name)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary-dark"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <i className="fa-brands fa-whatsapp" style={{ color: '#25D366', fontSize: '1.1rem' }}></i>
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
