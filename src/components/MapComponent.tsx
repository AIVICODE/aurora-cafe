import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Ícono personalizado usando tu logo
const localIcon = new L.Icon({
  iconUrl: "/logo.svg", // Tu logo dentro de /public
  iconSize: [50, 50], // Ajusta el tamaño según cómo quieras que se vea
  iconAnchor: [25, 50], // El punto exacto que 'ancla' el ícono (centro abajo)
  popupAnchor: [0, -50], // Dónde aparece el popup relativo al ícono
});

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Coordenadas fijas del local
const localCoords = {
  lat: -34.65983788726091,
  lng: -54.156344058603004,
};

function MapClickHandler({ onClick }: { onClick: (e: any) => void }) {
  useMapEvents({
    click: onClick,
  });
  return null;
}

export default function MapComponent({
  location,
  setLocation,
}: {
  location: { lat: number; lng: number } | null;
  setLocation: (loc: { lat: number; lng: number }) => void;
}) {
  return (
    <div className="relative z-10 h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[localCoords.lat, localCoords.lng]}
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 📍 Pin fijo del local con tu logo */}
        <Marker position={[localCoords.lat, localCoords.lng]} icon={localIcon}>
          <Popup>
            <strong>Aurora Café</strong><br />¡Visítanos aquí! ☕✨
          </Popup>
        </Marker>

        {/* Pin del cliente si selecciona */}
        {location && (
          <Marker position={[location.lat, location.lng]}>
            <Popup>Tu ubicación seleccionada</Popup>
          </Marker>
        )}

        <MapClickHandler
          onClick={(e) => setLocation({ lat: e.latlng.lat, lng: e.latlng.lng })}
        />
      </MapContainer>
    </div>
  );
}
