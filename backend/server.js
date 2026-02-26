const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'content.json');

// Default content
const defaultContent = {
  hero: {
    tagline: "THINKING OF A FANTASTIC VICINITY?",
    highlights: "20+ PODIUM LUXURIOUS AMENITIES   SPACIOUS BALCONY HOMES*",
    projectName: "VIGHNAHARTA INFINITY",
    smart1bhk_original: "74.99 Lacs",
    smart1bhk_price: "₹ 69.99 Lacs*",
    smart1bhk_label: "SMART 1 BHK",
    premium2bhk_original: "1.05 CR",
    premium2bhk_price: "₹ 96.99 Lacs*",
    premium2bhk_label: "PREMIUM 2 BHK",
    address: "BLDG. NO. 223/224, CIRCLE KANNAMWAR NAGAR 1, VIKHROLI (EAST)"
  },
  aboutProject: {
    title: "About Project",
    description1: "At Vighnaharta Enclave, every detail reflects the grandest gesture of life in the most authentic and desirable home. Guided by a humanist approach, the architecture places people at the heart of the space. Built on the foundations of comfort, it evokes a true sense of freedom, protection, and belonging.",
    quote: '"The moment I entered the house, it felt welcomed" – this feeling defines the privilege Vighnaharta Enclave offers. Thoughtfully designed with crafted amenities and timeless choices, the space resonates with the warmth and authenticity that you and your family truly deserve. It\'s the place your soul has long been searching for.',
    ctaText: "Download Brochure"
  },
  floorPlans: {
    title: "Floor Plans",
    wings: ["East Wing", "West Wing", "North Wing", "South Wing"],
    type1bhk: {
      label: "1 bhk",
      type: "Type - 1Bhk",
      area: "Area: 380-411 RCA Sq. Ft",
      price: "Price : Click for price",
      ctaText: "Download Floor Plan"
    },
    type2bhk: {
      label: "2 bhk",
      type: "Type - 2Bhk",
      area: "Area: 580-750 RCA Sq. Ft",
      price: "Price : Click for price",
      ctaText: "Download Floor Plan"
    },
    type56bhk: {
      label: "5,6 bhk",
      type: "Type - 5,6Bhk",
      area: "Area: 1200-1800 RCA Sq. Ft",
      price: "Price : Click for price",
      ctaText: "Download Floor Plan"
    }
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
      { name: "Yoga Deck", icon: "🧘" }
    ]
  },
  moreBuildingsTitle: "Explore More Buildings in the Township",
  aboutDeveloper: {
    title: "About Developer",
    description: "Vighnaharta Developers is more than just a real-estate company – we are dream weavers, committed to building not just homes, but better lives. With a legacy of excellence through thinking approach, we're transforming skylines and setting new standards in quality, innovation, and sustainability. Our sustainability, our communities, your communities, your sustainability.",
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
      { question: "How can I learn more about upcoming residential projects by Vighnaharta Group in Vikhroli?", answer: "Visit our website, call our sales team, or visit our experience center to get the latest updates on upcoming launches." }
    ]
  }
};

function getContent() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }
  return defaultContent;
}

function saveContent(content) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(content, null, 2));
}

// Initialize content file
if (!fs.existsSync(DATA_FILE)) {
  saveContent(defaultContent);
}

// Auth
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@gmail.com' && password === '1234') {
    res.json({ success: true, token: 'admin-token-12345' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get all content
app.get('/api/content', (req, res) => {
  res.json(getContent());
});

// Update content section
app.put('/api/content/:section', (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer admin-token-12345') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const content = getContent();
  content[req.params.section] = req.body;
  saveContent(content);
  res.json({ success: true });
});

app.listen(5000, () => console.log('Server running on port 5000'));
