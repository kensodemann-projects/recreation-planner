/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { ItineraryItem, ItineraryItemDTO } from '@/models';
import { convertToItineraryItem, convertToItineraryItemDTO } from '@/models/convert';
import { executeQuery } from '@/utils/data';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

const selectColumns = '*';
const itineraryItemsTable = 'itinerary_items';

const itineraryItemQuery = (supabase: SupabaseClient, id: number): any => {
  return supabase.from(itineraryItemsTable).select(selectColumns).eq('id', id).single();
};

const itineraryItemInsert = (supabase: SupabaseClient, item: ItineraryItem): any => {
  return supabase.from(itineraryItemsTable).insert(convertToItineraryItemDTO(item)).select(selectColumns).single();
};

const itineraryItemUpdate = (supabase: SupabaseClient, item: ItineraryItem): any => {
  return supabase
    .from(itineraryItemsTable)
    .update(convertToItineraryItemDTO(item))
    .eq('id', item.id)
    .select(selectColumns)
    .single();
};

const itineraryItemDelete = (supabase: SupabaseClient, item: ItineraryItem): any => {
  return supabase.from(itineraryItemsTable).delete().eq('id', item.id);
};

export const fetchItineraryItem = async (id: number): Promise<ItineraryItem | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = itineraryItemQuery(supabase, id);
  const data = await executeQuery<ItineraryItemDTO>(query);
  return data ? convertToItineraryItem(data) : null;
};

export const addItineraryItem = async (item: ItineraryItem): Promise<ItineraryItem | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = itineraryItemInsert(supabase, item);
  const data = await executeQuery<ItineraryItemDTO>(query);
  return data ? convertToItineraryItem(data) : null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const canDeleteItineraryItem = async (item: ItineraryItem): Promise<boolean> => {
  if (await isNotLoggedIn()) {
    return false;
  }
  return true;
};

export const deleteItineraryItem = async (item: ItineraryItem): Promise<void> => {
  if (await isNotLoggedIn()) {
    return;
  }

  const supabase = createClient();
  const query = itineraryItemDelete(supabase, item);
  await executeQuery<void>(query);
};

export const updateItineraryItem = async (item: ItineraryItem): Promise<ItineraryItem | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = itineraryItemUpdate(supabase, item);
  const data = await executeQuery<ItineraryItemDTO>(query);
  return data ? convertToItineraryItem(data) : null;
};
