import { Address } from '../address';
import { Place, PlaceDTO } from '../place';
import { PlaceType } from '../place-type';
import { convertToNote } from './note';
import { convertToPlaceType } from './place-type';

export const convertToPlace = (dto: PlaceDTO): Place => {
  const address: Address = {
    line1: dto.address_line_1 || null,
    line2: dto.address_line_2 || null,
    city: dto.city || null,
    state: dto.state || null,
    postal: dto.postal_code || null,
  };
  const type: PlaceType = convertToPlaceType(dto.place_types!);

  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    phoneNumber: dto.phone_number,
    website: dto.website,
    address,
    type,
    notes: dto.notes && dto.notes.map((n) => convertToNote(n)),
  };
};

export const convertToPlaceDTO = (place: Place): PlaceDTO => ({
  name: place.name.trim(),
  description: place.description?.trim() || null,
  address_line_1: place.address?.line1?.trim() || null,
  address_line_2: place.address?.line2?.trim() || null,
  city: place.address?.city?.trim() || null,
  state: place.address?.state?.trim() || null,
  postal_code: place.address?.postal?.trim() || null,
  phone_number: place.phoneNumber?.trim() || null,
  website: place.website?.trim() || null,
  place_type_rid: place.type.id!,
});
