"use client";

import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Users,
  Search,
  Filter,
  Download
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockDemandas } from "@/lib/mock-data";
import { DemandTable } from "@/components/features/demands/DemandTable";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const total = mockDemandas.length;
  const novas = mockDemandas.filter(d => d.status === 'NOVA').length;
  const emAndamento = mockDemandas.filter(d => d.status === 'EM_ANDAMENTO').length;
  const resolvidas = mockDemandas.filter(d => d.status === 'RESOLVIDA').length;

  const stats = [
    { label: "Total de Demandas", value: total, icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Relatos Novos", value: novas, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Em Resolução", value: emAndamento, icon: Clock, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Casos Encerrados", value: resolvidas, icon: CheckCircle2, color: "text-[#008542]", bg: "bg-[#008542]/10" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Gestão de Impacto</h1>
          <p className="text-sm font-medium text-slate-500">Monitoramento analítico e moderação de barreiras de acessibilidade.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 font-bold uppercase tracking-widest text-[10px] border-slate-200 bg-white">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
          <Button className="h-12 px-8 bg-[#008542] hover:bg-[#006e36] text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-[#008542]/20">
            Ações em Lote
          </Button>
        </div>
      </div>

      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-slate-200 shadow-sm border-b-4 border-b-transparent hover:border-b-[#008542] transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </CardTitle>
              <div className={cn(stat.bg, stat.color, "p-2.5 rounded-xl")}>
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{stat.value}</div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12% vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Lista Principal */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Triagem Técnica</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-10 px-4 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
          <DemandTable data={mockDemandas.slice(0, 8)} isAdmin />
        </div>

        {/* Sidebar de Insights/Alertas */}
        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <div className="flex items-center justify-between">
                 <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                   Alertas Críticos
                 </CardTitle>
                 <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full">3 ALERTA(S)</span>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl space-y-2">
                <p className="text-sm font-bold text-red-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  SLA Excedido
                </p>
                <p className="text-xs text-red-700/70 font-medium">3 relatos técnicos sem interação há mais de 48h úteis.</p>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl space-y-2">
                <p className="text-sm font-bold text-amber-900 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Pendência de Unidade
                </p>
                <p className="text-xs text-amber-700/70 font-medium">Unidade EDISE com pico de relatos de acessibilidade digital.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white border-none shadow-xl overflow-hidden relative group">
            <CardContent className="p-8 relative z-10 space-y-4">
              <div className="bg-white/10 w-fit p-3 rounded-2xl mb-4 group-hover:bg-[#008542] transition-colors">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black leading-tight text-white">Equipe de Resposta</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Gerencie permissões e atribua casos para os especialistas de acessibilidade de cada unidade.
              </p>
              <Button className="w-full bg-[#008542] hover:bg-[#006e36] text-white font-black uppercase tracking-[0.2em] text-[10px] h-12 shadow-lg shadow-[#008542]/20">
                Gerenciar Time
              </Button>
            </CardContent>
            {/* BG Patterns */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD100]/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#008542]/20 rounded-full blur-2xl -ml-12 -mb-12" />
          </Card>
        </div>
      </div>
    </div>
  );
}
