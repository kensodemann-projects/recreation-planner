import { PlaceType, PlaceTypeDTO } from '../place-type';

export const convertToPlaceType = (dto: PlaceTypeDTO): PlaceType => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
});

export const convertToPlaceTypeDTO = (PlaceType: PlaceType): PlaceTypeDTO => ({
  id: PlaceType.id,
  name: PlaceType.name.trim(),
  description: PlaceType.description?.trim(),
});
