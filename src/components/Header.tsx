import { ArrowUpRight, Menu, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useShortlist } from '../context/ShortlistContext';
import { GlobalSearch } from './GlobalSearch';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLocalizedPath, useLocale } from '../i18n/locale';
import type { RouteKey } from '../i18n/routes';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { shortlist, setDrawerOpen } = useShortlist();
  const location = useLocation();
  const path = useLocalizedPath();
  const { locale } = useLocale();
  const copy: { navigation: [RouteKey, string][]; search: string; shortlist: string; campaign: string; open: string; close: string } = locale === 'fr' ? {
    navigation: [['creators', 'Créateurs'], ['solutions', 'Solutions'], ['brands', 'Pour les marques'], ['about', 'À propos']],
    search: 'Rechercher un créateur', shortlist: 'Sélection', campaign: 'Créer une campagne', open: 'Ouvrir la navigation', close: 'Fermer la navigation',
  } : {
    navigation: [['creators', 'Creators'], ['solutions', 'Solutions'], ['brands', 'For brands'], ['about', 'About']],
    search: 'Search creators', shortlist: 'Shortlist', campaign: 'Build a campaign', open: 'Open navigation', close: 'Close navigation',
  };
  const navigation = copy.navigation.map(([key, label]) => ({ to: path(key), label }));
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', shortcut);
    return () => document.removeEventListener('keydown', shortcut);
  }, []);

  return (
    <>
      <header className="site-header rni-header">
        <div className="site-header__inner container">
          <Logo />
          <nav className="desktop-nav" aria-label="Navigation principale">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>{item.label}</NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <LanguageSwitcher />
            <button className="header-search" type="button" onClick={() => setSearchOpen(true)} aria-label={copy.search} aria-haspopup="dialog"><Search size={17} /><span>⌘K</span></button>
            <button className="shortlist-trigger" type="button" onClick={() => setDrawerOpen(true)} aria-haspopup="dialog" aria-controls="shortlist-dialog" aria-label={`${copy.shortlist}, ${shortlist.length}`}>{copy.shortlist} <span>{shortlist.length}</span></button>
            <Link className="button button--small button--dark desktop-cta" to={path('campaign')}>{copy.campaign} <ArrowUpRight size={15}/></Link>
            <button className="mobile-menu-button" type="button" onClick={() => setMobileOpen((value) => !value)} aria-expanded={mobileOpen} aria-label={mobileOpen ? copy.close : copy.open}>{mobileOpen ? <X size={22}/> : <Menu size={22}/>}</button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen ? <motion.div className="mobile-nav" initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:.22}}>
            <nav className="container" aria-label="Navigation mobile">
              <button className="mobile-search-link" type="button" onClick={() => { setMobileOpen(false); setSearchOpen(true); }}><Search size={18}/> {copy.search}</button>
              {navigation.map((item)=><NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}
              <Link className="button button--primary" to={path('campaign')}>{copy.campaign} <ArrowUpRight size={16}/></Link>
            </nav>
          </motion.div> : null}
        </AnimatePresence>
      </header>
      <GlobalSearch open={searchOpen} onClose={closeSearch}/>
    </>
  );
}
