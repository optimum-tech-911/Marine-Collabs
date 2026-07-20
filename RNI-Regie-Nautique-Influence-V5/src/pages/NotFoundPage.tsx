import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="container">
        <span>404</span>
        <h1>Cette route a dérivé.</h1>
        <p>La page a peut-être été déplacée ou l’adresse est incomplète.</p>
        <Link className="button button--dark" to="/"><ArrowLeft size={17} /> Revenir à l’accueil</Link>
      </div>
    </section>
  );
}
