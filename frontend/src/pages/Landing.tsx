import { Link } from "react-router-dom";
import heroBg from "../assets/hero-bg.png";
import servicesIllustration from "../assets/services-illustration.png";

export default function Landing() {
  const services = [
    {
      title: "Managed IT Support",
      description: "24/7 proactive monitoring and support to keep your business running smoothly without downtime.",
      icon: "⚙️",
    },
    {
      title: "Cloud Solutions",
      description: "Seamless migration and management of cloud infrastructure across AWS, Azure, and Google Cloud.",
      icon: "☁️",
    },
    {
      title: "Cybersecurity",
      description: "Comprehensive threat detection, penetration testing, and security audits to protect your data.",
      icon: "🔒",
    },
    {
      title: "Network Architecture",
      description: "Design, implementation, and optimization of enterprise-grade network infrastructure.",
      icon: "🖥️",
    },
    {
      title: "Help Desk Services",
      description: "Fast, reliable technical support for your team with intelligent ticketing and escalation.",
      icon: "💻",
    },
    {
      title: "Data Recovery",
      description: "Backup strategies, disaster recovery planning, and rapid data restoration when you need it most.",
      icon: "💾",
    },
  ];

  const stats = [
    { value: "500+", label: "Clients Served" },
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "24/7", label: "Active Monitoring" },
    { value: "15min", label: "Avg Response Time" },
  ];

  const features = [
    {
      title: "Intelligent Ticketing",
      description: "Smart categorization and routing ensures your issues reach the right technician instantly.",
    },
    {
      title: "Real-Time Dashboards",
      description: "Monitor system health, ticket status, and performance metrics at a glance.",
    },
    {
      title: "Automated Workflows",
      description: "Reduce manual work with automated escalation, notifications, and resolution playbooks.",
    },
    {
      title: "Knowledge Base",
      description: "Self-service articles and solutions empower your team to resolve issues faster.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f14" }}>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: `linear-gradient(135deg, rgba(15,15,20,0.85) 0%, rgba(15,15,20,0.7) 100%), url(${heroBg}) center/cover no-repeat`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 0%, #0f0f14 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 800, padding: "0 24px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#818cf8",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 24,
              letterSpacing: 0.5,
            }}
          >
            ✦ Enterprise IT Solutions You Can Trust
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 24,
              background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your Technology,
             Our Mission
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "#a1a1aa",
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            TechMeUP delivers reliable IT infrastructure, cybersecurity, and cloud solutions
            so your business stays secure, connected, and ahead of the curve.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register">
              <button
                className="btn-primary"
                style={{
                  padding: "14px 32px",
                  fontSize: 16,
                  fontWeight: 700,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  boxShadow: "0 4px 24px rgba(99,102,241,0.4)",
                }}
              >
                Get Started Free
              </button>
            </Link>
            <Link to="/login">
              <button
                className="btn-secondary"
                style={{
                  padding: "14px 32px",
                  fontSize: 16,
                  fontWeight: 700,
                  borderRadius: 10,
                  background: "transparent",
                  border: "1px solid #27272a",
                  color: "#e4e4e7",
                }}
              >
                View Dashboard
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          padding: "64px 24px",
          background: "#18181b",
          borderTop: "1px solid #27272a",
          borderBottom: "1px solid #27272a",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 32,
            maxWidth: 1000,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 800,
                  color: "#6366f1",
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 15, color: "#71717a", fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
              color: "#818cf8",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 16,
              letterSpacing: 0.5,
            }}
          >
            OUR SERVICES
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#e4e4e7",
              marginBottom: 16,
            }}
          >
            Comprehensive IT Solutions
          </h2>
          <p style={{ fontSize: 18, color: "#71717a", maxWidth: 560, margin: "0 auto" }}>
            From day-one setup to full-scale enterprise management, we cover every aspect of your
            technology stack.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
            marginBottom: 64,
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="card"
              style={{
                background: "#18181b",
                border: "1px solid #27272a",
                borderRadius: 16,
                padding: 32,
                transition: "all 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#27272a";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(99,102,241,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 20,
                }}
              >
                {service.icon}
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#e4e4e7",
                  marginBottom: 12,
                }}
              >
                {service.title}
              </h3>
              <p style={{ fontSize: 15, color: "#71717a", lineHeight: 1.7 }}>{service.description}</p>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={servicesIllustration}
            alt="IT Services illustration"
            style={{
              maxWidth: 700,
              width: "100%",
              borderRadius: 20,
              border: "1px solid #27272a",
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: "100px 24px",
          background: "#18181b",
          borderTop: "1px solid #27272a",
          borderBottom: "1px solid #27272a",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.2)",
                color: "#818cf8",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 16,
                letterSpacing: 0.5,
              }}
            >
              WHY TECHMEUP
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                color: "#e4e4e7",
                marginBottom: 16,
              }}
            >
              Built for Modern Teams
            </h2>
            <p style={{ fontSize: 18, color: "#71717a", maxWidth: 560, margin: "0 auto" }}>
              Our platform combines powerful tools with an intuitive experience designed for
              today\'s IT workflows.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {features.map((feature) => (
              <div key={feature.title} style={{ padding: 24 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <span style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
                    {
                      [
                        "➤",
                        "▶",
                        "⟌",
                        "✞",
                      ][features.indexOf(feature)]
                    }
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#e4e4e7",
                    marginBottom: 10,
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.7 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "100px 24px",
          textAlign: "center",
          background: "linear-gradient(135deg, #0f0f14 0%, #1a1a2e 50%, #0f0f14 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              color: "#e4e4e7",
              marginBottom: 20,
            }}
          >
            Ready to Upgrade Your IT?
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "#71717a",
              maxWidth: 500,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Join hundreds of businesses that trust TechMeUP for their technology infrastructure.
          </p>
          <Link to="/register">
            <button
              className="btn-primary"
              style={{
                padding: "16px 40px",
                fontSize: 17,
                fontWeight: 700,
                borderRadius: 12,
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                boxShadow: "0 4px 32px rgba(99,102,241,0.4)",
              }}
            >
              Start Your Free Trial
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "48px 24px",
          borderTop: "1px solid #27272a",
          textAlign: "center",
          color: "#52525b",
          fontSize: 14,
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#6366f1" }}>TechMeUP</span>
        </div>
        <p>© {new Date().getFullYear()} TechMeUP. All rights reserved.</p>
        <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 24 }}>
          <a href="#" style={{ color: "#52525b", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ color: "#52525b", textDecoration: "none" }}>Terms</a>
          <a href="#" style={{ color: "#52525b", textDecoration: "none" }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
