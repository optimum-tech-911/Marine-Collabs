import { ArrowRight, Anchor, BadgeCheck, Network, Route, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BookingLink } from '../components/BookingLink';
import { SectionReveal } from '../components/SectionReveal';
import { founderProfile } from '../data/founder';

export function AboutPage() {
  return (
    <>
      <section className="about-v4-hero"><div className="about-v4-hero__grid" aria-hidden="true"/><div className="container about-v4-hero__inner"><div><p className="eyebrow eyebrow--light">À PROPOS DE RÉGIE NAUTIQUE</p><h1>Une agence construite entre culture maritime et économie des créateurs.</h1><p>Le réseau existait avant la plateforme. Notre rôle est de donner aux marques un accès structuré à des voix qui connaissent réellement la mer — et aux créateurs un cadre commercial professionnel.</p><BookingLink className="button button--primary button--hero" placement="about_hero">Parler à l’équipe <ArrowRight size={18}/></BookingLink></div><div className="about-v4-hero__media"><img src="/assets/editorial/gallery/yacht-deck.webp" alt="Professionnel du nautisme sur le pont d’un bateau"/><span>Régie Nautique · Fondée autour d’un réseau déjà actif</span></div></div></section>

      <section className="section about-v4-story"><div className="container"><SectionReveal className="about-v4-story__grid"><div><p className="eyebrow">LE POINT DE DÉPART</p><h2>Le réseau existait avant le logiciel.</h2></div><div><p>Régie Nautique commence avec des créateurs déjà identifiés, pas avec une marketplace vide qui attend son offre. La plateforme sert d’abord à présenter ce réseau avec suffisamment de clarté, de preuve et de structure pour permettre à une marque d’agir.</p><p>À terme, elle devient une couche opérationnelle complète : découverte, casting, brief, validations, coordination, reporting et documentation.</p></div></SectionReveal></div></section>

      <section className="section about-v4-principles"><div className="container"><SectionReveal className="about-v4-principles__heading"><p className="eyebrow eyebrow--light">PRINCIPES D’OPÉRATION</p><h2>La technologie doit renforcer le modèle agence — pas le remplacer.</h2></SectionReveal><div className="about-v4-principles__grid">{[
        [Anchor,'La niche avant le volume','La profondeur, la crédibilité de catégorie et la qualité comptent plus qu’une base de profils infinie.'],
        [BadgeCheck,'La preuve avant le discours','Chaque métrique porte un niveau de preuve, une date et une distinction claire entre vérifié et estimé.'],
        [Network,'Une relation pilotée','Les marques découvrent et présélectionnent. La relation commerciale reste coordonnée par l’agence.'],
        [Route,'Une architecture évolutive','La version publique prépare un futur espace de campagne sans fragiliser le socle actuel.'],
      ].map(([Icon,title,text],index)=>{const C=Icon as typeof Anchor;return <SectionReveal className="about-v4-principle" delay={index*.04} key={String(title)}><span>{String(index+1).padStart(2,'0')}</span><C size={23}/><h3>{String(title)}</h3><p>{String(text)}</p></SectionReveal>})}</div></div></section>

      <section className="section about-v4-founder"><div className="container about-v4-founder__grid"><SectionReveal className="about-v4-founder__media"><img src="/assets/editorial/adrien-hero.webp" alt="Illustration éditoriale de l’expertise nautique du fondateur"/></SectionReveal><SectionReveal delay={.05}><p className="eyebrow">{founderProfile.eyebrow}</p><h2>Adrien ne parle pas du nautisme de l’extérieur : il en vit.</h2><p>{founderProfile.biography} Son compte {founderProfile.handle} a démontré qu’une parole directe, utile et crédible pouvait créer de l’attention dans un marché réputé difficile.</p><blockquote>{founderProfile.salesLine}</blockquote><div className="about-v4-founder__facts">{founderProfile.claims.slice(0, 4).map((claim) => <span title={claim.note} key={claim.label}><ShieldCheck size={16}/>{claim.value}</span>)}</div></SectionReveal></div></section>

      <section className="about-v4-cta"><div className="container about-v4-cta__inner"><div><p className="eyebrow">TRAVAILLER AVEC LE RÉSEAU</p><h2>Apportez un objectif. Repartez avec une stratégie de créateurs.</h2></div><Link className="button button--dark button--hero" to="/campaign-builder">Construire une campagne <ArrowRight size={18}/></Link></div></section>
    </>
  );
}
