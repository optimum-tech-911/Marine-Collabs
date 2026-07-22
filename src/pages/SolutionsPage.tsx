import { ArrowRight, Camera, ChartNoAxesCombined, CircleGauge, RadioTower, ScanSearch, ShieldCheck, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContactLink } from '../components/ContactLink';
import { SectionReveal } from '../components/SectionReveal';

const solutions = [
  { icon: RadioTower, title: 'Faire connaître une marque', text: 'Construire une présence cohérente grâce à plusieurs voix complémentaires.', deliverables: ['Reels et vidéos courtes','Stories coordonnées','Série éditoriale multi-créateurs'] },
  { icon: ScanSearch, title: 'Lancer un produit', text: 'Créer une montée en attention avant, pendant et après la révélation.', deliverables: ['Teasing','Prise en main','Démonstration en situation'] },
  { icon: CircleGauge, title: 'Tester un équipement', text: 'Mettre le produit entre les mains de créateurs capables de l’expliquer et de l’éprouver.', deliverables: ['Usage réel','Retour d’expérience','Contenu technique'] },
  { icon: Camera, title: 'Produire du contenu', text: 'Créer des assets photo et vidéo réutilisables sur les canaux de la marque.', deliverables: ['UGC','Production photo','Droits organiques et paid media'] },
  { icon: UsersRound, title: 'Développer une ambassade', text: 'Installer une relation durable entre une marque et des profils cohérents.', deliverables: ['Prises de parole récurrentes','Exclusivité catégorie','Continuité narrative'] },
  { icon: ChartNoAxesCombined, title: 'Activer un événement ou une destination', text: 'Faire vivre un lieu, un salon ou une course à travers des regards crédibles.', deliverables: ['Couverture live','Contenu destination','Interviews et coulisses'] },
];

export function SolutionsPage() {
  return (
    <>
      <section className="solutions-v4-hero"><div className="solutions-v4-hero__grid" aria-hidden="true"/><div className="container solutions-v4-hero__inner"><div><p className="eyebrow eyebrow--light">SOLUTIONS DE CAMPAGNE</p><h1>Commencez par l’objectif. Nous construisons le dispositif.</h1><p>Le casting, les formats, les droits et la mesure doivent découler du résultat attendu — pas d’une liste de livrables copiée d’une campagne précédente.</p><div className="solutions-v4-hero__actions"><Link className="button button--primary button--hero" to="/campaign-builder">Construire le brief <ArrowRight size={18}/></Link><ContactLink className="button button--ghost-light button--hero" placement="solutions_hero">Parler à Adrien</ContactLink></div></div><div className="solutions-v4-hero__visual"><img src="/assets/brand/fieldwork/navigation-equipment.jpg" alt="Navigateur utilisant un équipement électronique marin à la barre"/><span><strong>06</strong><small>formats de campagne structurés</small></span></div></div></section>

      <section className="section solutions-v4-list"><div className="container"><SectionReveal className="solutions-v4-list__heading"><p className="eyebrow">OBJECTIFS</p><h2>Six points de départ, autant de castings possibles.</h2></SectionReveal><div className="solutions-v4-grid">{solutions.map(({icon:Icon,title,text,deliverables},index)=><SectionReveal className="solutions-v4-card" delay={index*.04} key={title}><span className="solutions-v4-card__index">{String(index+1).padStart(2,'0')}</span><Icon size={24}/><h3>{title}</h3><p>{text}</p><ul>{deliverables.map((item)=><li key={item}>{item}</li>)}</ul><Link to={`/campaign-builder?objective=${encodeURIComponent(title)}`}>Construire ce format <ArrowRight size={16}/></Link></SectionReveal>)}</div></div></section>

      <section className="section solutions-v4-scope"><div className="container"><SectionReveal className="solutions-v4-scope__heading"><div><p className="eyebrow eyebrow--light">DERRIÈRE LE CONTENU</p><h2>Une campagne professionnelle se joue aussi dans les détails invisibles.</h2></div><p>Krew Media cadre les éléments qui protègent la marque, les créateurs et la qualité d’exécution.</p></SectionReveal><div className="solutions-v4-scope__grid">{[
        ['Livrables','Format, durée, volume, canaux et jalons de validation.'],['Droits','Usage organique, paid media, site, retail, événement et durée de licence.'],['Exclusivité','Concurrents, durée de catégorie et territoire.'],['Transparence','Identification claire du partenariat commercial.'],['Reporting','Portée, vues, interactions, clics et résultats disponibles.'],['Coordination','Échanges créateurs, délais, corrections et preuve de publication.'],
      ].map(([title,text],index)=><SectionReveal className="solutions-v4-scope__item" delay={index*.035} key={title}><span>{String(index+1).padStart(2,'0')}</span><ShieldCheck size={19}/><h3>{title}</h3><p>{text}</p></SectionReveal>)}</div></div></section>

      <section className="solutions-v4-cta"><div className="container solutions-v4-cta__inner"><div><p className="eyebrow">UN PROJET EN TÊTE ?</p><h2>Transformez une idée encore floue en brief exploitable.</h2></div><Link className="button button--dark button--hero" to="/campaign-builder">Ouvrir le campaign builder <ArrowRight size={18}/></Link></div></section>
    </>
  );
}
