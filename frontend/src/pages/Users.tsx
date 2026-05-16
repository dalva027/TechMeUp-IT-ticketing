import { useState } from "react";

export default function Users() {
  const [users] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "User", status: "Inactive" },
  ]);

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Users</h2>
      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #27272a" }}>
              <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Name</th>
              <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Email</th>
              <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Role</th>
              <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid #1f1f23" }}>
                <td style={{ padding: "12px 8px", fontWeight: 500 }}>{u.name}</td>
                <td style={{ padding: "12px 8px", color: "#a1a1aa" }}>{u.email}</td>
                <td style={{ padding: "12px 8px" }}><span className="badge badge-open">{u.role}</span></td>
                <td style={{ padding: "12px 8px" }}><span className={`badge ${u.status === "Active" ? "badge-open" : "badge-closed"}`}>{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
