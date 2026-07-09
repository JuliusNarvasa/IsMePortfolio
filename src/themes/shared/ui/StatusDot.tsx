export type Status = 'online' | 'standby' | 'offline';

interface Props {
  status: Status;
  pulse?: boolean;
  size?: 'sm' | 'md';
}

/**
 * Colored status dot. Token-driven — uses `bg-success`, `bg-warning`,
 * `bg-text-dim` so the dot picks up the active theme's color tokens.
 */
export function StatusDot({ status, pulse = false, size = 'md' }: Props) {
  const sizeClass = size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2';
  const statusColor =
    status === 'online'
      ? 'bg-success'
      : status === 'standby'
        ? 'bg-warning'
        : 'bg-[var(--text-dim)]';
  const pulseRingColor =
    status === 'online'
      ? 'border-success'
      : status === 'standby'
        ? 'border-warning'
        : 'border-[var(--text-dim)]';

  return (
    <span className={`relative inline-block ${sizeClass}`}>
      <span
        className={`absolute inline-flex h-full w-full rounded-full ${statusColor}${
          pulse ? ' animate-pulse-dot' : ''
        }`}
      />
      {pulse && (
        <span
          className={`absolute inset-[-4px] rounded-full border ${pulseRingColor} animate-pulse-ring`}
        />
      )}
    </span>
  );
}
