"use client";

import * as React from "react";
import { ThreadView } from "@/components/features/demands/ThreadView";
import { ChevronLeft, MessageSquare, ShieldCheck, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Demanda } from "@/types/demanda";

interface DemandDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UserDemandDetailPage({ params }: DemandDetailPageProps) {
  const { id } = React.use(params);
  const [demanda, setDemanda] = React.useState<Demanda | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setError(null);
        const res = await fetch(`/api/demandas/${id}`);
        const payload = (await res.json().catch(() => null)) as any;
        if (!res.ok) throw new Error(payload?.error ?? "Falha ao carregar demanda");
        if (!cancelled) setDemanda((payload?.data ?? null) as Demanda | null);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Falha ao carregar demanda");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 font-medium">
          {error}
        </div>
      </div>
    );
  }

  if (!demanda) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 font-medium">
          Carregando...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <Link href="/user/demandas">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID: {demanda.id.split("-")[0]}</span>
            <h1 className="text-xl font-black text-slate-900">Detalhes do Relato</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 px-4 font-bold uppercase tracking-widest text-[10px] border-slate-200 text-slate-600">
            <Share2 className="w-3.5 h-3.5 mr-2" />
            Compartilhar
          </Button>
          <Button size="sm" className="h-10 px-6 bg-[#008542] hover:bg-[#006e36] text-white font-black uppercase tracking-widest text-[10px] shadow-sm">
            <MessageSquare className="w-3.5 h-3.5 mr-2" />
            Nova Interação
          </Button>
        </div>
      </div>

      <ThreadView demanda={demanda} />

      {/* Official Response Highlight (if exists) */}
      {demanda.respostas.some(r => r.isAdminResponse) && (
        <div className="bg-[#008542] rounded-3xl p-10 mt-12 text-white relative overflow-hidden group">
          <div className="flex items-start gap-6 relative z-10">
            <div className="bg-white/20 p-4 rounded-2xl shadow-xl backdrop-blur-sm">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-4 flex-1">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Posicionamento Oficial</span>
                <h3 className="text-2xl font-black">Ação técnica realizada</h3>
              </div>
              <p className="text-white/80 text-lg leading-relaxed font-medium">
                Esta demanda foi analisada pela equipe de acessibilidade e o status foi atualizado conforme as medidas corretivas aplicadas. 
                Sua contribuição ajudou a tornar a Petrobras um ambiente mais inclusivo.
              </p>
            </div>
          </div>
          {/* Subtle logo or pattern */}
          <div className="absolute right-0 bottom-0 opacity-10 p-4 pointer-events-none">
             <div className="w-40 h-40 border-[20px] border-white rounded-full translate-x-10 translate-y-10" />
          </div>
        </div>
      )}
    </div>
  );
}
