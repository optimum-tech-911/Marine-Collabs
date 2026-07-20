import { ArrowUpRight, BriefcaseBusiness, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brand } from '../config/brand';
import { Logo } from './Logo';

export function Footer() {
  return <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-intro"><Logo inverse/><h2>Placez votre marque là où la culture nautique se vit réellement.</h2><Link className="button button--light" to="/campaign-builder">Créer une campagne <ArrowUpRight size={17}/></Link></div>
      <div className="footer-links">
        <div><p className="footer-label">Explorer</p><Link to="/creators">Réseau de créateurs</Link><Link to="/solutions">Solutions</Link><Link to="/for-brands">Pour les marques</Link><Link to="/join-the-network">Rejoindre le réseau</Link><Link to="/selection">Comparer ma sélection</Link></div>
        <div><p className="footer-label">Agence</p><Link to="/about">À propos</Link><Link to="/methodology">Méthodologie & sources</Link><Link to="/contact">Contact</Link><a href={`mailto:${brand.email}`}>{brand.email}</a><span>{brand.location}</span></div>
        <div><p className="footer-label">Réseaux & contact</p>{brand.socials.instagram ? <a href={brand.socials.instagram} target="_blank" rel="noreferrer"><Camera size={16}/> Instagram</a> : null}{brand.socials.linkedin ? <a href={brand.socials.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={16}/> LinkedIn</a> : null}<Link to="/contact?intent=rendez-vous">Prendre rendez-vous</Link><Link to="/campaign-builder">Préparer un brief</Link></div>
      </div>
    </div>
    <div className="container footer-bottom"><p>© {new Date().getFullYear()} {brand.name}. Tous droits réservés.</p><div><Link to="/privacy">Confidentialité</Link><Link to="/terms">Conditions</Link><Link to="/legal">Mentions légales</Link></div></div>
  </footer>;
}
