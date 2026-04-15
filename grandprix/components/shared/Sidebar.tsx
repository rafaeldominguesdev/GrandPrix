"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Settings, 
  Users, 
  BarChart3, 
  MessageSquare,
  Accessibility,
  Menu,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    group: "Colaborador",
    items: [
      { title: "Início", href: "/", icon: LayoutDashboard },
      { title: "Minhas Demandas", href: "/demandas", icon: FileText },
      { title: "Nova Demanda", href: "/nova-demanda", icon: PlusCircle },
    ],
  },
  {
    group: "Gestão",
    items: [
      { title: "Painel Admin", href: "/admin/dashboard", icon: BarChart3 },
      { title: "Todas Demandas", href: "/admin/demandas", icon: MessageSquare },
      { title: "Equipe", href: "/admin/usuarios", icon: Users },
      { title: "Configurações", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        "bg-white border-r border-slate-200 h-screen sticky top-0 transition-all duration-300 flex flex-col z-20",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-slate-100">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="shrink-0 flex items-center">
             <img src="/img/petrobrasLogo.svg" alt="Petrobras Logo" className="w-auto h-8 object-contain" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col ml-1">
              <span className="text-[14px] font-black text-slate-900 tracking-tighter leading-none">ACESSÍVEL</span>
              <span className="text-[10px] font-bold text-[#008542] uppercase tracking-[0.1em] mt-0.5">Petrobras</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-8 overflow-y-auto">
        {menuItems.map((section) => (
          <div key={section.group} className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                {section.group}
              </h3>
            )}
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group relative",
                    isActive 
                      ? "bg-slate-100 text-[#008542]" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 shrink-0 transition-colors",
                    isActive ? "text-[#008542]" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  {!isCollapsed && <span>{item.title}</span>}
                  
                  {isActive && !isCollapsed && (
                    <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-[#008542]" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer Toggle */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-center text-slate-400 hover:text-slate-900"
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>
    </aside>
  );
}
