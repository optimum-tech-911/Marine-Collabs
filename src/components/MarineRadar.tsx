export function MarineRadar({ className = '' }: { className?: string }) {
  return (
    <div className={`marine-radar ${className}`.trim()} aria-hidden="true">
      <span className="marine-radar__ring marine-radar__ring--outer" />
      <span className="marine-radar__ring marine-radar__ring--middle" />
      <span className="marine-radar__ring marine-radar__ring--inner" />
      <span className="marine-radar__axis marine-radar__axis--horizontal" />
      <span className="marine-radar__axis marine-radar__axis--vertical" />
      <span className="marine-radar__sweep" />
      <i className="marine-radar__blip marine-radar__blip--one" />
      <i className="marine-radar__blip marine-radar__blip--two" />
      <i className="marine-radar__blip marine-radar__blip--three" />
    </div>
  );
}
