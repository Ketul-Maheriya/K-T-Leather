import { styles } from "../styles/theme";

export function AboutPage() {
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
