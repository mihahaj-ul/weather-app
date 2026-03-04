import { CITIES, MOCK_DATA } from "../constants/cities";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeather(city) {
  if (!API_KEY) {
    await new Promise((r) => setTimeout(r, 700));
    const mock = MOCK_DATA[city.toLowerCase().trim()];
    if (!mock) throw new Error(`"${city}" not found. Try: ${CITIES.join(", ")}`);
    return mock;
  }

  const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.message || `"${city}" not found`);
  }
  const d = await res.json();
  return {
    name: d.name, country: d.sys.country,
    temp: Math.round(d.main.temp), feels_like: Math.round(d.main.feels_like),
    humidity: d.main.humidity, wind: d.wind.speed,
    visibility: d.visibility, description: d.weather[0].description,
    icon: d.weather[0].icon, sunrise: d.sys.sunrise, sunset: d.sys.sunset,
    pressure: d.main.pressure,
  };
}