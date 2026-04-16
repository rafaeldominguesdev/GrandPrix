"use client";

import { 
  PlusCircle, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  BarChart3,
  Search
} from "lucide-react";
import Link from "next/link";
import { DemandTable } from "@/components/features/demands/DemandTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Demanda } from "@/types/demanda";
import { DemandaStatus } from "@/lib/constants";

export default function UserDashboardPage() {
  const [userDemands, setUserDemands] = React.useState<Demanda[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch("/api/demandas?authorId=1");
        const payload = (await res.json().catch(() => null)) as any;
        if (!res.ok) throw new Error(payload?.error ?? "Falha ao carregar demandas");
        if (!cancelled) setUserDemands((payload?.data ?? []) as Demanda[]);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Falha ao carregar demandas");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  
  const stats = [
    {
      title: "Meus Relatos",
      value: userDemands.length,
      icon: PlusCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Em Andamento",
      value: userDemands.filter(d => d.status === DemandaStatus.EM_ANDAMENTO).length,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Resolvidos",
      value: userDemands.filter(d => d.status === DemandaStatus.RESOLVIDA).length,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Eficiência",
      value: "92%",
      icon: BarChart3,
      color: "text-[#008542]",
      bg: "bg-[#008542]/10",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="title-font text-4xl font-black tracking-tight text-slate-900">Portal de Acessibilidade</h1>
          <p className="title-font text-sm font-medium text-slate-500">Acompanhe seus relatos e sugestões para um ambiente mais inclusivo.</p>
        </div>
        <Link href="/user/nova-demanda">
          <Button className="h-11 px-6 bg-[#008542] hover:bg-[#006e36] text-white font-bold uppercase tracking-widest text-[10px] rounded-full shadow-md gap-2 transition-colors">
            <PlusCircle className="w-4 h-4 text-white" />
            Novo Registro
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden border-b-4 border-b-transparent hover:border-b-[#008542]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {stat.title}
              </CardTitle>
              <div className={cn(stat.bg, stat.color, "p-2.5 rounded-xl transition-transform group-hover:scale-110")}>
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="number-font text-3xl font-black text-slate-900">{stat.value}</div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 mt-2">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>ATUALIZADO AGORA</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="title-font text-xl font-black text-slate-900">Histórico Recente</h2>
            <div className="h-6 w-[1px] bg-slate-200"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{userDemands.length} Itens</span>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              placeholder="Filtrar meus relatos..." 
              className="bg-slate-100 border-none rounded-full py-2 pl-9 pr-4 text-xs font-bold text-slate-600 focus:bg-white focus:ring-1 focus:ring-[#008542]/20 transition-all outline-none"
            />
          </div>
        </div>
        
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <DemandTable data={userDemands} />
      </div>

      <div className="bg-[#008542] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group">
        <div className="space-y-4 relative z-10 max-w-xl text-center md:text-left">
          <h3 className="title-font text-2xl font-black text-white">Transformando relatos em ações práticas.</h3>
          <p className="text-white/70 text-sm leading-relaxed font-medium">
            Seu canal direto para garantir que todos tenham as mesmas oportunidades e acessos dentro da Petrobras. 
            Nossa equipe analisa cada item em até 48h úteis.
          </p>
        </div>
        <Button className="bg-white text-[#008542] hover:bg-slate-100 font-black uppercase tracking-[0.2em] text-xs h-14 px-10 shadow-xl relative z-10 whitespace-nowrap">
          Central de Ajuda
        </Button>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl transition-transform group-hover:scale-110" />
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
