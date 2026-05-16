import { useState } from "react";

export default function Networks() {
  const [networks] = useState([
    { id: "1", name: "Office LAN", type: "Ethernet", status: "Active", devices: 45 },
    { id: "2", name: "Guest WiFi", type: "Wireless", status: "Active", devices: 12 },
    { id: "3", name: "IoT Network", type: "Wireless", status: "Inactive", devices: 0 },
  ]);

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Networks</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {networks.map((n) => (
          <div key={n.id} className="card">
            <div className="flex-between mb-4">
              <h3 style={{ marginBottom: 0 }}>{n.name}</h3>
              <span className={`badge ${n.status === "Active" ? "badge-open" : "badge-closed"}`}>{n.status}</span>
            </div>
            <p style={{ color: "#71717a", fontSize: 14 }}>{n.type}</p>
            <p style={{ color: "#71717a", fontSize: 13, marginTop: 8 }}>{n.devices} connected devices</p>
          </div>
        ))}
      </div>
    </div>
  );
}
