import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';

type State = { hasError: boolean };

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('RNI rendering error', error, info);
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="fatal-error">
        <div>
          <span>RNI</span>
          <h1>Cette page n’a pas pu être affichée.</h1>
          <p>Rechargez la page. Si le problème persiste, revenez à l’accueil et reprenez votre parcours.</p>
          <div>
            <button className="button button--dark" type="button" onClick={() => window.location.reload()}>Recharger</button>
            <a className="button button--ghost" href="/">Retour à l’accueil</a>
          </div>
        </div>
      </main>
    );
  }
}
