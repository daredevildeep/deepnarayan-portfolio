import { cn } from '../lib/utils'

/**
 * Standard section shell: id anchor, padding, container, and a
 * mission-briefing header (eyebrow + title + optional index).
 */
export default function Section({
  id,
  ariaLabel,
  eyebrow,
  title,
  index,
  children,
  className,
  headerClassName,
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('section-pad relative', className)}
    >
      <div className="container-content">
        {(eyebrow || title) && (
          <header className={cn('mb-10 md:mb-16', headerClassName)}>
            <div className="flex items-center gap-3">
              {index && (
                <span className="font-mono text-xs text-accent-glow/60">
                  {index}
                </span>
              )}
              {eyebrow && <span className="eyebrow">{eyebrow}</span>}
              <span className="h-px flex-1 bg-[var(--border-dim)]" />
            </div>
            {title && <h2 className="section-title mt-4">{title}</h2>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
