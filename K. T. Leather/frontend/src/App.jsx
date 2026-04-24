import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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

function AppInner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [enquiryProduct, setEnquiryProduct] = useState("");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  // Scroll to top on every route change
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  // Keyboard Shortcut for Admin Panel (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        navigate("/admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const handleEnquire = (productName) => {
    setEnquiryProduct(productName);
    navigate("/enquiry");
  };

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
      <Navbar adminLoggedIn={adminLoggedIn} />
      <main style={{ paddingTop: 64 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage onEnquire={handleEnquire} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/enquiry" element={<EnquiryPage preProduct={enquiryProduct} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/admin" element={<AdminPanel onLogin={() => setAdminLoggedIn(true)} onLogout={() => setAdminLoggedIn(false)} />} />
          {/* Fallback to home for unknown routes */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default function App() {
  return <AppInner />;
}
