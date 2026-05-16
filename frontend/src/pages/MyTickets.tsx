import { useState } from "react";
import { Link } from "react-router-dom";

export default function MyTickets() {
  const [tickets] = useState([
    { id: "a1b2c3d4", title: "Login page not loading", status: "OPEN", priority: "HIGH", created: "2026-05-14" },
    { id: "e5f6g7h8", title: "API response timeout", status: "IN_PROGRESS", priority: "CRITICAL", created: "2026-05-13" },
    { id: "i9j0k1l2", title: "Update profile picture", status: "RESOLVED", priority: "LOW", created: "2026-05-10" },
  ]);

  const badgeCls: Record<string, string> = {
    OPEN: "badge-open",
    "IN_PROGRESS": "badge-in-progress",
    RESOLVED: "badge-resolved",
    CLOSED: "badge-closed",
  };

  return (
    <div>
      <div className="flex-between mb-4">
        <h2>My Tickets</h2>
        <Link to="/tickets/new" className="btn-primary">+ New Ticket</Link>
      </div>
      <div className="card">
        {tickets.length === 0 ? (
          <p style={{ textAlign: "center", color: "#71717a", padding: 32 }}>No tickets found</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #27272a" }}>
                <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>ID</th>
                <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Title</th>
                <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Status</th>
                <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} style={{ borderBottom: "1px solid #1f1f23" }}>
                  <td style={{ padding: "12px 8px", fontFamily: "monospace", fontSize: 12, color: "#71717a" }}>{t.id.slice(0, 8)}</td>
                  <td style={{ padding: "12px 8px" }}>
                    <Link to={`/tickets/${t.id}`} style={{ color: "#e4e4e7", fontWeight: 500 }}>{t.title}</Link>
                  </td>
                  <td style={{ padding: "12px 8px" }}><span className={`badge ${badgeCls[t.status] || "badge-open"}`}>{t.status.replace("_", " ")}</span></td>
                  <td style={{ padding: "12px 8px" }}><span className={`badge ${t.priority === "HIGH" ? "badge-high" : t.priority === "CRITICAL" ? "badge-critical" : "badge-low"}`}>{t.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
