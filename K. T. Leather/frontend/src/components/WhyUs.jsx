import { styles } from "../styles/theme";

export function WhyUs() {
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
