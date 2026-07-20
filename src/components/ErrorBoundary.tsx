import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';

type State = { hasError: boolean };

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('Marine Collabs rendering error', error, info);
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;
    const french = window.location.pathname.startsWith('/fr');
    return (
      <main className="fatal-error">
        <div>
          <span>Marine Collabs</span>
          <h1>{french ? 'Cette page n’a pas pu être affichée.' : 'This page could not be displayed.'}</h1>
          <p>{french ? 'Rechargez la page. Si le problème persiste, revenez à l’accueil et reprenez votre parcours.' : 'Reload the page. If the issue persists, return home and continue your journey.'}</p>
          <div>
            <button className="button button--dark" type="button" onClick={() => window.location.reload()}>{french ? 'Recharger' : 'Reload'}</button>
            <a className="button button--ghost" href={french ? '/fr/' : '/en/'}>{french ? 'Retour à l’accueil' : 'Return home'}</a>
          </div>
        </div>
      </main>
    );
  }
}
