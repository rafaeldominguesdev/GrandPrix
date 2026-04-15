'use client';

import { Header } from './Header';

export function ForumLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col container mx-auto px-4 pt-20 pb-8 max-w-6xl animate-fade-in">
        {children}
      </main>
      <footer className="border-t border-white/5 py-8 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">
            © {new Date().getFullYear()} Petrobras • Fórum de Acessibilidade e Inclusão
          </p>
        </div>
      </footer>
    </div>
  );
}
