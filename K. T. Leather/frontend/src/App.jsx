import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { FloatingButtons } from "./components/FloatingButtons";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProductsPage } from "./pages/ProductsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { EnquiryPage } from "./pages/EnquiryPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminPanel } from "./pages/AdminPanel";
import { styles } from "./styles/theme";

export default function App() {
  const [page, setPage] = useState("home");
  const [enquiryProduct, setEnquiryProduct] = useState("");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Handle URL-based routing
    const path = window.location.pathname;
    if (path === "/reset-password") {
      setPage("reset-password");
    }
    window.scrollTo(0, 0);

    // Keyboard Shortcut for Admin Panel (Ctrl + Shift + A)
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setPage("admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={styles.app}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Georgia', serif; background: #fdf8f3; color: #2c1a0e; }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source+Sans+3:wght@400;500;600&display=swap');
        a { text-decoration: none; }
        button { cursor: pointer; font-family: inherit; }
        input, textarea, select { font-family: inherit; }
        @media (max-width: 768px) {
          .navlinks { flex-direction: column; background: #2c1a0e; position: absolute; top: 64px; left: 0; right: 0; padding: 16px; display: none !important; z-index: 1000; }
          .navlinks.open { display: flex !important; }
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      `}</style>
      <Navbar page={page} setPage={setPage} adminLoggedIn={adminLoggedIn} />
      <main style={{ paddingTop: 64 }}>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "about" && <AboutPage />}
        {page === "products" && <ProductsPage setPage={setPage} setEnquiryProduct={setEnquiryProduct} />}
        {page === "gallery" && <GalleryPage />}
        {page === "enquiry" && <EnquiryPage preProduct={enquiryProduct} />}
        {page === "reset-password" && <ResetPasswordPage />}
        {page === "contact" && <ContactPage />}
        {page === "admin" && <AdminPanel onLogin={() => setAdminLoggedIn(true)} onLogout={() => setAdminLoggedIn(false)} />}
      </main>
      <Footer setPage={setPage} />
      <FloatingButtons />
    </div>
  );
}
