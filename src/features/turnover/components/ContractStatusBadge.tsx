import { Badge } from '@/shared/ui/badge';
import { ContractStatus } from '../types/move-in-list-types';

const STATUS_CONFIG: Record<ContractStatus, { label: string; variant: 'default' | 'success' | 'muted' }> = {
  upcoming: { label: 'V', variant: 'muted' },
  active: { label: 'Gällande', variant: 'success' },
  expired: { label: 'Upphört', variant: 'muted' },
};

interface ContractStatusBadgeProps {
  status?: ContractStatus;
}

export function ContractStatusBadge({ status }: ContractStatusBadgeProps) {
  if (!status || status === 'active') return <span className="text-muted-foreground">–</span>;
  const config = STATUS_CONFIG[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
