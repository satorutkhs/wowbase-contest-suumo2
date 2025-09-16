"use client";
import React, { useEffect, useRef } from 'react';
// @ts-ignore react-leaflet 型暫定
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Property } from '@/types/property';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapViewProps {
  properties: Property[];
  highlightedId?: string | null;
  onMarkerClick?: (id: string) => void;
  onMarkerHover?: (id: string | null) => void;
}

export const MapView: React.FC<MapViewProps> = ({ properties, highlightedId, onMarkerClick, onMarkerHover }) => {
  const center: [number, number] = properties.length ? [properties[0].lat, properties[0].lng] : [35.68, 139.76];

  return (
    <MapContainer center={center} zoom={6} style={{ width: '100%', height: '100%' }} scrollWheelZoom={false} className="rounded-lg overflow-hidden">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map(p => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={defaultIcon}
          eventHandlers={{
            click: () => onMarkerClick?.(p.id),
            mouseover: () => onMarkerHover?.(p.id),
            mouseout: () => onMarkerHover?.(null)
          }}
        >
          <Popup>
            <div className="text-xs font-semibold mb-1">¥{p.supportPrice.toLocaleString()} / {p.floorPlan}</div>
            <div className="text-[10px] max-w-[140px] leading-snug">{p.address}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
