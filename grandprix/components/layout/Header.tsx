"use client";

import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export function Header() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-10 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Buscar demandas, respostas..." 
            className="pl-10 bg-slate-50 border-none h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">

        <Button variant="ghost" className="gap-2 px-2 hover:bg-slate-50">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold text-slate-700 hidden md:block">Rafael C.</span>
        </Button>
      </div>
    </header>
  );
}
