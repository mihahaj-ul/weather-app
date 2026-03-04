import { useState } from "react";

export default function StatCard({ label, value }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14, padding: "13px 15px",
        display: "flex", flexDirection: "column", gap: 4,
        transition: "background 0.2s", cursor: "default",
      }}
    >
      <span style={{ fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
        {label}
      </span>
      <span style={{ fontSize: 19, fontWeight: 700, color: "rgba(255,255,255,0.92)", fontFamily: "'Syne', sans-serif", lineHeight: 1.15 }}>
        {value}
      </span>
    </div>
  );
}