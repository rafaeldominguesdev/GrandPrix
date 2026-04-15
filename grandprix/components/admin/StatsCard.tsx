import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
  iconClassName?: string;
}

export function StatsCard({
  label,
  value,
  description,
  icon: Icon,
  trend,
  className,
  iconClassName,
}: StatsCardProps) {
  return (
    <Card className={cn('card-premium border-none shadow-macos relative overflow-hidden rounded-[20px] transition-all hover:shadow-macos-lg', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest leading-none">
              {label}
            </p>
            <h3 className="text-2xl font-black text-foreground">
              {value}
            </h3>
            {description && (
                <p className="text-xs text-muted-foreground font-medium">
                    {description}
                </p>
            )}
          </div>
          <div className={cn('p-3 rounded-xl bg-brand-light text-brand-green shadow-inner shrink-0', iconClassName)}>
            <Icon className="h-6 w-6" strokeWidth={2.5} />
          </div>
        </div>

        {trend && (
          <div className="mt-4 flex items-center gap-2 pt-4 border-t border-black/[0.05]">
            <span
              className={cn(
                'text-[10px] font-black px-2 py-0.5 rounded-full flex items-center',
                trend.isUp ? 'bg-green-100 text-brand-green' : 'bg-red-100 text-red-600'
              )}
            >
              {trend.isUp ? '↑' : '↓'} {trend.value}%
            </span>
            <span className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-widest leading-none">vs. mês anterior</span>
          </div>
        )}
      </CardContent>
      
      {/* Subtle branding accent */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-green via-brand-yellow to-transparent opacity-50" />
    </Card>
  );
}
