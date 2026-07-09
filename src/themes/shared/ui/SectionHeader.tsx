interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  /** Optional max-width override (defaults to `max-w-prose`). */
  descriptionMaxWidth?: string;
  /** Optional className for the outer wrapper. */
  className?: string;
}

/**
 * Standard section header pattern: small caps accent eyebrow + h2 title +
 * optional description. Used across Personal and Business themes.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  descriptionMaxWidth = 'max-w-prose',
  className = 'mb-12',
}: Props) {
  return (
    <div className={className}>
      <p className="text-h5 uppercase tracking-widest text-accent mb-3">{eyebrow}</p>
      <h2 className="text-h2 text-text mb-3">{title}</h2>
      {description && (
        <p className={`text-body-lg text-text-muted ${descriptionMaxWidth}`}>
          {description}
        </p>
      )}
    </div>
  );
}
