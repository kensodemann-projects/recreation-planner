import { Address } from '../address';
import { Place, PlaceDTO } from '../place';
import { PlaceType } from '../place-type';
import { convertToPlaceType } from './place-type';

export const convertToPlace = (dto: Partial<PlaceDTO>): Partial<Place> => {
  const address: Address | undefined =
    dto.address_line_1 || dto.address_line_2 || dto.city || dto.state || dto.postal_code
      ? {
          line1: dto.address_line_1,
          line2: dto.address_line_2,
          city: dto.city,
          state: dto.state,
          postal: dto.postal_code,
        }
      : undefined;
  const type: PlaceType | undefined = dto.place_types && convertToPlaceType(dto.place_types);

  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    phoneNumber: dto.phone_number,
    website: dto.website,
    address,
    type,
  };
};

export const convertToPlaceDTO = (place: Place): PlaceDTO => ({
  name: place.name,
  description: place.description || null,
  address_line_1: place.address.line1 || null,
  address_line_2: place.address.line2 || null,
  city: place.address.city || null,
  state: place.address.state || null,
  postal_code: place.address.postal || null,
  phone_number: place.phoneNumber || null,
  website: place.website || null,
  place_type_rid: place.type.id!,
});
