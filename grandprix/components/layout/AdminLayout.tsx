'use client';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9FB]">
      <Header />
      <div className="flex flex-1 pt-24 px-4 max-w-[1600px] mx-auto w-full gap-2">
        <Sidebar />
        <main className="flex-1 p-4 pb-12 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
