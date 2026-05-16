import { useState } from "react";

export default function Devices() {
  const [devices] = useState([
    { id: "1", name: "Workstation-01", type: "Desktop", status: "Online", ip: "192.168.1.10" },
    { id: "2", name: "Laptop-02", type: "Laptop", status: "Online", ip: "192.168.1.11" },
    { id: "3", name: "Server-Main", type: "Server", status: "Offline", ip: "192.168.1.1" },
    { id: "4", name: "Printer-01", type: "Printer", status: "Online", ip: "192.168.1.50" },
  ]);

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Devices</h2>
      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #27272a" }}>
              <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Name</th>
              <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Type</th>
              <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>IP Address</th>
              <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d) => (
              <tr key={d.id} style={{ borderBottom: "1px solid #1f1f23" }}>
                <td style={{ padding: "12px 8px", fontWeight: 500 }}>{d.name}</td>
                <td style={{ padding: "12px 8px", color: "#a1a1aa" }}>{d.type}</td>
                <td style={{ padding: "12px 8px", fontFamily: "monospace", fontSize: 13, color: "#71717a" }}>{d.ip}</td>
                <td style={{ padding: "12px 8px" }}><span className={`badge ${d.status === "Online" ? "badge-open" : "badge-closed"}`}>{d.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
