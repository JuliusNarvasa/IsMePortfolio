import type { Status } from '../../shared/ui/StatusDot';

interface Props {
  name: string;
  description: string;
  status: Status;
  pulse?: boolean;
  meta?: string;
}

export function StatusRow({ name, description, status, pulse = false, meta }: Props) {
  const statusColor =
    status === 'online'
      ? 'bg-success'
      : status === 'standby'
        ? 'bg-warning'
        : 'bg-text-dim';
  const pulseRingColor =
    status === 'online'
      ? 'border-success'
      : status === 'standby'
        ? 'border-warning'
        : 'border-text-dim';

  return (
    <div className="status-row group grid grid-cols-[16px_auto_1fr_auto] items-center gap-3 rounded-md border border-transparent p-2.5 transition-all duration-fast ease-out-snappy hover:border-border hover:bg-bg-glass-strong md:grid-cols-[16px_auto_1fr_auto]">
      <span className={`relative inline-block h-2 w-2 rounded-full ${statusColor}`}>
        {pulse && (
          <span
            className={`absolute inset-[-4px] rounded-full border animate-pulse-ring ${pulseRingColor}`}
          />
        )}
      </span>
      <span className="font-mono text-text">{name}</span>
      <span className="text-body-sm text-text-muted hidden sm:inline">
        {description}
      </span>
      {meta && <span className="font-mono-sm text-text-dim">{meta}</span>}
    </div>
  );
}
