'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  pickupLat: number;
  pickupLng: number;
  pickupName: string;
  dropoffLat: number;
  dropoffLng: number;
  dropoffName: string;
}

export default function MapComponent({
  pickupLat,
  pickupLng,
  pickupName,
  dropoffLat,
  dropoffLng,
  dropoffName,
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const pickupMarkerRef = useRef<L.Marker | null>(null);
  const dropoffMarkerRef = useRef<L.Marker | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Map instance
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true,
    }).setView([pickupLat, pickupLng], 10);

    // Add sleek dark mode tiles from CartoDB
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    // Add subtle zoom controls to the bottom right instead of top left
    L.control.zoom({
      position: 'bottomright',
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update Markers, Route and Bounds when coordinates change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Custom pulse marker for Pickup (emerald green)
    const pickupIcon = L.divIcon({
      className: 'custom-map-pickup-marker',
      html: `
        <div class="relative flex items-center justify-center w-6 h-6">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40 opacity-75"></span>
          <div class="relative rounded-full h-3 w-3 bg-emerald-500 border-2 border-white shadow-lg"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Custom pulse marker for Dropoff (gold/rose amber)
    const dropoffIcon = L.divIcon({
      className: 'custom-map-dropoff-marker',
      html: `
        <div class="relative flex items-center justify-center w-6 h-6">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400/40 opacity-75"></span>
          <div class="relative rounded-full h-3 w-3 bg-rose-500 border-2 border-white shadow-lg"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Handle Pickup Marker
    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.setLatLng([pickupLat, pickupLng]);
      pickupMarkerRef.current.setTooltipContent(`<strong>Pickup:</strong> ${pickupName}`);
    } else {
      pickupMarkerRef.current = L.marker([pickupLat, pickupLng], { icon: pickupIcon })
        .addTo(map)
        .bindTooltip(`<strong>Pickup:</strong> ${pickupName}`, { direction: 'top', offset: [0, -5], className: 'custom-map-tooltip' });
    }

    // Handle Dropoff Marker
    if (dropoffMarkerRef.current) {
      dropoffMarkerRef.current.setLatLng([dropoffLat, dropoffLng]);
      dropoffMarkerRef.current.setTooltipContent(`<strong>Dropoff:</strong> ${dropoffName}`);
    } else {
      dropoffMarkerRef.current = L.marker([dropoffLat, dropoffLng], { icon: dropoffIcon })
        .addTo(map)
        .bindTooltip(`<strong>Dropoff:</strong> ${dropoffName}`, { direction: 'top', offset: [0, -5], className: 'custom-map-tooltip' });
    }

    // Handle Polyline Route Line
    const coords: L.LatLngExpression[] = [
      [pickupLat, pickupLng],
      [dropoffLat, dropoffLng],
    ];

    if (polylineRef.current) {
      polylineRef.current.setLatLngs(coords);
    } else {
      polylineRef.current = L.polyline(coords, {
        color: '#f59e0b', // amber-500 / gold
        weight: 3.5,
        opacity: 0.85,
        dashArray: '6, 8',
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);
    }

    // Smoothly fly to fit both points in view
    const bounds = L.latLngBounds([
      [pickupLat, pickupLng],
      [dropoffLat, dropoffLng],
    ]);

    map.flyToBounds(bounds, {
      padding: [50, 50],
      maxZoom: 12,
      animate: true,
      duration: 1.2,
    });
  }, [pickupLat, pickupLng, dropoffLat, dropoffLng, pickupName, dropoffName]);

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-2xl overflow-hidden border border-zinc-800 bg-[#0c0c0e]">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-0" />
      
      {/* Subtle overlays to tie with UI theme */}
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#121215]/80 to-transparent pointer-events-none z-[400]" />
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#121215]/80 to-transparent pointer-events-none z-[400]" />

      {/* Floating indicators */}
      <div className="absolute top-3 left-3 bg-[#121215]/90 border border-zinc-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg pointer-events-none z-[400] backdrop-blur-sm">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] text-zinc-300 font-bold tracking-wider uppercase font-sans">Live Route Tracker</span>
      </div>
    </div>
  );
}
