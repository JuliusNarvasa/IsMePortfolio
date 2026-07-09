interface Props {
  label: string;
  value: string;
  href?: string;
}

/**
 * Generic handle row used by Personal and Business contact sections.
 * Visual: label (small caps, dim) on the left, value (mono) on the right.
 * On hover, links change color to the theme's accent.
 */
export function HandleRow({ label, value, href }: Props) {
  return (
    <div className="flex items-baseline gap-6 border-b border-border py-3">
      <dt className="w-24 flex-shrink-0 font-mono text-text-dim uppercase tracking-widest">
        {label}
      </dt>
      <dd className="font-mono-lg text-text">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-fast hover:text-accent-hover hover:underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
