import type { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
}

export function SectionHeader({ eyebrow, title, description, action, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={`section-header section-header--${align}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description ? <p className="section-description">{description}</p> : null}
      </div>
      {action ? <div className="section-action">{action}</div> : null}
    </div>
  );
}
