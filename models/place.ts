import { Address } from './address';
import { CommonData, CommonDataDTO } from './common-data';
import { PlaceType, PlaceTypeDTO } from './place-type';

export interface PlaceDTO extends CommonDataDTO {
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  phone_number: string | null;
  website: string | null;
  place_type_rid: number;
  place_types?: PlaceTypeDTO;
}

export interface Place extends CommonData {
  address?: Address;
  phoneNumber?: string | null;
  website?: string | null;
  type: PlaceType;
}

export type SelectablePlace = Pick<Place, 'id' | 'name'>;
