import { useState } from "react";

export default function Groups() {
  const [groups] = useState([
    { id: "1", name: "Engineering", members: 12, description: "Engineering team" },
    { id: "2", name: "Support", members: 8, description: "Support team" },
    { id: "3", name: "Management", members: 5, description: "Management team" },
  ]);

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Groups</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {groups.map((g) => (
          <div key={g.id} className="card">
            <h3 style={{ marginBottom: 8 }}>{g.name}</h3>
            <p style={{ color: "#71717a", fontSize: 14, marginBottom: 12 }}>{g.description}</p>
            <span className="badge badge-open">{g.members} members</span>
          </div>
        ))}
      </div>
    </div>
  );
}
