"use client";

import { Demanda } from "@/types";
import { DemandBadge } from "./DemandBadge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MessageSquare, User, Clock, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BARREIRA_LABELS } from "@/lib/constants";
import { useState, useEffect } from "react";

interface DemandRowProps {
  demanda: Demanda;
  isAdmin?: boolean;
}

/** Renderiza tempo relativo apenas no cliente para evitar hydration mismatch */
function RelativeTime({ date }: { date: string | Date }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(
      formatDistanceToNow(date instanceof Date ? date : new Date(date), {
        addSuffix: true,
        locale: ptBR,
      })
    );
  }, [date]);

  if (!label) return null;
  return <>{label}</>;
}

export function DemandRow({ demanda, isAdmin = false }: DemandRowProps) {
  const lastResponse = demanda.respostas.length > 0
    ? demanda.respostas[demanda.respostas.length - 1]
    : null;

  const detailHref = isAdmin
    ? `/admin/demandas/${demanda.id}`
    : `/user/demandas/${demanda.id}`;

  return (
    <div className="group relative bg-white border border-slate-200 rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-colors transition-shadow duration-500 ease-out">
      <div className="flex items-start gap-4">
        {/* Avatar Lado Esquerdo */}
        <Avatar className="h-10 w-10 border-2 border-slate-50 shadow-sm">
          <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-bold">
            {demanda.autor.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        {/* Centro - Conteúdo */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-col gap-1">
            <Link
              href={detailHref}
              className="text-base font-bold text-slate-900 hover:text-primary transition-colors duration-500 ease-out truncate"
            >
              {demanda.titulo}
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-primary bg-primary/5 px-2.5 py-1 rounded-md border border-primary/10 uppercase tracking-widest">
                {demanda.categoria.nome}
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md uppercase tracking-widest">
                {BARREIRA_LABELS[demanda.tipoBarreira.slug] || demanda.tipoBarreira.nome}
              </span>
              {demanda.iniciativaVinculada && (
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md uppercase tracking-widest border border-slate-200 flex items-center gap-1">
                  <Target className="w-3 h-3" /> Integração: {demanda.iniciativaVinculada.nome}
                </span>
              )}
            </div>

            {isAdmin && demanda.aiAnalysis?.solucaoHistorica && (
              <div className="mt-2 bg-[#FFD100]/15 border border-[#FFD100]/35 p-2 rounded-lg flex gap-2 items-start w-fit">
                <Sparkles className="w-4 h-4 text-[#FFD100] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-black uppercase text-[#003D29] tracking-widest leading-none">Recomendação (Solução Testada)</p>
                  <p className="text-xs font-medium text-slate-900 mt-1">Baseado em: {demanda.aiAnalysis.solucaoHistorica.titulo}</p>
                  {demanda.aiAnalysis.solucaoHistorica.norma && (
                    <p className="text-[10px] text-[#003D29] font-bold mt-1">Norma Aplicável: {demanda.aiAnalysis.solucaoHistorica.norma}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>{demanda.autor.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>
                <RelativeTime date={demanda.createdAt} />
              </span>
            </div>
          </div>
        </div>

        {/* Lado Direito - Status e Resposta */}
        <div className="flex flex-col items-end justify-between self-stretch gap-2">
          <DemandBadge status={demanda.status} />

          {lastResponse ? (
            <div className="flex items-center gap-2 mt-auto">
              <div className="text-right">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">Última resposta</p>
                <p className="text-xs font-bold text-slate-600">
                  <RelativeTime date={lastResponse.createdAt} />
                </p>
              </div>
              <Avatar className="h-6 w-6 border border-white shadow-sm ring-1 ring-primary/10">
                <AvatarFallback className="bg-primary text-white text-[8px] font-black">
                  AD
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-300 italic mt-auto">
              <MessageSquare className="w-3 h-3" />
              Aguardando retorno
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
