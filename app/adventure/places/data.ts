/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { Place, PlaceDTO, PlaceType } from '@/models';
import { convertToPlace, convertToPlaceDTO } from '@/models/convert';
import { executeQuery } from '@/utils/data';
import { isNotLoggedIn, withAuth } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

const placesTable = 'places';
const selectColumns = '*, place_types!inner(*)';
const childTableColumns = ', notes(*)';

const placeQuery = (supabase: SupabaseClient, id?: number): any => {
  const query = supabase.from(placesTable).select(selectColumns);
  if (id) {
    return query.eq('id', id).single();
  } else {
    return query.order('name');
  }
};

const fullPlaceQuery = (supabase: SupabaseClient, id?: number): any => {
  const query = supabase.from(placesTable).select(selectColumns + childTableColumns);
  if (id) {
    return query.eq('id', id).single();
  } else {
    return query.order('name');
  }
};

const placeInsert = (supabase: SupabaseClient, place: Place): any => {
  return supabase.from(placesTable).insert(convertToPlaceDTO(place)).select(selectColumns).single();
};

const placeUpdate = (supabase: SupabaseClient, place: Place): any => {
  return supabase.from(placesTable).update(convertToPlaceDTO(place)).eq('id', place.id).select(selectColumns).single();
};

const placeDelete = (supabase: SupabaseClient, place: Place): any => {
  return supabase.from(placesTable).delete().eq('id', place.id);
};

const usageCountInEvents = (supabase: SupabaseClient, place: Place): any => {
  return supabase.from('events').select('count').eq('place_rid', place.id).single();
};

const placeTypesQuery = (supabase: SupabaseClient): any => {
  return supabase.from('place_types').select('id, name, description').order('name');
};

export const fetchPlaces = async (): Promise<Place[]> => {
  const data = await withAuth((supabase: SupabaseClient) => executeQuery<PlaceDTO[]>(placeQuery(supabase)));
  return (data || []).map((p) => convertToPlace(p) as Place);
};

export const fetchPlace = async (id: number, full?: boolean): Promise<Place | null> => {
  const data = await withAuth((supabase: SupabaseClient) =>
    executeQuery<PlaceDTO>(full ? fullPlaceQuery(supabase, id) : placeQuery(supabase, id)),
  );
  return data ? (convertToPlace(data) as Place) : null;
};

export const addPlace = async (place: Place): Promise<Place | null> => {
  const data = await withAuth((supabase: SupabaseClient) => executeQuery<PlaceDTO>(placeInsert(supabase, place)));
  return data ? (convertToPlace(data) as Place) : null;
};

export const fetchPlaceTypes = async (): Promise<PlaceType[]> => {
  const data = await withAuth((supabase: SupabaseClient) => executeQuery<PlaceType[]>(placeTypesQuery(supabase)));
  return data || [];
};

export const canDeletePlace = async (place: Place): Promise<boolean> => {
  const data = await withAuth((supabase: SupabaseClient) =>
    executeQuery<{ count: number }>(usageCountInEvents(supabase, place)),
  );
  return data?.count === 0;
};

export const deletePlace = async (place: Place): Promise<void> => {
  await withAuth((supabase: SupabaseClient) => executeQuery(placeDelete(supabase, place)));
};

export const updatePlace = async (place: Place): Promise<Place | null> => {
  const data = await withAuth((supabase: SupabaseClient) => executeQuery<PlaceDTO>(placeUpdate(supabase, place)));
  return data ? (convertToPlace(data) as Place) : null;
};
