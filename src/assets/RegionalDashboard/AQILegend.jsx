// src/components/aqi/AQILegend.jsx
import React from "react";
import { categoryColor } from "./cpcbAqi";

const CATS = ["Good","Satisfactory","Moderate","Poor","Very Poor","Severe"];

export default function AQILegend() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
      {CATS.map(cat => (
        <div key={cat} className={`rounded px-2 py-1 text-center text-xs ${categoryColor(cat)}`}>{cat}</div>
      ))}
    </div>
  );
}
