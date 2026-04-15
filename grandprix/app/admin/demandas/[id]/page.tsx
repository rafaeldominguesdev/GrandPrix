'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { mockDemandas } from '@/lib/mock-data';
import { PostDetail } from '@/components/forum/PostDetail';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { STATUS_DEMANDA, PRIORIDADE_DEMANDA } from '@/utils/constants';
import { 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight, 
  History,
  AlertTriangle,
  CheckCircle2,
  Trash2
} from 'lucide-react';

interface AdminDemandaDetailPageProps {
  params: {
    id: string;
  };
}

export default function AdminDemandaDetailPage({ params }: AdminDemandaDetailPageProps) {
  const demanda = mockDemandas.find((d) => d.id === params.id);
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!demanda) {
    notFound();
  }

  const handleResponseSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        setResponse('');
        alert('Resposta enviada com sucesso!');
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Administrar <span className="text-brand-green">Demanda</span></h1>
          <p className="text-muted-foreground font-medium">Controle total sobre o registro e resolução desta solicitação.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100 h-10 px-4 font-bold text-xs uppercase tracking-widest">
                <Trash2 className="mr-2 h-4 w-4" /> Moderar / Ocultar
            </Button>
            <Button className="bg-brand-green hover:bg-brand-mid text-white h-10 px-6 font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-green/20">
                <CheckCircle2 className="mr-2 h-4 w-4" /> Concluir Atendimento
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Col: Existing Detail View */}
        <div className="xl:col-span-2 space-y-8">
            <div className="bg-brand-yellow/10 border-l-4 border-brand-yellow p-4 rounded-r-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-brand-dark" />
                    <div>
                        <p className="text-xs font-bold text-brand-dark">Modo Consultivo</p>
                        <p className="text-[10px] text-brand-dark/70 uppercase font-black tracking-widest">Acesso Administrativo nível 1</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-brand-dark" />
                    <span className="text-xs font-bold text-brand-dark underline cursor-pointer">Ver histórico de edições</span>
                </div>
            </div>

            {/* Reusing the PostDetail component but it will be inside the Admin Layout context */}
            <PostDetail demanda={demanda} />
        </div>

        {/* Right Col: Admin Controls */}
        <div className="space-y-6">
            <Card className="border-none shadow-md overflow-hidden bg-white sticky top-24">
                <CardHeader className="bg-brand-dark text-white p-6">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-brand-yellow" />
                        Responder Demanda
                    </CardTitle>
                    <CardDescription className="text-white/60 text-xs">A resposta será visível para o autor e demais colaboradores no fórum.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Novo Status</label>
                            <Select defaultValue={demanda.status}>
                                <SelectTrigger className="w-full h-10 focus:ring-brand-green">
                                    <SelectValue placeholder="Alterar status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(STATUS_DEMANDA).map(([key, val]) => (
                                        <SelectItem key={key} value={key}>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: val.color }} />
                                                {val.label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Prioridade</label>
                            <Select defaultValue={demanda.prioridade}>
                                <SelectTrigger className="w-full h-10 focus:ring-brand-green">
                                    <SelectValue placeholder="Prioridade" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(PRIORIDADE_DEMANDA).map(([key, val]) => (
                                        <SelectItem key={key} value={key}>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: val.color }} />
                                                {val.label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 pt-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Mensagem de Resposta</label>
                            <Textarea 
                                placeholder="Informe as ações tomadas ou próximas etapas..."
                                className="min-h-[180px] focus-visible:ring-brand-green resize-none text-sm"
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                            />
                        </div>

                        <div className="bg-muted/30 p-4 rounded-xl space-y-2 border">
                            <h4 className="flex items-center gap-2 text-xs font-bold text-foreground">
                                <AlertTriangle className="h-3.5 w-3.5 text-brand-yellow" />
                                Notificação Automática
                            </h4>
                            <p className="text-[10px] text-muted-foreground">O autor receberá um e-mail com sua resposta e a atualização do status.</p>
                        </div>

                        <Button 
                            className="w-full h-12 bg-brand-green hover:bg-brand-mid text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-green/20"
                            onClick={handleResponseSubmit}
                            disabled={!response || isSubmitting}
                        >
                            {isSubmitting ? 'Enviando...' : (
                                <>Enviar Resposta do Admin <ArrowRight className="ml-2 h-4 w-4" /></>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="p-6 bg-white rounded-2xl border shadow-sm space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <History className="h-4 w-4" /> Log de Auditoria
                </h3>
                <div className="space-y-4">
                    {[
                        { action: 'Status alterado para Em Andamento', user: 'Mariana Costa', date: 'Há 2 dias' },
                        { action: 'Prioridade definida como Alta', user: 'Sistema', date: 'Há 5 dias' },
                        { action: 'Demanda registrada', user: 'Ana Paula Souza', date: 'Há 5 dias' },
                    ].map((log, i) => (
                        <div key={i} className="flex gap-3 relative pb-4 last:pb-0">
                            {i !== 2 && <div className="absolute left-1.5 top-5 w-[1px] h-full bg-border" />}
                            <div className="h-3 w-3 rounded-full bg-brand-green/20 border-2 border-brand-green shrink-0 mt-1 z-10" />
                            <div>
                                <p className="text-xs font-bold text-foreground leading-none mb-1">{log.action}</p>
                                <p className="text-[10px] text-muted-foreground">{log.user} • {log.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
