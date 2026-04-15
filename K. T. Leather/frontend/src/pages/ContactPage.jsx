import { FaWhatsapp } from "react-icons/fa";
import { styles } from "../styles/theme";
import { COMPANY } from "../constants/data";

export function ContactPage() {
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
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.waBtn}
                  aria-label="Chat on WhatsApp"
                >
                  <FaWhatsapp size={18} style={{ marginRight: 8 }} /> Chat on WhatsApp
                </a>
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
              <a href="https://business.google.com" target="_blank" rel="noreferrer" style={{...styles.btnPrimary, display: "inline-block"}}>Register on Google →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
