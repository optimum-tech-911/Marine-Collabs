import { ArrowUpRight, Command, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDialogA11y } from '../hooks/useDialogA11y';
import { Link } from 'react-router-dom';
import { creators } from '../data/creators';
import { categoryFr } from '../lib/category';
import { formatCompact } from '../lib/format';

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  useDialogA11y(open, dialogRef, onClose, inputRef);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return creators.slice(0, 6);
    return creators.filter((creator) => [
      creator.displayName,
      creator.handle,
      creator.profileLabel,
      creator.headline,
      creator.shortBio,
      ...creator.categories,
      ...creator.brandFit,
      ...creator.operatingRegions,
    ].join(' ').toLowerCase().includes(normalized)).slice(0, 8);
  }, [query]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="command-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
          <motion.section ref={dialogRef} tabIndex={-1} className="command-dialog" initial={{ opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .99 }} transition={{ duration: .2 }} role="dialog" aria-modal="true" aria-label="Rechercher un créateur">
            <header className="command-dialog__header">
              <Search size={19} />
              <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nom, spécialité, région ou secteur…" aria-label="Rechercher un créateur" />
              <button type="button" onClick={onClose} aria-label="Fermer la recherche"><X size={19} /></button>
            </header>
            <div className="command-dialog__meta"><span>{query ? `${results.length} résultat${results.length > 1 ? 's' : ''}` : 'Profils recommandés'}</span><span><Command size={13}/> K pour ouvrir</span></div>
            <div className="command-results">
              {results.map((creator) => (
                <Link to={`/creators/${creator.slug}`} key={creator.slug} onClick={onClose}>
                  <img src={creator.image} alt="" />
                  <span className="command-results__copy"><strong>{creator.displayName}</strong><small>{creator.handle} · {creator.categories[0] ? categoryFr(creator.categories[0]) : 'Créateur maritime'}</small></span>
                  <span className="command-results__reach">{formatCompact(creator.followers)}<small>abonnés</small></span>
                  <ArrowUpRight size={17}/>
                </Link>
              ))}
              {!results.length ? <div className="command-empty"><strong>Aucun profil trouvé.</strong><span>Essayez une spécialité comme voile, plongée, surf ou achat bateau.</span></div> : null}
            </div>
            <footer className="command-dialog__footer"><span>Entrée pour ouvrir</span><span>Échap pour fermer</span></footer>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
