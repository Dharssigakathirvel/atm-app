import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(null); // "deposit" | "withdraw" | null
  const [toast, setToast] = useState(null);     // { msg, type: "success"|"error" }

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const updateUser = (newBalance) => {
    const updated = { ...JSON.parse(localStorage.getItem("user")), balance: newBalance };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDeposit = async () => {
    if (!amount || Number(amount) <= 0) return showToast("Enter a valid amount", "error");
    setLoading("deposit");
    try {
      const res = await API.post("/api/account/deposit", {
        accountNumber: user.accountNumber,
        amount: Number(amount),
      });
      updateUser(res.data.balance);
      setAmount("");
      showToast("Deposit successful! 🎉");
    } catch (err) {
      showToast(err.response?.data?.message || "Deposit failed", "error");
    } finally {
      setLoading(null);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) return showToast("Enter a valid amount", "error");
    setLoading("withdraw");
    try {
      const res = await API.post("/api/account/withdraw", {
        accountNumber: user.accountNumber,
        amount: Number(amount),
      });
      updateUser(res.data.balance);
      setAmount("");
      showToast("Withdrawal successful! ✓");
    } catch (err) {
      showToast(err.response?.data?.message || "Withdrawal failed", "error");
    } finally {
      setLoading(null);
    }
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #faf9f7; }

        /* ── NAV ── */
        .dash-nav {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5%;
          height: 66px;
          background: rgba(250,249,247,0.88);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(200,185,215,0.25);
        }
        .dash-logo {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem; font-weight: 700; color: #2d1b69;
          cursor: pointer;
        }
        .dash-logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #7c3aed, #c084fc);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          box-shadow: 0 4px 14px rgba(124,58,237,0.3);
        }
        .dash-nav-right { display: flex; align-items: center; gap: 14px; }
        .avatar {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 0.8rem; font-weight: 700;
        }
        .btn-logout {
          padding: 8px 20px;
          background: transparent;
          border: 1.5px solid #e9d5ff;
          border-radius: 50px;
          color: #7c3aed;
          font-size: 0.85rem; font-weight: 500;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .btn-logout:hover { background: #f5f3ff; border-color: #a78bfa; }

        /* ── PAGE ── */
        .dash-page {
          min-height: calc(100vh - 66px);
          padding: 40px 5% 80px;
          max-width: 900px;
          margin: 0 auto;
        }

        .dash-greeting {
          margin-bottom: 32px;
        }
        .dash-greeting h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 700;
          color: #1a0a3e;
          margin-bottom: 4px;
        }
        .dash-greeting p { font-size: 0.9rem; color: #9d8fbf; }

        /* ── BALANCE CARD ── */
        .balance-card {
          background: linear-gradient(135deg, #2d1b69 0%, #7c3aed 60%, #a855f7 100%);
          border-radius: 24px;
          padding: 36px 40px;
          margin-bottom: 28px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 48px rgba(124,58,237,0.35);
        }
        .balance-card::before {
          content: '';
          position: absolute;
          width: 260px; height: 260px;
          background: rgba(255,255,255,0.07);
          border-radius: 50%;
          top: -100px; right: -60px;
        }
        .balance-card::after {
          content: '';
          position: absolute;
          width: 180px; height: 180px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
          bottom: -70px; left: 40px;
        }
        .balance-label {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          margin-bottom: 10px;
        }
        .balance-amount {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 6vw, 3.6rem);
          font-weight: 700;
          color: white;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
          position: relative; z-index: 1;
        }
        .balance-amount span { font-size: 0.5em; opacity: 0.7; font-weight: 400; vertical-align: top; margin-top: 8px; display: inline-block; }
        .balance-meta {
          display: flex; gap: 32px; position: relative; z-index: 1;
          flex-wrap: wrap;
        }
        .balance-meta-item { }
        .balance-meta-item .meta-label {
          font-size: 0.72rem; color: rgba(255,255,255,0.55);
          text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px;
        }
        .balance-meta-item .meta-val {
          font-size: 0.9rem; color: rgba(255,255,255,0.9); font-weight: 500;
        }

        /* ── ACTION CARD ── */
        .action-card {
          background: white;
          border: 1px solid #ede9fe;
          border-radius: 24px;
          padding: 36px 40px;
          box-shadow: 0 4px 28px rgba(124,58,237,0.07);
        }
        .action-card h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #1a0a3e;
          margin-bottom: 20px;
        }

        .amount-input-wrap {
          position: relative;
          margin-bottom: 20px;
        }
        .amount-prefix {
          position: absolute;
          left: 18px; top: 50%; transform: translateY(-50%);
          font-size: 1.1rem; font-weight: 600; color: #7c3aed;
        }
        .amount-input {
          width: 100%;
          padding: 16px 18px 16px 38px;
          border: 1.5px solid #e9d5ff;
          border-radius: 14px;
          font-size: 1.2rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          color: #1a0a3e;
          background: #faf9f7;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .amount-input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
          background: white;
        }
        .amount-input::placeholder { color: #c4b5d4; font-weight: 400; font-size: 1rem; }

        .quick-amounts {
          display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px;
        }
        .quick-chip {
          padding: 7px 16px;
          background: #f5f3ff;
          border: 1.5px solid #ede9fe;
          border-radius: 50px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #7c3aed;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .quick-chip:hover { background: #ede9fe; border-color: #c4b5fd; }

        .action-btns { display: flex; gap: 12px; flex-wrap: wrap; }

        .btn-deposit {
          flex: 1; min-width: 140px;
          padding: 14px 20px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white; border: none; border-radius: 50px;
          font-size: 0.95rem; font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 6px 22px rgba(124,58,237,0.38);
          transition: all 0.25s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn-deposit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(124,58,237,0.48);
        }

        .btn-withdraw {
          flex: 1; min-width: 140px;
          padding: 14px 20px;
          background: white;
          color: #7c3aed;
          border: 1.5px solid #e9d5ff;
          border-radius: 50px;
          font-size: 0.95rem; font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 2px 12px rgba(124,58,237,0.08);
          transition: all 0.25s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn-withdraw:hover:not(:disabled) {
          border-color: #a78bfa;
          background: #f5f3ff;
          transform: translateY(-2px);
        }

        .btn-deposit:disabled, .btn-withdraw:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

        /* ── TOAST ── */
        .toast {
          position: fixed;
          bottom: 32px; left: 50%; transform: translateX(-50%);
          padding: 14px 28px;
          border-radius: 50px;
          font-size: 0.9rem; font-weight: 500;
          box-shadow: 0 8px 32px rgba(0,0,0,0.16);
          z-index: 999;
          animation: slideUp 0.3s ease;
          white-space: nowrap;
        }
        .toast-success { background: #1a0a3e; color: white; }
        .toast-error { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        @media (max-width: 500px) {
          .action-card { padding: 28px 22px; }
          .balance-card { padding: 28px 24px; }
          .dash-nav { padding: 0 4%; }
        }
      `}</style>

      {/* NAV */}
      <nav className="dash-nav">
        <div className="dash-logo" onClick={() => navigate("/")}>
          <div className="dash-logo-icon">💳</div>
          ATM App
        </div>
        <div className="dash-nav-right">
          <div className="avatar">{initials}</div>
          <button className="btn-logout" onClick={handleLogout}>Log out</button>
        </div>
      </nav>

      {/* PAGE */}
      <div className="dash-page">
        {/* Greeting */}
        <div className="dash-greeting">
          <h1>Hello, {user?.name?.split(" ")[0]} 👋</h1>
          <p>Here's your account overview for today.</p>
        </div>

        {/* Balance card */}
        <div className="balance-card">
          <p className="balance-label">Available Balance</p>
          <div className="balance-amount">
            <span>₹</span>{Number(user?.balance || 0).toLocaleString("en-IN")}
          </div>
          <div className="balance-meta">
            <div className="balance-meta-item">
              <p className="meta-label">Account No.</p>
              <p className="meta-val">•••• {String(user?.accountNumber || "").slice(-4)}</p>
            </div>
            <div className="balance-meta-item">
              <p className="meta-label">Account holder</p>
              <p className="meta-val">{user?.name}</p>
            </div>
          </div>
        </div>

        {/* Action card */}
        <div className="action-card">
          <h2>Make a transaction</h2>

          <div className="amount-input-wrap">
            <span className="amount-prefix">₹</span>
            <input
              className="amount-input"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
            />
          </div>

          {/* Quick amounts */}
          <div className="quick-amounts">
            {[500, 1000, 2000, 5000].map((q) => (
              <button
                key={q}
                className="quick-chip"
                onClick={() => setAmount(String(q))}
              >
                ₹{q.toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          <div className="action-btns">
            <button
              className="btn-deposit"
              onClick={handleDeposit}
              disabled={loading !== null}
            >
              {loading === "deposit" ? "Processing…" : "📥 Deposit"}
            </button>
            <button
              className="btn-withdraw"
              onClick={handleWithdraw}
              disabled={loading !== null}
            >
              {loading === "withdraw" ? "Processing…" : "💸 Withdraw"}
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}
    </>
  );
}