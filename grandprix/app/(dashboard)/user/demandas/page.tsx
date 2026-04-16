"use client";

import { DemandFeed } from "@/components/features/demands/DemandFeed";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Filter, MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Demanda } from "@/types/demanda";

export default function UserDemandListPage() {
  const [userDemands, setUserDemands] = React.useState<Demanda[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setError(null);
        const res = await fetch("/api/demandas?authorId=4");
        const payload: unknown = await res.json().catch(() => null);
        const maybe = (payload && typeof payload === "object") ? (payload as Record<string, unknown>) : null;
        const serverError = typeof maybe?.error === "string" ? maybe.error : undefined;
        const data = Array.isArray(maybe?.data) ? (maybe?.data as Demanda[]) : [];
        if (!res.ok) throw new Error(serverError ?? "Falha ao carregar demandas");
        if (!cancelled) setUserDemands(data);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Falha ao carregar demandas";
        if (!cancelled) setError(msg);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="title-font text-3xl font-black text-slate-900 tracking-tight">Meus Tópicos</h1>
          <p className="title-font text-sm font-medium text-slate-500">Gerencie e acompanhe o status de todos os tópicos que você criou.</p>
        </div>
        <Link href="/user/nova-demanda">
          <Button className="h-11 px-6 bg-[#008542] hover:bg-[#006e36] text-white font-black uppercase tracking-widest text-[10px] shadow-sm gap-2">
            <PlusCircle className="w-4 h-4" />
            Novo Tópico
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            placeholder="Pesquisar por título ou ID..." 
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold text-slate-600 focus:bg-white focus:ring-1 focus:ring-[#008542]/20 transition-colors duration-500 ease-out outline-none"
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

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 font-medium font-sans">
          {error}
        </div>
      )}

      {userDemands.length === 0 && !error ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white border border-slate-100 rounded-[32px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] relative overflow-hidden group">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#008542]/5 rounded-full blur-[80px] -mt-32" />
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-inner group-hover:text-[#008542]/40 group-hover:bg-[#008542]/5">
              <MessageSquarePlus className="w-10 h-10" />
            </div>
            
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">Você ainda não escreveu nada</h3>
            <p className="text-sm font-medium text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">
              Compartilhe seu primeiro tópico com a organização. Suas dúvidas ou sugestões ajudam a construir uma jornada mais fluida para todos.
            </p>
            
            <Link href="/user/nova-demanda">
              <Button className="h-14 px-8 bg-[#008542] hover:bg-[#006e36] text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-[#008542]/20 gap-3 transition-all active:scale-95 group/btn">
                <PlusCircle className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" />
                Criar meu primeiro tópico
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <DemandFeed data={userDemands} />
      )}
    </div>
  );
}
