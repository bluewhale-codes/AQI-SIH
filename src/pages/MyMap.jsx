import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Optional: person icon for location
const personIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // 👈 you can replace this with your own icon
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Helper function to pick AQI color
const getAqiColor = (aqi) => {
  if (aqi <= 50) return "green";       // Good
  if (aqi <= 100) return "yellow";     // Moderate
  if (aqi <= 150) return "orange";     // Unhealthy for Sensitive Groups
  if (aqi <= 200) return "red";        // Unhealthy
  if (aqi <= 300) return "purple";     // Very Unhealthy
  return "maroon";                     // Hazardous
};

const MyMap = () => {
  // Example location (replace with your coordinates)
  const [position, setPosition] = useState({ lat:26.073434847889516, lng:83.18680030030717}); // Chandigarh
  const [aqi, setAqi] = useState(125); // Example AQI value



  useEffect(() => {
    // Later you can fetch AQI data dynamically here
    // For example: from your ML model API
  }, []);

  const color = getAqiColor(aqi);

  return (
    <div className="w-full">
      <MapContainer
        center={position}
        zoom={12}
        style={{ height: "400px", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker showing the person */}
        <Marker position={position} icon={personIcon}>
          <Popup>
            <b>Location:</b> Chandigarh <br />
            <b>AQI:</b> {aqi}
          </Popup>
        </Marker>

        {/* Circle showing AQI color */}
        <CircleMarker
          center={position}
          radius={25}
          color={color}
          fillColor={color}
          fillOpacity={0.4}
        >
          <Popup>
            <b>AQI Level:</b> {aqi} <br />
            <b>Condition:</b> {aqi <= 50 ? "Good" :
              aqi <= 100 ? "Moderate" :
              aqi <= 150 ? "Unhealthy (Sensitive Groups)" :
              aqi <= 200 ? "Unhealthy" :
              aqi <= 300 ? "Very Unhealthy" : "Hazardous"}
          </Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
};

export default MyMap;
