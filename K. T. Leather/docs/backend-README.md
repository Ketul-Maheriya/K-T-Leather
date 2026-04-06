# K.T. Leather Store - Backend Directory Structure

## Project Organization

```
backend/
├── models/                 # Mongoose schemas
│   ├── Admin.js           # Admin user model with email & password
│   ├── PasswordReset.js   # Password reset tokens
│   ├── Enquiry.js         # Customer enquiries
│   ├── Bill.js            # Invoices & bills
│   └── Product.js         # Products catalog
│
├── routes/                 # API endpoints
│   ├── auth.js            # Authentication (login, signup, password reset)
│   ├── enquiries.js       # Enquiry CRUD operations
│   ├── bills.js           # Bill/Invoice management
│   ├── products.js        # Product management
│   └── dashboard.js       # Admin dashboard stats
│
├── middleware/             # Express middleware
│   └── authMiddleware.js  # JWT authentication & authorization
│
├── controllers/            # Business logic (optional - for future expansion)
│   └── (placeholder)
│
└── server.js              # Express app & server setup

root/
├── server.cjs             # Old monolithic server (keep for backwards compatibility)
├── App.jsx                # React frontend (SPA)
├── main.jsx               # React entry point
├── index.html             # HTML template
├── package.json           # Dependencies
├── .env                   # Environment variables (DONT COMMIT)
└── .env.example           # Example env file
```

## How to Run

### Option 1: Modular Backend (Recommended)
```bash
node backend/server.js
```

### Option 2: Legacy Backend (Backwards compatible)
```bash
node server.cjs
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/setup` - Initialize admin (run once)
- `POST /api/auth/change-password` - Change password (requires auth)
- `POST /api/auth/forgot-password` - Request password reset (public)
- `POST /api/auth/reset-password` - Reset password with token (public)

### Enquiries
- `POST /api/enquiries` - Submit enquiry (public)
- `GET /api/enquiries` - List enquiries (admin only)
- `GET /api/enquiries/:id` - Get single enquiry (admin only)
- `PATCH /api/enquiries/:id` - Update enquiry status (admin only)
- `DELETE /api/enquiries/:id` - Delete enquiry (admin only)

### Bills/Invoices
- `POST /api/bills` - Create invoice (admin only)
- `GET /api/bills` - List invoices (admin only)
- `GET /api/bills/:id` - Get invoice (admin only)
- `GET /api/bills/:id/pdf` - Download PDF (admin only)
- `GET /api/bills/next-bill/number` - Get next bill number (admin only)

### Products
- `GET /api/products` - List products (public)
- `POST /api/products` - Create product (admin only)
- `GET /api/products/:id` - Get product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Deactivate product (admin only)

### Dashboard
- `GET /api/dashboard` - Get dashboard stats (admin only)

## Environment Variables

See `.env.example` for required environment variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ktleather
JWT_SECRET=your_secret_key_here
```

## Default Admin Credentials

- Username: `admin`
- Email: `ktls_yogesh@hotmail.com`
- Password: `ktls@2025`

**Change these in production!**

## Password Reset Flow

1. User requests reset: `POST /api/auth/forgot-password` with email
2. System generates token (valid 1 hour) and returns it (for development)
3. In production: Send token via email
4. User submits token + new password: `POST /api/auth/reset-password`
5. System updates password and marks token as used

## Future Improvements

- [ ] Email integration for password reset notifications
- [ ] Role-based access control (multiple admin levels)
- [ ] Audit logging for all admin actions
- [ ] SMS/WhatsApp API for enquiry notifications
- [ ] Automated bill reminders
- [ ] Payment gateway integration
- [ ] Product analytics
- [ ] Inventory management
