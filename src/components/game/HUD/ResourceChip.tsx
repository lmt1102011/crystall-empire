import type { LucideIcon } from 'lucide-react';

export function ResourceChip({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string | number }) {
  return (
    <span className="resource-chip">
      <Icon size={16} />
      <span>{label}</span>
      <b>{value}</b>
    </span>
  );
}
