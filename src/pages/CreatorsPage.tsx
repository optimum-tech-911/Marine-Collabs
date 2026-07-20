import { ArrowRight, Search, SlidersHorizontal, Sparkles, Users, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CampaignMatchmaker } from '../components/CampaignMatchmaker';
import { CreatorCard } from '../components/CreatorCard';
import { SectionReveal } from '../components/SectionReveal';
import { creators } from '../data/creators';
import { networkMetrics } from '../data/network';
import { categoryFr } from '../lib/category';
import { formatCompact } from '../lib/format';
import type { CreatorCategory } from '../types';

const categories = Array.from(new Set(creators.flatMap((creator) => creator.categories))) as CreatorCategory[];
type SortOption = 'relevance' | 'reach-desc' | 'reach-asc' | 'verified' | 'name';
type AudienceOption = 'all' | 'under-10' | '10-50' | '50-100' | '100-plus';

function matchesAudience(followers: number, audience: AudienceOption) {
  if (audience === 'under-10') return followers < 10000;
  if (audience === '10-50') return followers >= 10000 && followers < 50000;
  if (audience === '50-100') return followers >= 50000 && followers < 100000;
  if (audience === '100-plus') return followers >= 100000;
  return true;
}

export function CreatorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = categories.includes(searchParams.get('category') as CreatorCategory) ? searchParams.get('category') as CreatorCategory : 'All';
  const initialAudience = ['all','under-10','10-50','50-100','100-plus'].includes(searchParams.get('audience') ?? '') ? searchParams.get('audience') as AudienceOption : 'all';
  const initialSort = ['relevance','reach-desc','reach-asc','verified','name'].includes(searchParams.get('sort') ?? '') ? searchParams.get('sort') as SortOption : 'relevance';
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState<'All' | CreatorCategory>(initialCategory);
  const [audience, setAudience] = useState<AudienceOption>(initialAudience);
  const [sort, setSort] = useState<SortOption>(initialSort);

  useEffect(() => {
    const next = new URLSearchParams();
    if (query.trim()) next.set('q', query.trim());
    if (category !== 'All') next.set('category', category);
    if (audience !== 'all') next.set('audience', audience);
    if (sort !== 'relevance') next.set('sort', sort);
    setSearchParams(next, { replace: true });
  }, [audience, category, query, setSearchParams, sort]);

  const filteredCreators = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = creators.filter((creator) => {
      const haystack = [creator.displayName, creator.handle, creator.profileLabel, creator.headline, ...creator.categories, ...creator.brandFit, ...creator.languages, ...creator.operatingRegions].join(' ').toLowerCase();
      return (!normalizedQuery || haystack.includes(normalizedQuery))
        && (category === 'All' || creator.categories.includes(category))
        && matchesAudience(creator.followers, audience);
    });

    return [...result].sort((a, b) => {
      if (sort === 'reach-asc') return a.followers - b.followers;
      if (sort === 'reach-desc') return b.followers - a.followers;
      if (sort === 'verified') return Number(b.viewEstimate.evidence === 'verified') - Number(a.viewEstimate.evidence === 'verified') || b.followers - a.followers;
      if (sort === 'name') return a.displayName.localeCompare(b.displayName, 'fr');
      return Number(b.featured) - Number(a.featured) || b.followers - a.followers;
    });
  }, [audience, category, query, sort]);

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setAudience('all');
    setSort('relevance');
  };

  const hasFilters = Boolean(query || category !== 'All' || audience !== 'all' || sort !== 'relevance');

  return (
    <>
      <section className="creators-v4-hero">
        <div className="creators-v4-hero__grid" aria-hidden="true" />
        <div className="container creators-v4-hero__inner">
          <div>
            <p className="eyebrow eyebrow--light">LE RÉSEAU DES CRÉATEURS MARITIMES</p>
            <h1>Des voix crédibles, choisies pour leur terrain.</h1>
            <p>Des créateurs à forte audience, des micro-créateurs spécialisés et des professionnels en activité — sélectionnés pour leur participation authentique à la culture maritime.</p>
            <div className="creators-v4-hero__chips"><span><Users size={16}/>{creators.length} profils</span><span><Sparkles size={16}/>{formatCompact(networkMetrics.combinedFollowers)}+ abonnés cumulés</span></div>
          </div>
          <div className="creators-v4-hero__collage" aria-hidden="true">
            {creators.slice(0, 4).map((creator, index) => <img key={creator.slug} src={creator.image} alt="" className={`creators-v4-hero__image creators-v4-hero__image--${index + 1}`}/>) }
          </div>
        </div>
      </section>

      <section className="section creators-v4-explorer">
        <div className="container">
          <CampaignMatchmaker />
          <SectionReveal className="creators-v4-toolbar">
            <label className="search-field creators-v4-search"><Search size={18}/><span className="sr-only">Rechercher</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nom, spécialité, région ou secteur de marque"/>{query ? <button type="button" onClick={() => setQuery('')} aria-label="Effacer"><X size={16}/></button> : null}</label>
            <label className="select-field"><SlidersHorizontal size={17}/><span className="sr-only">Trier</span><select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}><option value="relevance">Pertinence</option><option value="reach-desc">Audience décroissante</option><option value="reach-asc">Audience croissante</option><option value="verified">Vues vérifiées</option><option value="name">Nom A–Z</option></select></label>
          </SectionReveal>

          <div className="creators-v4-filter-group">
            <span className="creators-v4-filter-label">Catégorie</span>
            <div className="category-filter creators-v4-category" role="group" aria-label="Filtrer par catégorie">
              <button className={category === 'All' ? 'active' : ''} type="button" aria-pressed={category === 'All'} onClick={() => setCategory('All')}>Tous <span>{creators.length}</span></button>
              {categories.map((item) => <button className={category === item ? 'active' : ''} key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{categoryFr(item)} <span>{creators.filter((creator) => creator.categories.includes(item)).length}</span></button>)}
            </div>
          </div>

          <div className="creators-v4-filter-group creators-v4-filter-group--audience">
            <span className="creators-v4-filter-label">Taille d’audience</span>
            <div className="creators-v4-audience" role="group" aria-label="Filtrer par audience">
              {[
                ['all','Tous'],['under-10','< 10 K'],['10-50','10 K–50 K'],['50-100','50 K–100 K'],['100-plus','100 K+'],
              ].map(([value, label]) => <button key={value} type="button" className={audience === value ? 'active' : ''} aria-pressed={audience === value} onClick={() => setAudience(value as AudienceOption)}>{label}</button>)}
            </div>
          </div>

          <div className="creators-v4-summary"><p><strong>{filteredCreators.length}</strong> profil{filteredCreators.length > 1 ? 's' : ''} affiché{filteredCreators.length > 1 ? 's' : ''}</p>{hasFilters ? <button className="text-button" type="button" onClick={resetFilters}>Réinitialiser</button> : null}</div>

          {filteredCreators.length ? <div className="creator-grid creator-grid--three creators-v4-grid">{filteredCreators.map((creator, index) => <CreatorCard key={creator.slug} creator={creator} index={index}/>)}</div> : <div className="no-results"><span>00</span><h2>Aucun profil ne correspond.</h2><p>Essayez une autre catégorie ou retirez les termes de recherche.</p><button className="button button--dark" type="button" onClick={resetFilters}>Afficher tous les créateurs</button></div>}

          <SectionReveal className="creators-v4-brief-cta">
            <div><p className="eyebrow">UN CASTING SUR MESURE</p><h2>Vous ne savez pas encore quels profils choisir ?</h2><p>Donnez-nous l’objectif, le marché et le calendrier. Nous vous proposons une sélection cohérente.</p></div>
            <Link className="button button--dark" to="/campaign-builder">Construire le brief <ArrowRight size={17}/></Link>
          </SectionReveal>

        </div>
      </section>
    </>
  );
}
