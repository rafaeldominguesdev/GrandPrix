import { 
    FileText, 
    MessageCircle, 
    CheckCircle2, 
    Clock, 
    AlertTriangle, 
    ArrowUpRight,
    Users
  } from 'lucide-react';
  import { StatsCard } from '@/components/admin/StatsCard';
  import { Button } from '@/components/ui/button';
  import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
  import { mockDemandas } from '@/lib/mock-data';
  import { StatusBadge } from '@/components/forum/StatusBadge';
  import { formatDate } from '@/utils/formatters';
  import Link from 'next/link';
  
  export default function AdminDashboardPage() {
    // Calculando métricas rápidas dos mocks
    const total = mockDemandas.length;
    const novas = mockDemandas.filter(d => d.status === 'NOVA').length;
    const emAndamento = mockDemandas.filter(d => d.status === 'EM_ANDAMENTO').length;
    const resolvidas = mockDemandas.filter(d => d.status === 'RESOLVIDA').length;
  
    return (
      <div className="space-y-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tight">
              Visão <span className="gradient-text">Geral</span>
            </h1>
            <p className="text-muted-foreground font-medium">
              Monitoramento em tempo real das demandas de acessibilidade.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-10 text-xs font-bold uppercase tracking-wider">
              Exportar Dados
            </Button>
            <Button className="h-10 bg-brand-dark text-white hover:bg-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/10">
              Relatório Semanal
            </Button>
          </div>
        </div>
  
        {/* Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            label="Total de Demandas" 
            value={total} 
            icon={FileText} 
            trend={{ value: 12, isUp: true }}
          />
          <StatsCard 
            label="Novos Relatos" 
            value={novas} 
            icon={AlertTriangle} 
            iconClassName="bg-brand-yellow/20 text-brand-dark"
            trend={{ value: 5, isUp: true }}
          />
          <StatsCard 
            label="Em Resolução" 
            value={emAndamento} 
            icon={Clock} 
            iconClassName="bg-blue-100 text-blue-700"
            trend={{ value: 3, isUp: false }}
          />
          <StatsCard 
            label="Casos Resolvidos" 
            value={resolvidas} 
            icon={CheckCircle2} 
            iconClassName="bg-green-100 text-green-700"
            trend={{ value: 18, isUp: true }}
          />
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Demands Table/List - macOS Aesthetic Clean */}
          <Card className="lg:col-span-2 border-none shadow-macos-lg overflow-hidden rounded-[24px] bg-white text-foreground">
            <CardHeader className="p-6 border-b border-black/[0.05] flex flex-row items-center justify-between bg-black/[0.01]">
              <CardTitle className="text-lg font-black tracking-tight">Demandas Recentes</CardTitle>
              <Link href="/admin/demandas">
                <Button variant="ghost" size="sm" className="h-8 rounded-full text-brand-green font-bold text-[10px] uppercase tracking-widest hover:bg-black/[0.03]">
                  Ver Tudo <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-black/[0.02] text-muted-foreground font-black uppercase text-[10px] tracking-widest text-left">
                      <th className="px-6 py-4">Demanda</th>
                      <th className="px-6 py-4">Unidade</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.05]">
                    {mockDemandas.slice(0, 5).map((demanda) => (
                      <tr key={demanda.id} className="hover:bg-black/[0.01] transition-colors group">
                        <td className="px-6 py-4">
                          <Link href={`/admin/demandas/${demanda.id}`} className="font-bold text-foreground group-hover:text-brand-green block truncate max-w-[200px]">
                            {demanda.titulo}
                          </Link>
                          <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">#{demanda.id.padStart(4, '0')}</span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground font-medium tracking-tight text-xs">{demanda.unidade}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={demanda.status} className="scale-90 origin-left" />
                        </td>
                        <td className="px-6 py-4 text-right text-muted-foreground font-medium text-xs">
                          {formatDate(demanda.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
  
          {/* Notifications / Summary */}
          <div className="space-y-6">
            <Card className="border-none shadow-macos-lg overflow-hidden rounded-[24px] bg-white text-foreground">
              <CardHeader className="p-6 border-b border-black/[0.05] bg-black/[0.01]">
                <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                    <Users className="h-5 w-5 text-brand-green" />
                    Top Reclamantes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {[
                  { name: 'Ana Paula Souza', count: 12, color: 'bg-brand-green' },
                  { name: 'Carlos Eduardo Lima', count: 8, color: 'bg-brand-yellow' },
                  { name: 'Pedro Alves', count: 5, color: 'bg-blue-500' },
                ].map((item, i) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">{item.count} relatos</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn('h-full rounded-full', item.color)} 
                        style={{ width: `${(item.count / 15) * 100}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
  
            <div className="bg-brand-dark rounded-[24px] p-8 text-white shadow-macos-lg relative overflow-hidden group">
                <div className="relative z-10">
                    <h4 className="text-xl font-black tracking-tight mb-2">Ação Requerida</h4>
                    <p className="text-xs text-white/70 mb-6 leading-relaxed font-medium">
                        Existem 3 demandas críticas **Urgentes** sem resposta há mais de 24h.
                    </p>
                    <Button size="sm" className="bg-brand-yellow text-brand-dark hover:bg-white font-black text-[10px] uppercase tracking-widest px-6 h-9 rounded-full">
                        Verificar Agora
                    </Button>
                </div>
                {/* Visual accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-brand-green/40 transition-colors" />
                <AlertTriangle className="absolute -bottom-4 -right-4 h-24 w-24 text-white/5 rotate-12" />
            </div>
          </div>
        </div>
      </div>
    );
  }
