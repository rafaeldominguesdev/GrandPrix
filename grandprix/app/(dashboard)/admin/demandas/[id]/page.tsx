"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { mockDemandas } from "@/lib/mock-data";
import { ThreadView } from "@/components/features/demands/ThreadView";
import { 
  ChevronLeft, 
  MessageSquare, 
  ShieldCheck, 
  History, 
  ArrowRight,
  Send,
  Lock,
  MoreVertical,
  Flag
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DemandaStatus } from "@/lib/constants";

interface AdminDemandDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AdminDemandDetailPage({ params }: AdminDemandDetailPageProps) {
  const { id } = use(params);
  const demanda = mockDemandas.find((d) => d.id === id);
  const [response, setResponse] = useState("");

  if (!demanda) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-6">
          <Link href="/admin/demandas">
            <Button variant="outline" size="icon" className="text-slate-400 hover:text-slate-900 rounded-2xl border-slate-200 w-12 h-12 bg-white shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md">ID: {demanda.id.split("-")[0]}</span>
              <span className="text-[10px] font-black text-[#008542] uppercase tracking-widest bg-[#008542]/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> MODO ADMIN
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Análise de Relato</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-6 font-bold uppercase tracking-widest text-[10px] border-slate-200 text-red-600 hover:bg-red-50 hover:border-red-100">
            <Flag className="w-4 h-4 mr-2" />
            Moderar Relato
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-slate-200">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <ThreadView demanda={demanda} />
        </div>

        <aside className="space-y-8">
          <Card className="border-slate-200 shadow-xl overflow-hidden sticky top-24">
            <CardHeader className="bg-slate-900 text-white p-6">
              <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                <Send className="w-4 h-4 text-[#FFD100]" />
                Resposta Oficial
              </CardTitle>
              <CardDescription className="text-white/50 text-xs">Informe as medidas tomadas e atualize o status.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Alterar Status</label>
                  <Select defaultValue={demanda.status}>
                    <SelectTrigger className="w-full h-12 bg-slate-50 border-slate-200 focus:ring-[#008542]/20">
                      <SelectValue placeholder="Selecione o novo status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={DemandaStatus.EM_ANALISE}>Em Análise</SelectItem>
                      <SelectItem value={DemandaStatus.EM_ANDAMENTO}>Em Andamento</SelectItem>
                      <SelectItem value={DemandaStatus.RESOLVIDA}>Resolvida / Encerrada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Mensagem para o Autor</label>
                  <Textarea 
                    placeholder="Descreva as ações técnicas..." 
                    className="min-h-[150px] bg-slate-50 border-slate-200 focus:bg-white transition-all resize-none text-sm leading-relaxed"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                  />
                </div>

                <Button className="w-full h-14 bg-[#008542] hover:bg-[#006e36] text-white font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-[#008542]/20 gap-3">
                  Enviar Posicionamento <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center gap-3 text-slate-400">
                <History className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Acesso auditado por RH-772</span>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
