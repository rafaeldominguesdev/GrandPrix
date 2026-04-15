import { User } from './user';

export interface Resposta {
  id: string;
  conteudo: string;
  autor: User;
  isAdminResponse: boolean;
  demandaId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRespostaInput {
  conteudo: string;
  demandaId: string;
}
