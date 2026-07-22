import { ArrowUpRight, BriefcaseBusiness, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brand } from '../config/brand';
import { ContactLink } from './ContactLink';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLocalizedPath, useLocale } from '../i18n/locale';

export function Footer() {
  const path = useLocalizedPath();
  const { locale } = useLocale();
  const fr = locale === 'fr';
  return <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-intro"><Logo inverse/><h2>{fr ? 'Intégrez votre marque naturellement dans le contenu des créateurs.' : 'Integrate your brand naturally into creator content.'}</h2><ContactLink className="button button--light" placement="footer_contact">{fr ? 'Parler à Adrien' : 'Talk to Adrien'} <ArrowUpRight size={17}/></ContactLink></div>
      <div className="footer-links">
        <div><p className="footer-label">{fr ? 'Explorer' : 'Explore'}</p><Link to={path('creators')}>{fr ? 'Réseau de créateurs' : 'Creator network'}</Link><Link to={path('solutions')}>Solutions</Link><Link to={path('brands')}>{fr ? 'Pour les marques' : 'For brands'}</Link><Link to={path('join')}>{fr ? 'Rejoindre le réseau' : 'Join the network'}</Link><Link to={path('selection')}>{fr ? 'Comparer ma sélection' : 'Compare my shortlist'}</Link></div>
        <div><p className="footer-label">{fr ? 'Agence' : 'Agency'}</p><Link to={path('about')}>{fr ? 'À propos' : 'About'}</Link><Link to={path('methodology')}>{fr ? 'Méthodologie & sources' : 'Methodology & sources'}</Link><a href={brand.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp Business</a><a href={`mailto:${brand.email}`}>{brand.email}</a><span>{brand.location}</span></div>
        <div><p className="footer-label">{fr ? 'Réseaux & contact' : 'Social & contact'}</p>{brand.socials.instagram ? <a href={brand.socials.instagram} target="_blank" rel="noreferrer"><Camera size={16}/> Instagram</a> : null}{brand.socials.linkedin ? <a href={brand.socials.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={16}/> LinkedIn</a> : null}<a href={brand.phoneUrl}>{fr ? 'Appeler Adrien' : 'Call Adrien'} · {brand.phone}</a><a href={brand.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp Business</a><a href={`mailto:${brand.email}`}>{brand.email}</a><LanguageSwitcher /></div>
      </div>
    </div>
    <div className="container footer-bottom"><p>© {new Date().getFullYear()} {brand.name}. {fr ? 'Tous droits réservés.' : 'All rights reserved.'}</p><div><Link to={path('privacy')}>{fr ? 'Confidentialité' : 'Privacy'}</Link><Link to={path('terms')}>{fr ? 'Conditions' : 'Terms'}</Link><Link to={path('legal')}>{fr ? 'Mentions légales' : 'Legal notice'}</Link></div></div>
  </footer>;
}
