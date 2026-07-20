import { ArrowRight, Columns3, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useShortlist } from '../context/ShortlistContext';
import { useDialogA11y } from '../hooks/useDialogA11y';
import { formatCompact } from '../lib/format';

export function ShortlistDrawer() {
  const { shortlist, isDrawerOpen, setDrawerOpen, removeCreator, clearShortlist } = useShortlist();
  const drawerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setDrawerOpen(false), [setDrawerOpen]);
  useDialogA11y(isDrawerOpen, drawerRef, close, closeRef);

  return (
    <AnimatePresence>
      {isDrawerOpen ? (
        <>
          <motion.button
            type="button"
            className="drawer-backdrop"
            aria-label="Fermer la sélection"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            ref={drawerRef}
            tabIndex={-1}
            id="shortlist-dialog"
            className="shortlist-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortlist-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          >
            <div className="drawer-header">
              <div>
                <p className="eyebrow">SÉLECTION DE CAMPAGNE</p>
                <h2 id="shortlist-title">{shortlist.length} créateur{shortlist.length > 1 ? 's' : ''} sélectionné{shortlist.length > 1 ? 's' : ''}</h2>
              </div>
              <button ref={closeRef} className="icon-button" type="button" onClick={close} aria-label="Fermer"><X size={20}/></button>
            </div>

            <div className="drawer-content">
              {shortlist.length ? (
                <>
                  <div className="shortlist-list">
                    {shortlist.map((creator) => (
                      <article key={creator.slug} className="shortlist-item">
                        <img src={creator.image} alt=""/>
                        <div><strong>{creator.displayName}</strong><span>{creator.handle}</span><small>{formatCompact(creator.followers)} abonnés</small></div>
                        <button type="button" className="icon-button" onClick={() => removeCreator(creator.slug)} aria-label={`Retirer ${creator.displayName}`}><X size={17}/></button>
                      </article>
                    ))}
                  </div>
                  <div className="drawer-secondary-actions"><Link className="text-button" to="/selection" onClick={close}><Columns3 size={15}/> Comparer les profils</Link><button className="text-button danger" type="button" onClick={clearShortlist}><Trash2 size={15}/> Vider la sélection</button></div>
                </>
              ) : (
                <div className="drawer-empty">
                  <span>00</span>
                  <h3>Votre sélection est vide.</h3>
                  <p>Explorez le réseau et ajoutez les profils dont l’audience, l’expertise et le style correspondent à votre brief.</p>
                  <Link className="button button--dark" to="/creators" onClick={close}>Explorer les créateurs</Link>
                </div>
              )}
            </div>

            <div className="drawer-footer">
              <Link
                className={`button button--primary button--block${shortlist.length ? '' : ' button--disabled'}`}
                to={shortlist.length ? '/campaign-builder' : '#'}
                aria-disabled={!shortlist.length}
                onClick={(event) => {
                  if (!shortlist.length) event.preventDefault();
                  else close();
                }}
              >
                Continuer avec cette sélection <ArrowRight size={17}/>
              </Link>
              <p>Les coordonnées privées des créateurs ne sont pas exposées. L’agence reste votre point de contact.</p>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
