'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  ChevronDown,
  FileText,
  LogOut,
  Settings,
  User,
  LayoutGrid,
  Plus,
  BarChart2,
  Search
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getInitials } from '@/utils/formatters';
import { cn } from '@/lib/utils';

const mockCurrentUser = {
  name: 'Ana Paula Souza',
  email: 'ana.souza@petrobras.com.br',
  role: 'USER' as const,
};

export function Header() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none animate-fade-in">
      <header className="w-full max-w-5xl glass-morphism shadow-macos rounded-2xl pointer-events-auto transition-all duration-500 hover:shadow-macos-lg">
        <div className="flex h-14 items-center justify-between px-5">
          {/* Logo Petrobras Oficial */}
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
            <img 
              src="/petrobras-logo.png" 
              alt="Logotipo Petrobras" 
              className="h-9 w-auto object-contain"
            />
            <div className="hidden lg:block leading-tight pt-1">
              <p className="text-foreground font-black text-sm tracking-tight leading-tight">GrandPrix</p>
            </div>
          </Link>

          {/* Navigation - Lado a Lado Navbar */}
          <nav className="flex items-center gap-2 h-14">
            <NavItem 
              href="/" 
              label="Fórum" 
              icon={LayoutGrid} 
              active={pathname === '/' || pathname.startsWith('/demandas')} 
            />
            <NavItem 
              href="/nova-demanda" 
              label="Registrar" 
              icon={Plus} 
              active={pathname === '/nova-demanda'} 
            />
            {mockCurrentUser.role === 'ADMIN' && (
              <NavItem 
                href="/admin/dashboard" 
                label="Gestão" 
                icon={BarChart2} 
                active={isAdmin} 
              />
            )}
          </nav>

          {/* Actions Section */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-muted-foreground hover:bg-black/[0.05]"
              aria-label="Buscar"
            >
              <Search className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-muted-foreground hover:bg-black/[0.05] relative"
              aria-label="Notificações"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-brand-green ring-2 ring-white" />
            </Button>

            <div className="h-6 w-[1px] bg-black/[0.08] mx-1" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-1.5 p-1 px-1.5 rounded-full hover:bg-black/[0.05] transition-colors"
                  aria-label="Meu Usuário"
                >
                  <Avatar className="h-7 w-7 border-none shadow-sm ring-1 ring-black/[0.05]">
                    <AvatarFallback className="bg-brand-green text-white text-[10px] font-bold">
                      {getInitials(mockCurrentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-xl mt-2 p-1 border-black/[0.05] shadow-macos-lg bg-white/80 backdrop-blur-xl animate-scale-in">
                <div className="px-3 py-2 border-b border-black/[0.05] mb-1">
                  <p className="text-sm font-bold truncate leading-none mb-1">{mockCurrentUser.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate uppercase font-bold tracking-wider">
                    {mockCurrentUser.role === 'ADMIN' ? 'Administrador' : 'Colaborador'}
                  </p>
                </div>
                <DropdownMenuItem className="rounded-lg gap-2 text-xs font-medium focus:bg-brand-green focus:text-white">
                  <User className="h-4 w-4" /> Perfil Pessoal
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg gap-2 text-xs font-medium focus:bg-brand-green focus:text-white">
                  <FileText className="h-4 w-4" /> Minhas Demandas
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg gap-2 text-xs font-medium focus:bg-brand-green focus:text-white">
                  <Settings className="h-4 w-4" /> Preferências
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black/[0.05]" />
                <DropdownMenuItem className="rounded-lg gap-2 text-xs font-bold text-red-500 focus:bg-red-50 focus:text-red-600">
                  <LogOut className="h-4 w-4" /> Finalizar Sessão
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
}

function NavItem({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: any;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex h-14 items-center gap-1.5 px-3 text-sm font-bold transition-colors group",
        active 
          ? "text-[#009B3A]" 
          : "text-muted-foreground hover:text-[#009B3A] hover:bg-black/[0.02]"
      )}
    >
      <Icon className={cn("h-4 w-4 transition-colors", active ? "text-[#FEDF00]" : "opacity-70 group-hover:text-[#009B3A]")} />
      {label}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-lg bg-[#009B3A]" />
      )}
    </Link>
  );
}
