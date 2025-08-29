import { PlaceType, PlaceTypeDTO } from '../place-type';

export const convertToPlaceType = (dto: PlaceTypeDTO): PlaceType => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
});
