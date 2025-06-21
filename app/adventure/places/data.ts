'use server';

import { Place, PlaceType } from '@/models';
import { convertToPlace, convertToPlaceDTO } from '@/models/convert';
import { isLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';

const selectColumns =
  'id, name, description, address_line_1, address_line_2, city, state, postal_code, phone_number, website, place_type_rid, place_types!inner(name, description)';

export const fetchPlaces = async (): Promise<Array<Place>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase.from('places').select(selectColumns).order('name');

  return data?.map((p) => convertToPlace(p) as Place) || [];
};

export const fetchPlace = async (id: number): Promise<Place | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase.from('places').select(selectColumns).eq('id', id).single();

  return data ? (convertToPlace(data) as Place) : null;
};

export const addPlace = async (place: Place): Promise<Place | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase.from('places').insert(convertToPlaceDTO(place)).select(selectColumns).single();

  return data ? (convertToPlace(data) as Place) : null;
};

export const fetchPlaceTypes = async (): Promise<Array<PlaceType>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase.from('place_types').select('id, name, description').order('name');

  return data || [];
};

export const canDeletePlace = async (place: Place): Promise<boolean> => {
  if (!(await isLoggedIn())) {
    return false;
  }

  const supabase = createClient();
  const { data } = await supabase.from('events').select('count').eq('place_rid', place.id).single();

  return data!.count === 0;
};

export const deletePlace = async (place: Place): Promise<void> => {
  if (await isLoggedIn()) {
    const supabase = createClient();
    await supabase.from('places').delete().eq('id', place.id);
  }
};

export const updatePlace = async (place: Place): Promise<Place | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase
    .from('places')
    .update(convertToPlaceDTO(place))
    .eq('id', place.id)
    .select(selectColumns)
    .single();

  return data ? (convertToPlace(data) as Place) : null;
};
