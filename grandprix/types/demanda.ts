import { User } from './user';
import { Categoria } from './categoria';
import { TipoBarreira } from './barreira';
import { Resposta } from './resposta';

export type StatusDemanda =
  | 'NOVA'
  | 'EM_ANALISE'
  | 'RESPONDIDA'
  | 'EM_ANDAMENTO'
  | 'RESOLVIDA';

export type PrioridadeDemanda = 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export interface Demanda {
  id: string;
  titulo: string;
  descricao: string;
  status: StatusDemanda;
  prioridade: PrioridadeDemanda;
  categoria: Categoria;
  tipoBarreira: TipoBarreira;
  unidade?: string;
  autor: User;
  respostas: Resposta[];
  tags?: string[];
  visualizacoes: number;
  createdAt: Date;
  updatedAt: Date;
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
