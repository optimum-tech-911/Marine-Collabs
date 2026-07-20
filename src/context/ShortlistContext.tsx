import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { creators } from '../data/creators';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Creator } from '../types';
import { trackEvent } from '../lib/analytics';

interface ShortlistContextValue {
  shortlist: Creator[];
  shortlistSlugs: string[];
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  toggleCreator: (slug: string) => void;
  removeCreator: (slug: string) => void;
  clearShortlist: () => void;
  hasCreator: (slug: string) => boolean;
  liveMessage: string;
}

const ShortlistContext = createContext<ShortlistContextValue | null>(null);

export function ShortlistProvider({ children }: PropsWithChildren) {
  const [shortlistSlugs, setShortlistSlugs] = useLocalStorage<string[]>('rni-shortlist-v5', (() => {
    try { return JSON.parse(window.localStorage.getItem('ncn-shortlist') ?? '[]') as string[]; }
    catch { return []; }
  })());
  const [isDrawerOpen, setDrawerOpenState] = useState(false);
  const [liveMessage, setLiveMessage] = useState('');

  const shortlist = useMemo(
    () => shortlistSlugs.map((slug) => creators.find((creator) => creator.slug === slug)).filter(Boolean) as Creator[],
    [shortlistSlugs],
  );

  const value = useMemo<ShortlistContextValue>(
    () => ({
      shortlist,
      shortlistSlugs,
      isDrawerOpen,
      setDrawerOpen: (open) => { setDrawerOpenState(open); if (open) trackEvent('shortlist_open', { shortlist_size: shortlistSlugs.length }); },
      toggleCreator: (slug) => {
        const creator = creators.find((item) => item.slug === slug);
        setShortlistSlugs((current) => {
          const removing = current.includes(slug);
          setLiveMessage(creator ? `${creator.displayName} ${removing ? 'retiré de' : 'ajouté à'} la sélection.` : 'Sélection mise à jour.');
          trackEvent(removing ? 'shortlist_remove' : 'shortlist_add', { creator_slug: slug, shortlist_size: removing ? current.length - 1 : current.length + 1 });
          return removing ? current.filter((item) => item !== slug) : [...current, slug];
        });
      },
      removeCreator: (slug) => {
        const creator = creators.find((item) => item.slug === slug);
        setShortlistSlugs((current) => current.filter((item) => item !== slug));
        setLiveMessage(creator ? `${creator.displayName} retiré de la sélection.` : 'Créateur retiré de la sélection.');
        trackEvent('shortlist_remove', { creator_slug: slug });
      },
      clearShortlist: () => { setShortlistSlugs([]); setLiveMessage('Sélection vidée.'); trackEvent('shortlist_clear'); },
      hasCreator: (slug) => shortlistSlugs.includes(slug),
      liveMessage,
    }),
    [isDrawerOpen, liveMessage, setShortlistSlugs, shortlist, shortlistSlugs],
  );

  return <ShortlistContext.Provider value={value}>{children}</ShortlistContext.Provider>;
}

export function useShortlist() {
  const context = useContext(ShortlistContext);
  if (!context) throw new Error('useShortlist must be used inside ShortlistProvider');
  return context;
}
