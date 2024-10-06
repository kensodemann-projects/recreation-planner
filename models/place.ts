import { Address } from './address';

export interface Place {
  id: number;
  name: string;
  description?: string | undefined | null;
  address: Address;
  phoneNumber?: string | undefined | null;
  website?: string | undefined | null;
  typeId: number;
  typeName: string;
}
