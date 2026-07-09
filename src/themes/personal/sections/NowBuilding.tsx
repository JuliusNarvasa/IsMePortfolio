import { nowBuilding } from '../../../data/nowBuilding';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { Reveal } from '../../shared/Reveal';

export function NowBuilding() {
  return (
    <section
      id="building"
      className="py-section-tight px-6"
      aria-labelledby="section-building-title"
    >
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <SectionHeader
            eyebrow="05 — Now"
            title="Currently Building"
            description="Active threads. Updated as things ship."
          />
        </Reveal>

        <ul className="space-y-0">
          {nowBuilding.map((item, i) => (
            <Reveal
              key={item.title}
              as="li"
              delay={i * 100}
              className="flex items-baseline gap-6 border-b border-border py-3 transition-colors duration-fast hover:bg-bg-glass hover:rounded-md md:items-center"
            >
              <span className="flex-shrink-0 text-accent font-mono">→</span>
              <div className="flex-1">
                <span className="font-mono-lg text-text">{item.title}</span>
                <p className="font-mono-sm text-text-muted mt-1">{item.sub}</p>
              </div>
              <span className="font-mono-sm text-text-dim flex-shrink-0">
                {item.meta}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
