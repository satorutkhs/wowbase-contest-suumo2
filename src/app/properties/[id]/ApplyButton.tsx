"use client";
import React, { useState } from 'react';

export default function ApplyButton({ propertyId }: { propertyId: string }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ organization: '', name: '', period: '' });
  return (
    <div>
      <button onClick={() => setOpen(true)} className="w-full bg-[#8cc63f] text-white py-3 rounded-md font-semibold">利用申し込み</button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-4">
            <h2 className="text-base font-bold mb-3">利用申し込み</h2>
            {done ? (
              <div className="text-center py-6">
                <p className="mb-4">申し込みが完了しました。</p>
                <button className="px-4 py-2 bg-[#8cc63f] text-white rounded" onClick={() => setOpen(false)}>閉じる</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); console.log({ propertyId, ...form }); setDone(true); }} className="space-y-3 text-sm">
                <div>
                  <label className="block mb-1 text-black">団体名</label>
                  <input required value={form.organization} onChange={e=>setForm(f=>({...f, organization:e.target.value}))} className="w-full border rounded px-2 py-2" />
                </div>
                <div>
                  <label className="block mb-1 text-black">利用者名</label>
                  <input required value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} className="w-full border rounded px-2 py-2" />
                </div>
                <div>
                  <label className="block mb-1 text-black">利用希望期間</label>
                  <input required value={form.period} onChange={e=>setForm(f=>({...f, period:e.target.value}))} placeholder="例: 2025/10/01 - 2025/12/31" className="w-full border rounded px-2 py-2" />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={()=>setOpen(false)} className="flex-1 border rounded py-2">キャンセル</button>
                  <button type="submit" className="flex-1 bg-[#8cc63f] text-white rounded py-2 font-semibold">送信</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
