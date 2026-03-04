import WeatherIcon from "./icons/WeatherIcon";
import StatCard from "./StatCard";
import { formatTime, formatVis } from "../utils/helpers";

export default function WeatherDisplay({ weather }) {
  return (
    <div className="fin" style={{ marginTop: 20 }}>
      <div className="hero-row">
        <div>
          <div className="city">{weather.name}</div>
          <div style={{ color: "rgba(255,255,255,0.32)", fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.1em", marginTop: 5 }}>
            {weather.country}
          </div>
          <div className="temp">
            {weather.temp}°
            <span style={{ fontSize: "34%", color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>C</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.42)", fontSize: 13, marginTop: 6, textTransform: "capitalize", fontFamily: "'DM Mono', monospace" }}>
            {weather.description}
          </div>
        </div>
        <div style={{ opacity: 0.85, flexShrink: 0 }}>
          <WeatherIcon code={weather.icon} size={70} />
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: 20 }} />

      <div className="sgrid">
        <StatCard label="Feels like"  value={`${weather.feels_like}°C`} />
        <StatCard label="Humidity"    value={`${weather.humidity}%`} />
        <StatCard label="Wind"        value={`${weather.wind} m/s`} />
        <StatCard label="Visibility"  value={formatVis(weather.visibility)} />
        <StatCard label="Sunrise"     value={formatTime(weather.sunrise)} />
        <StatCard label="Sunset"      value={formatTime(weather.sunset)} />
      </div>

      <div style={{ marginTop: 14, textAlign: "center", color: "rgba(255,255,255,0.16)", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em" }}>
        PRESSURE · {weather.pressure} hPa
      </div>
    </div>
  );
}