import { StatusDemanda, PrioridadeDemanda } from '@/types';
import { STATUS_DEMANDA, PRIORIDADE_DEMANDA } from './constants';

/**
 * Formata uma data para o padrão brasileiro
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Formata data com hora
 */
export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

/**
 * Formata data relativa (ex: "há 2 horas")
 */
export function formatRelative(date: Date | string): string {
  const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
  const now = new Date();
  const then = new Date(date);
  const diffMs = then.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  if (Math.abs(diffMins) < 60) return rtf.format(diffMins, 'minute');
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, 'hour');
  return rtf.format(diffDays, 'day');
}

/**
 * Retorna label legível do status
 */
export function getStatusLabel(status: StatusDemanda): string {
  return STATUS_DEMANDA[status]?.label ?? status;
}

/**
 * Retorna label legível da prioridade
 */
export function getPrioridadeLabel(prioridade: PrioridadeDemanda): string {
  return PRIORIDADE_DEMANDA[prioridade]?.label ?? prioridade;
}

/**
 * Trunca texto longo com reticências
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Gera iniciais do nome para avatar
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}
