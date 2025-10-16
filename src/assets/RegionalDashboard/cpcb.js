export function categoryFromAQI(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderate";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";
  return "Severe";
}

export function catColor(cat) {
  switch (cat) {
    case "Good": return "#22c55e";
    case "Satisfactory": return "#84cc16";
    case "Moderate": return "#facc15";
    case "Poor": return "#f97316";
    case "Very Poor": return "#dc2626";
    case "Severe": return "#6d28d9";
    default: return "#9ca3af";
  }
}
export function catTextColor(cat) {
  return ["Good","Poor","Very Poor","Severe"].includes(cat) ? "#fff" : "#111827";
}