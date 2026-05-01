import { redirect } from 'next/navigation';

export const redirectToDetails = (
  entity: string,
  id: number,
  activeTab?: 'Itinerary' | 'Maintenance' | 'Notes' | 'Todos',
) => redirect(`/adventure/${entity}/${id}${activeTab ? `?lastActivity=${activeTab}` : ''}`);
