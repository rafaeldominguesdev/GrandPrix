'use client';

import { Demanda } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { CategoryTag } from './CategoryTag';
import { formatDateTime, getInitials } from '@/utils/formatters';
import { MapPin, AlertCircle, Share2, Printer, ArrowLeft, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PRIORIDADE_DEMANDA } from '@/utils/constants';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface PostDetailProps {
  demanda: Demanda;
}

export function PostDetail({ demanda }: PostDetailProps) {
  const prioridade = PRIORIDADE_DEMANDA[demanda.prioridade];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-slide-up">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-green transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a listagem
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Share2 className="mr-2 h-4 w-4" />
            Compartilhar
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="card-premium border-none shadow-macos-lg overflow-hidden rounded-[24px] bg-white">
            <CardHeader className="p-10 pb-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <CategoryTag categoria={demanda.categoria} />
                <StatusBadge status={demanda.status} />
                <div className="h-4 w-px bg-black/[0.05] mx-1" />
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-1.5 px-2 py-1 bg-black/[0.03] rounded-lg">
                  Protocolo: <span className="text-brand-green">#ACC-{demanda.id.padStart(4, '0')}</span>
                </span>
              </div>
              <h1 className="text-4xl font-black text-foreground leading-[1.1] tracking-tight">
                {demanda.titulo}
              </h1>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8 text-foreground">
              <div className="flex items-center gap-3 p-4 bg-black/[0.02] rounded-xl border border-black/[0.03]">
                 <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarFallback className="bg-brand-green text-white font-bold">
                        {getInitials(demanda.autor.name)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-bold text-foreground">{demanda.autor.name}</p>
                    <p className="text-xs text-muted-foreground">
                        Postado em {formatDateTime(demanda.createdAt)} • {demanda.autor.department}
                    </p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {demanda.descricao}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border bg-background flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-brand-light text-brand-dark">
                        <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Unidade / Local</p>
                        <p className="text-sm font-bold text-foreground">{demanda.unidade}</p>
                    </div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-background flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-muted text-muted-foreground" style={{ backgroundColor: `${prioridade?.color}15`, color: prioridade?.color }}>
                        <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Prioridade Estimada</p>
                        <p className="text-sm font-bold text-foreground" style={{ color: prioridade?.color }}>{prioridade?.label}</p>
                    </div>
                </div>
              </div>

              {demanda.tags && demanda.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {demanda.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Response Thread */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 px-1">
                <MessageSquare className="h-5 w-5 text-brand-green" />
                Respostas e Acompanhamento ({demanda.respostas.length})
            </h2>
            
            {demanda.respostas.length === 0 ? (
                <Card className="border-dashed border-2 bg-white/50 rounded-[20px]">
                    <CardContent className="p-12 text-center text-muted-foreground font-medium">
                        Aguardando análise técnica inicial. Um administrador responderá em breve.
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6">
                    {demanda.respostas.map((res) => (
                        <div key={res.id} className={`flex flex-col ${res.isAdminResponse ? 'items-start' : 'items-end'}`}>
                            <div className={`max-w-[90%] rounded-[20px] p-6 shadow-macos ${
                                res.isAdminResponse 
                                    ? 'bg-brand-green text-white rounded-tl-none' 
                                    : 'bg-white text-foreground rounded-tr-none border border-black/[0.05]'
                            }`}>
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-7 w-7 ring-2 ring-black/[0.05]">
                                            <AvatarFallback className={res.isAdminResponse ? 'bg-white/20 text-white text-[10px] font-black' : 'bg-muted text-muted-foreground text-[10px] font-bold'}>
                                                {getInitials(res.autor.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className={`text-[11px] font-black uppercase tracking-wider ${res.isAdminResponse ? 'text-brand-yellow' : 'text-foreground'}`}>
                                            {res.autor.name} {res.isAdminResponse && '(Gestor)'}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-medium opacity-50 italic">{formatDateTime(res.createdAt)}</span>
                                </div>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{res.conteudo}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="card-premium border-none shadow-macos-lg rounded-[24px] overflow-hidden bg-white">
            <CardHeader className="p-6 border-b border-black/[0.05] bg-black/[0.02]">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Métricas da Demanda</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-muted-foreground">Visualizações</span>
                    <span className="text-sm font-black">{demanda.visualizacoes}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-muted-foreground">Análise</span>
                    <span className="text-sm font-black">2 dias</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-black/5">
                    <span className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Atualizado em</span>
                    <span className="text-xs font-bold text-foreground">{formatDateTime(demanda.updatedAt).split(' ')[0]}</span>
                </div>
            </CardContent>
          </Card>
          
          <div className="bg-brand-green/10 rounded-2xl p-6 border border-brand-green/20">
            <h4 className="text-sm font-bold text-brand-dark mb-2">Próximos Passos</h4>
            <ul className="space-y-3">
                <li className="flex gap-2">
                    <div className="h-4 w-4 rounded-full bg-brand-green flex-shrink-0 mt-0.5 flex items-center justify-center">
                        <span className="text-[10px] text-white">1</span>
                    </div>
                    <p className="text-xs text-brand-dark/80">Análise técnica da viabilidade pela equipe de engenharia.</p>
                </li>
                <li className="flex gap-2">
                    <div className="h-4 w-4 rounded-full bg-muted-foreground/30 flex-shrink-0 mt-0.5 flex items-center justify-center">
                        <span className="text-[10px] text-white">2</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Definição de cronograma para implementação da melhoria.</p>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
