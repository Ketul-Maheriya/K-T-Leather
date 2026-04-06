import { styles } from "../styles/theme";

export function Hero({ setPage }) {
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
