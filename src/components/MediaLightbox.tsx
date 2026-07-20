import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useDialogA11y } from '../hooks/useDialogA11y';

export function MediaLightbox({
  items,
  index,
  onIndexChange,
  onClose,
  creatorName,
}: {
  items: string[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  creatorName: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null;
  useDialogA11y(open, dialogRef, onClose, closeRef);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && index !== null) onIndexChange((index + 1) % items.length);
      if (event.key === 'ArrowLeft' && index !== null) onIndexChange((index - 1 + items.length) % items.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, items.length, onIndexChange, open]);

  return (
    <AnimatePresence>
      {open && index !== null ? (
        <motion.div ref={dialogRef} tabIndex={-1} className="media-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={`Galerie de ${creatorName}`}>
          <button ref={closeRef} className="media-lightbox__close" type="button" onClick={onClose} aria-label="Fermer la galerie"><X size={21}/></button>
          <button className="media-lightbox__nav media-lightbox__nav--prev" type="button" onClick={() => onIndexChange((index - 1 + items.length) % items.length)} aria-label="Média précédent"><ChevronLeft size={24}/></button>
          <motion.figure key={`${items[index]}-${index}`} initial={{ opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .22 }}>
            <img src={items[index]} alt={`Aperçu éditorial ${index + 1} de ${creatorName}`} />
            <figcaption>{creatorName} · {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</figcaption>
          </motion.figure>
          <button className="media-lightbox__nav media-lightbox__nav--next" type="button" onClick={() => onIndexChange((index + 1) % items.length)} aria-label="Média suivant"><ChevronRight size={24}/></button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
