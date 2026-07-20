import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteAnnouncer() {
  const location = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const title = document.title.split('|')[0]?.trim() || 'Nouvelle page';
      setMessage(`${title} chargée`);
    }, 60);
    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  return <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{message}</div>;
}
