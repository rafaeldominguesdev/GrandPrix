export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FilterOptions {
  status?: string;
  categoriaId?: string;
  tipoBarreiraId?: string;
  prioridade?: string;
  unidade?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}
