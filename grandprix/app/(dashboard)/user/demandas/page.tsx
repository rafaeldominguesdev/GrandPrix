"use client";

import { mockDemandas } from "@/lib/mock-data";
import { DemandTable } from "@/components/features/demands/DemandTable";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function UserDemandListPage() {
  const userDemands = mockDemandas.filter(d => d.autor.id === '1');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Meus Relatos</h1>
          <p className="text-sm font-medium text-slate-500">Gerencie e acompanhe o status de todas as suas solicitações.</p>
        </div>
        <Link href="/nova-demanda">
          <Button className="h-11 px-6 bg-[#008542] hover:bg-[#006e36] text-white font-black uppercase tracking-widest text-[10px] shadow-sm gap-2">
            <PlusCircle className="w-4 h-4" />
            Novo Registro
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            placeholder="Pesquisar por título ou ID..." 
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold text-slate-600 focus:bg-white focus:ring-1 focus:ring-[#008542]/20 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <Filter className="w-3.5 h-3.5 mr-2" />
            Filtros
          </Button>
          <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {userDemands.length} Resultados
          </span>
        </div>
      </div>

      <DemandTable data={userDemands} />
    </div>
  );
}
