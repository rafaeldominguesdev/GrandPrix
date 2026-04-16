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
import { DemandFeed } from "@/components/features/demands/DemandFeed";
import { BrazilHeatmap } from "@/components/features/admin/BrazilHeatmap";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const total = mockDemandas.length;
  const novas = mockDemandas.filter(d => d.status === 'NOVA').length;
  const emAndamento = mockDemandas.filter(d => d.status === 'EM_ANDAMENTO').length;
  const resolvidas = mockDemandas.filter(d => d.status === 'RESOLVIDA').length;

  const stats = [
    { label: "Total de Demandas", value: total, icon: BarChart3, color: "text-slate-800", bg: "bg-slate-100", trend: "+12%" },
    { label: "Triagem via IA", value: "98%", icon: Search, color: "text-[#008542]", bg: "bg-emerald-50", trend: "+45% Precisão" },
    { label: "Tempo de Roteamento", value: "45s", icon: Clock, color: "text-slate-800", bg: "bg-slate-100", trend: "-24h SLA" },
    { label: "Barreiras Atitudinais", value: mockDemandas.filter(d => d.aiAnalysis?.isAttitudinal).length, icon: AlertTriangle, color: "text-[#008542]", bg: "bg-[#008542]/10", trend: "Alta Prioridade" },
  ];

  return (
    <div className="space-y-10">
      {/* Header restrito ao espaço do Mapa para perfeitamente alinhar os 2 botões de ação */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-1">
            <h1 className="title-font text-4xl font-black tracking-tight text-slate-900">Hub de Inteligência</h1>
            <p className="title-font text-sm font-medium text-slate-500">Monitoramento analítico e triagem inteligente de barreiras à inclusão.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="h-12 px-6 font-bold uppercase tracking-widest text-[10px] border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all rounded-full">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button className="h-12 px-8 bg-[#008542] hover:bg-[#006e36] text-white font-bold uppercase tracking-widest text-[10px] shadow-md rounded-full transition-all">
              Ações em Lote
            </Button>
          </div>
        </div>
      </div>

      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-slate-200 shadow-sm border-b-4 border-b-transparent hover:border-b-[#008542] transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </CardTitle>
              <div className={cn(stat.bg, stat.color, "p-2.5 rounded-xl")}>
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="number-font text-4xl font-black text-slate-900">{stat.value}</div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tiers Superiores: Mapa e Sidebar alinhados verticalmente */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Map Section */}
        <div className="xl:col-span-2">
          <BrazilHeatmap />
        </div>

        {/* Sidebar de Insights/Alertas perfeitamente esticada para preencher a altura do Mapa */}
        <div className="flex flex-col gap-8">
          <Card className="border-slate-200 shadow-sm overflow-hidden border-t-4 border-t-[#008542] flex-none">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                 <CardTitle className="text-xs font-bold uppercase tracking-widest text-[#008542]">
                    IA Insights
                 </CardTitle>
                 <span className="bg-[#008542]/10 text-[#008542] text-xs font-black px-3 py-1 rounded-full">TEMPO REAL</span>
              </div>
              <CardDescription className="text-xs font-medium text-slate-500 mt-2 line-clamp-2">
                Padrões identificados pelo modelo cognitivo baseados em relatos recentes.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                   <BarChart3 className="w-12 h-12" />
                </div>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#008542] animate-pulse" />
                  Cluster Detectado: ERP
                </p>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  A IA identificou 22 reclamações convergentes sobre a inacessibilidade do sistema SAP após atualização. 
                  <strong className="block mt-1 text-[#008542]">✓ Demanda encaminhada automaticamente para a TIC.</strong>
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl space-y-2 relative overflow-hidden">
                <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Alerta: Barreiras Atitudinais
                </p>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Houve um aumento de 15% em relatos ligados a preconceito ou subestimação de capacidade reportados na REPLAN.
                  <strong className="block mt-1 text-slate-800">Sugestão: Engatilhar comunicação em lote para gerências.</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-slate-100 shadow-sm overflow-hidden relative group flex-1 flex flex-col">
            <CardContent className="p-8 relative z-10 flex flex-col h-full">
              <div className="bg-[#008542]/10 w-fit p-3 rounded-2xl mb-4 group-hover:bg-[#008542]/20 transition-colors">
                <Users className="w-6 h-6 text-[#008542]" />
              </div>
              <h3 className="title-font text-xl font-black leading-tight text-slate-900 mb-4">Equipe de Resposta</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Gerencie permissões e atribua casos para os especialistas de acessibilidade de cada unidade.
              </p>
              <div className="mt-auto pt-6">
                <Button className="w-full bg-white border-2 border-[#008542] hover:bg-[#008542] hover:text-white text-[#008542] font-black uppercase tracking-[0.2em] text-xs h-12 shadow-sm transition-colors">
                  Gerenciar Time
                </Button>
              </div>
            </CardContent>
            {/* BG Patterns */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#008542]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -ml-12 -mb-12" />
          </Card>
        </div>
      </div>

      {/* Roteamento Inteligente Inferior */}
      <div className="xl:w-2/3 xl:pr-4 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="title-font text-xl font-black text-slate-900">Roteamento Inteligente (IA)</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-10 px-4 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900">
              <Filter className="w-5 h-5 mr-2" />
              Filtros
            </Button>
          </div>
        </div>
        <DemandFeed data={mockDemandas.slice(0, 8)} isAdmin />
      </div>
    </div>
  );
}
