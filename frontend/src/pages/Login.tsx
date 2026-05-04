import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.auth.login({ email, password });
      login(res.user, res.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <div className="card">
        <h2 style={{ marginBottom: 24 }}>Login</h2>
        {error && <p style={{ color: "#f87171", marginBottom: 16 }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4" style={{ textAlign: "center", fontSize: 14, color: "#71717a" }}>
          Dont have an account? <Link to="/register">Register</Link>
        </p>
        <div className="mt-4" style={{ padding: 12, background: "#18181b", borderRadius: 8, fontSize: 13, color: "#a1a1aa" }}>
          <strong>Demo accounts:</strong><br />
          Admin: admin@techmeup.com / admin123<br />
          Tech: tech@techmeup.com / tech123<br />
          User: user@techmeup.com / user123
        </div>
      </div>
    </div>
  );
}
