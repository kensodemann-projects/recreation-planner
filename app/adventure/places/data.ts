'use server';

import { Place } from '@/models';
import { createClient } from '@/utils/supabase/server';

export const fetchPlaces = async (): Promise<Array<Place>> => {
  const supabase = createClient();
  const { data } = await supabase
    .from('places')
    .select(
      'id, name, description, address_line_1, address_line_2, city, state, postal_code, phone_number, website, place_types!inner(name)',
    );

  return (
    data?.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      address: {
        line1: p.address_line_1,
        line2: p.address_line_2,
        city: p.city,
        state: p.state,
        postal: p.postal_code,
      },
      phoneNumber: p.phone_number,
      website: p.website,
      typeName: (p.place_types as any).name,
    })) || []
  );
};
