"use client";
import React from 'react';
import { Property } from '@/types/property';
import Image from 'next/image';
import Link from 'next/link';

interface PropertyCardProps {
  property: Property;
  highlighted?: boolean;
  onHover?: (id: string | null) => void;
  onClick?: (id: string) => void;
}

const fallbackImg = '/window.svg';

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, highlighted, onHover, onClick }) => {
  const firstPhoto = property.photos?.[0] || fallbackImg;
  return (
    <div
      className={`rounded-lg border p-2 flex gap-3 mb-3 shadow-sm bg-white transition-all duration-150 ${highlighted ? 'ring-2 ring-[#8cc63f]' : ''}`}
      onMouseEnter={() => onHover?.(property.id)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => {
        onClick?.(property.id);
      }}
    >
      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image src={firstPhoto} alt={property.address} fill className="object-cover" />
      </div>
      <div className="flex flex-col flex-1 text-sm">
        <div className="text-[#8cc63f] font-bold text-base">¥{property.supportPrice.toLocaleString()} <span className="text-xs text-gray-400 font-normal">/ 支援</span></div>
        <div className="text-gray-800 line-clamp-2">{property.address}</div>
        <div className="text-gray-500 text-xs mt-auto">{property.floorPlan}</div>
        <Link
          href={`/properties/${property.id}`}
          className="text-xs text-blue-500 mt-1 underline"
          onClick={(e) => e.stopPropagation()}
        >詳細を見る</Link>
      </div>
    </div>
  );
};

export default PropertyCard;
