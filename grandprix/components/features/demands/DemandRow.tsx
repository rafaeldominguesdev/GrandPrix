"use client";

import { Demanda } from "@/types";
import { DemandBadge } from "./DemandBadge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MessageSquare, User, Clock } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BARREIRA_LABELS, TipoBarreira } from "@/lib/constants";

interface DemandRowProps {
  demanda: Demanda;
  isAdmin?: boolean;
}

export function DemandRow({ demanda, isAdmin = false }: DemandRowProps) {
  const lastResponse = demanda.respostas.length > 0 
    ? demanda.respostas[demanda.respostas.length - 1] 
    : null;

  const detailHref = isAdmin 
    ? `/admin/demandas/${demanda.id}` 
    : `/user/demandas/${demanda.id}`;

  return (
    <div className="group relative bg-white border border-slate-200 rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200">
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
              className="text-base font-bold text-slate-900 hover:text-primary transition-colors truncate"
            >
              {demanda.titulo}
            </Link>
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10 uppercase tracking-widest">
                {demanda.categoria.nome}
              </span>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-widest">
                {(BARREIRA_LABELS as any)[demanda.tipoBarreira.slug]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{demanda.autor.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>
                {formatDistanceToNow(new Date(demanda.createdAt), {
                  addSuffix: true,
                  locale: ptBR,
                })}
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
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Última resposta</p>
                <p className="text-[10px] font-bold text-slate-600">
                  {formatDistanceToNow(new Date(lastResponse.createdAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
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
