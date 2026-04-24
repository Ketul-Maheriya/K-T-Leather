import { useNavigate } from "react-router-dom";
import { styles } from "../styles/theme";
import { COMPANY } from "../constants/data";

export function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner}>
        <div style={styles.footerBrand}>
          <div style={styles.footerLogo}>
            <img src="/logo.png" alt="KT Logo" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "inherit" }} />
          </div>
          <div style={styles.footerName}>K.T. Leather Store</div>
          <div style={styles.footerSub}>Est. 1965 · Ahmedabad, Gujarat</div>
          <p style={styles.footerDesc}>Trusted supplier of corporate uniforms, safety equipment, leather, and gifting solutions for 60+ years.</p>
        </div>
        <div>
          <div style={styles.footerSectionTitle}>Quick Links</div>
          {[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
            { label: "Products", path: "/products" },
            { label: "Gallery", path: "/gallery" },
            { label: "Enquiry", path: "/enquiry" },
            { label: "Contact", path: "/contact" },
          ].map(item => (
            <div key={item.path} style={styles.footerLink} onClick={() => navigate(item.path)}>{item.label}</div>
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
            <div key={p} style={styles.footerLink} onClick={() => navigate("/products")}>{p}</div>
          ))}
        </div>
      </div>
      <div style={styles.footerBottom}>
        <span>© {new Date().getFullYear()} K.T. Leather Store. All rights reserved. Proprietor: Yogesh Chandrakantbhai Makwana</span>
      </div>
    </footer>
  );
}
