export enum DemandaStatus {
  NOVA = "NOVA",
  EM_ANALISE = "EM_ANALISE",
  RESPONDIDA = "RESPONDIDA",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  RESOLVIDA = "RESOLVIDA",
}

export enum TipoBarreira {
  ARQUITETONICA = "arquitetonica",
  COMUNICACIONAL = "comunicacional",
  TECNOLOGICA = "tecnologica",
  TRANSPORTE = "transporte",
  INSTITUCIONAL = "institucional",
  ATITUDINAL = "atitudinal",
  CULTURAL = "cultural",
}

export const STATUS_CONFIG = {
  [DemandaStatus.NOVA]: {
    label: "Nova",
    color: "bg-slate-100 text-slate-700 border-slate-200",
  },
  [DemandaStatus.EM_ANALISE]: {
    label: "Em Análise",
    color: "bg-blue-50 text-blue-700 border-blue-100",
  },
  [DemandaStatus.EM_ANDAMENTO]: {
    label: "Em Andamento",
    color: "bg-amber-50 text-amber-700 border-amber-100",
  },
  [DemandaStatus.RESOLVIDA]: {
    label: "Resolvida",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  [DemandaStatus.RESPONDIDA]: {
    label: "Respondida",
    color: "bg-indigo-50 text-indigo-700 border-indigo-100",
  },
};

export const BARREIRA_LABELS: Record<TipoBarreira, string> = {
  [TipoBarreira.ARQUITETONICA]: "Arquitetônica",
  [TipoBarreira.COMUNICACIONAL]: "Comunicacional",
  [TipoBarreira.TECNOLOGICA]: "Tecnológica",
  [TipoBarreira.TRANSPORTE]: "Transporte",
  [TipoBarreira.INSTITUCIONAL]: "Institucional",
  [TipoBarreira.ATITUDINAL]: "Atitudinal",
  [TipoBarreira.CULTURAL]: "Cultural",
};
