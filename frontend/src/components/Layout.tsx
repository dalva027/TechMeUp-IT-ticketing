import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Layout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f14" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #27272a", marginBottom: "32px" }}>
        <Link to="/" style={{ fontSize: "24px", fontWeight: 700, color: "#6366f1", textDecoration: "none" }}>
          TechMeUP
        </Link>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" style={{ color: "#a1a1aa", textDecoration: "none" }}>Dashboard</Link>
              <Link to="/tickets/new" style={{ color: "#a1a1aa", textDecoration: "none" }}>New Ticket</Link>
              <span style={{ color: "#71717a", fontSize: "14px" }}>{user?.name}</span>
              <button onClick={handleLogout} className="btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: "#a1a1aa", textDecoration: "none" }}>Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
