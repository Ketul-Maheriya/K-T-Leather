import { styles } from "../styles/theme";

export function GalleryPage() {
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
