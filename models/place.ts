import { Address } from './address';
import { CommonData } from './common-data';
import { PlaceType } from './place-type';

export interface Place extends CommonData {
  address: Address;
  phoneNumber?: string | undefined | null;
  website?: string | undefined | null;
  type: PlaceType;
}

export type SelectablePlace = Pick<Place, 'id' | 'name'>;
