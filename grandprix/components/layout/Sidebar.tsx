'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const adminNavItems = [
  { label: 'Visão Geral', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Demandas', href: '/admin/demandas', icon: FileText },
  { label: 'Moderação', href: '/admin/moderacao', icon: ShieldAlert },
  { label: 'Relatórios', href: '/admin/relatorios', icon: BarChart3 },
  { label: 'Usuários', href: '/admin/usuarios', icon: Users },
  { label: 'Configurações', href: '/admin/configuracoes', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 flex flex-col sticky top-20 h-[calc(100vh-100px)] px-6 py-4">
      <div className="flex flex-col h-full bg-white/40 backdrop-blur-sm rounded-[32px] border border-black/[0.03] shadow-macos p-4 group">
        <div className="space-y-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-4 mb-6">
              Menu Administrativo
            </p>
            <nav className="space-y-1.5">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between group/item px-4 py-3 rounded-2xl transition-all duration-300 relative',
                      isActive
                        ? 'bg-brand-green text-white shadow-macos shadow-brand-green/20'
                        : 'text-muted-foreground hover:bg-brand-green/[0.08] hover:text-brand-green hover:translate-x-1'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'p-2 rounded-xl transition-colors',
                        isActive ? 'bg-white/10' : 'bg-transparent group-hover/item:bg-brand-green/10'
                      )}>
                        <item.icon className={cn('h-4.5 w-4.5 transition-colors', isActive ? 'text-brand-yellow' : 'text-muted-foreground group-hover/item:text-brand-green')} />
                      </div>
                      <span className="text-sm font-bold tracking-tight">{item.label}</span>
                    </div>
                    {isActive ? (
                      <ChevronRight className="h-4 w-4 text-brand-yellow/50" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-brand-green transition-all opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <div className="bg-brand-dark rounded-[24px] p-5 text-white relative overflow-hidden shadow-macos-lg">
            <div className="relative z-10">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-2">Central de Ajuda</p>
                <p className="text-xs font-bold leading-relaxed mb-4">Dúvidas sobre o fórum ou acessibilidade?</p>
                <button className="w-full bg-brand-yellow text-brand-dark py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                    Suporte TI
                </button>
            </div>
            {/* Visual background accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/20 rounded-full -mr-12 -mt-12 blur-2xl" />
          </div>
        </div>
      </div>
    </aside>
  );
}
