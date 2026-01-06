"use client";

import { MapContainer, TileLayer, Circle, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import locationsData from "@/lib/locations.json";
import { useEffect } from "react";
import L from "leaflet";

// Fix Leaflet's default icon issue in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const shadowUrl =
  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";
L.Marker.prototype.options.icon = L.icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Helper component to fly to location
function FlyToLocation({ target }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.latitude, target.longitude], 12, {
        duration: 2, // Smooth flight duration
      });
    }
  }, [target, map]);
  return null;
}

export default function MapViewer({ selectedLocation }) {
  // Center of Bangladesh roughly
  const defaultCenter = [23.685, 90.3563];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render Coverage Zones */}
      {locationsData.map((loc, index) => (
        <Circle
          key={index}
          center={[loc.latitude, loc.longitude]}
          pathOptions={{
            fillColor: "#059669", // Emerald-600
            color: "#047857",
            fillOpacity: 0.2,
          }}
          radius={5000} // 5km radius coverage
        >
          <Popup>
            <div className="p-2 text-center">
              <h3 className="font-bold text-lg text-emerald-700">
                {loc.district}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {loc.status.toUpperCase()}
              </p>
              <div className="text-xs text-gray-500">
                <strong>Areas:</strong>{" "}
                {loc.covered_area.slice(0, 3).join(", ")}...
              </div>
              <a
                href={`/services?loc=${loc.district}`}
                className="mt-3 block w-full rounded bg-emerald-600 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
              >
                Find Caregivers Here
              </a>
            </div>
          </Popup>
        </Circle>
      ))}

      {/* Component to handle programmatic zooming */}
      <FlyToLocation target={selectedLocation} />
    </MapContainer>
  );
}
