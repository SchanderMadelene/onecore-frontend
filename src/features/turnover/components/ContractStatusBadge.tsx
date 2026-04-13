import { Badge } from '@/shared/ui/badge';
import { ContractStatus } from '../types/move-in-list-types';

const STATUS_CONFIG: Record<ContractStatus, { label: string; variant: 'default' | 'success' | 'muted' }> = {
  upcoming: { label: 'V', variant: 'muted' },
  active: { label: 'A', variant: 'muted' },
  expired: { label: 'U', variant: 'muted' },
};

interface ContractStatusBadgeProps {
  status?: ContractStatus;
}

export function ContractStatusBadge({ status }: ContractStatusBadgeProps) {
  if (!status) return <span className="text-muted-foreground">–</span>;
  const config = STATUS_CONFIG[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
