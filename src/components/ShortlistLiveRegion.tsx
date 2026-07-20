import { useShortlist } from '../context/ShortlistContext';

export function ShortlistLiveRegion() {
  const { liveMessage } = useShortlist();
  return <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{liveMessage}</div>;
}
