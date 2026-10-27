import { useState, useEffect, useRef } from "react";

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:40,height:40}}>
        <rect x="4" y="8" width="32" height="24" rx="3" stroke="#2563EB" strokeWidth="2"/>
        <path d="M13 17l-4 4 4 4M27 17l4 4-4 4M21 14l-3 12" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Software Development",
    desc: "End-to-end custom software built to scale — from MVPs to enterprise platforms. We architect systems that perform under pressure.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:40,height:40}}>
        <rect x="6" y="6" width="28" height="20" rx="2" stroke="#2563EB" strokeWidth="2"/>
        <path d="M14 26v6M26 26v6M10 32h20" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/>
        <rect x="12" y="11" width="16" height="10" rx="1" stroke="#2563EB" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Web & Mobile Design",
    desc: "Purposeful interfaces that convert. We design and develop web and mobile applications that users love to return to.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:40,height:40}}>
        <circle cx="20" cy="20" r="12" stroke="#2563EB" strokeWidth="2"/>
        <circle cx="20" cy="20" r="4" fill="#06B6D4"/>
        <path d="M20 8v4M20 28v4M8 20h4M28 20h4" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12.1 12.1l2.8 2.8M25.1 25.1l2.8 2.8M27.9 12.1l-2.8 2.8M14.9 25.1l-2.8 2.8" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "AI & Data Analytics",
    desc: "Intelligent systems that learn and adapt. From machine learning pipelines to business intelligence dashboards that drive decisions.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:40,height:40}}>
        <path d="M20 4L6 10v10c0 8.28 5.92 16.03 14 18 8.08-1.97 14-9.72 14-18V10L20 4z" stroke="#2563EB" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M14 20l4 4 8-8" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Cybersecurity",
    desc: "Defend what matters. Network security, vulnerability assessment, data protection, and IT risk management for the modern threat landscape.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:40,height:40}}>
        <rect x="8" y="14" width="10" height="14" rx="2" stroke="#2563EB" strokeWidth="2"/>
        <rect x="22" y="8" width="10" height="20" rx="2" stroke="#06B6D4" strokeWidth="2"/>
        <path d="M6 32h28" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "IT Consulting",
    desc: "Strategic technology advisory and managed IT services. We help organizations align technology with business objectives that matter.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:40,height:40}}>
        <circle cx="12" cy="20" r="4" stroke="#2563EB" strokeWidth="2"/>
        <circle cx="28" cy="12" r="4" stroke="#06B6D4" strokeWidth="2"/>
        <circle cx="28" cy="28" r="4" stroke="#2563EB" strokeWidth="2"/>
        <path d="M16 20h8M24 14l-8 4M24 26l-8-4" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Intranet & Enterprise Solutions",
    desc: "Connected organisations run better. Custom intranet platforms, internal tools, and enterprise software that unify teams and workflows.",
  },
];

const SECTORS = [
  { name: "HealthTech", color: "#06B6D4" },
  { name: "EdTech", color: "#2563EB" },
  { name: "AgriTech", color: "#10B981" },
  { name: "FinTech", color: "#F59E0B" },
  { name: "GovTech", color: "#8B5CF6" },
  { name: "E-Commerce", color: "#EC4899" },
];

const PRODUCTS = [
  {
    image: "/products/fr.png",
    title: "FoodieRush",
    desc: "A Multivendor & Food Ordering Platform.",
    url: "https://foodierush.onrender.com",
  },
  {
    image: "/products/al.png",
    title: "Ajo Ledger",
    desc: "Ajo/Esusu Savings Tracker",
    url: "https://ajoledger.onrender.com",
  },
  {
    image: "/products/lu.png",
    title: "Lumiere",
    desc: "Women's Fashion Store",
    url: "https://lumiere-bi3q.onrender.com",
  },

];

// Animated canvas network background
function NetworkCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const NODE_COUNT = 38;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${0.18 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6,182,212,0.55)";
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

// Scroll-reveal hook
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function ServiceCard({ service, index }) {
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(6,182,212,0.10) 100%)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16,
        padding: "32px 28px",
        transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${index * 80}ms`,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {hovered && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, #2563EB, #06B6D4)",
          borderRadius: "16px 16px 0 0",
        }} />
      )}
      <div style={{ marginBottom: 20 }}>{service.icon}</div>
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 18, fontWeight: 700,
        color: "#F0F4FF", marginBottom: 10,
        letterSpacing: "-0.3px",
      }}>{service.title}</h3>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 14.5, lineHeight: 1.7,
        color: "rgba(240,244,255,0.58)",
      }}>{service.desc}</p>
    </div>
  );
}

function ProductCard({ product, index }) {
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (product.url) {
      window.open(product.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      ref={ref}
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : "translateY(28px)",
        transitionDelay: `${index * 80}ms`,
        cursor: product.url ? "pointer" : "default",
        outline: "none",
      }}
    >
      <div style={{
        width: "100%",
        aspectRatio: "16 / 10",
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(6,182,212,0.1))",
      }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, transparent 60%, rgba(10,15,30,0.6) 100%)",
        }} />
      </div>
      <div style={{ padding: "22px 24px 26px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 17, fontWeight: 700,
            color: "#F0F4FF",
            letterSpacing: "-0.3px",
          }}>{product.title}</h3>
          {product.url && (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              style={{
                opacity: hovered ? 1 : 0.4,
                transform: hovered ? "translate(2px, -2px)" : "none",
                transition: "all 0.25s",
                flexShrink: 0,
              }}>
              <path d="M7 17L17 7M17 7H8M17 7v9" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14, lineHeight: 1.6,
          color: "rgba(240,244,255,0.55)",
        }}>{product.desc}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const [heroRef, heroVisible] = useReveal();
  const [aboutRef, aboutVisible] = useReveal();
  const [sectorsRef, sectorsVisible] = useReveal();
  const [samplesRef, samplesVisible] = useReveal();
  const [contactRef, contactVisible] = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "d811c484-f9ad-4be4-994e-0e9640d9aff3",  // ← paste your key here
        name: formState.name,
        email: formState.email,
        message: formState.message,
        subject: "New message from EURI Technologies website",
      }),
    });

    const result = await response.json();
    if (result.success) setSubmitted(true);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = ["Services", "About", "Sectors", "Samples", "Contact"];

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: "#0A0F1E",
      color: "#F0F4FF",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(37,99,235,0.4); color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0F1E; }
        ::-webkit-scrollbar-thumb { background: #2563EB; border-radius: 3px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .nav-link {
          color: rgba(240,244,255,0.65);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 4px 0;
          letter-spacing: 0.3px;
        }
        .nav-link:hover { color: #F0F4FF; }
        .cta-btn {
          background: linear-gradient(135deg, #2563EB, #1d4ed8);
          color: #fff;
          border: none;
          padding: 12px 28px;
          border-radius: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s;
          letter-spacing: 0.2px;
        }
        .cta-btn:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e3a8a);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.4);
        }
        .input-field {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #F0F4FF;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          padding: 14px 16px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .input-field:focus {
          border-color: #2563EB;
          background: rgba(37,99,235,0.08);
        }
        .input-field::placeholder { color: rgba(240,244,255,0.3); }

        /* ---------- Mobile responsiveness ---------- */
        .mobile-menu-btn { display: none; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }

          .about-grid, .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }

          .hero-graphic { display: none !important; }

          .hero-stats { gap: 32px !important; }
        }

        @media (max-width: 480px) {
          .cta-btn { padding: 10px 20px !important; font-size: 13px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 clamp(20px, 5vw, 80px)",
        height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled
          ? "rgba(10,15,30,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => scrollTo("home")}>
          <div style={{
            width: 36, height: 36, borderRadius: 9,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <img src="/icon.png" width={34} height={34} alt="logo" />
          </div>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px",
              color: "#F0F4FF", lineHeight: 1.1,
            }}>EURI</div>
            <div style={{ fontSize: 9.5, color: "rgba(240,244,255,0.45)", letterSpacing: "1.5px", fontWeight: 500 }}>
              TECHNOLOGIES
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}
          className="desktop-nav">
          {navLinks.map((l) => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>
              {l}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="cta-btn" onClick={() => scrollTo("contact")}
            style={{ padding: "10px 22px", fontSize: 13 }}>
            Get in touch
          </button>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none", border: "none", cursor: "pointer",
              width: 32, height: 32, alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 5,
            }}
          >
            <span style={{ width: 20, height: 2, background: "#F0F4FF", borderRadius: 2, transition: "0.25s", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span style={{ width: 20, height: 2, background: "#F0F4FF", borderRadius: 2, transition: "0.25s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 20, height: 2, background: "#F0F4FF", borderRadius: 2, transition: "0.25s", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 999,
          background: "rgba(10,15,30,0.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column", padding: "16px clamp(20px, 5vw, 80px) 24px",
          gap: 4,
        }}>
          {navLinks.map((l) => (
            <button key={l} className="nav-link" style={{ padding: "12px 0", textAlign: "left", fontSize: 15 }}
              onClick={() => scrollTo(l.toLowerCase())}>
              {l}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "120px clamp(20px, 5vw, 80px) 80px",
        overflow: "hidden",
      }}>
        <NetworkCanvas />
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "20%", left: "50%",
          transform: "translateX(-50%)",
          width: 700, height: 700,
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div ref={heroRef} style={{
            position: "relative", zIndex: 1,
            maxWidth: 760,
            opacity: 0,
            animation: heroVisible ? "fadeUp 0.9s ease 0.1s forwards" : "none",
          }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(37,99,235,0.12)",
            border: "1px solid rgba(37,99,235,0.3)",
            borderRadius: 100, padding: "6px 16px",
            marginBottom: 32,
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#06B6D4",
              boxShadow: "0 0 0 0 rgba(6,182,212,0.4)",
              animation: "pulse-ring 1.8s ease-out infinite",
            }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12.5, fontWeight: 500, letterSpacing: "0.8px",
              color: "#06B6D4", textTransform: "uppercase",
            }}>Software & Technology Solutions</span>
          </div>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(42px, 6vw, 76px)",
            fontWeight: 700,
            lineHeight: 1.07,
            letterSpacing: "-2px",
            marginBottom: 28,
            color: "#F0F4FF",
          }}>
            We build the{" "}
            <span style={{
              background: "linear-gradient(90deg, #2563EB, #06B6D4, #2563EB)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}>
              software
            </span>{" "}
            that moves your business forward.
          </h1>

          <p style={{
            fontSize: 18, lineHeight: 1.75,
            color: "rgba(240,244,255,0.58)",
            maxWidth: 560, marginBottom: 44,
            fontWeight: 400,
          }}>
            EURI Technologies delivers custom software, AI-powered platforms, and enterprise
            solutions for organisations ready to operate at the edge of what technology makes possible.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="cta-btn" style={{ padding: "15px 36px", fontSize: 15 }}
              onClick={() => scrollTo("services")}>
              Explore our services
            </button>
            <button onClick={() => scrollTo("contact")} style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(240,244,255,0.75)",
              padding: "15px 36px",
              borderRadius: 8,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              transition: "all 0.25s",
            }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "rgba(37,99,235,0.6)";
                e.target.style.color = "#F0F4FF";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.15)";
                e.target.style.color = "rgba(240,244,255,0.75)";
              }}>
              Contact us
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{
            display: "flex", gap: 48, marginTop: 64, flexWrap: "wrap",
          }}>
            {[
              { val: "9+", label: "Core capabilities" },
              { val: "360°", label: "Tech solutions" },
              { val: "∞", label: "Scalability" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 34, fontWeight: 700,
                  color: "#F0F4FF", letterSpacing: "-1px",
                  background: "linear-gradient(135deg, #F0F4FF, rgba(6,182,212,0.9))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>{val}</div>
                <div style={{ fontSize: 13, color: "rgba(240,244,255,0.45)", fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero floating graphic */}
        <div className="hero-graphic" style={{
          position: "absolute", right: "clamp(20px, 8vw, 120px)",
          top: "50%", transform: "translateY(-50%)",
          animation: "float 5s ease-in-out infinite",
          display: "block",
          opacity: 0.85,
        }}>
          <svg width="260" height="260" viewBox="0 0 260 260" fill="none" style={{ filter: "drop-shadow(0 0 40px rgba(37,99,235,0.35))" }}>
            <circle cx="130" cy="130" r="110" stroke="rgba(37,99,235,0.15)" strokeWidth="1.5"/>
            <circle cx="130" cy="130" r="80" stroke="rgba(6,182,212,0.2)" strokeWidth="1"/>
            <circle cx="130" cy="130" r="50" stroke="rgba(37,99,235,0.3)" strokeWidth="1"/>
            <circle cx="130" cy="130" r="20" fill="rgba(37,99,235,0.4)" stroke="#2563EB" strokeWidth="2"/>
            <circle cx="130" cy="50" r="8" fill="#06B6D4"/>
            <circle cx="210" cy="130" r="8" fill="#2563EB"/>
            <circle cx="130" cy="210" r="8" fill="#06B6D4"/>
            <circle cx="50" cy="130" r="8" fill="#2563EB"/>
            <line x1="130" y1="58" x2="130" y2="110" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" strokeDasharray="4 3"/>
            <line x1="202" y1="130" x2="150" y2="130" stroke="rgba(37,99,235,0.4)" strokeWidth="1.5" strokeDasharray="4 3"/>
            <line x1="130" y1="202" x2="130" y2="150" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" strokeDasharray="4 3"/>
            <line x1="58" y1="130" x2="110" y2="130" stroke="rgba(37,99,235,0.4)" strokeWidth="1.5" strokeDasharray="4 3"/>
            <text x="130" y="135" textAnchor="middle" fill="#F0F4FF" fontFamily="Space Grotesk" fontWeight="700" fontSize="11" letterSpacing="1">EURI</text>
          </svg>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: 11, color: "rgba(240,244,255,0.3)", letterSpacing: "1.5px", textTransform: "uppercase" }}>Scroll</span>
          <div style={{
            width: 24, height: 38, border: "1.5px solid rgba(255,255,255,0.2)",
            borderRadius: 12, display: "flex", justifyContent: "center", padding: "6px 0",
          }}>
            <div style={{
              width: 4, height: 8, borderRadius: 2,
              background: "#06B6D4",
              animation: "fadeUp 1.5s ease-in-out infinite alternate",
            }} />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{
        padding: "100px clamp(20px, 5vw, 80px)",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 1, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12, fontWeight: 600, letterSpacing: "2px",
              color: "#2563EB", textTransform: "uppercase", marginBottom: 16,
            }}>What we do</div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700, letterSpacing: "-1.5px",
              color: "#F0F4FF", maxWidth: 540, lineHeight: 1.1,
            }}>
              Full-spectrum technology services
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}>
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{
        padding: "100px clamp(20px, 5vw, 80px)",
        background: "rgba(255,255,255,0.015)",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 1, background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)",
        }} />

        <div ref={aboutRef} className="about-grid" style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80,
          alignItems: "center",
          opacity: aboutVisible ? 1 : 0,
          transform: aboutVisible ? "none" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}>
          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12, fontWeight: 600, letterSpacing: "2px",
              color: "#06B6D4", textTransform: "uppercase", marginBottom: 16,
            }}>About us</div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(28px, 3.5vw, 46px)",
              fontWeight: 700, letterSpacing: "-1.2px",
              color: "#F0F4FF", marginBottom: 24, lineHeight: 1.15,
            }}>
              Built for the complexity of tomorrow's challenges.
            </h2>
            <p style={{
              fontSize: 16, lineHeight: 1.8,
              color: "rgba(240,244,255,0.6)", marginBottom: 20,
            }}>
              EURI Technologies Ltd is a software development and technology solutions company, 
              incorporated and operating under Nigerian law. We exist to build, deploy, and 
              maintain technology that enables organisations to move faster, serve better, and 
              compete smarter.
            </p>
            <p style={{
              fontSize: 16, lineHeight: 1.8,
              color: "rgba(240,244,255,0.6)", marginBottom: 36,
            }}>
              From bespoke software platforms to AI integration, from cybersecurity to intranet 
              systems — we take on the full complexity of a technology engagement, so our clients 
              can focus on what they do best.
            </p>
            <button className="cta-btn" onClick={() => scrollTo("contact")}>
              Start a project
            </button>
          </div>

          {/* Objects cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              "Software development, web and mobile application design, development, and deployment services.",
              "Information technology consulting, advisory, and managed IT services.",
              "AI, machine learning, data analytics, and business intelligence solutions.",
              "Cybersecurity including network security, data protection, and IT risk management.",
              "Partnerships and joint ventures with local and international technology firms.",
            ].map((obj, i) => (
              <div key={i} style={{
                display: "flex", gap: 16, alignItems: "flex-start",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12, padding: "16px 20px",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(37,99,235,0.35)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
              >
                <div style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: i % 2 === 0 ? "#2563EB" : "#06B6D4",
                  flexShrink: 0, marginTop: 6,
                }} />
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(240,244,255,0.6)" }}>
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section id="sectors" style={{
        padding: "100px clamp(20px, 5vw, 80px)",
        position: "relative",
      }}>
        <div ref={sectorsRef} style={{
          maxWidth: 1200, margin: "0 auto",
          opacity: sectorsVisible ? 1 : 0,
          transform: sectorsVisible ? "none" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12, fontWeight: 600, letterSpacing: "2px",
            color: "#F59E0B", textTransform: "uppercase", marginBottom: 16,
          }}>Industries</div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(28px, 3.5vw, 46px)",
            fontWeight: 700, letterSpacing: "-1.2px",
            color: "#F0F4FF", marginBottom: 16, lineHeight: 1.1,
          }}>
            Technology that crosses sectors.
          </h2>
          <p style={{
            fontSize: 16, color: "rgba(240,244,255,0.55)",
            maxWidth: 520, marginBottom: 56, lineHeight: 1.75,
          }}>
            We operate across a wide range of industries, deploying sector-specific expertise 
            where it matters most.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {SECTORS.map((s, i) => (
              <div key={s.name} style={{
                padding: "14px 28px",
                borderRadius: 100,
                border: `1.5px solid ${s.color}44`,
                background: `${s.color}0f`,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600, fontSize: 15,
                color: s.color,
                cursor: "default",
                transition: "all 0.25s",
                opacity: sectorsVisible ? 1 : 0,
                transform: sectorsVisible ? "scale(1)" : "scale(0.9)",
                transitionDelay: `${i * 70}ms`,
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${s.color}22`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${s.color}0f`;
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                {s.name}
              </div>
            ))}
            <div style={{
              padding: "14px 28px",
              borderRadius: 100,
              border: "1.5px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600, fontSize: 15,
              color: "rgba(240,244,255,0.4)",
              cursor: "default",
            }}>
              + More
            </div>
          </div>

          {/* PRODUCTS */}
          <section id="samples" style={{
            padding: "100px clamp(20px, 5vw, 80px)",
            background: "rgba(255,255,255,0.015)",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              height: 1, background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)",
            }} />

            <div ref={samplesRef} style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div style={{ marginBottom: 64 }}>

                <h2 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 700, letterSpacing: "-1.5px",
                  color: "#F0F4FF", maxWidth: 540, lineHeight: 1.1,
                }}>
                  Product Samples
                </h2>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12, fontWeight: 600, letterSpacing: "2px",
                  color: "#06B6D4", textTransform: "uppercase", marginBottom: 16,
                }}>Among many others...</div>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 24,
              }}>
                {PRODUCTS.map((p, i) => (
                  <ProductCard key={p.title} product={p} index={i} />
                ))}
              </div>
            </div>
          </section>

          {/* Partnership Banner */}
          <div style={{
            marginTop: 80,
            background: "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(6,182,212,0.08) 100%)",
            border: "1px solid rgba(37,99,235,0.25)",
            borderRadius: 20,
            padding: "40px 48px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 24,
          }}>
            <div>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 24, fontWeight: 700,
                color: "#F0F4FF", marginBottom: 8, letterSpacing: "-0.5px",
              }}>
                Open to partnerships & joint ventures.
              </h3>
              <p style={{ fontSize: 15, color: "rgba(240,244,255,0.5)", maxWidth: 480 }}>
                We collaborate with local and international technology firms, startups, and 
                organisations to co-build innovative solutions.
              </p>
            </div>
            <button className="cta-btn" style={{ flexShrink: 0 }}
              onClick={() => scrollTo("contact")}>
              Explore a partnership
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{
        padding: "100px clamp(20px, 5vw, 80px) 120px",
        background: "rgba(255,255,255,0.015)",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 1, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)",
        }} />

        <div ref={contactRef} style={{
          maxWidth: 900, margin: "0 auto",
          opacity: contactVisible ? 1 : 0,
          transform: contactVisible ? "none" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12, fontWeight: 600, letterSpacing: "2px",
              color: "#2563EB", textTransform: "uppercase", marginBottom: 16,
            }}>Contact</div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(30px, 4vw, 52px)",
              fontWeight: 700, letterSpacing: "-1.5px",
              color: "#F0F4FF", lineHeight: 1.1, marginBottom: 16,
            }}>
              Let's build something significant.
            </h2>
            <p style={{
              fontSize: 16, color: "rgba(240,244,255,0.5)", lineHeight: 1.75,
            }}>
              Tell us about your project. We respond within one business day.
            </p>
          </div>

          <div className="contact-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 40, alignItems: "start",
          }}>
            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                {
                  label: "Email",
                  val: "dev@euritechnologies.com",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="#2563EB" strokeWidth="2"/>
                      <path d="M22 6l-10 7L2 6" stroke="#06B6D4" strokeWidth="2"/>
                    </svg>
                  ),
                },
                {
                  label: "Activity",
                  val: "Information & Communication Technology",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#2563EB" strokeWidth="2"/>
                      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="#06B6D4" strokeWidth="2"/>
                    </svg>
                  ),
                },
                {
                  label: "Registered",
                  val: "EURI Technologies Ltd — Nigeria",

                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="#2563EB" strokeWidth="2"/>
                      <path d="M9 22V12h6v10" stroke="#06B6D4" strokeWidth="2"/>
                    </svg>
                  ),
                },
              ].map(({ label, val, icon }) => (
                <div key={label} style={{
                  display: "flex", gap: 16, alignItems: "flex-start",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: "18px 20px",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 9,
                    background: "rgba(37,99,235,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1px", color: "rgba(240,244,255,0.35)", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 14, color: "rgba(240,244,255,0.75)", lineHeight: 1.5 }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            {submitted ? (
              <div style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.25)",
                borderRadius: 16, padding: "48px 36px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 22, fontWeight: 700, color: "#F0F4FF", marginBottom: 10,
                }}>Message received.</h3>
                <p style={{ fontSize: 15, color: "rgba(240,244,255,0.5)" }}>
                  Thank you for reaching out. We'll be in touch within one business day.
                </p>
              </div>
            ) : (
              <div style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, padding: "36px",
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(240,244,255,0.45)", letterSpacing: "0.8px", marginBottom: 8 }}>
                      YOUR NAME
                    </label>
                    <input
                      className="input-field"
                      placeholder="Full name"
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(240,244,255,0.45)", letterSpacing: "0.8px", marginBottom: 8 }}>
                      EMAIL ADDRESS
                    </label>
                    <input
                      className="input-field"
                      type="email"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(240,244,255,0.45)", letterSpacing: "0.8px", marginBottom: 8 }}>
                      MESSAGE
                    </label>
                    <textarea
                      className="input-field"
                      placeholder="Tell us about your project..."
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      style={{ resize: "vertical", minHeight: 120 }}
                    />
                  </div>
                  <button
                    className="cta-btn"
                    style={{ width: "100%", padding: "15px", fontSize: 15, marginTop: 4 }}
                    onClick={handleSubmit}
                  >
                    Send message →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "32px clamp(20px, 5vw, 80px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img src="/icon.png" width={28} height={28} alt="logo" />
          </div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14, fontWeight: 700, color: "rgba(240,244,255,0.55)",
          }}>
            EURI Technologies Ltd
          </span>
        </div>
        <div style={{ fontSize: 13, color: "rgba(240,244,255,0.3)" }}>
          © {new Date().getFullYear()} EURI Technologies Ltd. All rights reserved.
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {navLinks.map((l) => (
            <button key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              style={{
                background: "none", border: "none",
                color: "rgba(240,244,255,0.35)",
                fontSize: 13, cursor: "pointer",
                transition: "color 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => e.target.style.color = "rgba(240,244,255,0.7)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(240,244,255,0.35)"}
            >
              {l}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}