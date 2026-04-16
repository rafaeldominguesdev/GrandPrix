"use client";

import { usePathname } from "next/navigation";
import { Search, User, ChevronRight, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  
  // Create breadcrumbs from pathname
  const paths = pathname.split("/").filter(Boolean);
  
  return (
    <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-10 px-8 flex items-center justify-between">
      {/* Search & Breadcrumbs */}
      <div className="flex items-center gap-8 flex-1">
        <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            <Home className="w-3.5 h-3.5" />
          </Link>
          {paths.map((path, index) => (
            <React.Fragment key={path}>
              <ChevronRight className="w-3 h-3" />
              <span className={cn(
                "capitalize",
                index === paths.length - 1 ? "text-slate-900 font-bold" : "hover:text-slate-600 transition-colors"
              )}>
                {path.replace("-", " ")}
              </span>
            </React.Fragment>
          ))}
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Pesquisar no sistema..." 
            className="pl-10 bg-slate-50 border-none h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#008542]/20"
          />
        </div>
      </div>

      {/* Profile & Notifications */}
      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-slate-900 leading-none">Rafael Caldeira</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Gestor de UX</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#008542] group-hover:bg-[#008542]/5 transition-all">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}

import * as React from "react";
