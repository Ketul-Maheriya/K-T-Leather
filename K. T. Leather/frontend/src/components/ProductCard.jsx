import { useState } from "react";
import { styles } from "../styles/theme";

export function ProductCard({ product, onEnquire }) {
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
