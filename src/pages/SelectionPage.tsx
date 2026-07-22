import {
  ArrowRight,
  BarChart3,
  BookmarkX,
  CheckCircle2,
  Compass,
  Download,
  Eye,
  Layers3,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { SectionReveal } from '../components/SectionReveal';
import { useShortlist } from '../context/ShortlistContext';
import { categoryFr } from '../lib/category';
import { formatCompact, formatFull, formatRange } from '../lib/format';
import { trackEvent } from '../lib/analytics';

export function SelectionPage() {
  const { shortlist, removeCreator, clearShortlist } = useShortlist();
  const combinedFollowers = shortlist.reduce((sum, creator) => sum + creator.followers, 0);
  const verifiedViews = shortlist
    .filter((creator) => creator.viewEstimate.evidence === 'verified')
    .reduce((sum, creator) => sum + creator.viewEstimate.low, 0);
  const categoryCoverage = new Set(shortlist.flatMap((creator) => creator.categories)).size;

  const exportSelection = () => {
    const quote = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;
    const rows = [
      ['Créateur', 'Handle', 'Catégories', 'Abonnés visibles', 'Vues basses / 30 j', 'Vues hautes / 30 j', 'Niveau de preuve', 'Territoires', 'Formats'],
      ...shortlist.map((creator) => [
        creator.displayName,
        creator.handle,
        creator.categories.map(categoryFr).join(' | '),
        creator.followers,
        creator.viewEstimate.low,
        creator.viewEstimate.high,
        creator.viewEstimate.evidence,
        creator.operatingRegions.join(' | '),
        creator.contentFormats.join(' | '),
      ]),
    ];
    const csv = `\uFEFF${rows.map((row) => row.map(quote).join(';')).join('\n')}`;
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `selection-rni-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    trackEvent('selection_export', { creator_count: shortlist.length });
  };

  if (!shortlist.length) {
    return (
      <>
        <section className="selection-v5-hero selection-v5-hero--empty">
          <div className="selection-v5-hero__grid" aria-hidden="true" />
          <div className="container selection-v5-empty">
            <BookmarkX size={40} />
            <p className="eyebrow eyebrow--light">VOTRE SÉLECTION</p>
            <h1>Construisez un casting avant de construire la campagne.</h1>
            <p>Ajoutez des profils pour comparer leurs territoires, leurs formats, leur audience et leur niveau de preuve dans un seul espace.</p>
            <Link className="button button--primary button--hero" to="/creators">Explorer les créateurs <ArrowRight size={18} /></Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="selection-v5-hero">
        <div className="selection-v5-hero__grid" aria-hidden="true" />
        <div className="container selection-v5-hero__inner">
          <div>
            <p className="eyebrow eyebrow--light">CASTING DE CAMPAGNE</p>
            <h1>Comparez les profils avant de figer le brief.</h1>
            <p>Cette sélection ne vaut pas disponibilité commerciale. Elle sert à structurer une recommandation avec l’agence.</p>
          </div>
          <Link className="button button--primary button--hero" to="/campaign-builder">Continuer vers le brief <ArrowRight size={18} /></Link>
        </div>
        <div className="container selection-v5-metrics">
          <div><Users size={18}/><span><strong>{shortlist.length}</strong><small>profils sélectionnés</small></span></div>
          <div><Eye size={18}/><span><strong>{formatCompact(combinedFollowers)}</strong><small>abonnés cumulés</small></span></div>
          <div><BarChart3 size={18}/><span><strong>{verifiedViews ? formatCompact(verifiedViews) : '—'}</strong><small>vues vérifiées / 30 j</small></span></div>
          <div><Layers3 size={18}/><span><strong>{categoryCoverage}</strong><small>territoires créatifs couverts</small></span></div>
        </div>
      </section>

      <section className="section selection-v5">
        <div className="container">
          <div className="selection-v5-heading">
            <div><p className="eyebrow">VUE D’ENSEMBLE</p><h2>Un casting doit combiner portée, expertise et rôle créatif.</h2></div>
            <div className="selection-v5-heading__actions"><button className="text-button" type="button" onClick={exportSelection}><Download size={15}/> Exporter en CSV</button><button className="text-button danger" type="button" onClick={clearShortlist}><Trash2 size={15}/> Vider la sélection</button></div>
          </div>

          <div className="selection-v5-cards">
            {shortlist.map((creator, index) => (
              <SectionReveal className="selection-v5-card" delay={index * .035} key={creator.slug}>
                <Link className="selection-v5-card__media" to={`/creators/${creator.slug}`}>
                  <img src={creator.image} alt={`Univers éditorial associé à ${creator.displayName}`} loading={index < 2 ? 'eager' : 'lazy'} />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </Link>
                <div className="selection-v5-card__body">
                  <div><p>{creator.handle}</p><h3>{creator.displayName}</h3><span>{creator.categories.map(categoryFr).join(' · ')}</span></div>
                  <p>{creator.headline}</p>
                  <dl>
                    <div><dt>Audience</dt><dd>{formatCompact(creator.followers)}</dd></div>
                    <div><dt>Vues / 30 j</dt><dd>{formatRange(creator.viewEstimate.low, creator.viewEstimate.high)}</dd></div>
                    <div><dt>Publications</dt><dd>{formatFull(creator.posts)}</dd></div>
                  </dl>
                  <div className="selection-v5-card__status"><EvidenceBadge evidence={creator.viewEstimate.evidence}/></div>
                  <div className="selection-v5-card__actions">
                    <Link className="text-link" to={`/creators/${creator.slug}`}>Ouvrir le profil <ArrowRight size={15}/></Link>
                    <button type="button" onClick={() => removeCreator(creator.slug)}><Trash2 size={15}/> Retirer</button>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal className="selection-v5-comparison">
            <div className="selection-v5-comparison__heading">
              <div><p className="eyebrow eyebrow--light">COMPARAISON DÉTAILLÉE</p><h2>Les informations qui changent réellement une recommandation.</h2></div>
              <p>Le volume d’abonnés n’est jamais traité comme le seul critère.</p>
            </div>
            <div className="selection-v5-table-wrap">
              <table>
                <thead><tr><th>Profil</th><th>Formats</th><th>Territoires</th><th>Compatibilité de marque</th><th>Niveau de preuve</th></tr></thead>
                <tbody>
                  {shortlist.map((creator) => (
                    <tr key={creator.slug}>
                      <th scope="row"><strong>{creator.displayName}</strong><span>{creator.handle}</span></th>
                      <td>{creator.contentFormats.slice(0, 4).join(' · ')}</td>
                      <td>{creator.operatingRegions.join(' · ')}</td>
                      <td>{creator.brandFit.slice(0, 4).join(' · ')}</td>
                      <td><EvidenceBadge evidence={creator.viewEstimate.evidence}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionReveal>

          <div className="selection-v5-guidance">
            <SectionReveal><Compass size={22}/><div><h3>Complémentarité</h3><p>Associez une forte portée à un profil technique ou régional pour donner à chaque créateur un rôle distinct.</p></div></SectionReveal>
            <SectionReveal delay={.04}><ShieldCheck size={22}/><div><h3>Validation agence</h3><p>Krew Media confirme la pertinence, la disponibilité, les droits, le calendrier et les conditions avant toute proposition.</p></div></SectionReveal>
            <SectionReveal delay={.08}><CheckCircle2 size={22}/><div><h3>Prochaine étape</h3><p>Transformez cette sélection en brief exploitable, puis transmettez-le à l’agence sans perdre votre contexte.</p></div></SectionReveal>
          </div>

          <SectionReveal className="selection-v5-cta">
            <div><p className="eyebrow">PRÊT À CADRER LA CAMPAGNE ?</p><h2>Le casting est une hypothèse. Le brief permet de la valider.</h2></div>
            <Link className="button button--dark button--hero" to="/campaign-builder">Construire le brief <ArrowRight size={18}/></Link>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
