import { StatusDemanda, PrioridadeDemanda } from '@/types';
import { TipoBarreiraSlug } from '@/types/barreira';

// ── Status das demandas ──────────────────────────────────────────────────────
export const STATUS_DEMANDA: Record<
  StatusDemanda,
  { label: string; color: string; bg: string }
> = {
  NOVA:         { label: 'Nova',         color: '#6B7280', bg: '#F3F4F6' },
  EM_ANALISE:   { label: 'Em Análise',   color: '#2563EB', bg: '#EFF6FF' },
  RESPONDIDA:   { label: 'Respondida',   color: '#9333EA', bg: '#F5F3FF' },
  EM_ANDAMENTO: { label: 'Em Andamento', color: '#D97706', bg: '#FFFBEB' },
  RESOLVIDA:    { label: 'Resolvida',    color: '#16A34A', bg: '#F0FDF4' },
};

// ── Prioridade das demandas ──────────────────────────────────────────────────
export const PRIORIDADE_DEMANDA: Record<
  PrioridadeDemanda,
  { label: string; color: string }
> = {
  BAIXA:   { label: 'Baixa',   color: '#6B7280' },
  MEDIA:   { label: 'Média',   color: '#2563EB' },
  ALTA:    { label: 'Alta',    color: '#D97706' },
  URGENTE: { label: 'Urgente', color: '#DC2626' },
};

// ── Tipos de barreira ────────────────────────────────────────────────────────
export const TIPOS_BARREIRA: Array<{
  slug: TipoBarreiraSlug;
  nome: string;
  descricao: string;
}> = [
  { slug: 'arquitetonica',  nome: 'Arquitetônica',  descricao: 'Barreiras físicas no ambiente' },
  { slug: 'comunicacional', nome: 'Comunicacional', descricao: 'Dificuldades de comunicação' },
  { slug: 'tecnologica',    nome: 'Tecnológica',    descricao: 'Problemas com sistemas e ferramentas' },
  { slug: 'transporte',     nome: 'Transporte',     descricao: 'Dificuldades de locomoção' },
  { slug: 'institucional',  nome: 'Institucional',  descricao: 'Barreiras em normas e processos' },
  { slug: 'atitudinal',     nome: 'Atitudinal',     descricao: 'Comportamentos e atitudes' },
  { slug: 'cultural',       nome: 'Cultural',       descricao: 'Questões culturais e de diversidade' },
];

// ── Categorias padrão ────────────────────────────────────────────────────────
export const CATEGORIAS_DEFAULT = [
  { id: '1', nome: 'Acessibilidade',      cor: '#009B3A', icone: 'accessibility' },
  { id: '2', nome: 'Inclusão',            cor: '#FEDF00', icone: 'users' },
  { id: '3', nome: 'Processos Internos',  cor: '#2563EB', icone: 'settings' },
  { id: '4', nome: 'Comunicação',         cor: '#9333EA', icone: 'message-circle' },
  { id: '5', nome: 'Tecnologia',          cor: '#D97706', icone: 'cpu' },
  { id: '6', nome: 'Infraestrutura',      cor: '#DC2626', icone: 'building' },
  { id: '7', nome: 'Outros',              cor: '#6B7280', icone: 'more-horizontal' },
];

// ── Unidades / Filiais ───────────────────────────────────────────────────────
export const UNIDADES = [
  'Sede Rio de Janeiro',
  'Sede São Paulo',
  'Refinaria REDUC',
  'Refinaria REPLAN',
  'Refinaria REVAP',
  'E&P Bacia de Santos',
  'E&P Bacia de Campos',
  'Outras',
];

// ── Paginação padrão ─────────────────────────────────────────────────────────
export const PAGE_SIZE_DEFAULT = 10;
