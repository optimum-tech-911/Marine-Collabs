import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ShortlistProvider } from './context/ShortlistContext';
import { LocaleProvider } from './i18n/locale';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <LocaleProvider><ShortlistProvider><App /></ShortlistProvider></LocaleProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
