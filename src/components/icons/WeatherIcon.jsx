function Sun({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="12" fill="#FFD166" />
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <line key={i} x1="32" y1="32"
          x2={32 + 22 * Math.cos(deg * Math.PI / 180)}
          y2={32 + 22 * Math.sin(deg * Math.PI / 180)}
          stroke="#FFD166" strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function Cloud({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="36" rx="22" ry="13" fill="#B0BEC5" />
      <ellipse cx="24" cy="30" rx="12" ry="10" fill="#CFD8DC" />
      <ellipse cx="38" cy="28" rx="14" ry="11" fill="#CFD8DC" />
    </svg>
  );
}

function PartlyCloudy({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="22" cy="22" r="10" fill="#FFD166" />
      {[0,60,120,180,240,300].map((deg, i) => (
        <line key={i} x1="22" y1="22"
          x2={22 + 14 * Math.cos(deg * Math.PI / 180)}
          y2={22 + 14 * Math.sin(deg * Math.PI / 180)}
          stroke="#FFD166" strokeWidth="2" strokeLinecap="round" />
      ))}
      <ellipse cx="36" cy="40" rx="20" ry="11" fill="#B0BEC5" />
      <ellipse cx="28" cy="35" rx="11" ry="9" fill="#CFD8DC" />
      <ellipse cx="42" cy="33" rx="13" ry="10" fill="#CFD8DC" />
    </svg>
  );
}

function Rain({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="28" rx="20" ry="12" fill="#90A4AE" />
      <ellipse cx="24" cy="23" rx="11" ry="9" fill="#B0BEC5" />
      <ellipse cx="38" cy="21" rx="13" ry="10" fill="#B0BEC5" />
      {[20,30,40,25,35].map((x, i) => (
        <line key={i} x1={x} y1={42 + i * 2} x2={x - 4} y2={52 + i * 2}
          stroke="#64B5F6" strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function Thunder({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="24" rx="20" ry="12" fill="#78909C" />
      <ellipse cx="24" cy="19" rx="11" ry="9" fill="#90A4AE" />
      <ellipse cx="38" cy="17" rx="13" ry="10" fill="#90A4AE" />
      <polyline points="36,36 28,46 34,46 26,58"
        stroke="#FFD166" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Snow({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="26" rx="20" ry="12" fill="#B0BEC5" />
      {[18,30,42,24,36].map((x, i) => (
        <circle key={i} cx={x} cy={44 + (i % 2) * 6} r="2.5" fill="white" opacity="0.9" />
      ))}
    </svg>
  );
}

function Fog({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {[20,28,36,44].map((y, i) => (
        <line key={i} x1={10 + i * 2} y1={y} x2={54 - i * 2} y2={y}
          stroke="#90A4AE" strokeWidth="3" strokeLinecap="round" opacity={0.6 + i * 0.1} />
      ))}
    </svg>
  );
}

const iconMap = { "01": Sun, "02": PartlyCloudy, "03": Cloud, "04": Cloud, "09": Rain, "10": Rain, "11": Thunder, "13": Snow, "50": Fog };

export default function WeatherIcon({ code, size = 64 }) {
  const Comp = iconMap[code?.slice(0, 2)] || Sun;
  return <Comp size={size} />;
}