import { redirect } from 'next/navigation';

export const redirectToDetails = (entity: string, id: number, activeTab?: string) =>
  redirect(`/adventure/${entity}/${id}${activeTab ? `?lastActivity=${activeTab}` : ''}`);
