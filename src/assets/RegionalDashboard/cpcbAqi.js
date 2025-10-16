// src/components/aqi/cpcbAqi.js

// CPCB 24‑hr breakpoints (µg/m³)
export const CPCB_BREAKPOINTS_PM25 = [
  { cat: "Good",        lo: 0,   hi: 30,  aqiLo: 0,   aqiHi: 50 },
  { cat: "Satisfactory",lo: 31,  hi: 60,  aqiLo: 51,  aqiHi: 100 },
  { cat: "Moderate",    lo: 61,  hi: 90,  aqiLo: 101, aqiHi: 200 },
  { cat: "Poor",        lo: 91,  hi: 120, aqiLo: 201, aqiHi: 300 },
  { cat: "Very Poor",   lo: 121, hi: 250, aqiLo: 301, aqiHi: 400 },
  { cat: "Severe",      lo: 251, hi: 500, aqiLo: 401, aqiHi: 500 },
];

export const CPCB_BREAKPOINTS_PM10 = [
  { cat: "Good",        lo: 0,    hi: 50,   aqiLo: 0,   aqiHi: 50 },
  { cat: "Satisfactory",lo: 51,   hi: 100,  aqiLo: 51,  aqiHi: 100 },
  { cat: "Moderate",    lo: 101,  hi: 250,  aqiLo: 101, aqiHi: 200 },
  { cat: "Poor",        lo: 251,  hi: 350,  aqiLo: 201, aqiHi: 300 },
  { cat: "Very Poor",   lo: 351,  hi: 430,  aqiLo: 301, aqiHi: 400 },
  { cat: "Severe",      lo: 431,  hi: 600,  aqiLo: 401, aqiHi: 500 },
];

export function computeSubIndex(conc, table) {
  const row = table.find(r => conc >= r.lo && conc <= r.hi) || table[table.length - 1];
  const I = (row.aqiHi - row.aqiLo) / (row.hi - row.lo) * (conc - row.lo) + row.aqiLo;
  return { aqi: Math.round(I), cat: row.cat };
}

export function categoryFromAQI(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderate";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";
  return "Severe";
}

export function overallAQI(aqiPM25, aqiPM10) {
  const aqi = Math.max(aqiPM25, aqiPM10);
  return { aqi, cat: categoryFromAQI(aqi) };
}

export function categoryColor(cat) {
  switch (cat) {
    case "Good": return "bg-green-500 text-white";
    case "Satisfactory": return "bg-lime-500 text-gray-900";
    case "Moderate": return "bg-yellow-400 text-gray-900";
    case "Poor": return "bg-orange-500 text-white";
    case "Very Poor": return "bg-red-600 text-white";
    case "Severe": return "bg-purple-700 text-white";
    default: return "bg-gray-300 text-gray-900";
  }
}

export function healthMessage(cat) {
  switch (cat) {
    case "Good": return "Air quality is good. Enjoy normal activities.";
    case "Satisfactory": return "Acceptable. Sensitive people consider limiting prolonged outdoor exertion.";
    case "Moderate": return "Some may feel discomfort. Reduce prolonged outdoor activity.";
    case "Poor": return "Effects likely for sensitive groups. Minimize outdoor time; consider masks.";
    case "Very Poor": return "Health effects for all. Avoid outdoor activity; consider advisories/closures.";
    case "Severe": return "Serious impacts. Trigger emergency response and restrict outdoor work.";
    default: return "";
  }
}
