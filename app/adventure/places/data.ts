'use server';

import { Place } from '@/models';
import { isLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';

interface PlaceQueryResult {
  id: number;
  name: string;
  description: string;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  phone_number: string | null;
  website: string | null;
  place_type_rid: number;
  place_types: Array<{ name: string }> | { name: string };
}

const convertToPlace = (data: PlaceQueryResult): Place => {
  return {
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
    typeId: data.place_type_rid,
    typeName: (data.place_types as { name: string }).name,
  };
};

export const fetchPlaces = async (): Promise<Array<Place>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase
    .from('places')
    .select(
      'id, name, description, address_line_1, address_line_2, city, state, postal_code, phone_number, website, place_type_rid, place_types!inner(name)',
    )
    .order('name');

  return data?.map((p) => convertToPlace(p)) || [];
};

export const fetchPlace = async (id: number): Promise<Place | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase
    .from('places')
    .select(
      'id, name, description, address_line_1, address_line_2, city, state, postal_code, phone_number, website, place_type_rid, place_types!inner(name)',
    )
    .eq('id', id)
    .single();

  return data ? convertToPlace(data) : null;
};
