"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Property } from '@/types/property';
import dynamic from 'next/dynamic';
import PropertyCard from '../components/PropertyCard';

const MapView = dynamic(() => import('../components/MapView'), { ssr: false });

export default function SearchClient({ properties }: { properties: Property[] }) {
  const [highlight, setHighlight] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (highlight && listRef.current) {
      const el = listRef.current.querySelector(`[data-id="${highlight}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [highlight]);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-3">物件検索</h1>
      <div className="flex flex-col gap-4">
        <div className="w-full h-56 relative">
          <MapView
            properties={properties}
            highlightedId={highlight}
            onMarkerClick={(id)=>setHighlight(id)}
            onMarkerHover={(id)=>setHighlight(id)}
          />
        </div>
        <div ref={listRef} className="overflow-y-auto max-h-[55dvh] pr-1 -mr-1">
          {properties.map(p => (
            <div key={p.id} data-id={p.id}>
              <PropertyCard
                property={p}
                highlighted={highlight===p.id}
                onHover={(id)=>setHighlight(id)}
                onClick={(id)=>setHighlight(id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
