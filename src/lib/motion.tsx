import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

/** Signature easing curve used across the site. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const MotionLink = motion.create(Link);

const VIEWPORT = { once: true, margin: '-60px' } as const;

/* ------------------------------------------------------------------ */
/* Reveal — single block that fades and rises when scrolled into view */
/* ------------------------------------------------------------------ */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

export function Reveal({ children, className, delay = 0, y = 26, duration = 0.8 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------- */
/* Stagger / StaggerItem — orchestrated group reveals for grids   */
/* ------------------------------------------------------------- */

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

export function Stagger({ children, className }: StaggerProps) {
  return (
    <motion.div className={className} variants={staggerParent} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
      {children}
    </motion.div>
  );
}

const staggerTags = {
  div: motion.div,
  article: motion.article,
  li: motion.li,
  span: motion.span,
} as const;

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof staggerTags;
}

export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const Tag = staggerTags[as];
  return (
    <Tag className={className} variants={staggerChild}>
      {children}
    </Tag>
  );
}

/* --------------------------------------------------------------- */
/* TextReveal — masked per-word rise for headlines (h1/h2)          */
/* --------------------------------------------------------------- */

export interface TextSegment {
  text: string;
  em?: boolean;
}

interface TextRevealProps {
  segments: TextSegment[];
  as?: 'h1' | 'h2';
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on viewport entry instead of on mount. */
  inView?: boolean;
}

export function TextReveal({ segments, as = 'h1', className, delay = 0, stagger = 0.05, inView = false }: TextRevealProps) {
  const reduce = useReducedMotion();
  const Tag = as;

  if (reduce) {
    return (
      <Tag className={className}>
        {segments.map((segment, index) =>
          segment.em ? <em key={index}>{segment.text} </em> : <span key={index}>{segment.text} </span>,
        )}
      </Tag>
    );
  }

  let wordIndex = -1;
  return (
    <Tag className={className}>
      {segments.map((segment, segmentIndex) => {
        const words = segment.text.split(/\s+/).filter(Boolean).map((word) => {
          wordIndex += 1;
          const trigger = inView
            ? { whileInView: { y: '0%' }, viewport: VIEWPORT }
            : { animate: { y: '0%' } };
          return (
            <Fragment key={`${segmentIndex}-${word}-${wordIndex}`}>
              <span className="tr-word">
                <motion.span
                  className="tr-word__inner"
                  initial={{ y: '112%' }}
                  {...trigger}
                  transition={{ duration: 0.85, ease: EASE, delay: delay + wordIndex * stagger }}
                >
                  {word}
                </motion.span>
              </span>{' '}
            </Fragment>
          );
        });
        return segment.em ? <em key={segmentIndex}>{words}</em> : words;
      })}
    </Tag>
  );
}

/* ------------------------------------------------------------ */
/* AnimatedStat — counts a formatted figure up when in view      */
/* ------------------------------------------------------------ */

interface AnimatedStatProps {
  /** Receives progress 0→1; returns the formatted string to display. */
  render: (t: number) => string;
  duration?: number;
  className?: string;
}

export function AnimatedStat({ render, duration = 1.9, className }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setProgress(1);
      return;
    }
    const controls = animate(0, 1, { duration, ease: EASE, onUpdate: setProgress });
    return () => controls.stop();
  }, [inView, reduce, duration]);

  return (
    <span ref={ref} className={className}>
      {render(reduce ? 1 : progress)}
    </span>
  );
}

/* --------------------------------------------------------------- */
/* Marquee — continuous auto-scrolling strip, pauses on hover and   */
/* renders as a static wrapped row for reduced-motion users         */
/* --------------------------------------------------------------- */

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
}

export function Marquee({ children, duration = 42, reverse = false, className }: MarqueeProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={`marquee marquee--static${className ? ` ${className}` : ''}`}>
        <div className="marquee__group">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`marquee${reverse ? ' marquee--reverse' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
    >
      <div className="marquee__track">
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
