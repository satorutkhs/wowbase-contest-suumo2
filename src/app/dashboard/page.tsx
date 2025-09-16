"use client";
import React, { useEffect, useState } from 'react';
import { Property } from '@/types/property';
import PropertyCard from '../components/PropertyCard';

export default function DashboardPage() {
  const [list, setList] = useState<Property[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('ownerProperties');
    if (stored) {
      try { setList(JSON.parse(stored)); } catch {}
    }
  }, []);

  return (
    <div className="p-4 pb-20">
      <h1 className="text-lg font-bold mb-4">マイ物件</h1>
      {list.length === 0 && <p className="text-sm text-gray-500">登録された物件はまだありません。</p>}
      <div>
        {list.map(p => <PropertyCard key={p.id} property={p} />)}
      </div>
    </div>
  );
}
