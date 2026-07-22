import { ArrowRight, Camera, Compass, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionReveal } from './SectionReveal';

const scenes = [
  { src: '/assets/brand/fieldwork/network-at-marina.jpg', alt: 'Équipe maritime réunie sur un ponton autour d’un voilier', label: 'Le réseau', text: 'Des profils complémentaires réunis autour du même terrain.' },
  { src: '/assets/brand/fieldwork/creator-filming-onboard.jpg', alt: 'Créatrice filmant une manœuvre à bord d’un voilier', label: 'La création', text: 'Le contenu se fabrique dans l’action, au plus près du geste.' },
  { src: '/assets/brand/fieldwork/navigation-equipment.jpg', alt: 'Navigateur utilisant l’électronique marine à la barre', label: 'Le produit', text: 'Un équipement montré dans son contexte réel d’utilisation.' },
  { src: '/assets/brand/fieldwork/campaign-conversation.jpg', alt: 'Deux professionnels préparant une navigation autour d’une carte marine', label: 'Le cadrage', text: 'Objectifs, terrain et message alignés avant la mise en ligne.' },
] as const;

export function FieldworkGallery() {
  return (
    <section className="fieldwork-gallery" aria-labelledby="fieldwork-title">
      <div className="container">
        <SectionReveal className="fieldwork-gallery__heading">
          <div><p className="eyebrow eyebrow--light"><Radio size={14}/> SUR LE TERRAIN</p><h2 id="fieldwork-title">Une campagne maritime se vit avant de se publier.</h2></div>
          <div><p>Du premier échange à la prise de vue, chaque étape doit rester crédible, utile et ancrée dans le réel.</p><Link to="/solutions">Découvrir notre méthode <ArrowRight size={16}/></Link></div>
        </SectionReveal>
        <div className="fieldwork-gallery__grid">
          {scenes.map((scene, index) => <SectionReveal className={`fieldwork-gallery__scene fieldwork-gallery__scene--${index + 1}`} delay={index * .05} key={scene.src}>
            <figure><img src={scene.src} alt={scene.alt} loading="lazy" decoding="async"/><figcaption><span>{index === 1 ? <Camera size={15}/> : <Compass size={15}/>} {scene.label}</span><p>{scene.text}</p></figcaption></figure>
          </SectionReveal>)}
        </div>
      </div>
    </section>
  );
}
