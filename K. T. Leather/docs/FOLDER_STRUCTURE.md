# K.T. Leather Store - Complete Project Structure

## Overview
This project follows a modular architecture separating frontend (React) and backend (Node.js) concerns.

## Complete Directory Structure

```
K. T. Leather/
│
├── 📁 backend/                          # Backend API (Node.js + Express + MongoDB)
│   ├── 📁 models/                       # Mongoose schemas
│   │   ├── Admin.js                     # Admin authentication model with email
│   │   ├── PasswordReset.js             # Password reset tokens (1 hour expiry)
│   │   ├── Enquiry.js                   # Customer enquiry submissions
│   │   ├── Bill.js                      # Invoices with GST calculation
│   │   └── Product.js                   # Product catalog
│   │
│   ├── 📁 routes/                       # API endpoint definitions
│   │   ├── auth.js                      # Login, password reset, change password
│   │   ├── enquiries.js                 # CRUD for customer enquiries
│   │   ├── bills.js                     # Invoice creation, listing, PDF generation
│   │   ├── products.js                  # Product management
│   │   └── dashboard.js                 # Admin dashboard stats
│   │
│   ├── 📁 middleware/                   # Express middleware
│   │   └── authMiddleware.js            # JWT token validation
│   │
│   ├── server.js                        # Main server (modular - NEW)
│   └── README.md                        # Backend documentation
│
├── 📁 src/                              # Frontend source (React)
│   ├── 📁 components/                   # Reusable React components (future)
│   ├── 📁 pages/                        # Page components (future)
│   └── 📁 styles/                       # CSS/styling (future)
│
├── 📁 mnt/user-data/outputs/            # Generated outputs & exports
│   └── 📁 kt-leather-store/
│       └── 📁 backend/
│           └── package.json             # Backend dependencies
│
├── 📁 node_modules/                     # Frontend dependencies
│
│ ── ROOT LEVEL FILES (Frontend Assets)
├── App.jsx                              # Main React component (admin panel, pages)
├── main.jsx                             # React entry point
├── index.html                           # HTML template
├── vite.config.js                       # Vite build configuration
│
├── SERVER FILES
├── server.js                            # ES module version (development)
├── server.cjs                           # CommonJS version (current - running)
│
├── CONFIGURATION FILES
├── package.json                         # Dependencies & scripts
├── .env                                 # Environment variables (SENSITIVE - don't commit)
├── .env.example                         # Example env template
├── .gitignore                           # Git ignore rules
│
├── DOCUMENTATION
├── README.md                            # Project documentation
└── FOLDER_STRUCTURE.md                  # This file
```

## File Purposes

### Backend Models (`backend/models/`)
These define database schemas using Mongoose.

| File | Purpose |
|------|---------|
| `Admin.js` | Stores admin username, email, hashed password |
| `PasswordReset.js` | Temporary tokens for password reset (1-hour expiry) |
| `Enquiry.js` | Customer enquiries with status tracking (new/contacted/closed) |
| `Bill.js` | Invoices with line items, GST calculation, grand total |
| `Product.js` | Product catalog with categories, sizes, colors, prices |

### Backend Routes (`backend/routes/`)
These define API endpoints and business logic.

| File | Main Endpoints |
|------|---|
| `auth.js` | `/auth/login`, `/auth/forgot-password`, `/auth/reset-password` |
| `enquiries.js` | `GET /enquiries` (list), `PATCH /enquiries/:id` (update status) |
| `bills.js` | `POST /bills` (create), `GET /bills/:id/pdf` (PDF export) |
| `products.js` | `GET /products` (public list), `POST /products` (admin create) |
| `dashboard.js` | `GET /dashboard` (stats: enquiries, bills, revenue) |

### Frontend (`root level`)
React components bundled with Vite.

| File | Purpose |
|------|---------|
| `App.jsx` | Main component (navigation, pages, admin panel) |
| `main.jsx` | React DOM render entry |
| `index.html` | HTML template with app root |

## Running the Project

### Development

**Terminal 1: Frontend (Vite dev server)**
```bash
npm run dev
# Runs on http://localhost:3001 (or next available port)
```

**Terminal 2: Backend**
```bash
# Option A: Modular backend (NEW - RECOMMENDED)
node backend/server.js

# Option B: Legacy backend (for compatibility)
node server.cjs
```

Both will auto-create admin on first run with:
- Username: `admin`
- Email: `ktls_yogesh@hotmail.com`
- Password: `ktls@2025`

### Production
1. Update `.env` with production values
2. Build frontend: `npm run build` → generates `dist/` folder
3. Run backend: `node backend/server.js`
4. Serve frontend from `dist/` folder (static files)

## Key Features Implemented

### ✅ Password Reset with Email Validation
- Request reset: `POST /api/auth/forgot-password` (email required)
- Reset password: `POST /api/auth/reset-password` (token + new password)
- Tokens expire after 1 hour
- One-time use only

### ✅ No Credentials Shown in UI
- Removed "Default: admin / ktls@2025" from login form
- Added "Forgot Password?" link
- Shows password reset form on demand

### ✅ Enquiries Display Fixed
- Added error handling in fetch functions
- Improved error logging for debugging
- Handles auth errors gracefully

### ✅ Proper Folder Organization
- Separated models, routes, middleware
- Clean, maintainable code structure
- Ready for team development
- Scalable architecture

## Frontend Routes (Pages)

Users navigate between these pages using the navbar:

| Page | Route | Features |
|------|-------|----------|
| Home | `/` | Hero, services, testimonials |
| About | `/about` | Company history, mission/vision |
| Products | `/products` | Category filter, enquiry CTA |
| Gallery | `/gallery` | Product category showcase |
| Enquiry Form | `/enquiry` | Contact form, WhatsApp CTA |
| Contact | `/contact` | Maps, business hours, address |
| Admin Panel | `/admin` | 5 tabs: Dashboard, Bills, History, Enquiries, Products |

## Database Collections

### Admin
```json
{
  "username": "admin",
  "email": "ktls_yogesh@hotmail.com",
  "password": "hashed_with_bcryptjs",
  "createdAt": "2024-01-01"
}
```

### PasswordReset
```json
{
  "email": "ktls_yogesh@hotmail.com",
  "token": "random_32_byte_hex",
  "expiresAt": "2024-01-01T15:00:00Z",
  "used": false,
  "createdAt": "2024-01-01"
}
```

### Enquiry
```json
{
  "name": "John Doe",
  "company": "ABC Corp",
  "phone": "9825562702",
  "email": "john@abc.com",
  "type": "uniform",
  "interest": "Corporate Uniforms",
  "quantity": "100 pieces",
  "status": "new",
  "createdAt": "2024-01-01"
}
```

### Bill
```json
{
  "billNo": "KT/2024/001",
  "date": "2024-01-01",
  "companyName": "ABC Corp",
  "items": [{"product": "Uniform", "qty": 100, "rate": 500}],
  "subtotal": 50000,
  "gstPercent": 18,
  "gstAmount": 9000,
  "grandTotal": 59000,
  "createdAt": "2024-01-01"
}
```

## Next Steps - Future Enhancements

1. **Email Integration**: Send password reset tokens via email
2. **SMS/WhatsApp**: Auto-reply to enquiries
3. **Dashboard Charts**: Analytics & revenue graphs
4. **Multiple Admins**: Role-based access control (super-admin, manager, viewer)
5. **Audit Logs**: Track all admin actions
6. **Inventory**: Track stock levels
7. **Notifications**: Real-time enquiry alerts
8. **Mobile App**: React Native version
9. **Payment Gateway**: Online invoice payments
10. **Automated Backups**: Daily MongoDB backups

## Development Tips

- Keep `.env` secrets out of git (add to `.gitignore`)
- Test all API endpoints with Postman or Thunder Client
- Run `npm install` after pulling new changes with new dependencies
- Database indexes improve query performance
- Use `nodemon` for auto-reload during backend development
- Browser DevTools → Network tab for debugging API calls

## Support & Troubleshooting

- **Port 5000 blocked?** Change `PORT` in `.env`
- **MongoDB not connecting?** Check `MONGO_URI` in `.env`
- **Frontend not loading?** Ensure backend is running (`http://localhost:5000`)
- **Admin can't login?** Run `/api/auth/setup` endpoint once
- **Enquiries not showing?** Check browser console for errors
