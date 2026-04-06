import { useState, useEffect } from "react";
import { styles } from "../styles/theme";

export function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get token from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Reset token is missing. Please use the link from your email.");
      return;
    }

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password. Token may be expired.");
        return;
      }

      setSuccess("✅ Password reset successfully! You can now login with your new password.");
      setTimeout(() => {
        window.location.href = "/"; // Redirect to home
      }, 3000);
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container || {}}>
        <div style={{ maxWidth: 400, margin: "0 auto", padding: "40px 20px" }}>
          <div style={styles.card || { background: "#fff", padding: 32, borderRadius: 12 }}>
            <h2 style={styles.pageTitle}>Reset Your Password</h2>
            <p style={styles.pageDesc || { marginBottom: 20 }}>Enter your new password below.</p>

            {error && <div style={styles.errorBox || { color: "red", marginBottom: 10 }}>{error}</div>}
            {success && <div style={styles.successBox || { color: "green", marginBottom: 10 }}>{success}</div>}

            <form onSubmit={handleSubmit} style={styles.form || {}}>
              <div style={styles.formGroup}>
                <label style={styles.label || { display: "block", marginBottom: 4 }}>Reset Token</label>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  style={styles.input}
                  placeholder="Enter reset token from email"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label || { display: "block", marginBottom: 4 }}>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={styles.input}
                  placeholder="Enter new password (min 6 characters)"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label || { display: "block", marginBottom: 4 }}>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.input}
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <button
                type="submit"
                style={{ ...styles.btnPrimary, ...(loading ? styles.btnDisabled : {}), width: "100%", marginTop: 12 }}
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button
                onClick={() => window.location.href = "/"}
                style={styles.btnOutline}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
