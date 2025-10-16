// src/components/AQIGridMap.jsx
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import L from "leaflet";
import { saveAs } from "file-saver";
import shpwrite from "shpjs";
import bbox from "@turf/bbox";
import { categoryFromAQI, catColor } from "./cpcb";
import "leaflet/dist/leaflet.css";

const defaultCenter = [23.5, 80.5]; // India centroid fallback

// Expect grid features with properties: { pm25, pm10, aqi?, conf?, id }
// If aqi missing, you can compute it server-side; otherwise compute on client.
function computeAQI(props) {
  if (typeof props.aqi === "number") return props.aqi;
  // Simple max of subindices if server gave subindices; otherwise use pm25-only proxy.
  // Ideally, your API returns final AQI already.
  if (typeof props.pm25 === "number") {
    // Quick proxy using CPCB category midpoints -> not exact subindex interpolation.
    const p = props.pm25;
    if (p <= 30) return 50;
    if (p <= 60) return 100;
    if (p <= 90) return 200;
    if (p <= 120) return 300;
    if (p <= 250) return 400;
    return 500;
  }
  return 0;
}

export default function AQIGridMap({
  districtId = "dist-001",
  onSelectCell = () => {},
  height = "70vh",
}) {
  const [grid, setGrid] = useState(null);
  const [boundary, setBoundary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pinned, setPinned] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    // TODO: Replace with your endpoints
    // Expect valid GeoJSON FeatureCollection for both
    Promise.all([
      fetch(`/api/aqi/grid?districtId=${districtId}`).then(r => r.ok ? r.json() : Promise.reject()),
      fetch(`/api/geo/district?districtId=${districtId}`).then(r => r.ok ? r.json() : Promise.reject()),
    ])
      .then(([gridGJ, boundaryGJ]) => {
        if (!alive) return;
        setGrid(gridGJ);
        setBoundary(boundaryGJ);
      })
      .catch(() => {
        if (!alive) return;
        // Minimal mock: a small 3x3 grid near Bhopal
        setBoundary({
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            properties: { name: "Mock District" },
            geometry: { type: "Polygon", coordinates: [[[77.3,23.1],[77.9,23.1],[77.9,23.7],[77.3,23.7],[77.3,23.1]]] }
          }]
        });
        const cells = [];
        for (let i=0;i<3;i++){
          for (let j=0;j<3;j++){
            const x0 = 77.3 + i*0.2, y0 = 23.1 + j*0.2;
            const poly = [[
              [x0, y0],
              [x0+0.2, y0],
              [x0+0.2, y0+0.2],
              [x0, y0+0.2],
              [x0, y0]
            ]];
            cells.push({
              type:"Feature",
              properties:{ id:`cell-${i}-${j}`, pm25: 40 + (i*20) + (j*30), conf: ["high","med","low"][(i+j)%3]},
              geometry:{ type:"Polygon", coordinates: [poly[0].map(([lon,lat])=>[lon,lat])] }
            });
          }
        }
        setGrid({ type:"FeatureCollection", features: cells });
      })
      .finally(()=> setLoading(false));

    return () => { alive = false; };
  }, [districtId]);

  const mapBounds = useMemo(() => {
    const fc = boundary ?? grid;
    if (!fc) return null;
    const [minX, minY, maxX, maxY] = bbox(fc);
    return [[minY, minX],[maxY, maxX]];
  }, [boundary, grid]);

  const gridStyle = (feature) => {
    const aqi = computeAQI(feature.properties);
    const cat = categoryFromAQI(aqi);
    const color = catColor(cat);
    return {
      color: "#111827", // stroke
      weight: 0.5,
      fillColor: color,
      fillOpacity: 0.65,
    };
  };

  const onEachGridCell = (feature, layer) => {
    const props = feature.properties || {};
    const aqi = computeAQI(props);
    const cat = categoryFromAQI(aqi);
    const conf = props.conf || "—";
    const pm25 = props.pm25 ?? "—";
    const pm10 = props.pm10 ?? "—";

    layer.bindTooltip(
      `<div style="font-size:12px">
        <div><b>AQI:</b> ${aqi} (${cat})</div>
        <div><b>PM2.5:</b> ${pm25}</div>
        <div><b>PM10:</b> ${pm10}</div>
        <div><b>Confidence:</b> ${conf}</div>
      </div>`,
      { sticky:true }
    );

    layer.on("click", () => {
      setPinned({ id: props.id, aqi, cat, pm25, pm10, conf });
      onSelectCell({ id: props.id, aqi, cat, pm25, pm10, conf, geometry: feature.geometry });
    });
  };

  function downloadGeoJSON() {
    if (!grid) return;
    const blob = new Blob([JSON.stringify(grid)], { type: "application/json;charset=utf-8" });
    saveAs(blob, `aqi_grid_${districtId}.geojson`);
  }

  async function downloadShapefile() {
    if (!grid) return;
    // shpjs expects GeoJSON FeatureCollection (WGS84)
    const opts = { folder: `aqi_grid_${districtId}`, types: { polygon: "aqi_grid" } };
    const out = shpwrite.zip(grid, opts); // returns ArrayBuffer
    saveAs(new Blob([out], { type: "application/zip" }), `aqi_grid_${districtId}.zip`);
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">District/Block AQI Heatmap</h3>
        <div className="flex gap-2">
          <button onClick={downloadGeoJSON} className="px-3 py-1.5 text-sm rounded border bg-white hover:bg-gray-50">Download GeoJSON</button>
          <button onClick={downloadShapefile} className="px-3 py-1.5 text-sm rounded border bg-white hover:bg-gray-50">Download Shapefile</button>
        </div>
      </div>

      <div className="relative rounded border overflow-hidden" style={{ height }}>
        <MapContainer
          style={{ height: "100%", width: "100%" }}
          center={defaultCenter}
          zoom={6}
          bounds={mapBounds || undefined}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {boundary && (
            <GeoJSON
              data={boundary}
              style={{ color: "#111827", weight: 1.2, fillOpacity: 0 }}
            />
          )}
          {grid && (
            <GeoJSON
              data={grid}
              style={gridStyle}
              onEachFeature={onEachGridCell}
            />
          )}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 bg-white/90 rounded shadow p-2 text-xs">
          {["Good","Satisfactory","Moderate","Poor","Very Poor","Severe"].map(cat => (
            <div key={cat} className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: catColor(cat) }}></span>
              <span>{cat}</span>
            </div>
          ))}
        </div>

        {/* Pinned cell info */}
        {pinned && (
          <div className="absolute top-3 right-3 bg-white/95 rounded shadow p-3 text-xs min-w-[220px]">
            <div className="text-sm font-semibold mb-1">Selected Cell</div>
            <div><span className="font-medium">AQI:</span> {pinned.aqi} ({pinned.cat})</div>
            <div><span className="font-medium">PM2.5:</span> {pinned.pm25}</div>
            <div><span className="font-medium">PM10:</span> {pinned.pm10}</div>
            <div><span className="font-medium">Confidence:</span> {pinned.conf}</div>
          </div>
        )}
      </div>
    </div>
  );
}
