import { useState, useEffect, useRef } from "react";
import { CITIES } from "../constants/cities";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(-1);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const filtered = query.trim()
    ? CITIES.filter((c) => c.toLowerCase().includes(query.toLowerCase()))
    : CITIES;

  const submit = (city) => {
    const val = (city || query).trim();
    if (!val) return;
    setQuery(val);
    setOpen(false);
    setHi(-1);
    onSearch(val);
  };

  const onKeyDown = (e) => {
    if (!open && e.key === "ArrowDown") { setOpen(true); return; }
    if (open) {
      if (e.key === "ArrowDown") { e.preventDefault(); setHi((h) => Math.min(h + 1, filtered.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setHi((h) => Math.max(h - 1, -1)); }
      else if (e.key === "Escape") { setOpen(false); setHi(-1); }
      else if (e.key === "Enter") { e.preventDefault(); hi >= 0 && filtered[hi] ? submit(filtered[hi]) : submit(); }
    } else if (e.key === "Enter") { e.preventDefault(); submit(); }
  };

  useEffect(() => {
    const fn = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", marginBottom: 4 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); setHi(-1); }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder="Search city…"
            style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: `1px solid ${open ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.12)"}`, borderRadius: open && filtered.length ? "13px 13px 0 0" : 13, padding: "13px 40px 13px 16px", fontSize: 15, fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.88)", outline: "none", transition: "border-color 0.2s, border-radius 0.12s", boxSizing: "border-box" }}
          />
          <span
            onClick={() => { setOpen((o) => !o); inputRef.current?.focus(); }}
            style={{ position: "absolute", right: 12, top: "50%", transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`, color: "rgba(255,255,255,0.3)", cursor: "pointer", transition: "transform 0.2s", fontSize: 13, userSelect: "none", lineHeight: 1 }}
          >▾</span>
        </div>

        <button
          onClick={() => submit()}
          style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 13, padding: "0 18px", color: "white", cursor: "pointer", fontSize: 18, transition: "background 0.18s", flexShrink: 0, height: 48 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.17)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
        >↵</button>
      </div>

      {open && filtered.length > 0 && (
        <ul style={{ position: "absolute", top: "100%", left: 0, right: 58, background: "rgba(12,20,38,0.97)", border: "1px solid rgba(255,255,255,0.12)", borderTop: "1px solid rgba(255,255,255,0.05)", borderRadius: "0 0 13px 13px", overflow: "hidden", zIndex: 200, backdropFilter: "blur(24px)", boxShadow: "0 20px 48px rgba(0,0,0,0.55)", listStyle: "none", padding: 0, margin: 0, animation: "ddIn 0.14s ease both" }}>
          {filtered.map((city, i) => (
            <li
              key={city}
              onMouseDown={(e) => { e.preventDefault(); submit(city); }}
              onMouseEnter={() => setHi(i)}
              style={{ padding: "12px 16px", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 14, color: hi === i ? "white" : "rgba(255,255,255,0.5)", background: hi === i ? "rgba(255,255,255,0.09)" : "transparent", borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "background 0.1s, color 0.1s", display: "flex", alignItems: "center", gap: 10 }}
            >
              <span style={{ opacity: 0.35, fontSize: 11 }}>◎</span>{city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}