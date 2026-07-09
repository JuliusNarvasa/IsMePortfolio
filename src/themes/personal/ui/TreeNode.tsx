import type { InfrastructureNode, InfrastructureStatus } from '../../../data/infrastructure';

interface Props {
  node: InfrastructureNode;
  depth?: number;
  isLast?: boolean;
}

function statusClass(status: InfrastructureStatus | undefined): string {
  switch (status) {
    case 'online':
      return 'bg-success';
    case 'standby':
      return 'bg-warning';
    case 'offline':
      return 'bg-text-dim';
    default:
      return '';
  }
}

export function TreeNode({ node, depth = 0, isLast = false }: Props) {
  const prefix = depth === 0 ? '' : isLast ? '└─' : '├─';
  const statusColor = statusClass(node.status);
  const hasChildren = !!node.children && node.children.length > 0;

  return (
    <div className="tree" style={{ ['--depth' as string]: depth }}>
      <div className="tree-row">
        {depth > 0 && <span className="tree-prefix">{prefix}</span>}
        {statusColor && (
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full flex-shrink-0 ${statusColor}`}
          />
        )}
        <span
          className={`tree-name flex-1${depth > 0 ? ' text-text-muted' : ''}`}
        >
          {node.label}
        </span>
      </div>
      {node.description && (
        <div
          className="tree-description"
          style={{
            paddingLeft: `calc(var(--depth, 0) * 16px + 16px + 24px)`,
          }}
        >
          {node.description}
        </div>
      )}
      {hasChildren &&
        node.children!.map((child, i) => (
          <TreeNode
            key={child.label}
            node={child}
            depth={depth + 1}
            isLast={i === node.children!.length - 1}
          />
        ))}
    </div>
  );
}
