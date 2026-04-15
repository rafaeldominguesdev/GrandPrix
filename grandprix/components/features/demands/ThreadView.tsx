"use client";

import { Demanda } from "@/types/demanda";
import { STATUS_CONFIG, BARREIRA_LABELS, TipoBarreira } from "@/lib/constants";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Calendar, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Clock,
  Tag,
  Accessibility,
  CornerDownRight,
  User,
  History
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ThreadViewProps {
  demanda: Demanda;
}

export function ThreadView({ demanda }: ThreadViewProps) {
  const status = STATUS_CONFIG[demanda.status];

  return (
    <div className="space-y-12">
      {/* Original Report */}
      <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <section className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 border-b border-slate-50">
            <div className="flex items-center gap-3">
               <Badge className={cn("rounded-full uppercase text-[10px] font-black tracking-widest px-3 py-1", status.color)}>
                 {status.label}
               </Badge>
               <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
                 {(BARREIRA_LABELS as any)[demanda.tipoBarreira.slug]}
               </span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {format(new Date(demanda.createdAt), "dd 'de' MMMM", { locale: ptBR })}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {demanda.unidade || "Global"}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-tight">
              {demanda.titulo}
            </h1>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border-2 border-slate-50">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {demanda.autor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">{demanda.autor.name}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{demanda.autor.department}</span>
              </div>
            </div>
          </div>

          <div className="text-slate-600 text-lg leading-relaxed max-w-4xl bg-slate-50/50 p-6 rounded-xl border border-slate-100 italic">
            "{demanda.descricao}"
          </div>
        </section>
      </Card>

      {/* Interactions Timeline */}
      <section className="space-y-8 relative">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
          <History className="w-4 h-4" />
          Histórico da Demanda
        </h2>

        <div className="space-y-10 pl-8 border-l-2 border-slate-100 relative">
          {demanda.respostas.map((resposta, index) => {
            const isOfficial = resposta.isAdminResponse;
            
            return (
              <div key={resposta.id} className="relative">
                {/* Timeline Dot */}
                <div className={cn(
                  "absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-white shadow-sm flex items-center justify-center",
                  isOfficial ? "bg-[#008542]" : "bg-slate-300"
                )}>
                  {isOfficial && <ShieldCheck className="w-2.5 h-2.5 text-white" />}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-sm font-bold",
                        isOfficial ? "text-[#008542]" : "text-slate-900"
                      )}>
                        {resposta.autor.name}
                      </span>
                      {isOfficial && (
                        <span className="text-[10px] font-black bg-[#008542]/10 text-[#008542] px-2 py-0.5 rounded-full">
                          ADMINISTRAÇÃO
                        </span>
                      )}
                      <span className="text-xs text-slate-400 font-medium ml-2">
                        {format(new Date(resposta.createdAt), "dd MMM, HH:mm", { locale: ptBR })}
                      </span>
                    </div>
                  </div>

                  <Card className={cn(
                    "border-slate-100 shadow-sm",
                    isOfficial && "bg-[#008542]/2 border-[#008542]/10"
                  )}>
                    <CardContent className="p-5 text-sm leading-relaxed text-slate-700">
                      {isOfficial && <CornerDownRight className="w-4 h-4 text-[#008542] mb-3 opacity-50" />}
                      {resposta.conteudo}
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
