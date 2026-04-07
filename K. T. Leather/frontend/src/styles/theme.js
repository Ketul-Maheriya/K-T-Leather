export const C = { brown: "#5c2d09", amber: "#b04000", gold: "#f5c97a", cream: "#fdf8f3", light: "#fdf6ee", border: "#e8d5c0", dark: "#2c1a0e" };

export const styles = {
  app: { minHeight: "100vh", background: C.cream },

  // NAV
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, background: C.dark, borderBottom: `2px solid ${C.brown}`, height: 64 },
  navInner: { maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" },
  navBrand: { display: "flex", alignItems: "center", gap: 12, cursor: "pointer" },
  // navLogo: { width: 40, height: 40, background: "transparent", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, borderRadius: 6, fontFamily: "Georgia, serif" },
  navLogo: {
  width: 64,              // bigger size
  height: 64,
  background: "rgba(255,255,255,0.08)", // subtle highlight
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  zIndex: 1000,           // ensures logo sits above other elements
}

  navName: { color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'Playfair Display', Georgia, serif" },
  navSub: { color: C.gold, fontSize: 11 },
  navLinks: { display: "flex", gap: 4, alignItems: "center" },
  navLink: { background: "none", border: "none", color: "#ddd", padding: "8px 14px", borderRadius: 6, fontSize: 14, transition: "all .2s" },
  navLinkActive: { background: C.brown, color: "#fff" },
  burger: { background: "none", border: "none", color: "#fff", fontSize: 22, display: "none" },

  // HERO
  hero: { minHeight: "100vh", background: `linear-gradient(135deg, ${C.dark} 0%, #3d1a07 50%, #5c2d09 100%)`, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" },
  heroOverlay: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 50%, rgba(245,201,122,0.08) 0%, transparent 60%)", pointerEvents: "none" },
  heroContent: { maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", animation: "fadeUp .8s ease" },
  heroBadge: { display: "inline-block", background: "rgba(245,201,122,0.15)", border: "1px solid rgba(245,201,122,0.3)", color: C.gold, padding: "6px 18px", borderRadius: 999, fontSize: 13, marginBottom: 24 },
  heroTitle: { fontSize: "clamp(36px, 6vw, 72px)", color: "#fff", lineHeight: 1.1, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, marginBottom: 20 },
  heroAccent: { color: C.gold },
  heroSub: { fontSize: 18, color: "#ccc", maxWidth: 560, lineHeight: 1.7, marginBottom: 36 },
  heroActions: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 60 },
  heroStats: { display: "flex", gap: 40, flexWrap: "wrap" },
  heroStat: { display: "flex", flexDirection: "column" },
  heroStatNum: { fontSize: 32, fontWeight: 800, color: C.gold, fontFamily: "'Playfair Display', Georgia, serif" },
  heroStatLabel: { fontSize: 12, color: "#aaa", textTransform: "uppercase", letterSpacing: 1 },

  // BUTTONS
  btnPrimary: { background: C.brown, color: "#fff", border: "none", padding: "14px 32px", borderRadius: 8, fontSize: 15, fontWeight: 600, transition: "all .2s", cursor: "pointer" },
  btnOutline: { background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", padding: "14px 32px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" },
  btnSmall: { background: "#f0e8e0", color: C.dark, border: "none", padding: "6px 14px", borderRadius: 6, fontSize: 13, cursor: "pointer" },
  btnPrimarySmall: { background: C.brown, color: "#fff", border: "none", padding: "6px 14px", borderRadius: 6, fontSize: 13, cursor: "pointer" },

  // SECTIONS
  strip: { background: "#fff", padding: "80px 24px" },
  sectionHeader: { textAlign: "center", marginBottom: 48 },
  sectionTag: { display: "inline-block", background: "#f5ede3", color: C.brown, padding: "4px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 },
  sectionTitle: { fontSize: "clamp(24px, 4vw, 42px)", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, color: C.dark },

  // SERVICES
  servicesGrid: { maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 },
  serviceCard: { background: C.light, border: `1px solid ${C.border}`, borderRadius: 12, padding: "28px 20px", textAlign: "center", cursor: "pointer", transition: "all .2s" },
  serviceIcon: { fontSize: 36, marginBottom: 12 },
  serviceLabel: { fontWeight: 700, color: C.dark, fontSize: 15, marginBottom: 6 },
  serviceSub: { fontSize: 13, color: "#888" },

  // WHY US
  whySection: { background: C.light, padding: "80px 24px" },
  whyGrid: { maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 },
  whyCard: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: "28px 24px" },
  whyIcon: { fontSize: 32, marginBottom: 14 },
  whyTitle: { fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 8 },
  whyDesc: { fontSize: 14, color: "#666", lineHeight: 1.6 },

  // TESTIMONIALS
  testimonialSection: { background: `linear-gradient(135deg, ${C.dark}, #3d1a07)`, padding: "80px 24px" },
  testimonialsGrid: { maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 },
  testimonialCard: { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "32px 24px" },
  testimonialQuote: { fontSize: 48, color: C.gold, lineHeight: 1, marginBottom: 8 },
  testimonialText: { color: "#ddd", lineHeight: 1.7, marginBottom: 16 },
  testimonialPerson: { fontSize: 14, color: "#aaa" },

  // PAGE COMMON
  page: { minHeight: "calc(100vh - 64px)" },
  pageHero: { background: `linear-gradient(135deg, ${C.dark} 0%, ${C.brown} 100%)`, padding: "60px 24px", textAlign: "center" },
  pageTitle: { fontSize: "clamp(28px, 5vw, 52px)", color: "#fff", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, marginBottom: 12 },
  pageSubtitle: { fontSize: 16, color: C.gold },
  pageContent: { maxWidth: 1200, margin: "0 auto", padding: "48px 24px" },

  // ABOUT
  aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 48, flexWrap: "wrap" },
  aboutHeading: { fontSize: 26, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: C.dark, marginBottom: 16 },
  aboutText: { fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 16 },
  aboutInfoCard: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 },
  aboutInfoTitle: { fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 16, paddingBottom: 12, borderBottom: `2px solid ${C.border}` },
  infoRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontSize: 14 },
  infoKey: { color: "#888", fontWeight: 600 },
  infoVal: { color: C.dark, fontWeight: 500 },
  missionGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 },
  missionCard: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, textAlign: "center" },
  missionIcon: { fontSize: 40, marginBottom: 16 },
  missionTitle: { fontWeight: 700, fontSize: 18, color: C.dark, marginBottom: 10 },
  missionText: { fontSize: 14, color: "#666", lineHeight: 1.6 },

  // PRODUCTS
  catBar: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 },
  catBtn: { background: "#fff", border: `1px solid ${C.border}`, color: C.dark, padding: "8px 18px", borderRadius: 999, fontSize: 14, cursor: "pointer" },
  catBtnActive: { background: C.brown, color: "#fff", border: `1px solid ${C.brown}` },
  productsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 },
  productCard: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, transition: "all .2s" },
  productIcon: { fontSize: 40, marginBottom: 12 },
  productName: { fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 8 },
  productDesc: { fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 12 },
  productPrice: { display: "inline-block", background: "#f5ede3", color: C.brown, padding: "4px 12px", borderRadius: 6, fontSize: 13, fontWeight: 600, marginBottom: 12 },
  productDetails: { background: C.light, borderRadius: 8, padding: 14, marginBottom: 12 },
  detailRow: { fontSize: 13, color: "#555", marginBottom: 6 },
  detailKey: { fontWeight: 600, color: C.dark, marginRight: 6 },
  featureTag: { display: "inline-block", background: "#e8f5e9", color: "#2e7d32", padding: "2px 8px", borderRadius: 4, fontSize: 12, marginRight: 6, marginTop: 4 },
  productActions: { display: "flex", gap: 10 },

  // GALLERY
  galleryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 },
  galleryCard: { borderRadius: 12, padding: "48px 24px", textAlign: "center", color: "#fff" },
  galleryIcon: { fontSize: 52, marginBottom: 16 },
  galleryLabel: { fontWeight: 700, fontSize: 17 },
  galleryNote: { marginTop: 32, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: 20, textAlign: "center", color: "#666", fontSize: 15 },

  // ENQUIRY
  enquiryLayout: { display: "grid", gridTemplateColumns: "1fr 320px", gap: 40 },
  enquiryForm: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 32 },
  formTitle: { fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 20 },
  radioGroup: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 },
  radioLabel: { fontSize: 14, color: "#555", cursor: "pointer", display: "flex", alignItems: "center" },
  formGroup: { marginBottom: 16 },
  formLabel: { display: "block", fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6 },
  input: { width: "100%", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none", background: "#fff" },
  textarea: { width: "100%", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none", resize: "vertical", background: "#fff" },
  uniformExtra: { background: C.light, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 },
  extraTitle: { fontWeight: 700, color: C.brown, marginBottom: 12, fontSize: 15 },
  enquirySide: { display: "flex", flexDirection: "column", gap: 20 },
  enquirySideCard: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 },
  sideCardTitle: { fontWeight: 700, fontSize: 16, color: C.dark, marginBottom: 16, borderBottom: `1px solid ${C.border}`, paddingBottom: 10 },
  waBtn: { display: "block", background: "#25D366", color: "#fff", padding: "12px 20px", borderRadius: 8, textAlign: "center", fontWeight: 600, marginBottom: 10, fontSize: 15 },
  callBtn: { display: "block", background: C.brown, color: "#fff", padding: "12px 20px", borderRadius: 8, textAlign: "center", fontWeight: 600, fontSize: 15 },
  offerList: { listStyle: "none", padding: 0 },
  offerItem: { fontSize: 14, color: "#555", padding: "4px 0", borderBottom: `1px solid ${C.border}` },
  successBox: { maxWidth: 500, margin: "100px auto", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: 48, textAlign: "center" },
  successIcon: { fontSize: 56, marginBottom: 16 },
  successTitle: { fontSize: 24, fontWeight: 700, color: C.dark, marginBottom: 16 },

  // CONTACT
  contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 },
  contactCard: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 20 },
  contactCardTitle: { fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 14 },
  contactText: { fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 12 },
  contactLink: { color: C.brown, fontWeight: 600, fontSize: 16, display: "block", marginBottom: 4 },
  hoursRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontSize: 14 },
  mapEmbed: { borderRadius: 8, overflow: "hidden", marginTop: 12 },

  // ADMIN
  loginBox: { maxWidth: 420, margin: "80px auto", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: 40, textAlign: "center" },
  loginLogo: { width: 64, height: 64, background: "transparent", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24, borderRadius: 12, margin: "0 auto 16px", fontFamily: "Georgia, serif" },
  loginTitle: { fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 6 },
  loginSub: { fontSize: 13, color: "#888", marginBottom: 24 },
  adminHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "#fff", borderBottom: `1px solid ${C.border}` },
  adminTitle: { fontSize: 22, fontWeight: 700, color: C.dark },
  logoutBtn: { background: "#fee", color: "#c00", border: "1px solid #fcc", padding: "8px 16px", borderRadius: 6, cursor: "pointer" },
  adminTabs: { display: "flex", gap: 0, borderBottom: `2px solid ${C.border}`, background: "#fff", padding: "0 24px" },
  adminTab: { background: "none", border: "none", padding: "14px 20px", fontSize: 14, color: "#666", cursor: "pointer", borderBottom: "2px solid transparent" },
  adminTabActive: { color: C.brown, borderBottom: `2px solid ${C.brown}`, fontWeight: 700 },
  billSection: { padding: 24 },
  billTitle: { fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 20 },
  billMeta: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginBottom: 24 },
  itemsTitle: { fontWeight: 700, color: C.dark, marginBottom: 12 },
  itemsTable: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 8, overflow: "hidden", marginBottom: 16 },
  itemsHead: { background: C.brown },
  th: { padding: "12px 14px", color: "#fff", fontSize: 13, fontWeight: 600, textAlign: "left" },
  td: { padding: "10px 14px", borderBottom: `1px solid ${C.border}`, fontSize: 14 },
  addItemBtn: { background: C.light, border: `1px dashed ${C.border}`, color: C.brown, padding: "8px 20px", borderRadius: 6, fontSize: 14, cursor: "pointer", marginBottom: 16 },
  removeBtn: { background: "#fee", color: "#c00", border: "none", width: 28, height: 28, borderRadius: 4, cursor: "pointer" },
  billTotals: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, maxWidth: 320, marginLeft: "auto", marginBottom: 20 },
  totalRow: { display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 15 },

  // FLOATING
  floatingBtns: { position: "fixed", bottom: 24, right: 24, display: "flex", flexDirection: "column", gap: 12, zIndex: 998 },
  floatWA: { width: 52, height: 52, background: "#25D366", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 16px rgba(0,0,0,0.25)", animation: "pulse 2s infinite" },
  floatCall: { width: 52, height: 52, background: C.brown, color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 16px rgba(0,0,0,0.25)" },

  // FOOTER
  footer: { background: C.dark, color: "#ccc", padding: "60px 24px 0" },
  footerInner: { maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 2fr 1fr", gap: 40, paddingBottom: 40 },
  footerBrand: { },
  footerLogo: { width: 48, height: 48, background: "transparent", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, borderRadius: 8, marginBottom: 10, fontFamily: "Georgia, serif" },
  footerName: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, color: "#fff", fontWeight: 700, marginBottom: 4 },
  footerSub: { fontSize: 12, color: C.gold, marginBottom: 12 },
  footerDesc: { fontSize: 13, color: "#aaa", lineHeight: 1.7 },
  footerSectionTitle: { fontWeight: 700, color: "#fff", marginBottom: 16, fontSize: 15, textTransform: "uppercase", letterSpacing: 1 },
  footerLink: { fontSize: 13, color: "#aaa", padding: "4px 0", cursor: "pointer", transition: "color .2s" },
  footerContactItem: { fontSize: 13, color: "#aaa", padding: "4px 0" },
  footerBottom: { borderTop: "1px solid rgba(255,255,255,0.1)", padding: "20px 0", textAlign: "center", fontSize: 12, color: "#666", display: "flex", justifyContent: "center", alignItems: "center" },
};
