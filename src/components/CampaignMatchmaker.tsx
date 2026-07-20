import { ArrowRight, Bookmark, CheckCircle2, Compass, Sparkles, Target } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShortlist } from '../context/ShortlistContext';
import { creators } from '../data/creators';
import { getCreatorCommercialProfile, type CampaignObjectiveId } from '../data/creatorCommercialProfiles';
import { categoryFr } from '../lib/category';
import { formatCompact } from '../lib/format';
import { trackEvent } from '../lib/analytics';

type Objective = CampaignObjectiveId;
type Territory = 'all' | 'france' | 'mediterranean' | 'international' | 'caribbean' | 'pacific';

const objectiveConfig: Record<Objective, { label: string; terms: string[]; categoryBonus: string[] }> = {
  awareness: { label: 'Faire connaître une marque', terms: ['Reels', 'Récits', 'Films', 'Lifestyle', 'média'], categoryBonus: ['Sailing & liveaboard', 'Surf & watersports', 'Boat buying & media'] },
  'product-test': { label: 'Tester un équipement', terms: ['Démonstrations', 'technique', 'Tutoriels', 'Explications', 'Convoyage'], categoryBonus: ['Marine education', 'Captains & delivery', 'Boat buying & media'] },
  destination: { label: 'Promouvoir une destination', terms: ['destination', 'voyage', 'exploration', 'Vie à bord'], categoryBonus: ['Sailing & liveaboard', 'Diving & underwater', 'Surf & watersports'] },
  education: { label: 'Expliquer un produit complexe', terms: ['pédagogiques', 'Tutoriels', 'Explications', 'technique', 'marché'], categoryBonus: ['Marine education', 'Boat buying & media', 'Captains & delivery'] },
  event: { label: 'Activer un salon ou un événement', terms: ['événement', 'média', 'Reels', 'capitaine', 'sport'], categoryBonus: ['Boat buying & media', 'Captains & delivery', 'Surf & watersports'] },
};

const territoryTerms: Record<Territory, string[]> = {
  all: [],
  france: ['France', 'Méditerranée', 'Bassin d’Arcachon', 'Guadeloupe'],
  mediterranean: ['Méditerranée', 'Europe'],
  international: ['international', 'Europe', 'Pacifique', 'Caraïbes'],
  caribbean: ['Caraïbes', 'Guadeloupe'],
  pacific: ['Pacifique', 'Tahiti', 'Polynésie'],
};

function evaluateCreator(creator: (typeof creators)[number], objective: Objective, territory: Territory) {
  const config = objectiveConfig[objective];
  const commercial = getCreatorCommercialProfile(creator.slug);
  const haystack = [...creator.contentFormats, ...creator.brandFit, creator.headline, creator.shortBio, ...(commercial?.recommendedDeliverables ?? [])].join(' ').toLowerCase();
  const reasons: string[] = [];
  let score = creator.featured ? 4 : 0;
  score += Math.min(creator.followers / 40000, 4);

  if (commercial?.recommendedObjectives.includes(objective)) {
    score += 7;
    reasons.push('Objectif recommandé par le cadrage agence');
  }

  const categoryMatches = creator.categories.filter((category) => config.categoryBonus.includes(category));
  if (categoryMatches.length) {
    score += categoryMatches.length * 4;
    reasons.push(`Expertise ${categoryMatches[0] ? categoryFr(categoryMatches[0]) : 'maritime'}`);
  }

  const matchedTerms = config.terms.filter((term) => haystack.includes(term.toLowerCase()));
  score += matchedTerms.length * 2;
  if (matchedTerms.length) reasons.push(`Formats adaptés : ${matchedTerms.slice(0, 2).join(', ')}`);

  if (territory !== 'all') {
    const regions = creator.operatingRegions.join(' ').toLowerCase();
    const matchedRegion = territoryTerms[territory].find((term) => regions.includes(term.toLowerCase()));
    score += matchedRegion ? 5 : -2;
    if (matchedRegion) reasons.push(`Présence : ${matchedRegion}`);
  }

  if (creator.viewEstimate.evidence === 'verified') {
    score += 1.5;
    reasons.push('Vues 30 jours documentées');
  }
  if (creator.followers >= 50000) reasons.push('Audience établie');
  else if (creator.followers < 10000) reasons.push('Profil de niche');

  return { creator, score, reasons: reasons.slice(0, 3) };
}

export function CampaignMatchmaker() {
  const [objective, setObjective] = useState<Objective>('awareness');
  const [territory, setTerritory] = useState<Territory>('all');
  const [revealed, setRevealed] = useState(false);
  const { hasCreator, toggleCreator } = useShortlist();

  const matches = useMemo(
    () => creators.map((creator) => evaluateCreator(creator, objective, territory)).sort((a, b) => b.score - a.score).slice(0, 3),
    [objective, territory],
  );

  return (
    <section className="matchmaker-v5" aria-labelledby="matchmaker-title">
      <div className="matchmaker-v5__intro">
        <span><Sparkles size={18}/></span>
        <div><p className="eyebrow">CASTING GUIDÉ</p><h2 id="matchmaker-title">Partez de l’objectif, pas du nombre d’abonnés.</h2><p>Cette recommandation locale donne une première direction. L’agence valide ensuite la pertinence, les données, les droits et la disponibilité.</p></div>
      </div>
      <div className="matchmaker-v5__controls">
        <label><span><Target size={16}/> Objectif principal</span><select value={objective} onChange={(event) => { setObjective(event.target.value as Objective); setRevealed(false); }}>{Object.entries(objectiveConfig).map(([value, item]) => <option value={value} key={value}>{item.label}</option>)}</select></label>
        <label><span><Compass size={16}/> Territoire prioritaire</span><select value={territory} onChange={(event) => { setTerritory(event.target.value as Territory); setRevealed(false); }}><option value="all">Aucun filtre territorial</option><option value="france">France</option><option value="mediterranean">Méditerranée</option><option value="international">International</option><option value="caribbean">Caraïbes</option><option value="pacific">Pacifique</option></select></label>
        <button className="button button--dark" type="button" onClick={() => { setRevealed(true); trackEvent('matchmaker_run', { objective, territory }); }}>Voir la recommandation <ArrowRight size={17}/></button>
      </div>

      {revealed ? <div className="matchmaker-v5__results" aria-live="polite">
        <div className="matchmaker-v5__result-heading"><CheckCircle2 size={18}/><p><strong>Trois profils à examiner en priorité</strong><span>Suggestion indicative calculée à partir du dataset public.</span></p></div>
        <div className="matchmaker-v5__cards">
          {matches.map(({ creator, reasons }, index) => {
            const selected = hasCreator(creator.slug);
            return <article key={creator.slug}>
              <Link to={`/creators/${creator.slug}`}><img src={creator.image} alt="" loading="lazy"/><span>{String(index + 1).padStart(2, '0')}</span></Link>
              <div><p>{creator.categories[0] ? categoryFr(creator.categories[0]) : 'Créateur maritime'}</p><h3>{creator.displayName}</h3><small>{formatCompact(creator.followers)} abonnés · {creator.handle}</small><ul>{reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul><div><Link className="text-link" to={`/creators/${creator.slug}`}>Voir le profil</Link><button className={selected ? 'is-selected' : ''} type="button" onClick={() => toggleCreator(creator.slug)} aria-pressed={selected}><Bookmark size={15} fill={selected ? 'currentColor' : 'none'}/>{selected ? 'Sélectionné' : 'Ajouter'}</button></div></div>
            </article>;
          })}
        </div>
      </div> : null}
    </section>
  );
}
