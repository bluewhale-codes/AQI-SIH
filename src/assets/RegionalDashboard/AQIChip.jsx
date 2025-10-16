// src/components/aqi/AQIChip.jsx
import React from "react";
import { categoryColor } from "./cpcbAqi";

export default function AQIChip({ cat, aqi }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${categoryColor(cat)}`}>
      <span>AQI</span>
      <span className="text-lg">{aqi}</span>
      <span className="opacity-90">({cat})</span>
    </div>
  );
}
