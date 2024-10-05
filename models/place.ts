import { Address } from './address';

export interface Place {
  id: string;
  name: string;
  description?: string | undefined | null;
  address: Address;
  phoneNumber?: string | undefined;
  website?: string | undefined;
  typeName: string;
}
