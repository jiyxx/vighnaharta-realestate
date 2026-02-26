import React, { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:5000/api';

// ===================== DEFAULT CONTENT (fallback if backend is offline) =====================
const defaultContent = {
  hero: {
    tagline: "THINKING OF A FANTASTIC VICINITY?",
    highlights: "20+ PODIUM LUXURIOUS AMENITIES   SPACIOUS BALCONY HOMES*",
    projectName: "VIGHNAHARTA INFINITY",
    smart1bhk_label: "SMART 1 BHK",
    smart1bhk_original: "74.99 Lacs",
    smart1bhk_price: "₹ 69.99 Lacs*",
    premium2bhk_label: "PREMIUM 2 BHK",
    premium2bhk_original: "1.05 CR",
    premium2bhk_price: "₹ 96.99 Lacs*",
    address: "BLDG. NO. 223/224, CIRCLE KANNAMWAR NAGAR 1, VIKHROLI (EAST)"
  },
  aboutProject: {
    title: "About Project",
    description1: "At Vighnaharta Enclave, every detail reflects the grandest gesture of life in the most authentic and desirable home. Guided by a humanist approach, the architecture places people at the heart of the space. Built on the foundations of comfort, it evokes a true sense of freedom, protection, and belonging.",
    quote: '"The moment I entered the house, it felt welcomed" – this feeling defines the privilege Vighnaharta Enclave offers. Thoughtfully designed with crafted amenities and timeless choices, the space resonates with the warmth and authenticity that you and your family truly deserve.',
    ctaText: "Download Brochure"
  },
  floorPlans: {
    title: "Floor Plans",
    wings: ["East Wing", "West Wing", "North Wing", "South Wing"],
    type1bhk: { label: "1 bhk", type: "Type - 1Bhk", area: "Area: 380-411 RCA Sq. Ft", price: "Price : Click for price", ctaText: "Download Floor Plan" },
    type2bhk: { label: "2 bhk", type: "Type - 2Bhk", area: "Area: 580-750 RCA Sq. Ft", price: "Price : Click for price", ctaText: "Download Floor Plan" },
    type56bhk: { label: "5,6 bhk", type: "Type - 5,6Bhk", area: "Area: 1200-1800 RCA Sq. Ft", price: "Price : Click for price", ctaText: "Download Floor Plan" }
  },
  amenities: {
    title: "Amenities",
    subtitle: "Thoughtfully crafted surroundings that reflect tradition, comfort, and a human centred design approach.",
    items: [
      { name: "Gymnasium", icon: "🏋️" },
      { name: "Kids Play Area", icon: "🎠" },
      { name: "Kids Play Area", icon: "🎡" },
      { name: "Jogging Track", icon: "🏃" },
      { name: "Yoga Deck", icon: "🧘" },
      { name: "Swimming Pool", icon: "🏊" }
    ]
  },
  moreBuildingsTitle: "Explore More Buildings in the Township",
  aboutDeveloper: {
    title: "About Developer",
    description: "Vighnaharta Developers is more than just a real-estate company – we are dream weavers, committed to building not just homes, but better lives. With a legacy of excellence through thinking approach, we're transforming skylines and setting new standards in quality, innovation, and sustainability.",
    stats: [
      { value: "6", label: "Projects" },
      { value: "1.32 LAC", label: "Sq. Ft. area developed" },
      { value: "449+", label: "Happy families" },
      { value: "3.77LAC", label: "Sq. ft. in pipeline" },
      { value: "2.7LAC", label: "Sq. ft. upcoming" }
    ]
  },
  constructionUpdates: {
    title: "Construction Updates",
    updates: [
      { label: "Under Construction", sublabel: "Tower A", date: "Know More" },
      { label: "Completed", sublabel: "Tower B", date: "Know More" },
      { label: "Completed", sublabel: "Tower C", date: "Know More" }
    ]
  },
  faqs: {
    title: "Frequently Asked Questions",
    items: [
      { question: "What makes Vighnaharta Group a trusted name in real estate in Vikhroli?", answer: "Vighnaharta Group has been delivering quality homes for years with a focus on transparency, timely delivery, and superior construction standards." },
      { question: "What types of residential projects does Vighnaharta Group offer in Vikhroli?", answer: "We offer Smart 1 BHK, Premium 2 BHK, and luxury configurations to suit various budgets and lifestyle preferences." },
      { question: "Why should I invest in Vighnaharta Group's new projects in Vikhroli?", answer: "Vikhroli is a rapidly developing suburb with excellent connectivity, and our projects offer great value appreciation potential." },
      { question: "How does Vighnaharta Group ensure quality and sustainability in its real estate projects?", answer: "We use premium materials, follow strict quality control processes, and incorporate eco-friendly practices in our construction." },
      { question: "How can I learn more about upcoming residential projects by Vighnaharta Group?", answer: "Visit our website, call our sales team, or visit our experience center to get the latest updates on upcoming launches." }
    ]
  }
};

// ===================== API =====================
async function fetchContent() {
  try {
    const res = await fetch(`${API}/content`);
    if (!res.ok) throw new Error('Backend not available');
    return await res.json();
  } catch (e) {
    console.warn('Backend offline, using default content');
    return defaultContent;
  }
}

async function updateSection(section, data, token) {
  try {
    await fetch(`${API}/content/${section}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.warn('Could not save to backend, saved locally only');
  }
}

// ===================== NAVBAR =====================
function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <div className="logo-icon">🌳</div>
        <span>Vighnaharta</span>
      </div>
      <ul className="nav-links">
        {['Home', 'Overview', 'Connectivities', 'Amenities', 'Floor Plans', 'Developer', 'Contact'].map(l => (
          <li key={l}><a href={`#${l.toLowerCase().replace(' ', '-')}`}>{l}</a></li>
        ))}
      </ul>
      <button className="btn-enquiry">Enquiry Now</button>
    </nav>
  );
}

// ===================== HERO =====================
function HeroSection({ data }) {
  if (!data) return null;
  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <h1 className="hero-tagline">{data.tagline}</h1>
        <p className="hero-highlights">{data.highlights}</p>
        <div className="hero-building-img">
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" alt="Building" />
        </div>
      </div>
      <div className="hero-center">
        <div className="hero-tree-icon">🌳</div>
        <h2 className="project-name">{data.projectName}</h2>
        <div className="pricing-grid">
          <div className="price-card">
            <div className="price-type">{data.smart1bhk_label}</div>
            <div className="price-original">@ <s>{data.smart1bhk_original}</s></div>
            <div className="price-current">{data.smart1bhk_price}</div>
            <div className="price-onwards">onwards</div>
          </div>
          <div className="price-divider"></div>
          <div className="price-card">
            <div className="price-type">{data.premium2bhk_label}</div>
            <div className="price-original">@ <s>{data.premium2bhk_original}</s></div>
            <div className="price-current">{data.premium2bhk_price}</div>
            <div className="price-onwards">onwards</div>
          </div>
        </div>
        <div className="hero-address">
          <span className="map-pin">📍</span>
          <span>{data.address}</span>
        </div>
      </div>
    </section>
  );
}

// ===================== ABOUT PROJECT =====================
function AboutProject({ data }) {
  if (!data) return null;
  return (
    <section className="about-project" id="overview">
      <div className="about-images">
        <img className="about-img-main" src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80" alt="Interior" />
        <img className="about-img-secondary" src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&q=80" alt="Garden" />
      </div>
      <div className="about-content">
        <h2>{data.title}</h2>
        <p>{data.description1}</p>
        <blockquote>{data.quote}</blockquote>
        <button className="btn-green">{data.ctaText}</button>
      </div>
    </section>
  );
}

// ===================== FLOOR PLANS =====================
function FloorPlans({ data }) {
  const [activeWing, setActiveWing] = useState(0);
  const [activeType, setActiveType] = useState('type1bhk');
  if (!data) return null;
  const types = { type1bhk: data.type1bhk, type2bhk: data.type2bhk, type56bhk: data.type56bhk };
  const active = types[activeType] || {};

  return (
    <section className="floor-plans" id="floor-plans">
      <div className="fp-wing-tabs">
        {(data.wings || []).map((w, i) => (
          <button key={i} className={activeWing === i ? 'active' : ''} onClick={() => setActiveWing(i)}>{w}</button>
        ))}
      </div>
      <div className="fp-content">
        <div className="fp-image">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" alt="Floor Plan" />
        </div>
        <div className="fp-info">
          <div className="fp-type-tabs">
            {Object.entries(types).map(([key, val]) => val && (
              <button key={key} className={activeType === key ? 'active-green' : ''} onClick={() => setActiveType(key)}>{val.label}</button>
            ))}
          </div>
          <p><strong>{active.type}</strong></p>
          <p>{active.area}</p>
          <p>{active.price}</p>
          <button className="btn-green" style={{ marginTop: '12px' }}>{active.ctaText}</button>
          <div className="fp-thumbnails">
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={`https://images.unsplash.com/photo-155861866${i}-fcd25c85cd64?w=100`} alt="" />
            ))}
          </div>
        </div>
      </div>
      <div className="video-section">
        <div className="video-placeholder">
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80" alt="City View" />
          <div className="play-btn">▶</div>
        </div>
      </div>
    </section>
  );
}

// ===================== AMENITIES =====================
function Amenities({ data }) {
  if (!data) return null;
  return (
    <section className="amenities" id="amenities">
      <div className="amenities-inner">
        <h2>{data.title}</h2>
        <p className="section-subtitle">{data.subtitle}</p>
        <div className="amenities-layout">
          <div className="amenities-img">
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80" alt="Amenities" />
          </div>
          <div className="amenities-grid">
            {(data.items || []).map((item, i) => (
              <div className="amenity-item" key={i}>
                <div className="amenity-icon">{item.icon}</div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-green">View more</button>
      </div>
    </section>
  );
}

// ===================== MORE BUILDINGS =====================
function MoreBuildings({ title }) {
  const buildings = [
    { name: 'Vighnaharta Aaradhya', img: '1486325212027-8081e485255e' },
    { name: 'Newly Launched - Vignaharta Enclave', img: '1545324418-cc1a3fa10c00', highlight: true },
    { name: 'Newly Launched - Vignaharta...', img: '1558618666-fcd25c85cd64' },
  ];
  return (
    <section className="more-buildings">
      <h2>{title}</h2>
      <div className="buildings-slider">
        {buildings.map((b, i) => (
          <div key={i} className={`building-card ${b.highlight ? 'highlighted' : ''}`}>
            <img src={`https://images.unsplash.com/photo-${b.img}?w=300&q=80`} alt={b.name} />
            <p>{b.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===================== ABOUT DEVELOPER =====================
function AboutDeveloper({ data }) {
  if (!data) return null;
  return (
    <section className="about-dev" id="developer">
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <div className="dev-stats">
        {(data.stats || []).map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="dev-images">
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80" alt="Dev1" />
        <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80" alt="Dev2" />
      </div>
    </section>
  );
}

// ===================== CONSTRUCTION UPDATES =====================
function ConstructionUpdates({ data }) {
  if (!data) return null;
  return (
    <section className="construction">
      <div className="construction-inner">
        <h2>{data.title}</h2>
        <div className="construction-grid">
          {(data.updates || []).map((u, i) => (
            <div key={i} className="construction-card">
              <img src={`https://images.unsplash.com/photo-${i === 0 ? '1504307651254-35680f356dfd' : '1545324418-cc1a3fa10c00'}?w=400&q=80`} alt={u.label} />
              <div className="construction-label">
                <strong>{u.label}</strong><br />{u.sublabel}<br /><a href="#contact">{u.date}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== FAQ =====================
function FAQ({ data }) {
  const [open, setOpen] = useState(null);
  if (!data) return null;
  return (
    <section className="faq">
      <h2>{data.title}</h2>
      <div className="faq-list">
        {(data.items || []).map((item, i) => (
          <div key={i} className="faq-item" onClick={() => setOpen(open === i ? null : i)}>
            <div className="faq-q">
              <span>{item.question}</span>
              <span>{open === i ? '−' : '+'}</span>
            </div>
            {open === i && <div className="faq-a">{item.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ===================== ADMIN LOGIN =====================
function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('admin@gmail.com');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (data.success) onLogin(data.token);
      else setErr('Invalid credentials');
    } catch {
      // Fallback login if backend is offline
      if (email === 'admin@gmail.com' && pass === '1234') {
        onLogin('admin-token-12345');
      } else {
        setErr('Invalid credentials. Use admin@gmail.com / 1234');
      }
    }
  };

  return (
    <div className="admin-login">
      <div className="login-card">
        <h2>🔐 Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} required />
          {err && <p className="error">{err}</p>}
          <button type="submit">Login</button>
        </form>
        <p style={{ marginTop: '12px', fontSize: '13px', color: '#888', textAlign: 'cente