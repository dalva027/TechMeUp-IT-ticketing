import { useState } from "react";

export default function Inbox() {
  const [messages] = useState([
    { id: 1, from: "Support Team", subject: "Welcome to TechMeUP!", preview: "Thanks for joining...", date: "2026-05-15", unread: true },
    { id: 2, from: "System", subject: "Ticket #1042 updated", preview: "Your ticket has been...", date: "2026-05-14", unread: false },
    { id: 3, from: "Admin", subject: "Password reset confirmed", preview: "Your password was...", date: "2026-05-12", unread: false },
  ]);

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Inbox</h2>
      <div className="card">
        {messages.length === 0 ? (
          <p style={{ textAlign: "center", color: "#71717a", padding: 32 }}>No messages</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  padding: "16px 0",
                  borderBottom: "1px solid #27272a",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  opacity: msg.unread ? 1 : 0.7,
                }}
              >
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4, color: msg.unread ? "#e4e4e7" : "#a1a1aa" }}>
                    {msg.unread && <span style={{ color: "#6366f1", marginRight: 8 }}>● </span>}{msg.subject}
                  </div>
                  <div style={{ fontSize: 13, color: "#71717a" }}>{msg.preview}</div>
                </div>
                <span style={{ fontSize: 12, color: "#71717a", whiteSpace: "nowrap" }}>{msg.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
