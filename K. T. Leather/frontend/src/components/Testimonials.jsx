import { styles } from "../styles/theme";
import { TESTIMONIALS } from "../constants/data";

export function Testimonials() {
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
