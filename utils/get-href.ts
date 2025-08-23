export const getHref = (callingPage: string, defaultHref?: string) =>
  callingPage === 'Home' ? '/adventure' : callingPage === 'Event' ? '/adventure/events' : defaultHref || '/';
