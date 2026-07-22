import { useEffect, useRef, useState } from 'react';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function CountUp({
  value,
  formatter = (current) => Math.round(current).toLocaleString('fr-FR'),
  className,
}: {
  value: number;
  formatter?: (value: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(prefersReducedMotion() ? value : 0);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) {
      setCurrent(value);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const startedAt = performance.now();
      const duration = 1100;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(value * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { rootMargin: '0px 0px -8% 0px' });

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref} className={className}>{formatter(current)}</span>;
}

export function CountUpText({ text, className }: { text: string; className?: string }) {
  const match = text.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return <span className={className}>{text}</span>;
  const value = Number(match[1]?.replace(',', '.'));
  const suffix = match[2] ?? '';
  const decimals = match[1]?.includes(',') || match[1]?.includes('.') ? 1 : 0;
  return <CountUp value={value} className={className} formatter={(current) => `${current.toFixed(decimals).replace('.', ',')}${suffix}`} />;
}
