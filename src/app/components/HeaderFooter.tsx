import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full bg-[#8cc63f] flex items-center justify-between px-4 py-2 shadow">
      <div className="flex items-center gap-2">
        <span className="text-white text-lg font-bold">物件検索</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#fff" />
            <path d="M12 7v5l3 3" stroke="#8cc63f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-white border-t flex justify-between items-center px-2 py-1 fixed bottom-0 left-0 z-50 max-w-md mx-auto">
      {/* ホーム */}
      <Link href="/" className="flex flex-col items-center text-xs text-[#8cc63f]">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M3 12l9-9 9 9" stroke="#8cc63f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 21V9h6v12" stroke="#8cc63f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        ホーム
      </Link>
      {/* 物件検索 */}
      <Link href="/search" className="flex flex-col items-center text-xs text-gray-400">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" stroke="#bdbdbd" strokeWidth="2" />
          <line x1="18" y1="18" x2="22" y2="22" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" />
        </svg>
        物件検索
      </Link>
      {/* 事前登録 */}
      <Link href="/register" className="flex flex-col items-center text-xs text-gray-400">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="#bdbdbd" strokeWidth="2" />
          <path d="M12 8v8M8 12h8" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" />
        </svg>
        事前登録
      </Link>
      {/* お知らせ */}
      <Link href="#" className="flex flex-col items-center text-xs text-gray-400">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#bdbdbd" strokeWidth="2" />
          <path d="M12 8v4l3 3" stroke="#bdbdbd" strokeWidth="2" />
        </svg>
        お知らせ
      </Link>
      {/* メニュー */}
      <Link href="/dashboard" className="flex flex-col items-center text-xs text-gray-400">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#bdbdbd" strokeWidth="2" />
          <path d="M8 12h8M12 8v8" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" />
        </svg>
        マイ物件
      </Link>
    </footer>
  );
}
