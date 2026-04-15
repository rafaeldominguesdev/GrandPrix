import { StatusDemanda } from '@/types';
import { STATUS_DEMANDA } from '@/utils/constants';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: StatusDemanda;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_DEMANDA[status];
  
  if (!config) return <Badge variant="outline">{status}</Badge>;

  return (
    <Badge 
      variant="outline"
      className={cn(
        'px-2 py-0.5 rounded-full border-none font-semibold text-[11px] uppercase tracking-wider',
        className
      )}
      style={{
        backgroundColor: config.bg,
        color: config.color,
      }}
    >
      {config.label}
    </Badge>
  );
}
