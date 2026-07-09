import { infrastructure } from '../../../data/infrastructure';
import { TreeNode } from '../ui/TreeNode';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { Reveal } from '../../shared/Reveal';

export function Infrastructure() {
  // First 4 trees go in the 2x2 grid; cloud tree (last) spans full width below.
  const grid = infrastructure.slice(0, 4);
  const fullWidth = infrastructure.slice(4);

  return (
    <section
      id="infrastructure"
      className="py-section px-6"
      aria-labelledby="section-infra-title"
    >
      <div className="mx-auto max-w-content">
        <Reveal>
          <SectionHeader
            eyebrow="02 — Infrastructure"
            title="Infrastructure"
            description="Self-hosted across a Proxmox box at home and a cloud VPS."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {grid.map((tree, i) => (
            <Reveal
              key={tree.id}
              delay={i * 100}
              className="rounded-lg border border-border bg-bg-glass p-6 backdrop-blur-glass"
            >
              <h3 className="text-h5 uppercase tracking-widest text-text-muted mb-4">
                {tree.title}
              </h3>
              <div role="tree" aria-label={`${tree.title} infrastructure`}>
                <TreeNode node={tree.node} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Cloud row spans full width */}
        <div className="mt-6 grid grid-cols-1 gap-6">
          {fullWidth.map((tree, i) => (
            <Reveal
              key={tree.id}
              delay={400 + i * 100}
              className="rounded-lg border border-border bg-bg-glass p-6 backdrop-blur-glass"
            >
              <h3 className="text-h5 uppercase tracking-widest text-text-muted mb-4">
                {tree.title}
              </h3>
              <div role="tree" aria-label={tree.title}>
                <TreeNode node={tree.node} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
