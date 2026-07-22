import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocale } from '../i18n/locale';
import { toEnglish } from '../i18n/english-copy';

const translatedAttributes = ['aria-label', 'placeholder', 'title', 'alt'] as const;

function translateTree(root: ParentNode) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (!node.parentElement?.closest('script, style, textarea')) {
      const next = toEnglish(node.textContent ?? '');
      if (next !== node.textContent) node.textContent = next;
    }
    node = walker.nextNode();
  }
  if (root instanceof Element) {
    [root, ...root.querySelectorAll('*')].forEach((element) => translatedAttributes.forEach((name) => {
      const value = element.getAttribute(name);
      if (value) element.setAttribute(name, toEnglish(value));
    }));
  }
}

export function DocumentLocalization() {
  const { locale } = useLocale();
  const location = useLocation();
  useLayoutEffect(() => {
    if (locale !== 'en') return;
    translateTree(document.body);
    const observer = new MutationObserver((mutations) => mutations.forEach((mutation) => {
      if (mutation.type === 'characterData' && mutation.target.parentNode) translateTree(mutation.target.parentNode);
      mutation.addedNodes.forEach((node) => { if (node instanceof Element) translateTree(node); });
    }));
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [locale, location.pathname]);
  return null;
}
