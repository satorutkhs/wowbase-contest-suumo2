"use client";
import React, { useState, useEffect } from 'react';
import { Property } from '@/types/property';

interface DraftPropertyForm {
  address: string;
  rent: string;
  supportPrice: string;
  floorPlan: string;
  photos: string; // カンマ区切り
  equipment: string; // カンマ区切り
  ownerName: string;
  ownerContact: string;
  ownerMessage: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<DraftPropertyForm>({
    address: '', rent: '', supportPrice: '', floorPlan: '', photos: '', equipment: '', ownerName: '', ownerContact: '', ownerMessage: ''
  });
  const [done, setDone] = useState(false);

  function handleChange<K extends keyof DraftPropertyForm>(key: K, value: string) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const stored = localStorage.getItem('ownerProperties');
    const list: Property[] = stored ? JSON.parse(stored) : [];
    const newProp: Property = {
      id: 'local-' + Date.now().toString(36),
      address: form.address,
      rent: Number(form.rent) || 0,
      supportPrice: Number(form.supportPrice) || 0,
      floorPlan: form.floorPlan,
      photos: form.photos.split(',').map(s=>s.trim()).filter(Boolean),
      lat: 0,
      lng: 0,
      owner: { name: form.ownerName, contact: form.ownerContact },
      equipment: form.equipment.split(',').map(s=>s.trim()).filter(Boolean),
      ownerMessage: form.ownerMessage
    };
    list.push(newProp);
    localStorage.setItem('ownerProperties', JSON.stringify(list));
    setDone(true);
  }

  return (
    <div className="p-4 pb-24">
      <h1 className="text-lg font-bold mb-4">物件登録</h1>
      {done ? (
        <div className="text-center py-10 text-black">
          <p className="mb-4 text-black">登録が完了しました。</p>
          <button className="px-4 py-2 bg-[#8cc63f] text-white rounded" onClick={()=>{ setForm({address:'',rent:'',supportPrice:'',floorPlan:'',photos:'',equipment:'',ownerName:'',ownerContact:'',ownerMessage:''}); setDone(false); }}>続けて登録</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <Input label="住所" value={form.address} onChange={v=>handleChange('address', v)} required />
          <Input label="通常家賃" type="number" value={form.rent} onChange={v=>handleChange('rent', v)} required />
            <Input label="支援価格" type="number" value={form.supportPrice} onChange={v=>handleChange('supportPrice', v)} required />
          <Input label="間取り" value={form.floorPlan} onChange={v=>handleChange('floorPlan', v)} required />
          <Input label="写真URL (カンマ区切り)" value={form.photos} onChange={v=>handleChange('photos', v)} placeholder="/images/a.jpg, /images/b.jpg" />
          <Input label="設備 (カンマ区切り)" value={form.equipment} onChange={v=>handleChange('equipment', v)} placeholder="Wi-Fi, エアコン" />
          <Input label="オーナー名" value={form.ownerName} onChange={v=>handleChange('ownerName', v)} required />
          <Input label="オーナー連絡先" value={form.ownerContact} onChange={v=>handleChange('ownerContact', v)} required />
          <div>
            <label className="block mb-1 font-medium">オーナーメッセージ</label>
            <textarea value={form.ownerMessage} onChange={e=>handleChange('ownerMessage', e.target.value)} className="w-full border rounded px-2 py-2 h-24" />
          </div>
          <button type="submit" className="w-full bg-[#8cc63f] text-white py-3 rounded font-semibold">登録する</button>
        </form>
      )}
    </div>
  );
}

function Input({ label, value, onChange, type='text', required=false, placeholder='' }: { label: string; value: string; onChange:(v:string)=>void; type?:string; required?:boolean; placeholder?:string }) {
  return (
    <div>
  <label className="block mb-1 font-medium text-black">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)} required={required} className="w-full border rounded px-2 py-2" />
    </div>
  );
}
