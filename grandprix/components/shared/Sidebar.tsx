"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  ChevronLeft,
  User,
  LogOut,
  CreditCard,
  Bell,
  HelpCircle,
  Plus,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useLayout } from "@/components/providers/LayoutProvider";

const menuItems = [
  {
    group: "Colaborador",
    items: [
      { title: "Início", href: "/", icon: LayoutDashboard },
      { title: "Meus Tópicos", href: "/user/demandas", icon: FileText },
      { title: "Novo Tópico", href: "/user/nova-demanda", icon: PlusCircle },
    ],
  },
  {
    group: "Gestão",
    items: [
      { title: "Painel Admin", href: "/admin/dashboard", icon: BarChart3 },
      { title: "Todas Demandas", href: "/admin/demandas", icon: MessageSquare },
      { title: "Equipe de Resposta", href: "/admin/equipe", icon: Users },
      { title: "Configurações", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useLayout();
  const isCollapsed = isSidebarCollapsed;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside 
      className={cn(
        "bg-white border-r border-slate-200 h-[calc(100vh-64px)] sticky top-16 transition-[width] duration-500 ease-out flex flex-col z-20",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-8 overflow-y-auto scrollbar-hide">
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
                    "flex items-center py-2 rounded-lg text-sm font-medium transition-colors duration-500 ease-out group relative",
                    isCollapsed ? "justify-center" : "justify-start px-3 gap-3",
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

      {/* Profile & Footer */}
      <div className="mt-auto px-3 pb-4 pt-6">
        <div className={cn("flex flex-col gap-2", isCollapsed ? "items-center" : "items-stretch")}>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div 
                className={cn(
                  "w-full flex items-center gap-3 py-2.5 rounded-xl transition-all duration-300 ease-in-out group focus:outline-none cursor-pointer hover:bg-slate-100/60",
                  isCollapsed ? "justify-center px-0" : "justify-start px-3"
                )}
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-[10px] shrink-0 transition-transform group-hover:scale-105">
                  RC
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col items-start overflow-hidden text-left">
                    <span className="text-sm font-medium text-slate-700 leading-tight truncate w-full">Rafael Caldeira</span>
                    <span className="text-[11px] text-slate-400 truncate w-full font-medium">Gestor de UX</span>
                  </div>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              side="top" 
              sideOffset={12}
              className="w-72 mb-2 rounded-[20px] bg-white border border-slate-100 shadow-[0_15px_50px_-10px_rgba(0,133,66,0.3)] p-2 animate-in fade-in slide-in-from-bottom-3 duration-300 focus:outline-none"
            >
              {/* Header - Identico à imagem */}
              <div className="flex items-center gap-3 px-3 py-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                  RC
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-800">Rafael Caldeira</span>
                  <span className="text-xs text-slate-400">Gestor de UX</span>
                </div>
              </div>

              <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group/item outline-none">
                <Plus className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-700">Adicionar outra conta</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="my-1.5 bg-slate-100" />
              
              <DropdownMenuGroup className="space-y-0.5">
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group/item outline-none">
                  <Sparkles className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-700">Personalização</span>
                </DropdownMenuItem>
                
                <Link href="/perfil" className="w-full block">
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group/item outline-none">
                    <User className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-700">Perfil</span>
                  </DropdownMenuItem>
                </Link>
                
                <Link href="/admin/settings" className="w-full block">
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group/item outline-none">
                    <Settings className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-700">Configurações</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator className="my-1.5 bg-slate-100" />
              
              <DropdownMenuGroup className="space-y-0.5">
                <DropdownMenuItem className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group/item outline-none">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-700">Ajuda</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={() => router.push('/login')}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group/item outline-none"
                >
                  <LogOut className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-700">Sair</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsSidebarCollapsed(!isCollapsed)}
            className={cn(
              "w-full justify-center text-slate-400 hover:text-slate-900 h-10 rounded-2xl",
              isCollapsed && "w-11"
            )}
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </aside>
  );
}
