import { Categoria } from '@/types';
import { cn } from '@/lib/utils';
import { Accessibility, Users, Settings, MessageCircle, Cpu, Building, MoreHorizontal } from 'lucide-react';

const icons: Record<string, any> = {
  accessibility: Accessibility,
  users: Users,
  settings: Settings,
  'message-circle': MessageCircle,
  cpu: Cpu,
  building: Building,
  'more-horizontal': MoreHorizontal,
};

interface CategoryTagProps {
  categoria: Categoria;
  className?: string;
}

export function CategoryTag({ categoria, className }: CategoryTagProps) {
  const Icon = icons[categoria.icone || 'more-horizontal'] || MoreHorizontal;

  return (
    <div 
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border',
        className
      )}
      style={{
        backgroundColor: `${categoria.cor}10`, // 10% opacity
        color: categoria.cor,
        borderColor: `${categoria.cor}30`,
      }}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
      {categoria.nome}
    </div>
  );
}
