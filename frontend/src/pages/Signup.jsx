import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    accountNumber: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.accountNumber || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await API.post("/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #faf9f7; }

        .auth-page {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          background: #faf9f7; position: relative; overflow: hidden; padding: 24px;
        }
        .auth-page::before {
          content: ''; position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(192,132,252,0.16) 0%, transparent 70%);
          top: -160px; right: -120px; border-radius: 50%; pointer-events: none;
        }
        .auth-page::after {
          content: ''; position: absolute;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%);
          bottom: -100px; left: -80px; border-radius: 50%; pointer-events: none;
        }
        .auth-card {
          background: white; border: 1px solid #ede9fe; border-radius: 28px;
          padding: 48px 44px; width: 100%; max-width: 440px;
          box-shadow: 0 8px 48px rgba(124,58,237,0.1); position: relative; z-index: 2;
        }
        .auth-logo {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 32px; cursor: pointer;
        }
        .auth-logo-icon {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #7c3aed, #c084fc);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; box-shadow: 0 4px 14px rgba(124,58,237,0.3);
        }
        .auth-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem; font-weight: 700; color: #2d1b69;
        }
        .auth-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.9rem; font-weight: 700; color: #1a0a3e;
          margin-bottom: 6px; letter-spacing: -0.02em;
        }
        .auth-sub { font-size: 0.88rem; color: #9d8fbf; margin-bottom: 32px; }
        .field-row { display: flex; gap: 12px; }
        .field-group { margin-bottom: 16px; flex: 1; }
        .field-label {
          display: block; font-size: 0.8rem; font-weight: 600;
          color: #4a3970; margin-bottom: 6px; letter-spacing: 0.02em;
        }
        .field-input {
          width: 100%; padding: 12px 16px;
          border: 1.5px solid #e9d5ff; border-radius: 12px;
          font-size: 0.95rem; font-family: 'DM Sans', sans-serif;
          color: #1a0a3e; background: #faf9f7; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .field-input:focus {
          border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); background: white;
        }
        .field-input::placeholder { color: #c4b5d4; }
        .error-msg {
          background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px;
          padding: 10px 14px; font-size: 0.85rem; color: #dc2626; margin-bottom: 18px;
        }
        .btn-submit {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white; border: none; border-radius: 50px;
          font-size: 1rem; font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 6px 24px rgba(124,58,237,0.38);
          transition: all 0.25s ease; margin-top: 8px;
        }
        .btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(124,58,237,0.48); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .auth-switch {
          text-align: center; margin-top: 24px;
          font-size: 0.88rem; color: #9d8fbf;
        }
        .auth-switch button {
          background: none; border: none; color: #7c3aed; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; padding: 0; text-decoration: underline;
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo" onClick={() => navigate("/")}>
            <div className="auth-logo-icon">💳</div>
            <span className="auth-logo-text">ATM App</span>
          </div>

          <h1 className="auth-title">Create your account</h1>
          <p className="auth-sub">Join us in a few seconds</p>

          {error && <div className="error-msg">⚠ {error}</div>}

          <div className="field-group">
            <label className="field-label">Full name</label>
            <input
              className="field-input" name="name" type="text"
              placeholder="Jane Doe"
              onChange={handleChange} onKeyDown={handleKey}
            />
          </div>

          <div className="field-group">
            <label className="field-label">Email address</label>
            <input
              className="field-input" name="email" type="email"
              placeholder="you@example.com"
              onChange={handleChange} onKeyDown={handleKey}
            />
          </div>

          <div className="field-row">
            <div className="field-group">
              <label className="field-label">Account number</label>
              <input
                className="field-input" name="accountNumber" type="text"
                placeholder="1234567890"
                onChange={handleChange} onKeyDown={handleKey}
              />
            </div>
            <div className="field-group">
              <label className="field-label">Password</label>
              <input
                className="field-input" name="password" type="password"
                placeholder="••••••••"
                onChange={handleChange} onKeyDown={handleKey}
              />
            </div>
          </div>

          <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating account…" : "Sign up →"}
          </button>

          <p className="auth-switch">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")}>Log in</button>
          </p>
        </div>
      </div>
    </>
  );
}