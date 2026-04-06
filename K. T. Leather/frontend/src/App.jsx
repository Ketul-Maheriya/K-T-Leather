import { useState, useEffect, useRef } from "react";

// ============================================================
// CONSTANTS & DATA
// ============================================================
const COMPANY = {
  name: "K.T. Leather Store",
  tagline: "Excellence in Corporate Uniforms & Leather Since 1965",
  proprietor: "Yogesh Chandrakantbhai Makwana",
  established: 1965,
  gst: "24AOXPM5482M1Z0",
  address: "09/SF, Vaibhav Laxmi Complex, Nr. H.B. Kapadia School, Shahibaug, Ahmedabad-380004",
  email: "ktls_yogesh@hotmail.com",
  phone1: "9825562702",
  phone2: "8200647440",
  whatsapp: "919825562702",
};

const PRODUCTS = [
  {
    id: 1, category: "uniforms", name: "Executive Corporate Uniform",
    description: "Premium corporate uniforms with your company branding. Available in all sizes.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Navy Blue", "Black", "Grey", "White", "Maroon", "Royal Blue"],
    qualities: ["Cotton", "Polyester-Cotton Blend", "Premium Wool Blend"],
    priceRange: "₹450 – ₹1,200 per piece",
    icon: "👔",
    features: ["Custom Logo Embroidery", "Multiple Fabric Options", "Bulk Orders Welcome"]
  },
  {
    id: 2, category: "uniforms", name: "Industrial Work Uniform",
    description: "Heavy-duty uniforms for industrial environments. Durable and comfortable.",
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Orange", "Navy", "Grey", "Green", "Blue"],
    qualities: ["Heavy Cotton", "FR Fabric", "Ripstop Polyester"],
    priceRange: "₹600 – ₹1,800 per piece",
    icon: "🦺",
    features: ["Fire Retardant Options", "Reflective Strips", "Reinforced Stitching"]
  },
  {
    id: 3, category: "safety", name: "Safety Shoes",
    description: "ISI certified safety footwear for industrial and corporate use.",
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    colors: ["Black", "Brown", "Grey"],
    qualities: ["Basic Safety", "Premium Leather", "Steel Toe Cap"],
    priceRange: "₹600 – ₹2,500 per pair",
    icon: "👟",
    features: ["Steel Toe Cap", "Anti-slip Sole", "ISI Certified"]
  },
  {
    id: 4, category: "safety", name: "Safety Equipment Kit",
    description: "Complete safety solutions – helmets, gloves, goggles, masks and more.",
    sizes: ["Standard", "Universal"],
    colors: ["Yellow", "White", "Orange", "Blue"],
    qualities: ["Standard", "Premium", "Industrial Grade"],
    priceRange: "₹200 – ₹5,000 per kit",
    icon: "⛑️",
    features: ["ISI Certified", "Bulk Supply", "Custom Branding"]
  },
  {
    id: 5, category: "gifts", name: "Corporate Gift Articles",
    description: "Premium branded gift items for corporate clients and events.",
    sizes: ["N/A"],
    colors: ["Customizable"],
    qualities: ["Standard", "Premium", "Luxury"],
    priceRange: "₹150 – ₹5,000 per piece",
    icon: "🎁",
    features: ["Company Branding", "Bulk Discounts", "Custom Packaging"]
  },
  {
    id: 6, category: "gifts", name: "Promotional T-Shirts",
    description: "Custom printed/embroidered T-shirts for events, teams, and promotions.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["All Colors Available"],
    qualities: ["Basic Cotton", "Premium Cotton", "Dri-Fit"],
    priceRange: "₹180 – ₹650 per piece",
    icon: "👕",
    features: ["Custom Print/Embroidery", "Quick Turnaround", "Minimum 10 pcs"]
  },
  {
    id: 7, category: "leather", name: "Furniture Leather & Rexine",
    description: "Premium leather and Rexine material for furniture manufacturers and upholstery.",
    sizes: ["Per Meter", "Per Roll"],
    colors: ["All Shades Available"],
    qualities: ["Synthetic Rexine", "Semi-Leather", "Genuine Leather"],
    priceRange: "₹80 – ₹800 per meter",
    icon: "🛋️",
    features: ["Wide Variety", "Wholesale Rates", "Color Matching"]
  },
  {
    id: 8, category: "leather", name: "Upholstery Materials",
    description: "Complete upholstery solutions for furniture makers – fabric, foam, accessories.",
    sizes: ["Per Meter", "Per Roll"],
    colors: ["Extensive Range"],
    qualities: ["Economy", "Standard", "Premium"],
    priceRange: "₹60 – ₹500 per meter",
    icon: "🪑",
    features: ["Bulk Supply", "Trade Pricing", "Sample Swatches Available"]
  },
];

const CATEGORIES = [
  { id: "all", label: "All Products", icon: "🏪" },
  { id: "uniforms", label: "Uniforms", icon: "👔" },
  { id: "safety", label: "Safety Equipment", icon: "⛑️" },
  { id: "gifts", label: "Gifts & T-Shirts", icon: "🎁" },
  { id: "leather", label: "Leather & Rexine", icon: "🛋️" },
];

const TESTIMONIALS = [
  { company: "Adani Group Supplier", text: "K.T. Leather Store has been our uniform partner for 8 years. Quality and delivery are always on point.", person: "Procurement Head" },
  { company: "Gujarat State Corporation", text: "Excellent quality safety shoes and uniforms. Yogesh bhai always provides the best fabric options for our budget.", person: "Admin Manager" },
  { company: "Pharmaceutical Company, Ahmedabad", text: "We source all our corporate gifts and T-shirts from KT Leather. Always satisfied with branding quality.", person: "HR Director" },
];

// ============================================================
// ADMIN BILL GENERATOR (embedded in app)
// ============================================================
function generateBillHTML(billData) {
  const rows = billData.items.map(item =>
    `<tr>
      <td>${item.product}</td>
      <td>${item.qty}</td>
      <td>₹${Number(item.rate).toLocaleString("en-IN")}</td>
      <td>₹${Number(item.qty * item.rate).toLocaleString("en-IN")}</td>
    </tr>`
  ).join("");
  const subtotal = billData.items.reduce((s, i) => s + i.qty * i.rate, 0);
  const gstAmt = Math.round(subtotal * billData.gstPercent / 100);
  const grand = subtotal + gstAmt;

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Bill - ${billData.billNo}</title>
<style>
  body{font-family:Arial,sans-serif;padding:30px;color:#222;max-width:800px;margin:auto}
  .header{text-align:center;border-bottom:3px solid #5c2d09;padding-bottom:16px;margin-bottom:20px}
  .co-name{font-size:26px;font-weight:800;color:#5c2d09;letter-spacing:1px}
  .co-sub{font-size:12px;color:#555;margin-top:4px}
  .bill-meta{display:flex;justify-content:space-between;margin:16px 0}
  .bill-meta div{font-size:13px}
  .client-box{background:#fdf6ee;border:1px solid #ddd;padding:12px;border-radius:6px;margin:12px 0}
  table{width:100%;border-collapse:collapse;margin:16px 0}
  th{background:#5c2d09;color:#fff;padding:10px;text-align:left;font-size:13px}
  td{padding:9px 10px;border-bottom:1px solid #eee;font-size:13px}
  .totals{text-align:right;margin-top:10px}
  .totals table{width:260px;margin-left:auto}
  .grand{font-size:16px;font-weight:bold;color:#5c2d09}
  .footer{margin-top:40px;display:flex;justify-content:space-between;font-size:12px;color:#666;border-top:1px solid #ddd;padding-top:16px}
  .sign{text-align:right}
  @media print{body{padding:10px}}
</style></head>
<body>
<div class="header">
  <div class="co-name">K.T. LEATHER STORE</div>
  <div class="co-sub">09/SF, Vaibhav Laxmi Complex, Nr. H.B. Kapadia School, Shahibaug, Ahmedabad-380004</div>
  <div class="co-sub">GST: 24AOXPM5482M1Z0 &nbsp;|&nbsp; Tel: 9825562702 / 8200647440 &nbsp;|&nbsp; Email: ktls_yogesh@hotmail.com</div>
</div>
<div class="bill-meta">
  <div><strong>Bill No:</strong> ${billData.billNo}<br><strong>Date:</strong> ${billData.date}</div>
  <div style="text-align:right"><strong>Proprietor:</strong> Yogesh Chandrakantbhai Makwana<br><strong>Est.:</strong> 1965</div>
</div>
<div class="client-box">
  <strong>Billed To:</strong><br>
  Company: <strong>${billData.companyName}</strong><br>
  ${billData.clientAddress ? `Address: ${billData.clientAddress}<br>` : ""}
  ${billData.clientGst ? `GST No.: ${billData.clientGst}` : ""}
</div>
<table>
  <thead><tr><th>Product / Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
<div class="totals">
  <table>
    <tr><td>Subtotal</td><td>₹${subtotal.toLocaleString("en-IN")}</td></tr>
    <tr><td>GST (${billData.gstPercent}%)</td><td>₹${gstAmt.toLocaleString("en-IN")}</td></tr>
    <tr class="grand"><td><strong>Grand Total</strong></td><td><strong>₹${grand.toLocaleString("en-IN")}</strong></td></tr>
  </table>
</div>
<div class="footer">
  <div>Thank you for your business!<br>Payment due within 30 days.</div>
  <div class="sign">_______________________<br>Authorized Signatory<br><strong>K.T. Leather Store</strong></div>
</div>
</body></html>`;
}

// ============================================================
// COMPONENTS
// ============================================================

function Navbar({ page, setPage, adminLoggedIn }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "gallery", label: "Gallery" },
    { id: "enquiry", label: "Enquiry" },
    { id: "contact", label: "Contact" },
    { id: "admin", label: adminLoggedIn ? "⚙ Admin" : "Admin" },
  ];
  return (
    <nav style={styles.nav}>
      <div style={styles.navInner}>
        <div style={styles.navBrand} onClick={() => setPage("home")}>
          <div style={styles.navLogo}>KT</div>
          <div>
            <div style={styles.navName}>K.T. Leather Store</div>
            <div style={styles.navSub}>Est. 1965 · Ahmedabad</div>
          </div>
        </div>
        <div style={{ ...styles.navLinks, display: open ? "flex" : undefined }} className="navlinks">
          {links.map(l => (
            <button key={l.id} style={{ ...styles.navLink, ...(page === l.id ? styles.navLinkActive : {}) }}
              onClick={() => { setPage(l.id); setOpen(false); }}>
              {l.label}
            </button>
          ))}
        </div>
        <button style={styles.burger} onClick={() => setOpen(o => !o)}>☰</button>
      </div>
    </nav>
  );
}

function Hero({ setPage }) {
  return (
    <section style={styles.hero}>
      <div style={styles.heroOverlay} />
      <div style={styles.heroContent}>
        <div style={styles.heroBadge}>Established 1965 · Ahmedabad</div>
        <h1 style={styles.heroTitle}>
          Premium Corporate<br />
          <span style={styles.heroAccent}>Uniforms & Leather</span>
        </h1>
        <p style={styles.heroSub}>
          Trusted by 500+ corporate clients across Gujarat. From bespoke uniforms to safety equipment, leather upholstery & corporate gifting.
        </p>
        <div style={styles.heroActions}>
          <button style={styles.btnPrimary} onClick={() => setPage("products")}>Explore Products</button>
          <button style={styles.btnOutline} onClick={() => setPage("enquiry")}>Request a Quote</button>
        </div>
        <div style={styles.heroStats}>
          {[["60+", "Years Experience"], ["500+", "Corporate Clients"], ["8", "Product Categories"], ["10K+", "Units Delivered"]].map(([n, l]) => (
            <div key={l} style={styles.heroStat}>
              <span style={styles.heroStatNum}>{n}</span>
              <span style={styles.heroStatLabel}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesStrip({ setPage }) {
  const services = [
    { icon: "👔", label: "Corporate Uniforms", sub: "All colors, sizes & fabrics" },
    { icon: "⛑️", label: "Safety Equipment", sub: "ISI certified products" },
    { icon: "🎁", label: "Corporate Gifts", sub: "Branded & customized" },
    { icon: "👟", label: "Safety Shoes", sub: "Fashion & industrial" },
    { icon: "🛋️", label: "Leather & Rexine", sub: "For furniture manufacturers" },
    { icon: "🪡", label: "Upholstery Material", sub: "Wholesale pricing" },
  ];
  return (
    <section style={styles.strip}>
      <div style={styles.sectionHeader}>
        <div style={styles.sectionTag}>What We Offer</div>
        <h2 style={styles.sectionTitle}>Our Core Services</h2>
      </div>
      <div style={styles.servicesGrid}>
        {services.map(s => (
          <div key={s.label} style={styles.serviceCard} onClick={() => setPage("products")}>
            <div style={styles.serviceIcon}>{s.icon}</div>
            <div style={styles.serviceLabel}>{s.label}</div>
            <div style={styles.serviceSub}>{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    { icon: "🏆", title: "60+ Years Legacy", desc: "Family business since 1965. Trust built over generations." },
    { icon: "🎯", title: "Custom Orders", desc: "Any color, any size, any fabric. Company branding included." },
    { icon: "🤝", title: "Direct Manufacturer", desc: "No middlemen. Better prices, faster delivery." },
    { icon: "📋", title: "GST Billing", desc: "Proper GST invoicing for all corporate purchases." },
    { icon: "🚀", title: "Fast Delivery", desc: "Bulk orders fulfilled efficiently across Gujarat." },
    { icon: "💬", title: "Personal Service", desc: "Samples shown at your office. We come to you." },
  ];
  return (
    <section style={styles.whySection}>
      <div style={styles.sectionHeader}>
        <div style={styles.sectionTag}>Why Choose Us</div>
        <h2 style={styles.sectionTitle}>The K.T. Leather Advantage</h2>
      </div>
      <div style={styles.whyGrid}>
        {points.map(p => (
          <div key={p.title} style={styles.whyCard}>
            <div style={styles.whyIcon}>{p.icon}</div>
            <h3 style={styles.whyTitle}>{p.title}</h3>
            <p style={styles.whyDesc}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section style={styles.testimonialSection}>
      <div style={styles.sectionHeader}>
        <div style={{ ...styles.sectionTag, background: "#fff2", color: "#f5c97a" }}>Client Voices</div>
        <h2 style={{ ...styles.sectionTitle, color: "#fff" }}>What Our Clients Say</h2>
      </div>
      <div style={styles.testimonialsGrid}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} style={styles.testimonialCard}>
            <div style={styles.testimonialQuote}>"</div>
            <p style={styles.testimonialText}>{t.text}</p>
            <div style={styles.testimonialPerson}>
              <strong>{t.person}</strong><br /><span style={{ color: "#f5c97a" }}>{t.company}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <div style={styles.page}>
      <div style={styles.pageHero}>
        <h1 style={styles.pageTitle}>About K.T. Leather Store</h1>
        <p style={styles.pageSubtitle}>Six decades of trust, quality and service</p>
      </div>
      <div style={styles.pageContent}>
        <div style={styles.aboutGrid}>
          <div>
            <h2 style={styles.aboutHeading}>Our Story</h2>
            <p style={styles.aboutText}>K.T. Leather Store was founded in <strong>1965</strong> in Ahmedabad by the Makwana family with a simple mission: provide quality leather and uniform solutions to corporate Gujarat. Over six decades, we have grown from a small leather supplier to a comprehensive corporate solutions provider.</p>
            <p style={styles.aboutText}>Today, under the proprietorship of <strong>Yogesh Chandrakantbhai Makwana</strong>, we serve 500+ corporate clients with uniforms, safety equipment, corporate gifts, leather, Rexine, and upholstery materials. We are proud members of <strong>BNI</strong> and registered under <strong>MSME</strong>.</p>
            <p style={styles.aboutText}>Our unique approach: we visit your office, show physical samples, understand your requirements, and deliver custom solutions at competitive prices — with full GST billing.</p>
          </div>
          <div>
            <div style={styles.aboutInfoCard}>
              <h3 style={styles.aboutInfoTitle}>Company Details</h3>
              {[
                ["Company", "K.T. Leather Store"],
                ["Proprietor", "Yogesh Chandrakantbhai Makwana"],
                ["Established", "1965"],
                ["GST No.", "24AOXPM5482M1Z0"],
                ["Memberships", "BNI, MSME Registered"],
                ["Location", "Shahibaug, Ahmedabad"],
              ].map(([k, v]) => (
                <div key={k} style={styles.infoRow}>
                  <span style={styles.infoKey}>{k}</span>
                  <span style={styles.infoVal}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={styles.missionGrid}>
          {[
            { icon: "🎯", title: "Our Mission", text: "To be Gujarat's most trusted supplier of corporate uniforms, safety equipment, and leather solutions with unmatched quality and service." },
            { icon: "👁️", title: "Our Vision", text: "To digitize and expand our reach across India while maintaining the personal touch that has made us trusted for 60 years." },
            { icon: "💎", title: "Our Values", text: "Quality, Integrity, Personalized Service, Fair Pricing, and Long-term Relationships with every client." },
          ].map(m => (
            <div key={m.title} style={styles.missionCard}>
              <div style={styles.missionIcon}>{m.icon}</div>
              <h3 style={styles.missionTitle}>{m.title}</h3>
              <p style={styles.missionText}>{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onEnquire }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={styles.productCard}>
      <div style={styles.productIcon}>{product.icon}</div>
      <h3 style={styles.productName}>{product.name}</h3>
      <p style={styles.productDesc}>{product.description}</p>
      <div style={styles.productPrice}>{product.priceRange}</div>
      {expanded && (
        <div style={styles.productDetails}>
          <div style={styles.detailRow}><span style={styles.detailKey}>Sizes:</span> {product.sizes.join(", ")}</div>
          <div style={styles.detailRow}><span style={styles.detailKey}>Colors:</span> {product.colors.join(", ")}</div>
          <div style={styles.detailRow}><span style={styles.detailKey}>Quality:</span> {product.qualities.join(", ")}</div>
          <div style={{ marginTop: 8 }}>
            {product.features.map(f => <span key={f} style={styles.featureTag}>{f}</span>)}
          </div>
        </div>
      )}
      <div style={styles.productActions}>
        <button style={styles.btnSmall} onClick={() => setExpanded(e => !e)}>{expanded ? "Less ↑" : "Details ↓"}</button>
        <button style={styles.btnPrimarySmall} onClick={() => onEnquire(product.name)}>Enquire</button>
      </div>
    </div>
  );
}

function ProductsPage({ setPage, setEnquiryProduct }) {
  const [cat, setCat] = useState("all");
  const filtered = cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
  const handleEnquire = (name) => { setEnquiryProduct(name); setPage("enquiry"); };
  return (
    <div style={styles.page}>
      <div style={styles.pageHero}>
        <h1 style={styles.pageTitle}>Our Products</h1>
        <p style={styles.pageSubtitle}>Custom solutions for every corporate need</p>
      </div>
      <div style={styles.pageContent}>
        <div style={styles.catBar}>
          {CATEGORIES.map(c => (
            <button key={c.id} style={{ ...styles.catBtn, ...(cat === c.id ? styles.catBtnActive : {}) }}
              onClick={() => setCat(c.id)}>{c.icon} {c.label}</button>
          ))}
        </div>
        <div style={styles.productsGrid}>
          {filtered.map(p => <ProductCard key={p.id} product={p} onEnquire={handleEnquire} />)}
        </div>
      </div>
    </div>
  );
}

function GalleryPage() {
  const items = [
    { label: "Corporate Uniforms", icon: "👔", color: "#5c2d09" },
    { label: "Industrial Workwear", icon: "🦺", color: "#b04000" },
    { label: "Safety Equipment", icon: "⛑️", color: "#8b4513" },
    { label: "Safety Shoes", icon: "👟", color: "#5c2d09" },
    { label: "Corporate Gifts", icon: "🎁", color: "#a0522d" },
    { label: "Branded T-Shirts", icon: "👕", color: "#b04000" },
    { label: "Leather Material", icon: "🛋️", color: "#8b4513" },
    { label: "Rexine Upholstery", icon: "🪑", color: "#5c2d09" },
    { label: "Furniture Leather", icon: "🏠", color: "#a0522d" },
  ];
  return (
    <div style={styles.page}>
      <div style={styles.pageHero}>
        <h1 style={styles.pageTitle}>Product Gallery</h1>
        <p style={styles.pageSubtitle}>A glimpse of our work and product range</p>
      </div>
      <div style={styles.pageContent}>
        <div style={styles.galleryGrid}>
          {items.map((item, i) => (
            <div key={i} style={{ ...styles.galleryCard, background: item.color }}>
              <div style={styles.galleryIcon}>{item.icon}</div>
              <div style={styles.galleryLabel}>{item.label}</div>
            </div>
          ))}
        </div>
        <div style={styles.galleryNote}>
          📸 Physical samples are available on request. Contact us to schedule a visit at your office.
        </div>
      </div>
    </div>
  );
}

function EnquiryPage({ preProduct }) {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", interest: preProduct || "", quantity: "", message: "", type: "general" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  
  const handleSubmit = async () => {
    setError("");
    
    // Validation
    if (!form.name || form.name.trim().length === 0) return setError("Name is required");
    if (!form.phone || form.phone.trim().length === 0) return setError("Phone number is required");
    if (form.phone.length < 10) return setError("Please enter a valid phone number (min 10 digits)");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Please enter a valid email address");
    
    // Submit to API
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to submit enquiry. Please try again.");
        return;
      }
      
      // Success - show success message
      setSent(true);
      console.log("✅ Enquiry submitted:", data);
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setError("Server error. Is the backend running? Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (sent) return (
    <div style={styles.page}>
      <div style={styles.successBox}>
        <div style={styles.successIcon}>✅</div>
        <h2 style={styles.successTitle}>Enquiry Submitted!</h2>
        <p>Thank you, <strong>{form.name}</strong>! We will contact you within 24 hours.</p>
        <p style={{ color: "#888", fontSize: 14 }}>You can also WhatsApp us directly at +91 98255 62702</p>
        <button style={styles.btnPrimary} onClick={() => {
          setSent(false);
          setForm({ name: "", company: "", phone: "", email: "", interest: "", quantity: "", message: "", type: "general" });
          setError("");
        }}>New Enquiry</button>
      </div>
    </div>
  );
  return (
    <div style={styles.page}>
      <div style={styles.pageHero}>
        <h1 style={styles.pageTitle}>Send Enquiry</h1>
        <p style={styles.pageSubtitle}>Get a quote or request samples</p>
      </div>
      <div style={styles.pageContent}>
        <div style={styles.enquiryLayout}>
          <div style={styles.enquiryForm}>
            <h3 style={styles.formTitle}>General / Sample Enquiry</h3>
            <div style={styles.radioGroup}>
              {["general", "uniform", "safety", "leather", "gifts"].map(t => (
                <label key={t} style={styles.radioLabel}>
                  <input type="radio" name="type" value={t} checked={form.type === t} onChange={handleChange} style={{ marginRight: 6 }} />
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </label>
              ))}
            </div>
            {[
              ["name", "Your Name *", "text"],
              ["company", "Company Name", "text"],
              ["phone", "Phone / WhatsApp *", "tel"],
              ["email", "Email", "email"],
              ["interest", "Product of Interest", "text"],
              ["quantity", "Approx. Quantity", "text"],
            ].map(([k, label, type]) => (
              <div key={k} style={styles.formGroup}>
                <label style={styles.formLabel}>{label}</label>
                <input name={k} type={type} value={form[k]} onChange={handleChange} style={styles.input} placeholder={label} />
              </div>
            ))}
            {form.type === "uniform" && (
              <div style={styles.uniformExtra}>
                <h4 style={styles.extraTitle}>Uniform Customization</h4>
                {[["fabric", "Fabric Quality (Cotton/Polyester/Blend)", "text"], ["colors", "Preferred Colors", "text"], ["branding", "Company Logo Branding?", "text"]].map(([k, label, type]) => (
                  <div key={k} style={styles.formGroup}>
                    <label style={styles.formLabel}>{label}</label>
                    <input name={k} type={type} value={form[k] || ""} onChange={handleChange} style={styles.input} />
                  </div>
                ))}
              </div>
            )}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Additional Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} style={styles.textarea} placeholder="Any specific requirements..." rows={4} />
            </div>
            {error && <p style={{ color: "#c00", fontSize: 13, background: "#fee", padding: "10px 12px", borderRadius: 6, marginBottom: 16 }}>❌ {error}</p>}
            <button style={{ ...styles.btnPrimary, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }} onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Enquiry →"}
            </button>
          </div>
          <div style={styles.enquirySide}>
            <div style={styles.enquirySideCard}>
              <h4 style={styles.sideCardTitle}>Quick Contact</h4>
              <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" style={styles.waBtn}>💬 WhatsApp Us</a>
              <a href={`tel:${COMPANY.phone1}`} style={styles.callBtn}>📞 Call Now</a>
            </div>
            <div style={styles.enquirySideCard}>
              <h4 style={styles.sideCardTitle}>What We Offer</h4>
              <ul style={styles.offerList}>
                {["Physical samples at your office", "Custom colors & sizes", "Company logo branding", "Bulk discount pricing", "GST invoice included", "Fast delivery across Gujarat"].map(o => (
                  <li key={o} style={styles.offerItem}>✓ {o}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get token from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Reset token is missing. Please use the link from your email.");
      return;
    }

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password. Token may be expired.");
        return;
      }

      setSuccess("✅ Password reset successfully! You can now login with your new password.");
      setTimeout(() => {
        window.location.href = "/"; // Redirect to home
      }, 3000);
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={{ maxWidth: 400, margin: "0 auto", padding: "40px 20px" }}>
          <div style={styles.card}>
            <h2 style={styles.pageTitle}>Reset Your Password</h2>
            <p style={styles.pageDesc}>Enter your new password below.</p>

            {error && <div style={styles.errorBox}>{error}</div>}
            {success && <div style={styles.successBox}>{success}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Reset Token</label>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  style={styles.input}
                  placeholder="Enter reset token from email"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={styles.input}
                  placeholder="Enter new password (min 6 characters)"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.input}
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <button
                type="submit"
                style={{ ...styles.btnPrimary, ...(loading ? styles.btnDisabled : {}) }}
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button
                onClick={() => window.location.href = "/"}
                style={styles.btnOutline}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div style={styles.page}>
      <div style={styles.pageHero}>
        <h1 style={styles.pageTitle}>Contact Us</h1>
        <p style={styles.pageSubtitle}>We're here to help. Reach out anytime.</p>
      </div>
      <div style={styles.pageContent}>
        <div style={styles.contactGrid}>
          <div>
            <div style={styles.contactCard}>
              <h3 style={styles.contactCardTitle}>📍 Visit Our Store</h3>
              <p style={styles.contactText}>{COMPANY.address}</p>
              <div style={styles.mapEmbed}>
                <iframe
                  title="KT Leather Store Location"
                  src="https://maps.google.com/maps?q=Vaibhav+Laxmi+Complex+Shahibaug+Ahmedabad&output=embed"
                  width="100%" height="220" style={{ border: 0, borderRadius: 8 }} allowFullScreen
                />
              </div>
            </div>
            <div style={styles.contactCard}>
              <h3 style={styles.contactCardTitle}>📞 Call / WhatsApp</h3>
              <a href={`tel:${COMPANY.phone1}`} style={styles.contactLink}>+91 {COMPANY.phone1}</a><br />
              <a href={`tel:${COMPANY.phone2}`} style={styles.contactLink}>+91 {COMPANY.phone2}</a>
              <div style={{ marginTop: 12 }}>
                <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" style={styles.waBtn}>💬 Chat on WhatsApp</a>
              </div>
            </div>
          </div>
          <div>
            <div style={styles.contactCard}>
              <h3 style={styles.contactCardTitle}>✉️ Email Us</h3>
              <a href={`mailto:${COMPANY.email}`} style={styles.contactLink}>{COMPANY.email}</a>
            </div>
            <div style={styles.contactCard}>
              <h3 style={styles.contactCardTitle}>🕐 Business Hours</h3>
              {[["Monday – Saturday", "10:00 AM – 7:00 PM"], ["Sunday", "By Appointment"]].map(([d, t]) => (
                <div key={d} style={styles.hoursRow}><span>{d}</span><span style={{ color: "#5c2d09", fontWeight: 600 }}>{t}</span></div>
              ))}
            </div>
            <div style={styles.contactCard}>
              <h3 style={styles.contactCardTitle}>🏢 Company Info</h3>
              <div style={styles.infoRow}><span style={styles.infoKey}>GST No.</span><span style={styles.infoVal}>{COMPANY.gst}</span></div>
              <div style={styles.infoRow}><span style={styles.infoKey}>MSME</span><span style={styles.infoVal}>Registered</span></div>
              <div style={styles.infoRow}><span style={styles.infoKey}>BNI</span><span style={styles.infoVal}>Proud Member</span></div>
            </div>
            <div style={styles.contactCard}>
              <h3 style={styles.contactCardTitle}>🌐 Google Business</h3>
              <p style={styles.contactText}>Find us on Google Maps by searching <strong>"K.T. Leather Store Shahibaug Ahmedabad"</strong>. For registration help, contact your web administrator.</p>
              <a href="https://business.google.com" target="_blank" style={styles.btnPrimary}>Register on Google →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ADMIN PANEL
// ============================================================
function AdminPanel({ onLogin, onLogout }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(""); const [pass, setPass] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetErr, setResetErr] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetStep, setResetStep] = useState(1); // 1: request, 2: reset
  const [tab, setTab] = useState("dashboard");
  const [bills, setBills] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loadingEnq, setLoadingEnq] = useState(false);
  const [loadingBills, setLoadingBills] = useState(false);
  const [savingBill, setSavingBill] = useState(false);

  const [bill, setBill] = useState({
    billNo: `KT/${new Date().getFullYear()}/001`,
    date: new Date().toISOString().split("T")[0],
    companyName: "", clientAddress: "", clientGst: "", gstPercent: 18,
    items: [{ product: "", qty: 1, rate: 0 }]
  });

  const authHdr = (tok) => ({ "Authorization": `Bearer ${tok || token}`, "Content-Type": "application/json" });

  const login = async () => {
    setLoginErr("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass })
      });
      const data = await res.json();
      if (!res.ok) { setLoginErr(data.error || "Invalid credentials"); return; }
      setToken(data.token);
      setLoggedIn(true);
      onLogin && onLogin();
      fetchDashboard(data.token);
      fetchNextBillNo(data.token);
    } catch { setLoginErr("Server error. Is the backend running?"); }
  };

  const requestPasswordReset = async () => {
    setResetErr("");
    setResetMsg("");
    if (!resetEmail) { setResetErr("Please enter your email"); return; }
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail })
      });
      const data = await res.json();
      if (!res.ok) { setResetErr(data.error || "Failed to send reset link"); return; }
      setResetMsg("✅ Check your email for reset token. Enter it below to reset your password.");
      setResetStep(2);
    } catch { setResetErr("Server error. Please try again."); }
  };

  const submitPasswordReset = async () => {
    setResetErr("");
    setResetMsg("");
    if (!resetToken || !newPassword) { setResetErr("Please enter reset token and new password"); return; }
    if (newPassword.length < 6) { setResetErr("Password must be at least 6 characters"); return; }
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, newPassword })
      });
      const data = await res.json();
      if (!res.ok) { setResetErr(data.error || "Failed to reset password"); return; }
      setResetMsg("✅ Password reset successfully! Please login with your new password.");
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetStep(1);
        setResetEmail("");
        setResetToken("");
        setNewPassword("");
      }, 2000);
    } catch { setResetErr("Server error. Please try again."); }
  };

  const fetchDashboard = async (tok) => {
    try {
      const res = await fetch("/api/dashboard", { headers: authHdr(tok) });
      const data = await res.json();
      setDashboard(data);
    } catch {}
  };

  const fetchNextBillNo = async (tok) => {
    try {
      const res = await fetch("/api/bills/next-number", { headers: authHdr(tok) });
      const data = await res.json();
      if (data.billNo) setBill(b => ({ ...b, billNo: data.billNo }));
    } catch {}
  };

  const fetchEnquiries = async () => {
    setLoadingEnq(true);
    try {
      const res = await fetch("/api/enquiries?limit=100", { headers: authHdr() });
      const data = await res.json();
      if (!res.ok) {
        console.error("Enquiries fetch error:", data);
        setEnquiries([]);
        return;
      }
      setEnquiries(data.enquiries || []);
    } catch (err) {
      console.error("Enquiries fetch error:", err);
      setEnquiries([]);
    } finally { setLoadingEnq(false); }
  };

  const fetchBills = async () => {
    setLoadingBills(true);
    try {
      const res = await fetch("/api/bills?limit=100", { headers: authHdr() });
      const data = await res.json();
      if (!res.ok) {
        console.error("Bills fetch error:", data);
        setBills([]);
        return;
      }
      setBills(data.bills || []);
    } catch (err) {
      console.error("Bills fetch error:", err);
      setBills([]);
    } finally { setLoadingBills(false); }
  };

  useEffect(() => {
    if (!loggedIn) return;
    if (tab === "enquiries") fetchEnquiries();
    if (tab === "bills") fetchBills();
    if (tab === "dashboard") fetchDashboard(token);
  }, [tab, loggedIn]);

  const addItem = () => setBill(b => ({ ...b, items: [...b.items, { product: "", qty: 1, rate: 0 }] }));
  const removeItem = i => setBill(b => ({ ...b, items: b.items.filter((_, idx) => idx !== i) }));
  const updateItem = (i, k, v) => setBill(b => ({ ...b, items: b.items.map((it, idx) => idx === i ? { ...it, [k]: v } : it) }));

  const printBill = async () => {
    if (!bill.companyName) return alert("Please enter company name.");
    setSavingBill(true);
    try {
      const res = await fetch("/api/bills", {
        method: "POST",
        headers: authHdr(),
        body: JSON.stringify(bill)
      });
      if (!res.ok) { const d = await res.json(); alert(d.error || "Failed to save bill"); return; }
      const saved = await res.json();
      const html = generateBillHTML({ ...bill, ...saved });
      const w = window.open("", "_blank");
      if (w) { w.document.write(html); w.document.close(); w.print(); }
      fetchNextBillNo(token);
      setBill(b => ({ ...b, companyName: "", clientAddress: "", clientGst: "", items: [{ product: "", qty: 1, rate: 0 }] }));
      fetchDashboard(token);
    } catch { alert("Failed to save bill. Please try again."); }
    finally { setSavingBill(false); }
  };

  const updateEnquiryStatus = async (id, status) => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: authHdr(),
        body: JSON.stringify({ status })
      });
      fetchEnquiries();
    } catch { alert("Failed to update status."); }
  };

  const subtotal = bill.items.reduce((s, i) => s + (Number(i.qty) * Number(i.rate)), 0);
  const gstAmt = Math.round(subtotal * bill.gstPercent / 100);
  const grand = subtotal + gstAmt;

  if (!loggedIn) return (
    <div style={styles.page}>
      <div style={styles.loginBox}>
        <div style={styles.loginLogo}>KT</div>
        <h2 style={styles.loginTitle}>Admin Login</h2>
        <p style={styles.loginSub}>K.T. Leather Store Management Panel</p>
        
        {!showForgotPassword ? (
          <>
            {loginErr && <p style={{ color: "#c00", fontSize: 13, marginBottom: 10, background: "#fee", padding: "8px 12px", borderRadius: 6 }}>{loginErr}</p>}
            <input id="admin-username" style={styles.input} placeholder="Username" value={user} onChange={e => setUser(e.target.value)} />
            <input id="admin-password" style={{ ...styles.input, marginTop: 12 }} type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === "Enter" && login()} />
            <button id="admin-login-btn" style={{ ...styles.btnPrimary, width: "100%", marginTop: 16 }} onClick={login}>Login →</button>
            <p style={{ fontSize: 12, color: "#5c2d09", marginTop: 12, textAlign: "center", cursor: "pointer", textDecoration: "underline" }} onClick={() => setShowForgotPassword(true)}>
              Forgot Password?
            </p>
          </>
        ) : (
          <>
            {resetErr && <p style={{ color: "#c00", fontSize: 13, marginBottom: 10, background: "#fee", padding: "8px 12px", borderRadius: 6 }}>{resetErr}</p>}
            {resetMsg && <p style={{ color: "#060", fontSize: 13, marginBottom: 10, background: "#efe", padding: "8px 12px", borderRadius: 6 }}>{resetMsg}</p>}
            
            {resetStep === 1 ? (
              <>
                <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Enter your email address and we'll send you a reset token.</p>
                <input id="reset-email" style={styles.input} type="email" placeholder="Admin Email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
                <button style={{ ...styles.btnPrimary, width: "100%", marginTop: 16 }} onClick={requestPasswordReset}>Send Reset Token →</button>
              </>
            ) : (
              <>
                <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Enter the reset token from your email and your new password.</p>
                <input id="reset-token" style={styles.input} placeholder="Reset Token" value={resetToken} onChange={e => setResetToken(e.target.value)} />
                <input id="reset-newpass" style={{ ...styles.input, marginTop: 12 }} type="password" placeholder="New Password (min 6 chars)" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                <button style={{ ...styles.btnPrimary, width: "100%", marginTop: 16 }} onClick={submitPasswordReset}>Reset Password →</button>
              </>
            )}
            <p style={{ fontSize: 12, color: "#5c2d09", marginTop: 12, textAlign: "center", cursor: "pointer", textDecoration: "underline" }} onClick={() => {
              setShowForgotPassword(false);
              setResetStep(1);
              setResetErr("");
              setResetMsg("");
            }}>
              Back to Login
            </p>
          </>
        )}
      </div>
    </div>
  );

  const tabs = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "bill", label: "📄 Generate Bill" },
    { id: "bills", label: "🗂 Bill History" },
    { id: "enquiries", label: "📬 Enquiries" },
    { id: "products", label: "🏪 Products" },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.adminHeader}>
        <h2 style={styles.adminTitle}>⚙️ Admin Panel</h2>
        <button id="logout-btn" style={styles.logoutBtn} onClick={() => { setLoggedIn(false); onLogout && onLogout(); }}>Logout</button>
      </div>
      <div style={styles.adminTabs}>
        {tabs.map(t => <button key={t.id} style={{ ...styles.adminTab, ...(tab === t.id ? styles.adminTabActive : {}) }} onClick={() => setTab(t.id)}>{t.label}</button>)}
      </div>

      {tab === "dashboard" && (
        <div style={styles.billSection}>
          <h3 style={styles.billTitle}>📊 Dashboard Overview</h3>
          {!dashboard ? <p style={{ color: "#888" }}>Loading stats…</p> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, marginBottom: 32 }}>
              {[
                { label: "Total Enquiries", value: dashboard.totalEnquiries, icon: "📬", color: "#5c2d09" },
                { label: "New Enquiries", value: dashboard.newEnquiries, icon: "🔔", color: "#b04000" },
                { label: "Total Bills", value: dashboard.totalBills, icon: "🧾", color: "#5c2d09" },
                { label: "Total Revenue", value: `₹${(dashboard.totalRevenue || 0).toLocaleString("en-IN")}`, icon: "💰", color: "#2e7d32" },
                { label: "Active Products", value: dashboard.totalProducts, icon: "🏪", color: "#1565c0" },
              ].map(stat => (
                <div key={stat.label} style={{ background: "#fff", border: "1px solid #e8d5c0", borderRadius: 12, padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{stat.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: stat.color, fontFamily: "Georgia,serif" }}>{stat.value}</div>
                  <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button style={styles.btnPrimary} onClick={() => setTab("bill")}>📄 Generate New Bill</button>
            <button style={{ ...styles.btnPrimary, background: "#b04000" }} onClick={() => setTab("enquiries")}>📬 View Enquiries</button>
          </div>
        </div>
      )}

      {tab === "bill" && (
        <div style={styles.billSection}>
          <h3 style={styles.billTitle}>Generate GST Invoice</h3>
          <div style={styles.billMeta}>
            {[["billNo", "Bill Number"], ["date", "Date"], ["companyName", "Company Name *"], ["clientAddress", "Client Address"], ["clientGst", "Client GST No."]].map(([k, label]) => (
              <div key={k} style={styles.formGroup}>
                <label style={styles.formLabel}>{label}</label>
                <input style={styles.input} type={k === "date" ? "date" : "text"} value={bill[k]} onChange={e => setBill(b => ({ ...b, [k]: e.target.value }))} />
              </div>
            ))}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>GST %</label>
              <select style={styles.input} value={bill.gstPercent} onChange={e => setBill(b => ({ ...b, gstPercent: Number(e.target.value) }))}>
                {[0, 5, 12, 18, 28].map(v => <option key={v} value={v}>{v}%</option>)}
              </select>
            </div>
          </div>
          <h4 style={styles.itemsTitle}>Items</h4>
          <table style={styles.itemsTable}>
            <thead><tr style={styles.itemsHead}>
              <th style={styles.th}>Product Description</th><th style={styles.th}>Qty</th><th style={styles.th}>Rate (₹)</th><th style={styles.th}>Amount</th><th style={styles.th}></th>
            </tr></thead>
            <tbody>
              {bill.items.map((item, i) => (
                <tr key={i}>
                  <td style={styles.td}><input style={{ ...styles.input, minWidth: 180 }} value={item.product} onChange={e => updateItem(i, "product", e.target.value)} placeholder="Product name" /></td>
                  <td style={styles.td}><input style={{ ...styles.input, width: 70 }} type="number" value={item.qty} onChange={e => updateItem(i, "qty", e.target.value)} /></td>
                  <td style={styles.td}><input style={{ ...styles.input, width: 90 }} type="number" value={item.rate} onChange={e => updateItem(i, "rate", e.target.value)} /></td>
                  <td style={styles.td}>₹{(item.qty * item.rate).toLocaleString("en-IN")}</td>
                  <td style={styles.td}><button onClick={() => removeItem(i)} style={styles.removeBtn}>✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={styles.addItemBtn} onClick={addItem}>+ Add Item</button>
          <div style={styles.billTotals}>
            <div style={styles.totalRow}><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
            <div style={styles.totalRow}><span>GST ({bill.gstPercent}%)</span><span>₹{gstAmt.toLocaleString("en-IN")}</span></div>
            <div style={{ ...styles.totalRow, fontWeight: 700, fontSize: 18, color: "#5c2d09", borderTop: "2px solid #5c2d09", paddingTop: 8 }}>
              <span>Grand Total</span><span>₹{grand.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <button style={{ ...styles.btnPrimary, opacity: savingBill ? 0.7 : 1 }} onClick={printBill} disabled={savingBill}>
            {savingBill ? "Saving…" : "🖨 Save & Print Bill"}
          </button>
        </div>
      )}

      {tab === "bills" && (
        <div style={styles.billSection}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={styles.billTitle}>🗂 Bill History ({bills.length})</h3>
            <button style={styles.btnSmall} onClick={fetchBills}>🔄 Refresh</button>
          </div>
          {loadingBills ? <p style={{ color: "#888" }}>Loading bills…</p> :
          bills.length === 0 ? <p style={{ color: "#888" }}>No bills yet. Use "Generate Bill" tab.</p> : (
            <div style={{ overflowX: "auto" }}>
            <table style={styles.itemsTable}>
              <thead><tr style={styles.itemsHead}>
                <th style={styles.th}>Bill No</th><th style={styles.th}>Company</th><th style={styles.th}>Date</th><th style={styles.th}>Subtotal</th><th style={styles.th}>GST%</th><th style={styles.th}>Grand Total</th><th style={styles.th}>Action</th>
              </tr></thead>
              <tbody>{bills.map(b => (
                <tr key={b._id}>
                  <td style={styles.td}><strong>{b.billNo}</strong></td>
                  <td style={styles.td}>{b.companyName}</td>
                  <td style={styles.td}>{b.date}</td>
                  <td style={styles.td}>₹{(b.subtotal || 0).toLocaleString("en-IN")}</td>
                  <td style={styles.td}>{b.gstPercent}%</td>
                  <td style={{ ...styles.td, fontWeight: 700, color: "#2e7d32" }}>₹{(b.grandTotal || 0).toLocaleString("en-IN")}</td>
                  <td style={styles.td}><button style={styles.btnSmall} onClick={() => { const w = window.open("", "_blank"); if (w) { w.document.write(generateBillHTML(b)); w.document.close(); w.print(); } }}>🖨 Reprint</button></td>
                </tr>
              ))}</tbody>
            </table>
            </div>
          )}
        </div>
      )}

      {tab === "enquiries" && (
        <div style={styles.billSection}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={styles.billTitle}>📬 Enquiries ({enquiries.length})</h3>
            <button style={styles.btnSmall} onClick={fetchEnquiries}>🔄 Refresh</button>
          </div>
          {loadingEnq ? <p style={{ color: "#888" }}>Loading enquiries…</p> :
          enquiries.length === 0 ? <p style={{ color: "#888" }}>No enquiries yet.</p> : (
            <div style={{ overflowX: "auto" }}>
            <table style={styles.itemsTable}>
              <thead><tr style={styles.itemsHead}>
                <th style={styles.th}>Name</th><th style={styles.th}>Company</th><th style={styles.th}>Phone</th><th style={styles.th}>Interest</th><th style={styles.th}>Type</th><th style={styles.th}>Status</th><th style={styles.th}>Date</th><th style={styles.th}>Update</th>
              </tr></thead>
              <tbody>{enquiries.map(e => (
                <tr key={e._id}>
                  <td style={styles.td}><strong>{e.name}</strong></td>
                  <td style={styles.td}>{e.company || "—"}</td>
                  <td style={styles.td}><a href={`tel:${e.phone}`} style={{ color: "#5c2d09", fontWeight: 600 }}>{e.phone}</a></td>
                  <td style={styles.td}>{e.interest || e.message?.slice(0, 40) || "—"}</td>
                  <td style={styles.td}><span style={{ background: "#f5ede3", color: "#5c2d09", padding: "2px 8px", borderRadius: 4, fontSize: 12 }}>{e.type}</span></td>
                  <td style={styles.td}>
                    <span style={{ background: e.status === "new" ? "#fff3cd" : e.status === "contacted" ? "#d4edda" : "#f8d7da", color: e.status === "new" ? "#856404" : e.status === "contacted" ? "#155724" : "#721c24", padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                      {e.status}
                    </span>
                  </td>
                  <td style={styles.td}>{new Date(e.createdAt).toLocaleDateString("en-IN")}</td>
                  <td style={styles.td}>
                    <select style={{ fontSize: 12, padding: "4px 6px", borderRadius: 4, border: "1px solid #ccc" }}
                      value={e.status} onChange={ev => updateEnquiryStatus(e._id, ev.target.value)}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}</tbody>
            </table>
            </div>
          )}
        </div>
      )}

      {tab === "products" && (
        <div style={styles.billSection}>
          <h3 style={styles.billTitle}>Product Management</h3>
          <p style={styles.contactText}>Product catalog is managed via the database. Current products:</p>
          <table style={styles.itemsTable}>
            <thead><tr style={styles.itemsHead}>
              <th style={styles.th}>#</th><th style={styles.th}>Product</th><th style={styles.th}>Category</th><th style={styles.th}>Price Range</th>
            </tr></thead>
            <tbody>{PRODUCTS.map(p => (
              <tr key={p.id}>
                <td style={styles.td}>{p.id}</td>
                <td style={styles.td}>{p.icon} {p.name}</td>
                <td style={styles.td}>{p.category}</td>
                <td style={styles.td}>{p.priceRange}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FloatingButtons() {
  return (
    <div style={styles.floatingBtns}>
      <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" style={styles.floatWA} title="WhatsApp">💬</a>
      <a href={`tel:${COMPANY.phone1}`} style={styles.floatCall} title="Call">📞</a>
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner}>
        <div style={styles.footerBrand}>
          <div style={styles.footerLogo}>KT</div>
          <div style={styles.footerName}>K.T. Leather Store</div>
          <div style={styles.footerSub}>Est. 1965 · Ahmedabad, Gujarat</div>
          <p style={styles.footerDesc}>Trusted supplier of corporate uniforms, safety equipment, leather, and gifting solutions for 60+ years.</p>
        </div>
        <div>
          <div style={styles.footerSectionTitle}>Quick Links</div>
          {["home", "about", "products", "gallery", "enquiry", "contact"].map(p => (
            <div key={p} style={styles.footerLink} onClick={() => setPage(p)}>{p.charAt(0).toUpperCase() + p.slice(1)}</div>
          ))}
        </div>
        <div>
          <div style={styles.footerSectionTitle}>Contact</div>
          <div style={styles.footerContactItem}>📍 {COMPANY.address}</div>
          <div style={styles.footerContactItem}>📞 +91 {COMPANY.phone1}</div>
          <div style={styles.footerContactItem}>📞 +91 {COMPANY.phone2}</div>
          <div style={styles.footerContactItem}>✉️ {COMPANY.email}</div>
          <div style={styles.footerContactItem}>🏢 GST: {COMPANY.gst}</div>
        </div>
        <div>
          <div style={styles.footerSectionTitle}>Products</div>
          {["Corporate Uniforms", "Safety Equipment", "Safety Shoes", "Corporate Gifts", "Leather & Rexine", "Upholstery Material"].map(p => (
            <div key={p} style={styles.footerLink} onClick={() => setPage("products")}>{p}</div>
          ))}
        </div>
      </div>
      <div style={styles.footerBottom}>
        <span>© {new Date().getFullYear()} K.T. Leather Store. All rights reserved. Proprietor: Yogesh Chandrakantbhai Makwana</span>
        <span style={{ marginLeft: 16, cursor: "pointer", opacity: 0.6 }} onClick={() => setPage("admin")}>Admin</span>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [enquiryProduct, setEnquiryProduct] = useState("");
  const [adminLoggedIn] = useState(false);

  useEffect(() => {
    // Handle URL-based routing
    const path = window.location.pathname;
    if (path === "/reset-password") {
      setPage("reset-password");
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={styles.app}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Georgia', serif; background: #fdf8f3; color: #2c1a0e; }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source+Sans+3:wght@400;500;600&display=swap');
        a { text-decoration: none; }
        button { cursor: pointer; font-family: inherit; }
        input, textarea, select { font-family: inherit; }
        @media (max-width: 768px) {
          .navlinks { flex-direction: column; background: #2c1a0e; position: absolute; top: 64px; left: 0; right: 0; padding: 16px; display: none !important; z-index: 1000; }
          .navlinks.open { display: flex !important; }
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      `}</style>
      <Navbar page={page} setPage={setPage} adminLoggedIn={adminLoggedIn} />
      <main style={{ paddingTop: 64 }}>
        {page === "home" && <>
          <Hero setPage={setPage} />
          <ServicesStrip setPage={setPage} />
          <WhyUs />
          <Testimonials />
        </>}
        {page === "about" && <AboutPage />}
        {page === "products" && <ProductsPage setPage={setPage} setEnquiryProduct={setEnquiryProduct} />}
        {page === "gallery" && <GalleryPage />}
        {page === "enquiry" && <EnquiryPage preProduct={enquiryProduct} />}
        {page === "reset-password" && <ResetPasswordPage />}
        {page === "contact" && <ContactPage />}
        {page === "admin" && <AdminPanel />}
      </main>
      <Footer setPage={setPage} />
      <FloatingButtons />
    </div>
  );
}

// ============================================================
// STYLES
// ============================================================
const C = { brown: "#5c2d09", amber: "#b04000", gold: "#f5c97a", cream: "#fdf8f3", light: "#fdf6ee", border: "#e8d5c0", dark: "#2c1a0e" };

const styles = {
  app: { minHeight: "100vh", background: C.cream },

  // NAV
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, background: C.dark, borderBottom: `2px solid ${C.brown}`, height: 64 },
  navInner: { maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" },
  navBrand: { display: "flex", alignItems: "center", gap: 12, cursor: "pointer" },
  navLogo: { width: 40, height: 40, background: C.brown, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, borderRadius: 6, fontFamily: "Georgia, serif" },
  navName: { color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'Playfair Display', Georgia, serif" },
  navSub: { color: C.gold, fontSize: 11 },
  navLinks: { display: "flex", gap: 4, alignItems: "center" },
  navLink: { background: "none", border: "none", color: "#ddd", padding: "8px 14px", borderRadius: 6, fontSize: 14, transition: "all .2s" },
  navLinkActive: { background: C.brown, color: "#fff" },
  burger: { background: "none", border: "none", color: "#fff", fontSize: 22, display: "none" },

  // HERO
  hero: { minHeight: "100vh", background: `linear-gradient(135deg, ${C.dark} 0%, #3d1a07 50%, #5c2d09 100%)`, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" },
  heroOverlay: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 50%, rgba(245,201,122,0.08) 0%, transparent 60%)", pointerEvents: "none" },
  heroContent: { maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", animation: "fadeUp .8s ease" },
  heroBadge: { display: "inline-block", background: "rgba(245,201,122,0.15)", border: "1px solid rgba(245,201,122,0.3)", color: C.gold, padding: "6px 18px", borderRadius: 999, fontSize: 13, marginBottom: 24 },
  heroTitle: { fontSize: "clamp(36px, 6vw, 72px)", color: "#fff", lineHeight: 1.1, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, marginBottom: 20 },
  heroAccent: { color: C.gold },
  heroSub: { fontSize: 18, color: "#ccc", maxWidth: 560, lineHeight: 1.7, marginBottom: 36 },
  heroActions: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 60 },
  heroStats: { display: "flex", gap: 40, flexWrap: "wrap" },
  heroStat: { display: "flex", flexDirection: "column" },
  heroStatNum: { fontSize: 32, fontWeight: 800, color: C.gold, fontFamily: "'Playfair Display', Georgia, serif" },
  heroStatLabel: { fontSize: 12, color: "#aaa", textTransform: "uppercase", letterSpacing: 1 },

  // BUTTONS
  btnPrimary: { background: C.brown, color: "#fff", border: "none", padding: "14px 32px", borderRadius: 8, fontSize: 15, fontWeight: 600, transition: "all .2s", cursor: "pointer" },
  btnOutline: { background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", padding: "14px 32px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" },
  btnSmall: { background: "#f0e8e0", color: C.dark, border: "none", padding: "6px 14px", borderRadius: 6, fontSize: 13, cursor: "pointer" },
  btnPrimarySmall: { background: C.brown, color: "#fff", border: "none", padding: "6px 14px", borderRadius: 6, fontSize: 13, cursor: "pointer" },

  // SECTIONS
  strip: { background: "#fff", padding: "80px 24px" },
  sectionHeader: { textAlign: "center", marginBottom: 48 },
  sectionTag: { display: "inline-block", background: "#f5ede3", color: C.brown, padding: "4px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 },
  sectionTitle: { fontSize: "clamp(24px, 4vw, 42px)", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, color: C.dark },

  // SERVICES
  servicesGrid: { maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 },
  serviceCard: { background: C.light, border: `1px solid ${C.border}`, borderRadius: 12, padding: "28px 20px", textAlign: "center", cursor: "pointer", transition: "all .2s" },
  serviceIcon: { fontSize: 36, marginBottom: 12 },
  serviceLabel: { fontWeight: 700, color: C.dark, fontSize: 15, marginBottom: 6 },
  serviceSub: { fontSize: 13, color: "#888" },

  // WHY US
  whySection: { background: C.light, padding: "80px 24px" },
  whyGrid: { maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 },
  whyCard: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: "28px 24px" },
  whyIcon: { fontSize: 32, marginBottom: 14 },
  whyTitle: { fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 8 },
  whyDesc: { fontSize: 14, color: "#666", lineHeight: 1.6 },

  // TESTIMONIALS
  testimonialSection: { background: `linear-gradient(135deg, ${C.dark}, #3d1a07)`, padding: "80px 24px" },
  testimonialsGrid: { maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 },
  testimonialCard: { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "32px 24px" },
  testimonialQuote: { fontSize: 48, color: C.gold, lineHeight: 1, marginBottom: 8 },
  testimonialText: { color: "#ddd", lineHeight: 1.7, marginBottom: 16 },
  testimonialPerson: { fontSize: 14, color: "#aaa" },

  // PAGE COMMON
  page: { minHeight: "calc(100vh - 64px)" },
  pageHero: { background: `linear-gradient(135deg, ${C.dark} 0%, ${C.brown} 100%)`, padding: "60px 24px", textAlign: "center" },
  pageTitle: { fontSize: "clamp(28px, 5vw, 52px)", color: "#fff", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, marginBottom: 12 },
  pageSubtitle: { fontSize: 16, color: C.gold },
  pageContent: { maxWidth: 1200, margin: "0 auto", padding: "48px 24px" },

  // ABOUT
  aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 48, flexWrap: "wrap" },
  aboutHeading: { fontSize: 26, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: C.dark, marginBottom: 16 },
  aboutText: { fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 16 },
  aboutInfoCard: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 },
  aboutInfoTitle: { fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 16, paddingBottom: 12, borderBottom: `2px solid ${C.border}` },
  infoRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontSize: 14 },
  infoKey: { color: "#888", fontWeight: 600 },
  infoVal: { color: C.dark, fontWeight: 500 },
  missionGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 },
  missionCard: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, textAlign: "center" },
  missionIcon: { fontSize: 40, marginBottom: 16 },
  missionTitle: { fontWeight: 700, fontSize: 18, color: C.dark, marginBottom: 10 },
  missionText: { fontSize: 14, color: "#666", lineHeight: 1.6 },

  // PRODUCTS
  catBar: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 },
  catBtn: { background: "#fff", border: `1px solid ${C.border}`, color: C.dark, padding: "8px 18px", borderRadius: 999, fontSize: 14, cursor: "pointer" },
  catBtnActive: { background: C.brown, color: "#fff", border: `1px solid ${C.brown}` },
  productsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 },
  productCard: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, transition: "all .2s" },
  productIcon: { fontSize: 40, marginBottom: 12 },
  productName: { fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 8 },
  productDesc: { fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 12 },
  productPrice: { display: "inline-block", background: "#f5ede3", color: C.brown, padding: "4px 12px", borderRadius: 6, fontSize: 13, fontWeight: 600, marginBottom: 12 },
  productDetails: { background: C.light, borderRadius: 8, padding: 14, marginBottom: 12 },
  detailRow: { fontSize: 13, color: "#555", marginBottom: 6 },
  detailKey: { fontWeight: 600, color: C.dark, marginRight: 6 },
  featureTag: { display: "inline-block", background: "#e8f5e9", color: "#2e7d32", padding: "2px 8px", borderRadius: 4, fontSize: 12, marginRight: 6, marginTop: 4 },
  productActions: { display: "flex", gap: 10 },

  // GALLERY
  galleryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 },
  galleryCard: { borderRadius: 12, padding: "48px 24px", textAlign: "center", color: "#fff" },
  galleryIcon: { fontSize: 52, marginBottom: 16 },
  galleryLabel: { fontWeight: 700, fontSize: 17 },
  galleryNote: { marginTop: 32, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: 20, textAlign: "center", color: "#666", fontSize: 15 },

  // ENQUIRY
  enquiryLayout: { display: "grid", gridTemplateColumns: "1fr 320px", gap: 40 },
  enquiryForm: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 32 },
  formTitle: { fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 20 },
  radioGroup: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 },
  radioLabel: { fontSize: 14, color: "#555", cursor: "pointer", display: "flex", alignItems: "center" },
  formGroup: { marginBottom: 16 },
  formLabel: { display: "block", fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6 },
  input: { width: "100%", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none", background: "#fff" },
  textarea: { width: "100%", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none", resize: "vertical", background: "#fff" },
  uniformExtra: { background: C.light, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 },
  extraTitle: { fontWeight: 700, color: C.brown, marginBottom: 12, fontSize: 15 },
  enquirySide: { display: "flex", flexDirection: "column", gap: 20 },
  enquirySideCard: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 },
  sideCardTitle: { fontWeight: 700, fontSize: 16, color: C.dark, marginBottom: 16, borderBottom: `1px solid ${C.border}`, paddingBottom: 10 },
  waBtn: { display: "block", background: "#25D366", color: "#fff", padding: "12px 20px", borderRadius: 8, textAlign: "center", fontWeight: 600, marginBottom: 10, fontSize: 15 },
  callBtn: { display: "block", background: C.brown, color: "#fff", padding: "12px 20px", borderRadius: 8, textAlign: "center", fontWeight: 600, fontSize: 15 },
  offerList: { listStyle: "none", padding: 0 },
  offerItem: { fontSize: 14, color: "#555", padding: "4px 0", borderBottom: `1px solid ${C.border}` },
  successBox: { maxWidth: 500, margin: "100px auto", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: 48, textAlign: "center" },
  successIcon: { fontSize: 56, marginBottom: 16 },
  successTitle: { fontSize: 24, fontWeight: 700, color: C.dark, marginBottom: 16 },

  // CONTACT
  contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 },
  contactCard: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 20 },
  contactCardTitle: { fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 14 },
  contactText: { fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 12 },
  contactLink: { color: C.brown, fontWeight: 600, fontSize: 16, display: "block", marginBottom: 4 },
  hoursRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontSize: 14 },
  mapEmbed: { borderRadius: 8, overflow: "hidden", marginTop: 12 },

  // ADMIN
  loginBox: { maxWidth: 420, margin: "80px auto", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: 40, textAlign: "center" },
  loginLogo: { width: 64, height: 64, background: C.brown, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24, borderRadius: 12, margin: "0 auto 16px", fontFamily: "Georgia, serif" },
  loginTitle: { fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 6 },
  loginSub: { fontSize: 13, color: "#888", marginBottom: 24 },
  adminHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "#fff", borderBottom: `1px solid ${C.border}` },
  adminTitle: { fontSize: 22, fontWeight: 700, color: C.dark },
  logoutBtn: { background: "#fee", color: "#c00", border: "1px solid #fcc", padding: "8px 16px", borderRadius: 6, cursor: "pointer" },
  adminTabs: { display: "flex", gap: 0, borderBottom: `2px solid ${C.border}`, background: "#fff", padding: "0 24px" },
  adminTab: { background: "none", border: "none", padding: "14px 20px", fontSize: 14, color: "#666", cursor: "pointer", borderBottom: "2px solid transparent" },
  adminTabActive: { color: C.brown, borderBottom: `2px solid ${C.brown}`, fontWeight: 700 },
  billSection: { padding: 24 },
  billTitle: { fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 20 },
  billMeta: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginBottom: 24 },
  itemsTitle: { fontWeight: 700, color: C.dark, marginBottom: 12 },
  itemsTable: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 8, overflow: "hidden", marginBottom: 16 },
  itemsHead: { background: C.brown },
  th: { padding: "12px 14px", color: "#fff", fontSize: 13, fontWeight: 600, textAlign: "left" },
  td: { padding: "10px 14px", borderBottom: `1px solid ${C.border}`, fontSize: 14 },
  addItemBtn: { background: C.light, border: `1px dashed ${C.border}`, color: C.brown, padding: "8px 20px", borderRadius: 6, fontSize: 14, cursor: "pointer", marginBottom: 16 },
  removeBtn: { background: "#fee", color: "#c00", border: "none", width: 28, height: 28, borderRadius: 4, cursor: "pointer" },
  billTotals: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, maxWidth: 320, marginLeft: "auto", marginBottom: 20 },
  totalRow: { display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 15 },

  // FLOATING
  floatingBtns: { position: "fixed", bottom: 24, right: 24, display: "flex", flexDirection: "column", gap: 12, zIndex: 998 },
  floatWA: { width: 52, height: 52, background: "#25D366", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 16px rgba(0,0,0,0.25)", animation: "pulse 2s infinite" },
  floatCall: { width: 52, height: 52, background: C.brown, color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 16px rgba(0,0,0,0.25)" },

  // FOOTER
  footer: { background: C.dark, color: "#ccc", padding: "60px 24px 0" },
  footerInner: { maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 2fr 1fr", gap: 40, paddingBottom: 40 },
  footerBrand: { },
  footerLogo: { width: 48, height: 48, background: C.brown, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, borderRadius: 8, marginBottom: 10, fontFamily: "Georgia, serif" },
  footerName: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, color: "#fff", fontWeight: 700, marginBottom: 4 },
  footerSub: { fontSize: 12, color: C.gold, marginBottom: 12 },
  footerDesc: { fontSize: 13, color: "#aaa", lineHeight: 1.7 },
  footerSectionTitle: { fontWeight: 700, color: "#fff", marginBottom: 16, fontSize: 15, textTransform: "uppercase", letterSpacing: 1 },
  footerLink: { fontSize: 13, color: "#aaa", padding: "4px 0", cursor: "pointer", transition: "color .2s" },
  footerContactItem: { fontSize: 13, color: "#aaa", padding: "4px 0" },
  footerBottom: { borderTop: "1px solid rgba(255,255,255,0.1)", padding: "20px 0", textAlign: "center", fontSize: 12, color: "#666", display: "flex", justifyContent: "center", alignItems: "center" },
};
