import { useState } from "react";
import { styles } from "../styles/theme";
import { PRODUCTS, CATEGORIES } from "../constants/data";
import { ProductCard } from "../components/ProductCard";

export function ProductsPage({ setPage, setEnquiryProduct }) {
  const [cat, setCat] = useState("all");
  const filtered = cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
  const handleEnquire = (name) => { setEnquiryProduct(name); setPage("enquiry"); };
  return (
    <div style={styles.page}>
      <div style={styles.pageHero}>
        <h1 style={styles.pageTitle}>Our Products</h1>
        <p style={styles.pageSubtitle}>Custom solutions for every corporate need</p>
      </div>
      <div style={styles.pageContent}>
        <div style={styles.catBar}>
          {CATEGORIES.map(c => (
            <button key={c.id} style={{ ...styles.catBtn, ...(cat === c.id ? styles.catBtnActive : {}) }}
              onClick={() => setCat(c.id)}>{c.icon} {c.label}</button>
          ))}
        </div>
        <div style={styles.productsGrid}>
          {filtered.map(p => <ProductCard key={p.id} product={p} onEnquire={handleEnquire} />)}
        </div>
      </div>
    </div>
  );
}
