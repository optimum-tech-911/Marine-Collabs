import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollMotion() {
  const location = useLocation();

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('#main-content > section, #main-content > main, #main-content > div > section'));
    const observer = reduced ? null : new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in-view');
        observer?.unobserve(entry.target);
      }
    }, { threshold: .08, rootMargin: '0px 0px -8% 0px' });

    sections.forEach((section, index) => {
      section.classList.add('scroll-section-enter');
      section.style.setProperty('--section-enter-x', `${index % 2 ? 18 : -18}px`);
      if (reduced) section.classList.add('is-in-view');
      else observer?.observe(section);
    });

    return () => observer?.disconnect();
  }, [location.pathname]);

  return null;
}
