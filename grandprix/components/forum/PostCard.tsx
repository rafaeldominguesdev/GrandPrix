'use client';

import { Demanda } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { CategoryTag } from './CategoryTag';
import { formatDate } from '@/utils/formatters';
import { MessageSquare, Eye, MapPin, ChevronRight, AlertCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/utils/formatters';
import Link from 'next/link';
import { PRIORIDADE_DEMANDA } from '@/utils/constants';

interface PostCardProps {
  demanda: Demanda;
}

export function PostCard({ demanda }: PostCardProps) {
  const prioridade = PRIORIDADE_DEMANDA[demanda.prioridade];

  return (
    <Card className="card-premium flex flex-col h-full overflow-hidden group border-none shadow-macos transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:shadow-macos-lg hover:-translate-y-2 animate-fade-in">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-4 mb-3">
          <CategoryTag categoria={demanda.categoria} />
          <StatusBadge status={demanda.status} />
        </div>
        <Link href={`/demandas/${demanda.id}`} className="group/title">
          <h3 className="text-lg font-bold leading-tight text-foreground group-hover/title:text-brand-green transition-colors line-clamp-2">
            {demanda.titulo}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="p-5 pt-0 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {demanda.descricao}
        </p>

        <div className="flex flex-wrap gap-y-2 gap-x-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <MapPin className="h-3.5 w-3.5 text-brand-green" />
            {demanda.unidade}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest" style={{ color: prioridade?.slug === 'urgente' ? 'var(--brand-green)' : 'var(--muted-foreground)' }}>
            <AlertCircle className="h-3.5 w-3.5" />
            {prioridade?.label}
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-5 py-4 bg-black/[0.02] border-t border-black/[0.05] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="font-bold">{demanda.respostas.length}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Eye className="h-3.5 w-3.5" />
            <span className="font-bold">{demanda.visualizacoes}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right mr-1">
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black leading-none mb-0.5">Postado em</p>
            <p className="text-xs font-bold text-foreground">{formatDate(demanda.createdAt)}</p>
          </div>
          <Avatar className="h-8 w-8 border-2 border-white shadow-sm ring-1 ring-black/[0.05]">
            <AvatarFallback className="bg-brand-green text-white text-[10px] font-black uppercase">
              {getInitials(demanda.autor.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardFooter>

      {/* Hover action indicator */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all p-2 pr-4">
          <div className="bg-brand-green p-1.5 rounded-l-full text-white shadow-macos">
            <ChevronRight className="h-5 w-5 stroke-[3]" />
          </div>
      </div>
    </Card>
  );
}
