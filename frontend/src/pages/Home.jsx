import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Home() {
  const navigate = useNavigate();
  const featuresRef = useRef(null);

  useEffect(() => {
    const cards = document.querySelectorAll(".feature-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, i * 120);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #faf9f7;
          color: #1a1a2e;
          min-height: 100vh;
        }

        /* ── NAV ── */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          height: 68px;
          background: rgba(250, 249, 247, 0.85);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(200, 185, 215, 0.25);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #2d1b69;
          text-decoration: none;
        }

        .nav-logo .logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #7c3aed, #c084fc);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          box-shadow: 0 4px 14px rgba(124, 58, 237, 0.3);
        }

        .nav-btns { display: flex; gap: 10px; }

        .btn-ghost {
          padding: 9px 22px;
          border: 1.5px solid #c4b5fd;
          background: transparent;
          border-radius: 50px;
          color: #7c3aed;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-ghost:hover {
          background: #f5f3ff;
          border-color: #7c3aed;
        }

        .btn-primary {
          padding: 9px 22px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 18px rgba(124, 58, 237, 0.35);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(124, 58, 237, 0.45);
        }
        .btn-primary:active { transform: translateY(0); }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 5% 60px;
          position: relative;
          overflow: hidden;
        }

        /* soft blobs */
        .hero::before {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(192, 132, 252, 0.18) 0%, transparent 70%);
          top: -120px; right: -100px;
          border-radius: 50%;
          pointer-events: none;
        }
        .hero::after {
          content: '';
          position: absolute;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%);
          bottom: -80px; left: -80px;
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-inner {
          max-width: 760px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #f5f3ff;
          border: 1px solid #e9d5ff;
          border-radius: 50px;
          padding: 6px 16px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #7c3aed;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 6vw, 4rem);
          font-weight: 700;
          line-height: 1.18;
          color: #1a0a3e;
          margin-bottom: 18px;
          letter-spacing: -0.02em;
        }

        .hero-title .accent {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 1.08rem;
          color: #5a4e7a;
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto 40px;
          font-weight: 400;
        }

        .hero-cta {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }

        .btn-hero-primary {
          padding: 14px 36px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 6px 28px rgba(124, 58, 237, 0.4);
          transition: all 0.25s ease;
        }
        .btn-hero-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(124, 58, 237, 0.5);
        }

        .btn-hero-ghost {
          padding: 14px 36px;
          background: white;
          color: #7c3aed;
          border: 1.5px solid #e9d5ff;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease;
          box-shadow: 0 2px 12px rgba(124, 58, 237, 0.08);
        }
        .btn-hero-ghost:hover {
          border-color: #a78bfa;
          transform: translateY(-2px);
        }

        /* ── CARD PREVIEW ── */
        .hero-card-preview {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .mini-stat {
          background: white;
          border: 1px solid #ede9fe;
          border-radius: 18px;
          padding: 18px 26px;
          text-align: center;
          box-shadow: 0 4px 24px rgba(124, 58, 237, 0.08);
          min-width: 130px;
          transition: transform 0.25s ease;
        }
        .mini-stat:hover { transform: translateY(-4px); }
        .mini-stat .stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 1.7rem;
          font-weight: 700;
          color: #2d1b69;
          line-height: 1;
          margin-bottom: 4px;
        }
        .mini-stat .stat-label {
          font-size: 0.75rem;
          color: #9d8fbf;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .mini-stat .stat-icon { font-size: 1.3rem; margin-bottom: 6px; }

        /* ── FEATURES ── */
        .features {
          padding: 80px 5% 100px;
          background: white;
        }

        .section-label {
          text-align: center;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 14px;
        }

        .section-title {
          text-align: center;
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #1a0a3e;
          margin-bottom: 56px;
          letter-spacing: -0.01em;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          max-width: 980px;
          margin: 0 auto;
        }

        .feature-card {
          background: #faf9f7;
          border: 1px solid #f0ebff;
          border-radius: 20px;
          padding: 32px 26px;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(22px);
        }
        .feature-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .feature-card:hover {
          border-color: #c4b5fd;
          box-shadow: 0 8px 32px rgba(124, 58, 237, 0.12);
          transform: translateY(-4px);
        }

        .feature-icon {
          width: 48px; height: 48px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem;
          margin-bottom: 18px;
        }

        .feature-card h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #1a0a3e;
          margin-bottom: 8px;
        }

        .feature-card p {
          font-size: 0.88rem;
          color: #7a6e9a;
          line-height: 1.65;
          font-weight: 400;
        }

        /* ── CTA BAND ── */
        .cta-band {
          margin: 0 5% 80px;
          background: linear-gradient(135deg, #2d1b69 0%, #7c3aed 60%, #a855f7 100%);
          border-radius: 28px;
          padding: 64px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-band::before {
          content: '';
          position: absolute;
          width: 300px; height: 300px;
          background: rgba(255,255,255,0.06);
          border-radius: 50%;
          top: -120px; right: -60px;
        }

        .cta-band h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
        }

        .cta-band p {
          font-size: 0.98rem;
          color: rgba(255,255,255,0.72);
          margin-bottom: 34px;
          max-width: 440px;
          margin-left: auto;
          margin-right: auto;
        }

        .btn-white {
          padding: 14px 38px;
          background: white;
          color: #7c3aed;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .btn-white:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(0,0,0,0.28);
        }

        /* ── FOOTER ── */
        .footer {
          text-align: center;
          padding: 24px;
          font-size: 0.82rem;
          color: #b0a3cc;
          border-top: 1px solid #f0ebff;
        }

        @media (max-width: 560px) {
          .nav-btns .btn-ghost { display: none; }
          .cta-band { padding: 44px 26px; border-radius: 20px; }
          .hero-card-preview { gap: 10px; }
          .mini-stat { min-width: 110px; padding: 14px 18px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a className="nav-logo" href="/">
          <span className="logo-icon">💳</span>
          ATM App
        </a>
        <div className="nav-btns">
          <button className="btn-ghost" onClick={() => navigate("/login")}>Log in</button>
          <button className="btn-primary" onClick={() => navigate("/signup")}>Sign up</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <span>✦</span> Secure · Simple · Smart
          </div>

          <h1 className="hero-title">
            Banking that feels<br />
            <span className="accent">effortlessly yours</span>
          </h1>

          <p className="hero-sub">
            Withdraw, deposit, and check your balance — all in one clean,
            secure space designed around you.
          </p>

          <div className="hero-cta">
            <button className="btn-hero-primary" onClick={() => navigate("/signup")}>
              Open an account
            </button>
            <button className="btn-hero-ghost" onClick={() => navigate("/login")}>
              Sign in →
            </button>
          </div>

          <div className="hero-card-preview">
            {[
              { icon: "🔐", val: "256-bit", label: "Encryption" },
              { icon: "⚡", val: "Instant", label: "Transfers" },
              { icon: "🌸", val: "Zero", label: "Hidden fees" },
            ].map((s) => (
              <div className="mini-stat" key={s.label}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-val">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" ref={featuresRef}>
        <p className="section-label">What you get</p>
        <h2 className="section-title">Everything you need, nothing you don't</h2>

        <div className="features-grid">
          {[
            {
              icon: "💸",
              bg: "#fdf4ff",
              title: "Withdraw Cash",
              desc: "Pick your amount and confirm in two taps. Fast, straightforward, always reliable.",
            },
            {
              icon: "📥",
              bg: "#f5f3ff",
              title: "Deposit Funds",
              desc: "Add money to your account instantly. Your balance updates the moment you confirm.",
            },
            {
              icon: "📊",
              bg: "#fdf2f8",
              title: "Balance Check",
              desc: "A clear, real-time look at what you have — no clutter, no confusion.",
            },
            {
              icon: "🛡️",
              bg: "#f0fdf4",
              title: "Secure Sessions",
              desc: "JWT-protected routes and encrypted storage keep your account safe every time.",
            },
          ].map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon" style={{ background: f.bg }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <div className="cta-band">
        <h2>Ready to get started?</h2>
        <p>Create your account in under a minute. No paperwork, no wait.</p>
        <button className="btn-white" onClick={() => navigate("/signup")}>
          Create free account
        </button>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} ATM App · Built with care
      </footer>
    </>
  );
}