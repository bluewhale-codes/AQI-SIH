// src/components/FarmingAQICalendar.jsx
import React, { useEffect, useState } from "react";
import { categoryFromAQI, catColor } from "./cpcb";

// Mock blocks
const BLOCKS = [
  { id: "block-001", name: "Gondlamau Block, Sitapur, UP" },
  { id: "block-002", name: "Atri Block, Gaya, Bihar" },
];

// Helper: determine if a day/hour is safe for outdoor work
function isSafeWork(aqi) {
  return aqi <= 100; // Good or Satisfactory
}

// Helper: burning advisory
function burningAdvisory(maxAQI) {
  if (maxAQI <= 100) return { text: "Safe to burn crop residue (within regulations)", color: "bg-green-50 border-green-200" };
  if (maxAQI <= 200) return { text: "Moderate AQI. Delay burning if possible; use alternatives.", color: "bg-yellow-50 border-yellow-200" };
  return { text: "High pollution. Do NOT burn. Use mulching or balers.", color: "bg-red-50 border-red-200" };
}

// Helper: harvest timing advisory
function harvestAdvisory(forecast) {
  const poorDays = forecast.filter(d => d.maxAQI > 200).length;
  if (poorDays === 0) return { text: "Air quality favorable. Normal harvest schedule.", color: "bg-green-50 border-green-200" };
  if (poorDays <= 2) return { text: "Some poor-AQI days ahead. Plan lighter tasks for those days.", color: "bg-yellow-50 border-yellow-200" };
  return { text: "Extended high pollution forecast. Limit outdoor hours; use masks.", color: "bg-red-50 border-red-200" };
}

export default function FarmingAQICalendar() {
  const [blockId, setBlockId] = useState(BLOCKS[0].id);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    // TODO: Replace with your endpoint, e.g. /api/aqi/forecast?blockId=...&days=7
    // Expected: array of { date: "2025-10-16", hours: [{hour:0..23, aqi}], maxAQI, minAQI }
    fetch(`/api/aqi/forecast?blockId=${blockId}&days=7`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { if (alive) setForecast(data); })
      .catch(() => {
        // Mock 7-day forecast
        if (!alive) return;
        const mock = [];
        for (let i = 0; i < 7; i++) {
          const d = new Date();
          d.setDate(d.getDate() + i);
          const dateStr = d.toISOString().split("T")[0];
          const hours = [];
          for (let h = 0; h < 24; h++) {
            const base = 60 + (i * 20) + (h % 12) * 8;
            const noise = Math.random() * 40 - 20;
            hours.push({ hour: h, aqi: Math.max(10, Math.round(base + noise)) });
          }
          const maxAQI = Math.max(...hours.map(x => x.aqi));
          const minAQI = Math.min(...hours.map(x => x.aqi));
          mock.push({ date: dateStr, hours, maxAQI, minAQI });
        }
        setForecast(mock);
      })
      .finally(() => setLoading(false));

    return () => { alive = false; };
  }, [blockId]);

  const blockName = BLOCKS.find(b => b.id === blockId)?.name || blockId;
  const burning = forecast.length ? burningAdvisory(Math.max(...forecast.map(d => d.maxAQI))) : null;
  const harvest = forecast.length ? harvestAdvisory(forecast) : null;

  function exportAdvisory() {
    const text = `AQI Advisory for ${blockName}\n\n` +
      `Burning: ${burning?.text}\nHarvest: ${harvest?.text}\n\n` +
      forecast.map(d => `${d.date}: Max AQI ${d.maxAQI} (${categoryFromAQI(d.maxAQI)})`).join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aqi_advisory_${blockId}.txt`;
    a.click();
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Farming Block AQI Calendar</h2>
          <p className="text-sm text-white">7-day forecast with safe work windows and advisories</p>
        </div>
        
      </div>

      {/* Advisories */}
      {burning && harvest && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className={`rounded border p-3 ${burning.color}`}>
            <div className="text-xs font-semibold mb-1 text-black">🔥 Burning Advisory</div>
            <div className="text-sm text-black">{burning.text}</div>
          </div>
          <div className={`rounded border p-3 ${harvest.color}`}>
            <div className="text-xs font-semibold mb-1 text-black">🌾 Harvest Timing</div>
            <div className="text-sm text-black">{harvest.text}</div>
          </div>
        </div>
      )}

      {/* Calendar */}
      <div className="rounded-lg border bg-white shadow-sm p-4 overflow-x-auto">
        {loading ? (
          <div className="animate-pulse space-y-2">
            {[...Array(7)].map((_, i) => <div key={i} className="h-12 bg-gray-200 rounded" />)}
          </div>
        ) : (
          <div className="space-y-3">
            {forecast.map(day => {
              const dayName = new Date(day.date).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" });
              const cat = categoryFromAQI(day.maxAQI);
              const safeHours = day.hours.filter(h => isSafeWork(h.aqi));
              const safeWindow = safeHours.length > 0
                ? `${safeHours[0].hour}:00 - ${safeHours[safeHours.length - 1].hour}:00`
                : "No safe hours";

              return (
                <div key={day.date} className="border rounded p-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-semibold text-black">{dayName}</div>
                      <div
                        className="inline-block px-2 py-0.5 rounded text-xs font-semibold text-black"
                        style={{ backgroundColor: catColor(cat) }}
                      >
                        Max AQI {day.maxAQI} ({cat})
                      </div>
                    </div>
                    <div className="text-xs text-black">
                      <span className="font-medium">Safe work window:</span> {safeWindow}
                    </div>
                  </div>

                  {/* Hourly mini-bar */}
                  <div className="flex gap-0.5">
                    {day.hours.map(h => {
                      const hCat = categoryFromAQI(h.aqi);
                      const hColor = catColor(hCat);
                      return (
                        <div
                          key={h.hour}
                          className="flex-1 h-6 rounded-sm relative group"
                          style={{ backgroundColor: hColor }}
                          title={`${h.hour}:00 - AQI ${h.aqi} (${hCat})`}
                        >
                          {/* Tooltip on hover */}
                          <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                            {h.hour}:00 · {h.aqi}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-black mt-1">
                    <span>0:00</span>
                    <span>12:00</span>
                    <span>23:00</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Export button */}
      <div className="flex justify-end">
        <button
          onClick={exportAdvisory}
          className="px-4 py-2 text-sm rounded border bg-white hover:bg-gray-50 text-black"
        >
          📄 Export Advisory (SMS/Print)
        </button>
      </div>

      {/* Footer notes */}
      <div className="text-1xl text-white space-y-1">
        <p>• <b>Safe work hours:</b> AQI ≤100 (Good/Satisfactory). Plan heavy outdoor labor during these windows.</p>
        <p>• <b>Burning advisories:</b> Based on forecast AQI. Follow local regulations and consider alternatives (mulching, balers).</p>
        <p>• <b>Harvest timing:</b> Reduce outdoor exposure on Poor/Very Poor days; use N95 masks if work is unavoidable.</p>
      </div>
    </div>
  );
}
