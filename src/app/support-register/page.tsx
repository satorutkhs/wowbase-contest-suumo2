"use client";
import React, { useState } from 'react';
import { SupportGroup } from '@/types/supportGroup';

interface FormState {
  orgName: string;
  representative: string;
  contact: string;
  activityDescription: string;
  peopleCount: string;
  desiredPeriod: string;
  desiredArea: string;
  monthlyBudget: string;
  specialNotes: string;
}

const initial: FormState = {
  orgName: '', representative: '', contact: '', activityDescription: '', peopleCount: '', desiredPeriod: '', desiredArea: '', monthlyBudget: '', specialNotes: ''
};

export default function SupportRegisterPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [done, setDone] = useState(false);

  const handleChange = (k: keyof FormState, v: string) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem('supportGroups');
    const list: SupportGroup[] = stored ? JSON.parse(stored) : [];
    const newGroup: SupportGroup = {
      id: 'sg-' + Date.now().toString(36),
      orgName: form.orgName,
      representative: form.representative,
      contact: form.contact,
      activityDescription: form.activityDescription,
      peopleCount: Number(form.peopleCount) || 0,
      desiredPeriod: form.desiredPeriod,
      desiredArea: form.desiredArea,
      monthlyBudget: form.monthlyBudget ? Number(form.monthlyBudget) : undefined,
      specialNotes: form.specialNotes || undefined,
      createdAt: new Date().toISOString()
    };
    list.push(newGroup);
    localStorage.setItem('supportGroups', JSON.stringify(list));
    setDone(true);
  };

  const lastRegistered = (() => {
    if (!done) return null;
    const stored = localStorage.getItem('supportGroups');
    if (!stored) return null;
    const list: SupportGroup[] = JSON.parse(stored);
    return list[list.length-1];
  })();

  return (
    <div className="p-4 pb-24">
      <h1 className="text-lg font-bold mb-4">支援団体登録</h1>
  {/* プロセス表示削除要望により ProcessCard を除去 */}
      {done ? (
        <div className="mt-6 bg-white border rounded-lg p-4 shadow-sm">
          <p className="font-semibold mb-2">登録が完了しました。</p>
          {lastRegistered && (
            <div className="text-xs leading-relaxed text-black space-y-1">
              <p><span className="font-semibold">団体名:</span> {lastRegistered.orgName}</p>
              <p><span className="font-semibold">代表者:</span> {lastRegistered.representative}</p>
              <p><span className="font-semibold">人数:</span> {lastRegistered.peopleCount}</p>
              <p><span className="font-semibold">希望期間:</span> {lastRegistered.desiredPeriod}</p>
              <p><span className="font-semibold">希望エリア:</span> {lastRegistered.desiredArea}</p>
              {lastRegistered.monthlyBudget && <p><span className="font-semibold">月額予算:</span> ¥{lastRegistered.monthlyBudget.toLocaleString()}</p>}
            </div>
          )}
          <button onClick={()=>{ setForm(initial); setDone(false); }} className="mt-4 w-full bg-[#8cc63f] text-white rounded py-2 text-sm font-semibold">続けて登録</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-sm">
          <Section title="団体情報">
            <Input label="団体名" value={form.orgName} onChange={v=>handleChange('orgName', v)} required />
            <Input label="代表者" value={form.representative} onChange={v=>handleChange('representative', v)} required />
            <Input label="連絡先" value={form.contact} onChange={v=>handleChange('contact', v)} placeholder="メールまたは電話" required />
            <Textarea label="支援活動内容" value={form.activityDescription} onChange={v=>handleChange('activityDescription', v)} rows={3} placeholder="建設支援 / 医療支援 など" required />
          </Section>
          <Section title="必要条件設定">
            <Input label="人数" type="number" value={form.peopleCount} onChange={v=>handleChange('peopleCount', v)} required />
            <Input label="希望期間" value={form.desiredPeriod} onChange={v=>handleChange('desiredPeriod', v)} placeholder="2025/10 - 2026/03 など" required />
            <Input label="希望エリア" value={form.desiredArea} onChange={v=>handleChange('desiredArea', v)} placeholder="東北沿岸部 など" required />
          </Section>
          <Section title="予算・その他条件">
            <Input label="月額予算(円)" type="number" value={form.monthlyBudget} onChange={v=>handleChange('monthlyBudget', v)} placeholder="500000" />
            <Textarea label="特記事項" value={form.specialNotes} onChange={v=>handleChange('specialNotes', v)} rows={3} placeholder="アレルギー対応が必要 等" />
          </Section>
          <button type="submit" className="w-full bg-[#0059c9] text-white py-3 rounded-md font-semibold">登録する</button>
        </form>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="bg-white border rounded-lg p-4 shadow-sm">
      <legend className="px-2 -ml-2 mb-2 font-semibold text-sm text-black">{title}</legend>
      <div className="grid gap-4">{children}</div>
    </fieldset>
  );
}

function Input({ label, value, onChange, type='text', required=false, placeholder='' }: { label: string; value: string; onChange:(v:string)=>void; type?:string; required?:boolean; placeholder?:string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-black">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)} required={required} className="border rounded px-3 py-2 text-sm" />
    </div>
  );
}

function Textarea({ label, value, onChange, rows=3, required=false, placeholder='' }: { label:string; value:string; onChange:(v:string)=>void; rows?:number; required?:boolean; placeholder?:string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-black">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <textarea value={value} placeholder={placeholder} rows={rows} onChange={e=>onChange(e.target.value)} required={required} className="border rounded px-3 py-2 text-sm resize-y" />
    </div>
  );
}

// ProcessCard と Step コンポーネントは不要化のため削除済み
