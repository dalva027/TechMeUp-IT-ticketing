import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [t, c] = await Promise.all([
        api.tickets.getById(id),
        api.comments.getByTicket(id),
      ]);
      setTicket(t);
      setComments(c);
      setEditTitle(t.title);
      setEditDesc(t.description);
      setEditStatus(t.status);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  const statusBadge = (status: string) => {
    const cls = { OPEN: "badge-open", IN_PROGRESS: "badge-in-progress", RESOLVED: "badge-resolved", CLOSED: "badge-closed" }[status] || "badge-open";
    return <span className={`badge ${cls}`}>{status.replace("_", " ")}</span>;
  };

  const priorityBadge = (priority: string) => {
    const cls = { LOW: "badge-low", MEDIUM: "badge-medium", HIGH: "badge-high", CRITICAL: "badge-critical" }[priority] || "badge-medium";
    return <span className={`badge ${cls}`}>{priority}</span>;
  };

  const handleUpdate = async () => {
    setSubmitting(true);
    try {
      const res = await api.tickets.update(id!, { title: editTitle, description: editDesc, status: editStatus });
      setTicket(res);
      setEditing(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const res = await api.comments.create({ ticketId: id!, content: newComment });
      setComments((prev) => [...prev, res]);
      setNewComment("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    try {
      await api.tickets.delete(id!);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p style={{ textAlign: "center", color: "#71717a" }}>Loading...</p>;
  if (error) return <p style={{ color: "#f87171", textAlign: "center" }}>{error}</p>;
  if (!ticket) return <p style={{ textAlign: "center", color: "#71717a" }}>Ticket not found</p>;

  const canEdit = user && (user.role === "ADMIN" || user.role === "TECHNICIAN" || ticket.requester.id === user.id);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div className="flex-between mb-4">
        <Link to="/dashboard" style={{ color: "#71717a" }}>← Back to Dashboard</Link>
        {canEdit && (
          <button onClick={() => setEditing(!editing)} className="btn-secondary">
            {editing ? "Cancel" : "Edit"}
          </button>
        )}
      </div>

      <div className="card mb-4">
        {editing ? (
          <div>
            <div className="form-group">
              <label>Title</label>
              <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <button onClick={handleUpdate} className="btn-primary" disabled={submitting}>Save</button>
          </div>
        ) : (
          <>
            <div className="flex-between mb-4">
              <h2 style={{ margin: 0 }}>{ticket.title}</h2>
              <div style={{ display: "flex", gap: 8 }}>
                {statusBadge(ticket.status)}
                {priorityBadge(ticket.priority)}
              </div>
            </div>
            <p style={{ color: "#a1a1aa", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{ticket.description}</p>
            <div className="mt-4" style={{ display: "flex", gap: 24, fontSize: 13, color: "#71717a" }}>
              <span>By: {ticket.requester.name}</span>
              {ticket.assignee && <span>Assigned to: {ticket.assignee.name}</span>}
              <span>Created: {new Date(ticket.createdAt).toLocaleString()}</span>
            </div>
          </>
        )}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 16 }}>Comments ({comments.length})</h3>
        <div style={{ maxHeight: 400, overflowY: "auto", marginBottom: 16 }}>
          {comments.map((c) => (
            <div key={c.id} style={{ padding: 12, borderBottom: "1px solid #1f1f23" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <strong style={{ color: "#e4e4e7" }}>{c.user.name}</strong>
                <span style={{ fontSize: 12, color: "#71717a" }}>{new Date(c.createdAt).toLocaleString()}</span>
              </div>
              <p style={{ color: "#a1a1aa", whiteSpace: "pre-wrap" }}>{c.content}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            onKeyDown={(e) => e.key === "Enter" && handleComment()}
          />
          <button onClick={handleComment} className="btn-primary" disabled={submitting}>Send</button>
        </div>
      </div>

      {canEdit && (
        <button onClick={handleDelete} className="btn-danger mt-6" style={{ float: "right" }}>Delete Ticket</button>
      )}
    </div>
  );
}
