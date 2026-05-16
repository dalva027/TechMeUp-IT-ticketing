import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export default function Dashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0 });

  const fetchTickets = async () => {
    try {
      const params: Record<string, string> = { page: String(page), limit: "10" };
      if (filter) params.status = filter;
      const res = await api.tickets.getAll(params);
      setTickets(res.tickets);
      setTotalPages(res.totalPages);

      // Fetch stats
      const allRes = await api.tickets.getAll({ page: "1", limit: "100" });
      setStats({
        total: allRes.total,
        open: allRes.tickets.filter((t: any) => t.status === "OPEN").length,
        inProgress: allRes.tickets.filter((t: any) => t.status === "IN_PROGRESS").length,
        resolved: allRes.tickets.filter((t: any) => t.status === "RESOLVED").length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, [page, filter]);

  const statusBadge = (status: string) => {
    const cls = {
      OPEN: "badge-open",
      IN_PROGRESS: "badge-in-progress",
      RESOLVED: "badge-resolved",
      CLOSED: "badge-closed",
    }[status] || "badge-open";
    return <span className={`badge ${cls}`}>{status.replace("_", " ")}</span>;
  };

  const priorityBadge = (priority: string) => {
    const cls = {
      LOW: "badge-low",
      MEDIUM: "badge-medium",
      HIGH: "badge-high",
      CRITICAL: "badge-critical",
    }[priority] || "badge-medium";
    return <span className={`badge ${cls}`}>{priority}</span>;
  };

  if (loading) return <p style={{ textAlign: "center", color: "#71717a" }}>Loading...</p>;

  return (
    <div>
      <div className="flex-between mb-4">
        <h2>Dashboard</h2>
        <Link to="/tickets/new" >
        <div style={{ display: "flex", padding: "10px 20px" }} className="card">
          + New Ticket
        </div> 
        </Link>    
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#6366f1" }}>{stats.total}</div>
          <div style={{ fontSize: 13, color: "#71717a" }}>Total</div>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#4ade80" }}>{stats.open}</div>
          <div style={{ fontSize: 13, color: "#71717a" }}>Open</div>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#fb923c" }}>{stats.inProgress}</div>
          <div style={{ fontSize: 13, color: "#71717a" }}>In Progress</div>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#60a5fa" }}>{stats.resolved}</div>
          <div style={{ fontSize: 13, color: "#71717a" }}>Resolved</div>
        </div>
      </div>

      <div className="flex-between mb-4">
        <div style={{ display: "flex", gap: 8 }}>
          {["", "OPEN", "IN PROGRESS", "RESOLVED", "CLOSED"].map((f) => (
            <button
              key={f}
              className={filter === f ? "btn-primary" : "btn-secondary"}
              onClick={() => { setFilter(f); setPage(1); }}
            >
              {f || "All"}
            </button>
          ))}
        </div>
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
                <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} style={{ borderBottom: "1px solid #1f1f23" }}>
                  <td style={{ padding: "12px 8px", fontFamily: "monospace", fontSize: 12, color: "#71717a" }}>{ticket.id.slice(0, 8)}</td>
                  <td style={{ padding: "12px 8px" }}>
                    <Link to={`/tickets/${ticket.id}`} style={{ color: "#e4e4e7", fontWeight: 500 }}>
                      {ticket.title}
                    </Link>
                  </td>
                  <td style={{ padding: "12px 8px" }}>{statusBadge(ticket.status)}</td>
                  <td style={{ padding: "12px 8px" }}>{priorityBadge(ticket.priority)}</td>
                  <td style={{ padding: "12px 8px", color: "#71717a", fontSize: 13 }}>
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
            <button className="btn-secondary" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
            <span style={{ color: "#71717a", lineHeight: "36px" }}>Page {page} of {totalPages}</span>
            <button className="btn-secondary" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
