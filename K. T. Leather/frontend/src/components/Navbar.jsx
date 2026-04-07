import { useState } from "react";
import { styles } from "../styles/theme";

export function Navbar({ page, setPage, adminLoggedIn }) {
  const [open, setOpen] = useState(false);

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "gallery", label: "Gallery" },
    { id: "enquiry", label: "Enquiry" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <nav style={styles.nav}>
      <div style={styles.navInner}>
        <div style={styles.navBrand} onClick={() => setPage("home")}>
          <div style={styles.navLogo}>
            <img src="/logo.png" alt="KT Logo" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "inherit", opacity: 0.95  }} />
          </div>
          <div>
            <div style={styles.navName}>K.T. Leather Store</div>
            <div style={styles.navSub}>Est. 1965 · Ahmedabad</div>
          </div>
        </div>
        <div style={{ ...styles.navLinks, display: open ? "flex" : undefined }} className="navlinks">
          {links.map(l => (
            <button key={l.id} style={{ ...styles.navLink, ...(page === l.id ? styles.navLinkActive : {}) }}
              onClick={() => { setPage(l.id); setOpen(false); }}>
              {l.label}
            </button>
          ))}
        </div>
        <button style={styles.burger} onClick={() => setOpen(o => !o)}>☰</button>
      </div>
    </nav>
  );
}
