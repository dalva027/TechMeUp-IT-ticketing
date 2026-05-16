import { useState } from "react";

export default function Reports() {
  const [reports] = useState([
    { id: "1", title: "Monthly Ticket Summary", type: "PDF", date: "2026-05-01", size: "2.4 MB" },
    { id: "2", title: "Device Inventory Q2", type: "CSV", date: "2026-04-28", size: "1.1 MB" },
    { id: "3", title: "Network Performance", type: "PDF", date: "2026-04-15", size: "3.8 MB" },
  ]);

  const typeColor: Record<string, string> = { PDF: "#fb923c", CSV: "#60a5fa" };

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Reports</h2>
      <div className="card">
        {reports.length === 0 ? (
          <p style={{ textAlign: "center", color: "#71717a", padding: 32 }}>No reports available</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #27272a" }}>
                <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Title</th>
                <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Type</th>
                <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Date</th>
                <th style={{ textAlign: "left", padding: "12px 8px", color: "#a1a1aa", fontSize: 13 }}>Size</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid #1f1f23" }}>
                  <td style={{ padding: "12px 8px", fontWeight: 500 }}>{r.title}</td>
                  <td style={{ padding: "12px 8px" }}>
                    <span style={{ color: typeColor[r.type] || "#a1a1aa", fontWeight: 600 }}>{r.type}</span>
                  </td>
                  <td style={{ padding: "12px 8px", color: "#71717a", fontSize: 13 }}>{r.date}</td>
                  <td style={{ padding: "12px 8px", color: "#71717a", fontSize: 13 }}>{r.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
