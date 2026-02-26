# 🏡 Vighnaharta Infinity - Real Estate Website

A full-stack real estate website with an admin panel to manage content dynamically.

## 🚀 Live URLs
- **Frontend**: (deploy to Vercel)
- **Backend**: (deploy to Render)

---

## 📦 Project Structure
```
realestate/
├── frontend/          # React.js app
└── backend/           # Node.js + Express API
```

---

## ⚙️ Local Setup

### Backend
```bash
cd backend
npm install
node server.js
# Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

---

## 🔐 Admin Panel

**Access**: Click "Admin Panel →" button at the top of the site  
**URL**: `http://localhost:3000` → click Admin Panel

**Credentials:**
| Field | Value |
|-------|-------|
| Email | admin@gmail.com |
| Password | 1234 |

---

## ✏️ Editable Sections (Admin Panel)

| Section | Editable Fields |
|---------|----------------|
| **Hero** | Tagline, highlights, project name, prices, address |
| **About Project** | Title, description, quote, CTA text |
| **Floor Plans** | Wing names, types, areas, prices |
| **Amenities** | Title, subtitle, amenity names & icons |
| **About Developer** | Title, description, stats |
| **Construction Updates** | Title, update labels, dates |
| **FAQs** | Questions and answers |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18 |
| Backend | Node.js + Express.js |
| Database | JSON file (flat file, easily swappable to MongoDB) |
| Auth | Token-based (fixed credentials) |
| Styling | Custom CSS with CSS Variables |
| Fonts | Google Fonts (Playfair Display + DM Sans) |

---

## 🌐 Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Upload dist to Vercel or connect GitHub repo
```

### Backend → Render
1. Create new Web Service on render.com
2. Connect GitHub repo, set root to `backend/`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Update `API` variable in `frontend/src/App.js` with Render URL

---

## 📸 Features

- ✅ Pixel-accurate recreation of reference design
- ✅ Green mint color theme matching reference
- ✅ Playfair Display serif headers
- ✅ Interactive floor plan wing/type selector
- ✅ Expandable FAQ accordion
- ✅ Admin login with fixed credentials
- ✅ Section-by-section content editing
- ✅ Real-time save to backend
- ✅ Mobile responsive
- ✅ Smooth animations

---

## 🗄️ API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/login` | Admin authentication |
| GET | `/api/content` | Get all website content |
| PUT | `/api/content/:section` | Update a section (auth required) |
