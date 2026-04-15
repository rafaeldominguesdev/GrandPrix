export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  unit?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser extends User {
  token: string;
}
