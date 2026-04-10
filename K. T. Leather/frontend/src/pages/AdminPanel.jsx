import { useState, useEffect } from "react";
import { styles } from "../styles/theme";
import { generateBillHTML } from "../utils/billGenerator";
import { PRODUCTS } from "../constants/data";
import { FiEye, FiEyeOff } from "react-icons/fi";

export function AdminPanel({ onLogin, onLogout }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(""); const [pass, setPass] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetErr, setResetErr] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetStep, setResetStep] = useState(1); // 1: request, 2: reset
  const [tab, setTab] = useState("dashboard");
  const [bills, setBills] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loadingEnq, setLoadingEnq] = useState(false);
  const [loadingBills, setLoadingBills] = useState(false);
  const [savingBill, setSavingBill] = useState(false);
  const [reportMonth, setReportMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const [reportData, setReportData] = useState({ bills: [], totalRevenue: 0 });
  const [loadingReport, setLoadingReport] = useState(false);

  const [bill, setBill] = useState({
    billNo: `KT/${new Date().getFullYear()}/001`,
    date: new Date().toISOString().split("T")[0],
    companyName: "", clientAddress: "", clientGst: "", gstPercent: 18,
    items: [{ product: "", qty: 1, rate: 0 }]
  });

  const authHdr = (tok) => ({ "Authorization": `Bearer ${tok || token}`, "Content-Type": "application/json" });

  const login = async () => {
    setLoginErr("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass })
      });
      const data = await res.json();
      if (!res.ok) { setLoginErr(data.error || "Invalid credentials"); return; }
      setToken(data.token);
      setLoggedIn(true);
      onLogin && onLogin();
      fetchDashboard(data.token);
      fetchNextBillNo(data.token);
    } catch { setLoginErr("Server error. Is the backend running?"); }
  };

  const requestPasswordReset = async () => {
    setResetErr("");
    setResetMsg("");
    if (!resetEmail) { setResetErr("Please enter your email"); return; }
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail })
      });
      const data = await res.json();
      if (!res.ok) { setResetErr(data.error || "Failed to send reset link"); return; }
      setResetMsg("✅ Check your email for reset token. Enter it below to reset your password.");
      setResetStep(2);
    } catch { setResetErr("Server error. Please try again."); }
  };

  const submitPasswordReset = async () => {
    setResetErr("");
    setResetMsg("");
    if (!resetToken || !newPassword) { setResetErr("Please enter reset token and new password"); return; }
    if (newPassword.length < 6) { setResetErr("Password must be at least 6 characters"); return; }
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, newPassword })
      });
      const data = await res.json();
      if (!res.ok) { setResetErr(data.error || "Failed to reset password"); return; }
      setResetMsg("✅ Password reset successfully! Please login with your new password.");
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetStep(1);
        setResetEmail("");
        setResetToken("");
        setNewPassword("");
      }, 2000);
    } catch { setResetErr("Server error. Please try again."); }
  };

  const fetchDashboard = async (tok) => {
    try {
      const res = await fetch("/api/dashboard", { headers: authHdr(tok) });
      const data = await res.json();
      setDashboard(data);
    } catch {}
  };

  const fetchNextBillNo = async (tok) => {
    try {
      const res = await fetch("/api/bills/next-number", { headers: authHdr(tok) });
      const data = await res.json();
      if (data.billNo) setBill(b => ({ ...b, billNo: data.billNo }));
    } catch {}
  };

  const fetchEnquiries = async () => {
    setLoadingEnq(true);
    try {
      const res = await fetch("/api/enquiries?limit=100", { headers: authHdr() });
      const data = await res.json();
      if (!res.ok) {
        console.error("Enquiries fetch error:", data);
        setEnquiries([]);
        return;
      }
      setEnquiries(data.enquiries || []);
    } catch (err) {
      console.error("Enquiries fetch error:", err);
      setEnquiries([]);
    } finally { setLoadingEnq(false); }
  };

  const fetchBills = async () => {
    setLoadingBills(true);
    try {
      const res = await fetch("/api/bills?limit=100", { headers: authHdr() });
      const data = await res.json();
      if (!res.ok) {
        console.error("Bills fetch error:", data);
        setBills([]);
        return;
      }
      setBills(data.bills || []);
    } catch (err) {
      console.error("Bills fetch error:", err);
      setBills([]);
    } finally { setLoadingBills(false); }
  };

  const fetchReport = async () => {
    setLoadingReport(true);
    try {
      const [year, month] = reportMonth.split("-");
      const lastDay = new Date(year, month, 0).getDate();
      const from = `${year}-${month}-01`;
      const to = `${year}-${month}-${lastDay}`;
      
      const res = await fetch(`/api/bills?from=${from}&to=${to}&limit=1000`, { headers: authHdr() });
      const data = await res.json();
      if (!res.ok) {
        setReportData({ bills: [], totalRevenue: 0 });
        return;
      }
      const billsData = data.bills || [];
      const totalRevenue = billsData.reduce((sum, b) => sum + (b.grandTotal || 0), 0);
      setReportData({ bills: billsData, totalRevenue });
    } catch (err) {
      console.error("Report fetch error:", err);
      setReportData({ bills: [], totalRevenue: 0 });
    } finally { setLoadingReport(false); }
  };

  useEffect(() => {
    if (!loggedIn) return;
    if (tab === "enquiries") fetchEnquiries();
    if (tab === "bills") fetchBills();
    if (tab === "dashboard") fetchDashboard(token);
    if (tab === "report") fetchReport();
  }, [tab, loggedIn, reportMonth]); // eslint-disable-line react-hooks/exhaustive-deps

  const addItem = () => setBill(b => ({ ...b, items: [...b.items, { product: "", qty: 1, rate: 0 }] }));
  const removeItem = i => setBill(b => ({ ...b, items: b.items.filter((_, idx) => idx !== i) }));
  const updateItem = (i, k, v) => setBill(b => ({ ...b, items: b.items.map((it, idx) => idx === i ? { ...it, [k]: v } : it) }));

  const printBill = async () => {
    if (!bill.companyName) return alert("Please enter company name.");
    setSavingBill(true);
    try {
      const res = await fetch("/api/bills", {
        method: "POST",
        headers: authHdr(),
        body: JSON.stringify(bill)
      });
      if (!res.ok) { const d = await res.json(); alert(d.error || "Failed to save bill"); return; }
      const saved = await res.json();
      const html = generateBillHTML({ ...bill, ...saved });
      const w = window.open("", "_blank");
      if (w) { w.document.write(html); w.document.close(); w.print(); }
      fetchNextBillNo(token);
      setBill(b => ({ ...b, companyName: "", clientAddress: "", clientGst: "", items: [{ product: "", qty: 1, rate: 0 }] }));
      fetchDashboard(token);
    } catch { alert("Failed to save bill. Please try again."); }
    finally { setSavingBill(false); }
  };

  const updateEnquiryStatus = async (id, status) => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: authHdr(),
        body: JSON.stringify({ status })
      });
      fetchEnquiries();
    } catch { alert("Failed to update status."); }
  };

  const subtotal = bill.items.reduce((s, i) => s + (Number(i.qty) * Number(i.rate)), 0);
  const gstAmt = Math.round(subtotal * bill.gstPercent / 100);
  const grand = subtotal + gstAmt;

  if (!loggedIn) return (
    <div style={styles.page}>
      <div style={styles.loginBox}>
        <div style={styles.loginLogo}>
          <img src="/logo.png" alt="KT Logo" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "inherit" }} />
        </div>
        <h2 style={styles.loginTitle}>Admin Login</h2>
        <p style={styles.loginSub}>K.T. Leather Store Management Panel</p>
        
        {!showForgotPassword ? (
          <>
            {loginErr && <p style={{ color: "#c00", fontSize: 13, marginBottom: 10, background: "#fee", padding: "8px 12px", borderRadius: 6 }}>{loginErr}</p>}
            <input id="admin-username" style={styles.input} placeholder="Username" value={user} onChange={e => setUser(e.target.value)} />
            <div style={{ position: "relative", width: "100%", marginTop: 12 }}>
              <input id="admin-password" style={{ ...styles.input, width: "100%", marginTop: 0, paddingRight: 40, boxSizing: "border-box" }} type={showPassword ? "text" : "password"} placeholder="Password" value={pass} onChange={e => setPass(e.target.value)}
                onKeyDown={e => e.key === "Enter" && login()} />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 0, color: "#666", display: "flex", alignItems: "center" }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <button id="admin-login-btn" style={{ ...styles.btnPrimary, width: "100%", marginTop: 16 }} onClick={login}>Login →</button>
            <p style={{ fontSize: 12, color: "#5c2d09", marginTop: 12, textAlign: "center", cursor: "pointer", textDecoration: "underline" }} onClick={() => setShowForgotPassword(true)}>
              Forgot Password?
            </p>
          </>
        ) : (
          <>
            {resetErr && <p style={{ color: "#c00", fontSize: 13, marginBottom: 10, background: "#fee", padding: "8px 12px", borderRadius: 6 }}>{resetErr}</p>}
            {resetMsg && <p style={{ color: "#060", fontSize: 13, marginBottom: 10, background: "#efe", padding: "8px 12px", borderRadius: 6 }}>{resetMsg}</p>}
            
            {resetStep === 1 ? (
              <>
                <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Enter your email address and we'll send you a reset token.</p>
                <input id="reset-email" style={styles.input} type="email" placeholder="Admin Email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
                <button style={{ ...styles.btnPrimary, width: "100%", marginTop: 16 }} onClick={requestPasswordReset}>Send Reset Token →</button>
              </>
            ) : (
              <>
                <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Enter the reset token from your email and your new password.</p>
                <input id="reset-token" style={styles.input} placeholder="Reset Token" value={resetToken} onChange={e => setResetToken(e.target.value)} />
                <div style={{ position: "relative", width: "100%", marginTop: 12 }}>
                  <input id="reset-newpass" style={{ ...styles.input, width: "100%", marginTop: 0, paddingRight: 40, boxSizing: "border-box" }} type={showNewPassword ? "text" : "password"} placeholder="New Password (min 6 chars)" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                  <button 
                    type="button" 
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 0, color: "#666", display: "flex", alignItems: "center" }}
                    title={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <button style={{ ...styles.btnPrimary, width: "100%", marginTop: 16 }} onClick={submitPasswordReset}>Reset Password →</button>
              </>
            )}
            <p style={{ fontSize: 12, color: "#5c2d09", marginTop: 12, textAlign: "center", cursor: "pointer", textDecoration: "underline" }} onClick={() => {
              setShowForgotPassword(false);
              setResetStep(1);
              setResetErr("");
              setResetMsg("");
            }}>
              Back to Login
            </p>
          </>
        )}
      </div>
    </div>
  );

  const tabs = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "bill", label: "📄 Generate Bill" },
    { id: "bills", label: "🗂 Bill History" },
    { id: "enquiries", label: "📬 Enquiries" },
    { id: "products", label: "🏪 Products" },
    { id: "report", label: "📅 Monthly Report" },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.adminHeader}>
        <h2 style={styles.adminTitle}>⚙️ Admin Panel</h2>
        <button id="logout-btn" style={styles.logoutBtn} onClick={() => { setLoggedIn(false); onLogout && onLogout(); }}>Logout</button>
      </div>
      <div style={styles.adminTabs}>
        {tabs.map(t => <button key={t.id} style={{ ...styles.adminTab, ...(tab === t.id ? styles.adminTabActive : {}) }} onClick={() => setTab(t.id)}>{t.label}</button>)}
      </div>

      {tab === "dashboard" && (
        <div style={styles.billSection}>
          <h3 style={styles.billTitle}>📊 Dashboard Overview</h3>
          {!dashboard ? <p style={{ color: "#888" }}>Loading stats…</p> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, marginBottom: 32 }}>
              {[
                { label: "Total Enquiries", value: dashboard.totalEnquiries, icon: "📬", color: "#5c2d09" },
                { label: "New Enquiries", value: dashboard.newEnquiries, icon: "🔔", color: "#b04000" },
                { label: "Total Bills", value: dashboard.totalBills, icon: "🧾", color: "#5c2d09" },
                { label: "Total Revenue", value: `₹${(dashboard.totalRevenue || 0).toLocaleString("en-IN")}`, icon: "💰", color: "#2e7d32" },
                { label: "Active Products", value: dashboard.totalProducts, icon: "🏪", color: "#1565c0" },
              ].map(stat => (
                <div key={stat.label} style={{ background: "#fff", border: "1px solid #e8d5c0", borderRadius: 12, padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{stat.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: stat.color, fontFamily: "Georgia,serif" }}>{stat.value}</div>
                  <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button style={styles.btnPrimary} onClick={() => setTab("bill")}>📄 Generate New Bill</button>
            <button style={{ ...styles.btnPrimary, background: "#b04000" }} onClick={() => setTab("enquiries")}>📬 View Enquiries</button>
          </div>
        </div>
      )}

      {tab === "bill" && (
        <div style={styles.billSection}>
          <h3 style={styles.billTitle}>Generate GST Invoice</h3>
          <div style={styles.billMeta}>
            {[["billNo", "Bill Number"], ["date", "Date"], ["companyName", "Company Name *"], ["clientAddress", "Client Address"], ["clientGst", "Client GST No."]].map(([k, label]) => (
              <div key={k} style={styles.formGroup}>
                <label style={styles.formLabel}>{label}</label>
                <input style={styles.input} type={k === "date" ? "date" : "text"} value={bill[k]} onChange={e => setBill(b => ({ ...b, [k]: e.target.value }))} />
              </div>
            ))}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>GST %</label>
              <select style={styles.input} value={bill.gstPercent} onChange={e => setBill(b => ({ ...b, gstPercent: Number(e.target.value) }))}>
                {[0 , 2.5 , 5, 12, 18, 28].map(v => <option key={v} value={v}>{v}%</option>)}
              </select>
            </div>
          </div>
          <h4 style={styles.itemsTitle}>Items</h4>
          <table style={styles.itemsTable}>
            <thead><tr style={styles.itemsHead}>
              <th style={styles.th}>Product Description</th><th style={styles.th}>Qty</th><th style={styles.th}>Rate (₹)</th><th style={styles.th}>Amount</th><th style={styles.th}></th>
            </tr></thead>
            <tbody>
              {bill.items.map((item, i) => (
                <tr key={i}>
                  <td style={styles.td}><input style={{ ...styles.input, minWidth: 180 }} value={item.product} onChange={e => updateItem(i, "product", e.target.value)} placeholder="Product name" /></td>
                  <td style={styles.td}><input style={{ ...styles.input, width: 70 }} type="number" value={item.qty} onChange={e => updateItem(i, "qty", e.target.value)} /></td>
                  <td style={styles.td}><input style={{ ...styles.input, width: 90 }} type="number" value={item.rate} onChange={e => updateItem(i, "rate", e.target.value)} /></td>
                  <td style={styles.td}>₹{(item.qty * item.rate).toLocaleString("en-IN")}</td>
                  <td style={styles.td}><button onClick={() => removeItem(i)} style={styles.removeBtn}>✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={styles.addItemBtn} onClick={addItem}>+ Add Item</button>
          <div style={styles.billTotals}>
            <div style={styles.totalRow}><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
            <div style={styles.totalRow}><span>GST ({bill.gstPercent}%)</span><span>₹{gstAmt.toLocaleString("en-IN")}</span></div>
            <div style={{ ...styles.totalRow, fontWeight: 700, fontSize: 18, color: "#5c2d09", borderTop: "2px solid #5c2d09", paddingTop: 8 }}>
              <span>Grand Total</span><span>₹{grand.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <button style={{ ...styles.btnPrimary, opacity: savingBill ? 0.7 : 1 }} onClick={printBill} disabled={savingBill}>
            {savingBill ? "Saving…" : "🖨 Save & Print Bill"}
          </button>
        </div>
      )}

      {tab === "bills" && (
        <div style={styles.billSection}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={styles.billTitle}>🗂 Bill History ({bills.length})</h3>
            <button style={styles.btnSmall} onClick={fetchBills}>🔄 Refresh</button>
          </div>
          {loadingBills ? <p style={{ color: "#888" }}>Loading bills…</p> :
          bills.length === 0 ? <p style={{ color: "#888" }}>No bills yet. Use "Generate Bill" tab.</p> : (
            <div style={{ overflowX: "auto" }}>
            <table style={styles.itemsTable}>
              <thead><tr style={styles.itemsHead}>
                <th style={styles.th}>Bill No</th><th style={styles.th}>Company</th><th style={styles.th}>Date</th><th style={styles.th}>Subtotal</th><th style={styles.th}>GST%</th><th style={styles.th}>Grand Total</th><th style={styles.th}>Action</th>
              </tr></thead>
              <tbody>{bills.map(b => (
                <tr key={b._id}>
                  <td style={styles.td}><strong>{b.billNo}</strong></td>
                  <td style={styles.td}>{b.companyName}</td>
                  <td style={styles.td}>{b.date}</td>
                  <td style={styles.td}>₹{(b.subtotal || 0).toLocaleString("en-IN")}</td>
                  <td style={styles.td}>{b.gstPercent}%</td>
                  <td style={{ ...styles.td, fontWeight: 700, color: "#2e7d32" }}>₹{(b.grandTotal || 0).toLocaleString("en-IN")}</td>
                  <td style={styles.td}><button style={styles.btnSmall} onClick={() => { const w = window.open("", "_blank"); if (w) { w.document.write(generateBillHTML(b)); w.document.close(); w.print(); } }}>🖨 Reprint</button></td>
                </tr>
              ))}</tbody>
            </table>
            </div>
          )}
        </div>
      )}

      {tab === "enquiries" && (
        <div style={styles.billSection}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={styles.billTitle}>📬 Enquiries ({enquiries.length})</h3>
            <button style={styles.btnSmall} onClick={fetchEnquiries}>🔄 Refresh</button>
          </div>
          {loadingEnq ? <p style={{ color: "#888" }}>Loading enquiries…</p> :
          enquiries.length === 0 ? <p style={{ color: "#888" }}>No enquiries yet.</p> : (
            <div style={{ overflowX: "auto" }}>
            <table style={styles.itemsTable}>
              <thead><tr style={styles.itemsHead}>
                <th style={styles.th}>Name</th><th style={styles.th}>Company</th><th style={styles.th}>Phone</th><th style={styles.th}>Interest</th><th style={styles.th}>Type</th><th style={styles.th}>Status</th><th style={styles.th}>Date</th><th style={styles.th}>Update</th>
              </tr></thead>
              <tbody>{enquiries.map(e => (
                <tr key={e._id}>
                  <td style={styles.td}><strong>{e.name}</strong></td>
                  <td style={styles.td}>{e.company || "—"}</td>
                  <td style={styles.td}><a href={`tel:${e.phone}`} style={{ color: "#5c2d09", fontWeight: 600 }}>{e.phone}</a></td>
                  <td style={styles.td}>{e.interest || e.message?.slice(0, 40) || "—"}</td>
                  <td style={styles.td}><span style={{ background: "#f5ede3", color: "#5c2d09", padding: "2px 8px", borderRadius: 4, fontSize: 12 }}>{e.type}</span></td>
                  <td style={styles.td}>
                    <span style={{ background: e.status === "new" ? "#fff3cd" : e.status === "contacted" ? "#d4edda" : "#f8d7da", color: e.status === "new" ? "#856404" : e.status === "contacted" ? "#155724" : "#721c24", padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                      {e.status}
                    </span>
                  </td>
                  <td style={styles.td}>{new Date(e.createdAt).toLocaleDateString("en-IN")}</td>
                  <td style={styles.td}>
                    <select style={{ fontSize: 12, padding: "4px 6px", borderRadius: 4, border: "1px solid #ccc" }}
                      value={e.status} onChange={ev => updateEnquiryStatus(e._id, ev.target.value)}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}</tbody>
            </table>
            </div>
          )}
        </div>
      )}

      {tab === "products" && (
        <div style={styles.billSection}>
          <h3 style={styles.billTitle}>Product Management</h3>
          <p style={styles.contactText}>Product catalog is managed via the database. Current products:</p>
          <table style={styles.itemsTable}>
            <thead><tr style={styles.itemsHead}>
              <th style={styles.th}>#</th><th style={styles.th}>Product</th><th style={styles.th}>Category</th><th style={styles.th}>Price Range</th>
            </tr></thead>
            <tbody>{PRODUCTS.map(p => (
              <tr key={p.id}>
                <td style={styles.td}>{p.id}</td>
                <td style={styles.td}>{p.icon} {p.name}</td>
                <td style={styles.td}>{p.category}</td>
                <td style={styles.td}>{p.priceRange}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {tab === "report" && (
        <div style={styles.billSection}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={styles.billTitle}>📅 Monthly Report</h3>
            <div style={{ display: "flex", gap: 10 }}>
              <input type="month" style={styles.input} value={reportMonth} onChange={e => setReportMonth(e.target.value)} />
              <button style={styles.btnSmall} onClick={fetchReport}>🔄 Fetch</button>
            </div>
          </div>
          
          {loadingReport ? <p style={{ color: "#888" }}>Loading report...</p> : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 32 }}>
                <div style={{ background: "#fff", border: "1px solid #e8d5c0", borderRadius: 12, padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>🧾</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#5c2d09", fontFamily: "Georgia,serif" }}>{reportData.bills.length}</div>
                  <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Bills Generated</div>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e8d5c0", borderRadius: 12, padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>💰</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#2e7d32", fontFamily: "Georgia,serif" }}>₹{reportData.totalRevenue.toLocaleString("en-IN")}</div>
                  <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Total Revenue</div>
                </div>
              </div>
              
              <h4 style={{ ...styles.itemsTitle, marginTop: 20 }}>Bills in {reportMonth}</h4>
              {reportData.bills.length === 0 ? <p style={{ color: "#888" }}>No bills found for this month.</p> : (
                <div style={{ overflowX: "auto" }}>
                  <table style={styles.itemsTable}>
                    <thead><tr style={styles.itemsHead}>
                      <th style={styles.th}>Bill No</th><th style={styles.th}>Company</th><th style={styles.th}>Date</th><th style={styles.th}>Grand Total</th>
                    </tr></thead>
                    <tbody>{reportData.bills.map(b => (
                      <tr key={b._id}>
                        <td style={styles.td}><strong>{b.billNo}</strong></td>
                        <td style={styles.td}>{b.companyName}</td>
                        <td style={styles.td}>{b.date}</td>
                        <td style={{ ...styles.td, fontWeight: 700, color: "#2e7d32" }}>₹{(b.grandTotal || 0).toLocaleString("en-IN")}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              )}
              
              <button 
                style={{ ...styles.btnPrimary, marginTop: 20 }} 
                onClick={() => {
                  const printContents = `
                    <html>
                      <head>
                        <title>Monthly Report - ${reportMonth}</title>
                        <style>
                          body { font-family: sans-serif; padding: 20px; }
                          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                          th { background: #f4f4f4; }
                          .right { text-align: right; }
                        </style>
                      </head>
                      <body>
                        <h2>K.T. Leather Store - Monthly Report (${reportMonth})</h2>
                        <p><strong>Total Bills:</strong> ${reportData.bills.length}</p>
                        <p><strong>Total Revenue:</strong> Rs. ${reportData.totalRevenue.toLocaleString("en-IN")}</p>
                        <table>
                          <thead>
                            <tr>
                              <th>Bill No</th>
                              <th>Company</th>
                              <th>Date</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${reportData.bills.map(b => `
                              <tr>
                                <td>${b.billNo}</td>
                                <td>${b.companyName}</td>
                                <td>${b.date}</td>
                                <td>Rs. ${(b.grandTotal || 0).toLocaleString("en-IN")}</td>
                              </tr>
                            `).join('')}
                          </tbody>
                        </table>
                      </body>
                    </html>
                  `;
                  const w = window.open("", "_blank");
                  if (w) { w.document.write(printContents); w.document.close(); w.print(); }
                }}
                disabled={reportData.bills.length === 0}
              >
                🖨 Print / Download Report
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
