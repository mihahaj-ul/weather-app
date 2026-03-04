export function formatTime(unix) {
  return new Date(unix * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatVis(m) {
  return m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${m} m`;
}

export function getBg(code, temp) {
  if (!code) return { bg: "#0f172a", accent: "#334155" };
  const p = code.slice(0, 2);
  if (code.endsWith("n")) return { bg: "#050a18", accent: "#1e3a5f" };
  if (p === "01") return temp > 20 ? { bg: "#0c1a3a", accent: "#1e4080" } : { bg: "#0f2a4a", accent: "#1a4070" };
  if (["09", "10", "11"].includes(p)) return { bg: "#0a1520", accent: "#162030" };
  if (p === "13") return { bg: "#0f1e30", accent: "#1a3050" };
  return { bg: "#0d1a2a", accent: "#162030" };
}