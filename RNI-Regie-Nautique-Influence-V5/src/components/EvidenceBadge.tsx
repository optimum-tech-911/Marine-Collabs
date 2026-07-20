import type { MetricEvidence } from '../types';
const labels: Record<MetricEvidence,string> = { verified:'Vérifié sur 30 jours','visible-sample':'Échantillon visible',estimated:'Estimation indicative' };
export function EvidenceBadge({evidence}:{evidence:MetricEvidence}) { return <span className={`evidence-badge evidence-badge--${evidence}`}>{labels[evidence]}</span>; }
