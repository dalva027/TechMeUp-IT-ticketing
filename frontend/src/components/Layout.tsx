import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "./Sidebar/Sidebar";
import logo from "../assets/techmeup-logo.svg";

interface LayoutProps {
  sidebarCollapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

export default function Layout({ sidebarCollapsed, onCollapseChange }: LayoutProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const showSidebar = isAuthenticated && !isAuthPage;
  const sidebarWidth = sidebarCollapsed ? 72 : 240;

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f14" }}>
      {showSidebar && <Sidebar collapsed={sidebarCollapsed} onCollapseChange={onCollapseChange} />}
      <div
        className="app-wrapper"
        style={showSidebar ? { paddingLeft: `${sidebarWidth}px`, transition: "padding-left 0.2s ease" } : undefined}
      >
        {showSidebar ? (
          <>
            <nav className="app-nav" style={{
              padding: "16px 24px",
              borderBottom: "1px solid #27272a",
              marginBottom: "32px",
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <Link to="/dashboard" style={{ fontSize: "24px", fontWeight: 700, color: "#6366f1", textDecoration: "none" }}>
                  <img src={logo} alt="TechMeUP" style={{ width: "45%", height: "auto" }} />
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
              </div>
            </nav>
            <div className="content-area">
              <div className="page-card">
                <Outlet />
              </div>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
