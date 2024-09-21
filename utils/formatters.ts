import { format, parseISO } from 'date-fns';

export const formatDate = (date: string, time?: string | undefined | null): string => {
  const dt = time ? parseISO(date + 'T' + time) : parseISO(date);
  return format(dt, 'PP') + (time ? ` at ${format(dt, 'p')}` : '');
};

export const formatDateRange = (
  beginDate: string,
  beginTime?: string | undefined | null,
  endDate?: string | undefined | null,
  endTime?: string | undefined | null,
): string => {
  if (beginDate && beginTime && !endDate && endTime) {
    const end = parseISO(beginDate + 'T' + endTime);
    return formatDate(beginDate, beginTime) + ' to ' + format(end, 'p');
  }
  return formatDate(beginDate, beginTime) + (endDate ? ` - ${formatDate(endDate, endTime)}` : '');
};

export const cityStatePostal = (
  city?: string | undefined | null,
  state?: string | undefined | null,
  postal?: string | undefined | null,
): string => {
  return (
    (city || '') +
    (city && state ? `, ${state}` : state || '') +
    ((city || state) && postal ? ` ${postal}` : postal || '')
  );
};
