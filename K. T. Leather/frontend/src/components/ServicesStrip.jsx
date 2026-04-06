import { styles } from "../styles/theme";

export function ServicesStrip({ setPage }) {
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
