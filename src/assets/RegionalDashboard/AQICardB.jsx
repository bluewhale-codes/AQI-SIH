// src/components/aqi/AQICard.jsx
import React, { useEffect, useState } from "react";
import AQIChip from "./AQIChip";
import AQILegend from "./AQILegend";
import RegionSelector from "./RegionSelector";
import {
  computeSubIndex, overallAQI, healthMessage,
  CPCB_BREAKPOINTS_PM25, CPCB_BREAKPOINTS_PM10
} from "./cpcbAqi";

const MOCK_REGIONS = [
  { id: "dist-001", name: "UP > Sitapur > Gondlamau Block", lat: 27.4, lon: 80.7 },
  { id: "dist-002", name: "Bihar > Gaya > Atri Block", lat: 24.9, lon: 85.0 },
];


export default function AQICardB() {
  const [regionId, setRegionId] = useState(MOCK_REGIONS[0].id);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    // TODO: replace with your real endpoint
    fetch(`/api/aqi?regionId=${regionId}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(resp => { if (alive) setData(resp); })
      .catch(() => {
        // Demo fallback
        if (alive) setData({
          regionId, timestamp: new Date().toISOString(),
          pm25: 92, pm10: 168
        });
      })
      .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, [regionId]);

  const pm25 = data?.pm25 ?? 0;
  const pm10 = data?.pm10 ?? 0;

  const sub25 = computeSubIndex(pm25, CPCB_BREAKPOINTS_PM25);
  const sub10 = computeSubIndex(pm10, CPCB_BREAKPOINTS_PM10);
  const ov = overallAQI(sub25.aqi, sub10.aqi);
  const msg = healthMessage(ov.cat);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        
      </div>

      <div className="rounded-lg border bg-white shadow-sm p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 space-y-3">
            {loading ? <div className="animate-pulse h-8 w-40 bg-gray-200 rounded" /> : <AQIChip cat={ov.cat} aqi={ov.aqi} />}
            <div className="text-sm text-black">
              Updated: {data ? new Date(data.timestamp).toLocaleString() : "—"}
            </div>
            <div className="text-sm">
              <div className="font-medium mb-1 text-black">Health Advisory</div>
              <p className="text-black-700 text-black">{msg}</p>
            </div>
            <AQILegend />
          </div>

          <div className="md:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded border p-4">
              <div className="text-sm text-black">PM2.5 (µg/m³)</div>
              <div className="text-3xl text-black font-semibold">{pm25.toFixed(0)}</div>
              <div className="mt-2 text-black text-sm">Sub‑index: <span className="font-medium">{sub25.aqi}</span> ({sub25.cat})</div>
            </div>
            <div className="rounded border p-4">
              <div className="text-sm text-black">PM10 (µg/m³)</div>
              <div className="text-3xl text-black font-semibold">{pm10.toFixed(0)}</div>
              <div className="mt-2 text-sm text-black">Sub‑index: <span className="font-medium">{sub10.aqi}</span> ({sub10.cat})</div>
            </div>

            <div className="rounded border p-4 sm:col-span-2">
              <div className="text-sm text-gray-500 mb-2">Decision Aids</div>
              <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
                <li>Auto alerts when AQI crosses CPCB thresholds for schools/health.</li>
                <li>Export CSV/GeoJSON for district/block roll‑ups and NCAP reporting.</li>
                <li>Confidence flag based on AOD availability and model uncertainty.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        AQI computed from predicted PM2.5/PM10 using CPCB 24‑hour breakpoints. Corroborate with nearby monitors when available.
      </p>
    </div>
  );
}
