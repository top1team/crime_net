"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon paths when using Next.js / webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: undefined,
    iconUrl: undefined,
    shadowUrl: undefined
});

type Crime = {
    id: string;
    title: string;
    description?: string;
    category: string;
    ai_confidence?: number;
    risk_score?: number;
    lat: number;
    lng: number;
    location_text?: string;
    color?: string;
    created_at: string;
};

// Kenya bounds
const KENYA_BOUNDS = L.latLngBounds(
    [-4.9, 33.9], // Southwest corner
    [5.0, 42.0]   // Northeast corner
);

// small helper to make a colored SVG divIcon
function makePinIcon(colorHex: string, size = 28) {
    const html = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
      <path fill="${colorHex}" stroke="#fff" stroke-width="1" d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7z"/>
    </svg>
  `;
    return L.divIcon({
        className: "crime-pin",
        html,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size - 6],
    });
}

// Component to set map bounds and restrictions
function KenyaMapController() {
    const map = useMap();

    React.useEffect(() => {
        // Set the maximum bounds to Kenya
        map.setMaxBounds(KENYA_BOUNDS);
        map.setMinZoom(6);
        map.setMaxZoom(16);

        // If user tries to drag outside Kenya bounds, bounce back
        const handleDrag = () => {
            map.panInsideBounds(KENYA_BOUNDS, { animate: false });
        };

        map.on('drag', handleDrag);

        return () => {
            map.off('drag', handleDrag);
        };
    }, [map]);

    return null;
}

interface MapViewProps {
    crimes: Crime[];
    categoryToHex: (category: string) => string;
}

export default function MapView({ crimes, categoryToHex }: MapViewProps) {
    const center: [number, number] = [0.0236, 37.9062]; // Kenya center
    const zoom = 6;

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <KenyaMapController />
            {crimes.map((crime) => {
                const color = crime.color ?? categoryToHex(crime.category);
                const icon = makePinIcon(color, 36);

                return (
                    <Marker
                        key={crime.id}
                        position={[crime.lat, crime.lng]}
                        icon={icon}
                    >
                        <Popup>
                            <div className="text-sm">
                                <div className="font-semibold text-red-600">{crime.category}</div>
                                <div className="text-xs text-gray-600 mb-1">
                                    {new Date(crime.created_at).toLocaleString()}
                                </div>
                                <div className="text-sm font-medium">{crime.title}</div>
                                {crime.description && (
                                    <div className="text-xs text-gray-700 mt-1">{crime.description}</div>
                                )}
                                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                                    <span>📍 {crime.location_text ?? "Unknown"}</span>
                                    <span>⚠️ Risk: {crime.risk_score ?? 0}/10</span>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}