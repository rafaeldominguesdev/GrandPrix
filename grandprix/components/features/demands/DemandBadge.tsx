import { Badge } from "@/components/ui/badge";
import { STATUS_CONFIG, DemandaStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface DemandBadgeProps {
  status: string;
}

export function DemandBadge({ status }: DemandBadgeProps) {
  const config = STATUS_CONFIG[status as DemandaStatus] || STATUS_CONFIG[DemandaStatus.NOVA];

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full uppercase text-[10px] font-black tracking-widest px-3 py-0.5",
        config.color
      )}
    >
      {config.label}
    </Badge>
  );
}
