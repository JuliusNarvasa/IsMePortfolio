import { SectionHeader } from '../../shared/ui/SectionHeader';
import { StatusDot } from '../../shared/ui/StatusDot';
import { StatusRow } from '../ui/StatusRow';
import { Reveal } from '../../shared/Reveal';

const inferenceItems = [
  { name: 'llama.cpp', description: 'Local LLM server, Vulkan + ROCm backends', status: 'online' as const, pulse: true, meta: 'b9106' },
  { name: 'Qwen3.6-35B-A3B', description: 'MoE model, 3B active params', status: 'online' as const, meta: 'Q4_K_M' },
  { name: 'AMD ROCm / HIP', description: 'Native HIP backend on RX 7800 XT', status: 'online' as const, meta: 'gfx1101' },
];

const visionItems = [
  { name: 'ComfyUI', description: 'Image gen workflow server', status: 'online' as const, pulse: true, meta: 'ROCm' },
  { name: 'Chroma1-HD', description: 'FLUX-based diffusion, pruned', status: 'online' as const, meta: 'Q6_K' },
];

export function AILab() {
  return (
    <section
      id="ai-lab"
      className="py-section px-6"
      aria-labelledby="section-ailab-title"
    >
      <div className="mx-auto max-w-content">
        <Reveal>
          <SectionHeader
            eyebrow="03 — AI Lab"
            title="AI Lab"
            description="Local inference and computer vision experiments."
          />
        </Reveal>

        {/* Status banner */}
        <Reveal
          delay={80}
          className="mb-6 flex items-center gap-3 rounded-lg border border-border bg-bg-glass p-3.5 backdrop-blur-glass"
        >
          <StatusDot status="online" pulse={true} />
          <span className="font-mono text-text">
            Online — local inference ready
          </span>
        </Reveal>

        {/* Lab panel */}
        <Reveal
          delay={160}
          className="rounded-lg border border-border bg-bg-glass p-6 backdrop-blur-glass"
        >
          {/* Inference subsection */}
          <h3 className="text-h5 uppercase tracking-widest text-text-muted mb-3 mt-0">
            Inference
          </h3>
          <div className="space-y-0.5">
            {inferenceItems.map((item) => (
              <StatusRow key={item.name} {...item} />
            ))}
          </div>

          {/* Vision subsection */}
          <h3 className="text-h5 uppercase tracking-widest text-text-muted mb-3 mt-6">
            Vision
          </h3>
          <div className="space-y-0.5">
            {visionItems.map((item) => (
              <StatusRow key={item.name} {...item} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
