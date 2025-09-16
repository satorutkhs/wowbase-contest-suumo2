import fs from 'fs';
import path from 'path';
import { Property } from '@/types/property';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ApplyButton from './ApplyButton';

function getProperties(): Property[] {
  const filePath = path.join(process.cwd(), 'data', 'properties.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Property[];
}

interface Props { params: { id: string } }

export default function PropertyDetailPage({ params }: Props) {
  const properties = getProperties();
  const property = properties.find(p => p.id === params.id);
  if (!property) {
    return <div className="p-4">物件が見つかりませんでした。</div>;
  }
  return (
    <div className="p-4 pb-20">
      <Link href="/search" className="text-sm text-blue-500 underline">← 戻る</Link>
      <h1 className="text-xl font-bold mt-2 mb-3">{property.address}</h1>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {property.photos.map((src, i) => (
          <div key={i} className="relative w-56 h-40 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
            <Image src={src} alt={`${property.address} photo ${i+1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <div className="text-[#8cc63f] font-bold text-lg mb-1">支援価格 ¥{property.supportPrice.toLocaleString()}</div>
        <div className="text-gray-500 text-sm">通常家賃 ¥{property.rent.toLocaleString()}</div>
        <div className="text-gray-700 text-sm mt-2">間取り: {property.floorPlan}</div>
      </div>
      {property.equipment?.length && (
        <div className="mb-4 text-black">
          <h2 className="font-semibold mb-1 text-sm text-black">設備</h2>
          <ul className="flex flex-wrap gap-2 text-xs text-black">
            {property.equipment.map(eq => <li key={eq} className="bg-gray-100 px-2 py-1 rounded text-black">{eq}</li>)}
          </ul>
        </div>
      )}
      {property.ownerMessage && (
        <div className="mb-6 text-black">
          <h2 className="font-semibold mb-1 text-sm text-black">オーナーメッセージ</h2>
          <p className="text-sm whitespace-pre-line text-black">{property.ownerMessage}</p>
        </div>
      )}
      <div className="mb-6 text-black">
        <h2 className="font-semibold mb-1 text-sm text-black">オーナー情報</h2>
        <p className="text-sm text-black">{property.owner.name} ({property.owner.contact})</p>
      </div>
      <ApplyButton propertyId={property.id} />
    </div>
  );
}
