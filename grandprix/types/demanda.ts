import { DemandaStatus, TipoBarreira } from '@/lib/constants';
import { User } from './user';
import { Resposta } from './resposta';

export type StatusDemanda = DemandaStatus;

export type PrioridadeDemanda = 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export interface Demanda {
  id: string;
  titulo: string;
  descricao: string;
  status: StatusDemanda;
  prioridade: PrioridadeDemanda;
  categoria: { id: string; nome: string };
  tipoBarreira: { id: string; slug: TipoBarreira; nome: string };
  unidade?: string;
  autor: User;
  respostas: Resposta[];
  votos: number;
  createdAt: string;
  updatedAt: string;
  coordinates?: [number, number];
}



export interface CreateDemandaInput {
  titulo: string;
  descricao: string;
  categoriaId: string;
  tipoBarreiraId: string;
  unidade?: string;
}

export interface UpdateDemandaInput {
  status?: StatusDemanda;
  prioridade?: PrioridadeDemanda;
  tags?: string[];
}
