import { Info } from 'lucide-react';

interface MetricCardProps {
  value: string;
  label: string;
  note?: string;
  tone?: 'light' | 'dark';
}

export function MetricCard({ value, label, note, tone = 'light' }: MetricCardProps) {
  return (
    <article className={`metric-card metric-card--${tone}`}>
      <strong>{value}</strong>
      <span>{label}</span>
      {note ? (
        <span className="metric-note" title={note}>
          <Info size={14} aria-hidden="true" />
          Methodology
        </span>
      ) : null}
    </article>
  );
}
