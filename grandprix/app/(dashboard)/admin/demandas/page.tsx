"use client";

import { mockDemandas } from "@/lib/mock-data";
import { DemandFeed } from "@/components/features/demands/DemandFeed";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDemandListPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight text-primary">Painel de Gestão</h1>
          <p className="text-sm font-medium text-slate-500">Triagem e resposta de demandas de acessibilidade.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="sm" className="bg-[#008542]/10 text-[#008542] font-black text-[10px] uppercase tracking-widest rounded-full px-4">
               Todas
             </Button>
             <Button variant="ghost" size="sm" className="text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-full px-4">
               Novas
             </Button>
             <Button variant="ghost" size="sm" className="text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-full px-4">
               Pendentes
             </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                placeholder="Filtrar demandas..." 
                className="w-full bg-slate-50 border-none rounded-xl py-2 pl-9 pr-4 text-[11px] font-bold text-slate-600 focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
            <Button variant="outline" size="sm" className="text-[10px] font-bold uppercase tracking-widest border-slate-200 h-9">
              <Filter className="w-3.5 h-3.5 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <DemandFeed data={mockDemandas} isAdmin={true} />
      </div>
    </div>
  );
}
