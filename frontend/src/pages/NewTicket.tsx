import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function NewTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.tickets.create({ title, description, priority });
      navigate(`/tickets/${res.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 className="mb-4">New Ticket</h2>
      <div className="card">
        {error && <p style={{ color: "#f87171", marginBottom: 16 }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Brief summary of the issue" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue in detail..." required />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Ticket"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate("/dashboard")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
