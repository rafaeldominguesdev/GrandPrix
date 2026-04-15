export type TipoBarreiraSlug =
  | 'arquitetonica'
  | 'comunicacional'
  | 'tecnologica'
  | 'transporte'
  | 'institucional'
  | 'atitudinal'
  | 'cultural';

export interface TipoBarreira {
  id: string;
  slug: TipoBarreiraSlug;
  nome: string;
  descricao: string;
}
