import { useState, useCallback, useEffect } from "react";
import { getBg } from "./utils/helpers";
import { fetchWeather } from "./utils/fetchWeather";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import "./style/global.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animKey, setAnimKey] = useState(0);

  const { bg, accent } = getBg(weather?.icon, weather?.temp);

  const search = useCallback(async (city) => {
    if (!city.trim()) return;
    setLoading(true); setError(""); setWeather(null);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      setAnimKey((k) => k + 1);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { search("Dhaka"); }, []);

  return (
    <div
      className="wr"
      style={{ background: bg, "--accent": accent }}
    >
      <style>{`
        .wr::before {
          background: radial-gradient(ellipse 80% 55% at 50% 0%, ${accent}80 0%, transparent 68%);
        }
      `}</style>

      <div className="card">
        <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>Atmosphere</div>
        <div style={{ fontSize: "clamp(20px, 5vw, 26px)", fontWeight: 800, color: "white", margin: "4px 0 20px", letterSpacing: "-0.02em" }}>Weather</div>

        <SearchBar onSearch={search} />

        {!import.meta.env.VITE_WEATHER_API_KEY && (
          <div className="badge">⚡ Demo Mode — pick a city above</div>
        )}

        {loading && (
          <div style={{ textAlign: "center", padding: "4px 0 12px" }}>
            <div className="spin" />
            <p style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.1em" }}>Fetching weather…</p>
          </div>
        )}

        {error && !loading && (
          <div style={{ marginTop: 14, background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "12px 15px", color: "#fca5a5", fontFamily: "'DM Mono', monospace", fontSize: 13, lineHeight: 1.5 }}>
            ⚠ {error}
          </div>
        )}

        {weather && !loading && <WeatherDisplay key={animKey} weather={weather} />}
      </div>
    </div>
  );
}