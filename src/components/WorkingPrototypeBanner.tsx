import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { brand } from '../config/brand';

const storageKey = 'rni-prototype-notice-dismissed';

export function WorkingPrototypeBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try { return window.localStorage.getItem(storageKey) === 'true'; }
    catch { return false; }
  });

  if (!brand.isWorkingPrototype || dismissed) return null;

  const dismiss = () => {
    try { window.localStorage.setItem(storageKey, 'true'); } catch { /* Storage can be unavailable in private contexts. */ }
    setDismissed(true);
  };

  return (
    <aside className="working-prototype-banner" aria-label="Avertissement sur les visuels de démonstration">
      <div className="container">
        <AlertTriangle size={15}/>
        <p><strong>Prototype éditorial.</strong> Les images de démonstration ne constituent pas des portraits officiels des créateurs. Remplacez-les par des médias approuvés avant publication commerciale.</p>
        <button type="button" onClick={dismiss} aria-label="Masquer cet avertissement"><X size={15}/></button>
      </div>
    </aside>
  );
}
