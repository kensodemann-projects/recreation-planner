'use server';

import { Place, PlaceType } from '@/models';
import { isLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';

interface PlaceDTO {
  id?: number | undefined;
  name: string;
  description: string | null | undefined;
  address_line_1: string | null | undefined;
  address_line_2: string | null | undefined;
  city: string | null | undefined;
  state: string | null | undefined;
  postal_code: string | null | undefined;
  phone_number: string | null | undefined;
  website: string | null | undefined;
  place_type_rid: number;
  place_types?: Array<{ name: string; description: string }> | { name: string; description: string } | undefined;
}

const convertToPlace = (data: PlaceDTO): Place => ({
  id: data.id,
  name: data.name,
  description: data.description,
  address: {
    line1: data.address_line_1,
    line2: data.address_line_2,
    city: data.city,
    state: data.state,
    postal: data.postal_code,
  },
  phoneNumber: data.phone_number,
  website: data.website,
  type: {
    id: data.place_type_rid,
    name: (data.place_types as { name: string; description: string }).name,
    description: (data.place_types as { name: string; description: string }).description,
  },
});

const convertToPlaceDTO = (place: Place): PlaceDTO => ({
  name: place.name,
  description: place.description,
  address_line_1: place.address.line1,
  address_line_2: place.address.line2,
  city: place.address.city,
  state: place.address.state,
  postal_code: place.address.state,
  phone_number: place.phoneNumber,
  website: place.website,
  place_type_rid: place.type.id!,
});

const selectColumns =
  'id, name, description, address_line_1, address_line_2, city, state, postal_code, phone_number, website, place_type_rid, place_types!inner(name, description)';

export const fetchPlaces = async (): Promise<Array<Place>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase.from('places').select(selectColumns).order('name');

  return data?.map((p) => convertToPlace(p)) || [];
};

export const fetchPlace = async (id: number): Promise<Place | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase.from('places').select(selectColumns).eq('id', id).single();

  return data ? convertToPlace(data) : null;
};

export const addPlace = async (place: Place): Promise<Place | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase.from('places').insert(convertToPlaceDTO(place)).select(selectColumns);

  return data && data.length ? convertToPlace(data[0]) : null;
};

export const updatePlace = async (place: Place): Promise<Place | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  console.log('update place', place);
  console.log('update place DTO', convertToPlaceDTO(place));

  const supabase = createClient();
  const { data, error } = await supabase
    .from('places')
    .update(convertToPlaceDTO(place))
    .eq('id', place.id)
    .select(selectColumns);

  console.log('update complete', data, error);

  return data && data.length ? convertToPlace(data[0]) : null;
};

export const fetchPlaceTypes = async (): Promise<Array<PlaceType>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase.from('place_types').select('id, name, description').order('name');

  return data || [];
};
