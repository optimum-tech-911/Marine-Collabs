import { ArrowUpRight, Menu, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useShortlist } from '../context/ShortlistContext';
import { GlobalSearch } from './GlobalSearch';
import { Logo } from './Logo';

const navigation = [
  { to: '/creators', label: 'Créateurs' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/for-brands', label: 'Pour les marques' },
  { to: '/about', label: 'À propos' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { shortlist, setDrawerOpen } = useShortlist();
  const location = useLocation();
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
            <button className="header-search" type="button" onClick={() => setSearchOpen(true)} aria-label="Rechercher un créateur" aria-haspopup="dialog"><Search size={17} /><span>⌘K</span></button>
            <button className="shortlist-trigger" type="button" onClick={() => setDrawerOpen(true)} aria-haspopup="dialog" aria-controls="shortlist-dialog" aria-label={`Ouvrir la sélection, ${shortlist.length} profil${shortlist.length > 1 ? 's' : ''}`}>Sélection <span>{shortlist.length}</span></button>
            <Link className="button button--small button--dark desktop-cta" to="/campaign-builder">Créer une campagne <ArrowUpRight size={15}/></Link>
            <button className="mobile-menu-button" type="button" onClick={() => setMobileOpen((value) => !value)} aria-expanded={mobileOpen} aria-label={mobileOpen ? 'Fermer la navigation' : 'Ouvrir la navigation'}>{mobileOpen ? <X size={22}/> : <Menu size={22}/>}</button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen ? <motion.div className="mobile-nav" initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:.22}}>
            <nav className="container" aria-label="Navigation mobile">
              <button className="mobile-search-link" type="button" onClick={() => { setMobileOpen(false); setSearchOpen(true); }}><Search size={18}/> Rechercher un créateur</button>
              {navigation.map((item)=><NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}
              <Link className="button button--primary" to="/campaign-builder">Créer une campagne <ArrowUpRight size={16}/></Link>
            </nav>
          </motion.div> : null}
        </AnimatePresence>
      </header>
      <GlobalSearch open={searchOpen} onClose={closeSearch}/>
    </>
  );
}
