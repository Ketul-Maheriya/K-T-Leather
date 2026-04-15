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
