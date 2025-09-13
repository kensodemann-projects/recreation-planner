import { redirect } from 'next/navigation';

export const redirectToEquipmentDetails = (equipmentRid: number) =>
  redirect(`/adventure/equipment/${equipmentRid}?lastActivity=Todos`);
