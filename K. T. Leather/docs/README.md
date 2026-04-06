# K.T. Leather Store - Full Stack Application

Premium corporate uniforms, safety equipment, leather, and gifting solutions for Indian businesses.

**Company:** K.T. Leather Store  
**Proprietor:** Yogesh Chandrakantbhai Makwana  
**Established:** 1965 | **Location:** Shahibaug, Ahmedabad  

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file (copy from example)
# Edit with your MongoDB URI

# Terminal 1: Frontend (Vite dev server)
npm run dev

# Terminal 2: Backend (in another terminal)
node server.cjs
# or: node backend/server.js (modular backend)
```

Frontend: `http://localhost:3001`  
Backend API: `http://localhost:5000`

## 📋 Default Admin Credentials

On first run, auto-created admin:
```
Username: admin
Email: ktls_yogesh@hotmail.com
Password: ktls@2025
```

⚠️ **CHANGE THESE IN PRODUCTION!**

## ✨ Recent Updates

✅ **Password Reset** - Email-validated recovery  
✅ **No Credentials in UI** - Removed default password display  
✅ **Fixed Enquiries** - Now display correctly in admin panel  
✅ **Modular Backend** - Organized structure at `/backend`  
✅ **Proper Folder Structure** - Models, routes, middleware separated  

## 📁 Project Structure

```
K. T. Leather/
├── backend/                 # API server (Node.js)
│   ├── models/             # Database schemas
│   ├── routes/             # API endpoints  
│   ├── middleware/         # Auth & middleware
│   └── server.js           # Main backend
├── src/                    # Frontend components (future)
├── App.jsx                 # Main React component
├── server.cjs              # Legacy backend
├── FOLDER_STRUCTURE.md     # Detailed structure
└── README.md               # This file
```

See [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) for complete details.

## 🎯 Core Features

### 🖥️ Frontend (Customer-Facing)
- Homepage with services overview
- Product catalog with category filtering
- Contact form with enquiry submission
- Photo gallery of products
- WhatsApp & phone call buttons
- Responsive design

### ⚙️ Admin Panel  
- Dashboard with KPIs (enquiries, bills, revenue)
- Enquiry management with status tracking
- GST invoice generation with PDF export
- Bill history with search & reprint
- Product catalog management

## 🔐 Security Features

✅ JWT Authentication (24-hour tokens)  
✅ Bcryptjs password hashing  
✅ Secure password reset (1-hour tokens)  
✅ CORS protection  
✅ Environment variable management  

## 🔄 Key API Endpoints

```
Authentication:
  POST   /api/auth/login               # Admin login
  POST   /api/auth/forgot-password     # Request reset
  POST   /api/auth/reset-password      # Complete reset
  POST   /api/auth/change-password     # Change password

Enquiries:
  GET    /api/enquiries                # List (admin only)
  POST   /api/enquiries                # Submit (public)
  PATCH  /api/enquiries/:id            # Update (admin only)

Bills:
  GET    /api/bills                    # List (admin only)
  POST   /api/bills                    # Create (admin only)
  GET    /api/bills/:id/pdf            # PDF (admin only)

Products:
  GET    /api/products                 # List (public)
  POST   /api/products                 # Create (admin only)

Dashboard:
  GET    /api/dashboard                # Stats (admin only)
```

Full API docs: [backend/README.md](./backend/README.md)

## 💾 Database Collections

| Collection | Purpose |
|---|---|
| **Admin** | User accounts with email & hashed passwords |
| **Enquiry** | Customer inquiries with status (new/contacted/closed) |
| **Bill** | Invoices with line items & GST calculation |
| **Product** | Catalog with categories, sizes, colors, prices |
| **PasswordReset** | Tokens for password recovery (1-hour expiry) |

## 🛠️ Development

### Available Scripts

```bash
npm run dev         # Start frontend dev server
npm run build       # Build for production
npm run preview     # Preview production build
```

### Backend Development

```bash
# Modular backend (NEW - Recommended)
node backend/server.js

# Legacy backend (for compatibility)
node server.cjs

# Auto-reload with nodemon:
npx nodemon backend/server.js
```

## 🚀 Deployment

### Frontend
1. Build: `npm run build`
2. Deploy `dist/` folder to Vercel, Netlify, etc.
3. Update API URL in environment

### Backend
1. Update production `.env`
2. Deploy to Heroku, Railway, AWS, etc.
3. Set environment variables securely

## 📊 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, JavaScript |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose 9 |
| Security | JWT, bcryptjs |
| PDF | PDFKit |
| HTTP | CORS, Axios |

## 📝 Features Coming Soon

- Email integration for password resets
- SMS/WhatsApp API for auto-replies
- Multi-admin support with roles
- Advanced analytics
- Inventory management
- Payment gateway integration
- Mobile app (React Native)

## 📧 Contact

**Business:**
- Email: ktls_yogesh@hotmail.com
- Phone: +91 98255 62702 / +91 82006 47440
- Address: 09/SF, Vaibhav Laxmi Complex, Shahibaug, Ahmedabad-380004
- GST: 24AOXPM5482M1Z0

## 📄 License

© 2024 K.T. Leather Store. All rights reserved.

---

**Last Updated:** 2024 | **Status:** ✅ Production Ready
# For Atlas: MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ktleather

# Start the server
npm run dev
```

Server will run at: `http://localhost:5000`

**First run:** The server auto-creates admin credentials:
- Username: `admin`
- Password: `ktls@2025`

---

### Step 2: Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Website will open at: `http://localhost:3000`

---

### Step 3: Build for Production

```bash
# Build frontend
cd frontend
npm run build
# Creates: frontend/dist/ folder

# Deploy dist/ folder to any hosting:
# - Netlify (drag & drop dist/)
# - Vercel (connect GitHub)
# - cPanel (upload dist/ contents to public_html)
```

---

## 📄 Features

### Public Website
| Page | Description |
|------|-------------|
| **Home** | Hero banner, services overview, why choose us, testimonials |
| **About** | Company history since 1965, proprietor info, mission/vision |
| **Products** | Filtered catalog with sizes, colors, qualities, price range |
| **Gallery** | Product category showcase |
| **Enquiry** | General, uniform customization, sample request forms |
| **Contact** | Map embed, phone, WhatsApp, business hours |

### Admin Panel (`/admin`)
| Feature | Description |
|---------|-------------|
| **Login** | Secure JWT-based admin login |
| **Bill Generator** | Enter company, products, qty, rate → generate printable GST bill |
| **Bill History** | View, search, reprint all generated bills |
| **Enquiries** | View all customer enquiries with contact details |
| **Products** | View product catalog (add/edit via API) |

---

## 🧾 Bill Generation

1. Go to website → click **Admin** in navbar
2. Login with `admin` / `ktls@2025`
3. Go to **Generate Bill** tab
4. Fill: Bill No, Date, Company Name, Client Address (optional), Client GST (optional)
5. Add items: Product name, Quantity, Rate
6. Select GST% (0, 5, 12, 18, 28)
7. Click **Print / Save Bill** → browser print dialog opens
8. Select **Save as PDF** or **Print**

---

## 🌐 API Endpoints

### Auth
- `POST /api/auth/login` – Admin login
- `POST /api/auth/change-password` – Change admin password

### Enquiries
- `POST /api/enquiries` – Submit enquiry (public)
- `GET /api/enquiries` – Get all enquiries (admin)
- `PATCH /api/enquiries/:id` – Update enquiry status (admin)

### Bills
- `POST /api/bills` – Create bill (admin)
- `GET /api/bills` – Get all bills (admin, filterable by company/date)
- `GET /api/bills/:id/pdf` – Download PDF (admin)
- `GET /api/bills/next-number` – Get next auto bill number (admin)

### Products
- `GET /api/products` – Get products (public, filterable by category)
- `POST /api/products` – Add product (admin)
- `PUT /api/products/:id` – Update product (admin)
- `DELETE /api/products/:id` – Deactivate product (admin)

### Dashboard
- `GET /api/dashboard` – Stats summary (admin)

---

## 🚀 Deployment Options

### Option A: Shared Hosting (cPanel)
1. Build frontend: `npm run build` in frontend folder
2. Upload `frontend/dist/*` to `public_html/`
3. For backend: Use a VPS or Railway/Render (free)

### Option B: Vercel + Railway (Recommended – Free)
1. Push code to GitHub
2. Deploy frontend on **Vercel** (connect repo, set root to `frontend/`)
3. Deploy backend on **Railway.app** (connect repo, set root to `backend/`)
4. Set environment variables on Railway

### Option C: VPS (DigitalOcean/Hostinger)
1. Upload both folders to server
2. Install Node.js and MongoDB
3. Use `pm2` to keep backend running
4. Use Nginx as reverse proxy

---

## 🔐 Security Notes for Production

1. Change `JWT_SECRET` in `.env` to a strong random string
2. Change admin password from `ktls@2025` to something strong
3. Add HTTPS (SSL certificate via Let's Encrypt)
4. Set up MongoDB authentication

---

## 📱 WhatsApp & Call Integration

Floating buttons on every page:
- 💬 WhatsApp: Opens chat with +91 98255 62702
- 📞 Call: Dials 9825562702 directly

---

## 🗺️ Google Business Profile (Manual Steps)

1. Go to: https://business.google.com
2. Click "Add your business"
3. Enter: **K.T. Leather Store**
4. Category: **Uniform Store** / **Safety Equipment Supplier**
5. Address: 09/SF, Vaibhav Laxmi Complex, Nr. H.B. Kapadia School, Shahibaug, Ahmedabad-380004
6. Phone: 9825562702
7. Website: (your deployed website URL)
8. Verify via phone/postcard

---

## 📞 Support

**Proprietor:** Yogesh Chandrakantbhai Makwana  
**Phone:** 9825562702 / 8200647440  
**Email:** ktls_yogesh@hotmail.com  
**GST:** 24AOXPM5482M1Z0
