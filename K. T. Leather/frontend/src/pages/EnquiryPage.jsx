import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { styles } from "../styles/theme";
import { COMPANY } from "../constants/data";

export function EnquiryPage({ preProduct }) {
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
              <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer" style={styles.waBtn} aria-label="WhatsApp">
                <FaWhatsapp size={18} style={{ marginRight: 8 }} /> WhatsApp Us
              </a>
              <a href={`tel:${COMPANY.phone1}`} style={styles.callBtn} aria-label="Call">
                <FaPhoneAlt size={18} style={{ marginRight: 8 }} /> Call Now
              </a>
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
