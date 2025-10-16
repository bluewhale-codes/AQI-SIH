// src/components/aqi/RegionSelector.jsx
import React from "react";

export default function RegionSelector({ regions, value, onChange }) {
  return (
    <select
      className="w-full md:w-auto border rounded px-3 py-2 text-sm bg-white"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
    </select>
  );
}
