import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));

    if (!stored || !stored.token) {
      navigate("/login");
      return;
    }

    setUser(stored);

    // Always refresh balance from the server on load, don't trust stale localStorage
    API.get("/api/account/balance")
      .then((res) => {
        const updated = { ...stored, ...res.data };
        setUser(updated);
        localStorage.setItem("user", JSON.stringify(updated));
      })
      .catch(() => {
        localStorage.removeItem("user");
        navigate("/login");
      })
      .finally(() => setChecking(false));
  }, [navigate]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
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
    if (!amount || Number(amount) <= 0) return showToast("Enter a valid amount");
    setBusy(true);
    try {
      const res = await API.post("/api/account/deposit", { amount: Number(amount) });
      showToast(res.data.message);
      updateUser(res.data.balance);
      setAmount("");
    } catch (err) {
      showToast(err.response?.data?.message || "Deposit failed");
    } finally {
      setBusy(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) return showToast("Enter a valid amount");
    setBusy(true);
    try {
      const res = await API.post("/api/account/withdraw", { amount: Number(amount) });
      showToast(res.data.message);
      updateUser(res.data.balance);
      setAmount("");
    } catch (err) {
      showToast(err.response?.data?.message || "Withdraw failed");
    } finally {
      setBusy(false);
    }
  };

  if (checking) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif", color: "#9d8fbf"
      }}>
        Loading your account…
      </div>
    );
  }

  const initials = user?.name
    ? user.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  const maskedAccount = user?.accountNumber
    ? "•••• " + user.accountNumber.slice(-4)
    : "••••";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #faf9f7; }

        .dash-page { min-height: 100vh; background: #faf9f7; }

        .dash-nav {
          position: sticky; top: 0; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 40px; background: rgba(250,249,247,0.85);
          backdrop-filter: blur(10px); border-bottom: 1px solid #ede9fe;
        }
        .dash-logo { display: flex; align-items: center; gap: 10px; }
        .dash-logo-icon {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #7c3aed, #c084fc);
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          font-size: 1rem; box-shadow: 0 4px 14px rgba(124,58,237,0.3);
        }
        .dash-logo-text { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: #2d1b69; }
        .dash-nav-right { display: flex; align-items: center; gap: 14px; }
        .avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #a855f7, #7c3aed);
          color: white; display: flex; align-items: center; justify-content: center;
          font-weight: 600; font-size: 0.85rem;
        }
        .btn-logout {
          padding: 9px 18px; border-radius: 50px; border: 1.5px solid #e9d5ff;
          background: white; color: #7c3aed; font-weight: 600; font-size: 0.85rem;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
        }
        .btn-logout:hover { background: #f5f0ff; }

        .dash-content { max-width: 640px; margin: 0 auto; padding: 40px 24px 80px; }
        .greet-title {
          font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 700;
          color: #1a0a3e; margin-bottom: 6px;
        }
        .greet-sub { color: #9d8fbf; font-size: 0.95rem; margin-bottom: 28px; }

        .balance-card {
          background: linear-gradient(135deg, #4c1d95, #7c3aed 60%, #a855f7);
          border-radius: 24px; padding: 32px; color: white; position: relative;
          overflow: hidden; margin-bottom: 28px;
          box-shadow: 0 12px 40px rgba(124,58,237,0.3);
        }
        .balance-card::after {
          content: ''; position: absolute; width: 220px; height: 220px;
          background: rgba(255,255,255,0.08); border-radius: 50%;
          top: -80px; right: -60px;
        }
        .balance-label {
          font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase;
          opacity: 0.85; margin-bottom: 10px; position: relative; z-index: 1;
        }
        .balance-amount {
          font-family: 'Playfair Display', serif; font-size: 2.6rem; font-weight: 700;
          margin-bottom: 28px; position: relative; z-index: 1;
        }
        .balance-meta { display: flex; gap: 36px; position: relative; z-index: 1; }
        .balance-meta-item { font-size: 0.7rem; letter-spacing: 0.05em; text-transform: uppercase; opacity: 0.75; }
        .balance-meta-value { font-size: 0.95rem; font-weight: 600; margin-top: 2px; opacity: 1; text-transform: none; letter-spacing: normal; }

        .tx-card {
          background: white; border: 1px solid #ede9fe; border-radius: 24px;
          padding: 32px; box-shadow: 0 4px 24px rgba(124,58,237,0.06);
        }
        .tx-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: #1a0a3e; margin-bottom: 18px; }
        .tx-input {
          width: 100%; padding: 14px 18px; border: 1.5px solid #e9d5ff; border-radius: 14px;
          font-size: 1.3rem; font-family: 'DM Sans', sans-serif; color: #1a0a3e;
          background: #faf9f7; outline: none; margin-bottom: 14px;
          transition: border-color 0.2s;
        }
        .tx-input:focus { border-color: #7c3aed; background: white; }
        .chip-row { display: flex; gap: 10px; margin-bottom: 22px; flex-wrap: wrap; }
        .chip {
          padding: 8px 16px; border-radius: 50px; border: 1.5px solid #e9d5ff;
          background: #faf9f7; color: #7c3aed; font-size: 0.85rem; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s;
        }
        .chip:hover { background: #f5f0ff; border-color: #c084fc; }
        .btn-row { display: flex; gap: 14px; }
        .btn-deposit, .btn-withdraw {
          flex: 1; padding: 14px; border-radius: 50px; border: none;
          font-size: 0.95rem; font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .btn-deposit { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; box-shadow: 0 6px 20px rgba(34,197,94,0.3); }
        .btn-deposit:hover:not(:disabled) { transform: translateY(-2px); }
        .btn-withdraw { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; box-shadow: 0 6px 20px rgba(239,68,68,0.3); }
        .btn-withdraw:hover:not(:disabled) { transform: translateY(-2px); }
        .btn-deposit:disabled, .btn-withdraw:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .toast {
          position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
          background: #1a0a3e; color: white; padding: 14px 24px; border-radius: 50px;
          font-size: 0.9rem; box-shadow: 0 8px 32px rgba(0,0,0,0.2); z-index: 50;
          animation: toast-up 0.25s ease;
        }
        @keyframes toast-up { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }
      `}</style>

      <div className="dash-page">
        <nav className="dash-nav">
          <div className="dash-logo">
            <div className="dash-logo-icon">💳</div>
            <span className="dash-logo-text">ATM App</span>
          </div>
          <div className="dash-nav-right">
            <div className="avatar">{initials}</div>
            <button className="btn-logout" onClick={handleLogout}>Log out</button>
          </div>
        </nav>

        <div className="dash-content">
          <h1 className="greet-title">Hello, {user?.name?.split(" ")[0]} 👋</h1>
          <p className="greet-sub">Here's your account overview for today.</p>

          <div className="balance-card">
            <div className="balance-label">Available Balance</div>
            <div className="balance-amount">
              ₹{Number(user?.balance || 0).toLocaleString("en-IN")}
            </div>
            <div className="balance-meta">
              <div className="balance-meta-item">
                Account No.
                <div className="balance-meta-value">{maskedAccount}</div>
              </div>
              <div className="balance-meta-item">
                Account Holder
                <div className="balance-meta-value">{user?.name}</div>
              </div>
            </div>
          </div>

          <div className="tx-card">
            <h2 className="tx-title">Make a transaction</h2>
            <input
              className="tx-input"
              type="number"
              placeholder="₹ 0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="chip-row">
              {[500, 1000, 2000, 5000].map((val) => (
                <button key={val} className="chip" onClick={() => setAmount(String(val))}>
                  ₹{val}
                </button>
              ))}
            </div>
            <div className="btn-row">
              <button className="btn-deposit" onClick={handleDeposit} disabled={busy}>
                {busy ? "Processing…" : "Deposit"}
              </button>
              <button className="btn-withdraw" onClick={handleWithdraw} disabled={busy}>
                {busy ? "Processing…" : "Withdraw"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}