const activeNumberLocale = () => typeof window !== 'undefined' && window.location.pathname.startsWith('/en') ? 'en-GB' : 'fr-FR';

export const formatCompact = (value: number): string =>
  new Intl.NumberFormat(activeNumberLocale(), {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value).replace(/\s/g, ' ');

export const formatFull = (value: number): string => new Intl.NumberFormat(activeNumberLocale()).format(value);

export const formatRange = (low: number, high: number): string => {
  if (low === high) return formatCompact(low);
  return `${formatCompact(low)}–${formatCompact(high)}`;
};

export const humanDate = (isoDate: string): string =>
  new Intl.DateTimeFormat(activeNumberLocale(), { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${isoDate}T00:00:00`),
  );
