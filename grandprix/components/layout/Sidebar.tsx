"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  BarChart3, 
  FileText, 
  PlusCircle, 
  Settings, 
  Users, 
  LayoutDashboard,
  MessageSquare,
  Accessibility,
  User,
  LogOut,
  Bell
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

const sidebarItems = [
  {
    title: "Usuário",
    items: [
      {
        title: "Início",
        href: "/",
        icon: LayoutDashboard,
      },
      {
        title: "Meus Tópicos",
        href: "/user/demandas",
        icon: FileText,
      },
      {
        title: "Novo Tópico",
        href: "/user/nova-demanda",
        icon: PlusCircle,
      },
    ],
  },
  {
    title: "Gestão (Admin)",
    items: [
      {
        title: "Painel de Controle",
        href: "/admin/dashboard",
        icon: BarChart3,
      },
      {
        title: "Todas as Demandas",
        href: "/admin/demandas",
        icon: MessageSquare,
      },
      {
        title: "Equipe de Resposta",
        href: "/admin/equipe",
        icon: Users,
      },
      {
        title: "Configurações",
        href: "/admin/configuracoes",
        icon: Settings,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-64 sidebar-bg h-[calc(100vh-64px)] fixed left-0 top-16 overflow-y-auto flex flex-col border-r border-slate-200">
      <nav className="flex-1 px-4 py-6">
        {sidebarItems.map((section, idx) => (
          <div key={idx} className="mb-8 last:mb-0">
            <h2 className="px-3 mb-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
              {section.title}
            </h2>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                      isActive 
                        ? "bg-primary/10 text-primary font-bold" 
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <Icon className={cn(
                      "w-4 h-4",
                      isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                    )} />
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-200 mt-auto bg-white/50">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center gap-3 px-3 py-6 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all group justify-start bg-transparent cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                RC
              </div>
              <div className="flex flex-col items-start overflow-hidden text-left">
                <p className="text-sm font-bold text-slate-900 leading-none truncate w-full">Rafael Caldeira</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 truncate w-full">Gestor de UX</p>
              </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right" className="w-64 mb-4 rounded-2xl border-slate-200 shadow-xl p-2 animate-in slide-in-from-left-2 duration-200">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Minha Conta</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer focus:bg-slate-50 focus:text-slate-900 gap-3">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-sm">Meu Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer focus:bg-slate-50 focus:text-slate-900 gap-3">
                <Settings className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-sm">Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer focus:bg-slate-50 focus:text-slate-900 gap-3">
                <Bell className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-sm">Notificações</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem 
              onClick={() => router.push('/login')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer focus:bg-red-50 focus:text-red-600 text-red-500 gap-3"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-black text-sm uppercase tracking-wider">Sair da Conta</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
