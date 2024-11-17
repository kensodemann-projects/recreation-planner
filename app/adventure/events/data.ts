'use server';

import { Event, EventType, SelectablePlace } from '@/models';
import { isLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';

interface EventDTO {
  id?: number | undefined;
  name: string;
  description: string | null | undefined;
  begin_date: string;
  begin_time: string | null | undefined;
  end_date: string | null | undefined;
  end_time: string | null | undefined;
  place_rid: number;
  event_type_rid: number;
  places?: Array<{ name: string }> | { name: string } | undefined;
  event_types?: Array<{ name: string; description: string }> | { name: string; description: string } | undefined;
}

const convertToEvent = (data: EventDTO): Event => ({
  id: data.id,
  name: data.name,
  description: data.description,
  beginDate: data.begin_date,
  beginTime: data.begin_time,
  endDate: data.end_date,
  endTime: data.end_time,
  place: {
    id: data.place_rid,
    name: (data.places as { name: string }).name,
  },
  type: {
    id: data.event_type_rid,
    name: (data.event_types as { name: string; description: string }).name,
    description: (data.event_types as { name: string; description: string }).description,
  },
});

const convertToEventDTO = (event: Event): EventDTO => ({
  name: event.name,
  description: event.description,
  begin_date: event.beginDate,
  begin_time: event.beginTime,
  end_date: event.endDate,
  end_time: event.endTime,
  place_rid: event.place.id!,
  event_type_rid: event.type.id!,
});

const selectColumns =
  'id, name, description, begin_date, begin_time, end_date, end_time, place_rid, event_type_rid, places!inner(name), event_types!inner(name, description)';

export const fetchEvents = async (): Promise<Array<Event>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase.from('events').select(selectColumns).order('begin_date, begin_time');

  return data?.map((p) => convertToEvent(p)) || [];
};

export const fetchEvent = async (id: number): Promise<Event | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase.from('events').select(selectColumns).eq('id', id).single();

  return data ? convertToEvent(data) : null;
};

export const addEvent = async (event: Event): Promise<Event | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase.from('events').insert(convertToEventDTO(event)).select(selectColumns);

  return data && data.length ? convertToEvent(data[0]) : null;
};

export const fetchEventTypes = async (): Promise<Array<EventType>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase.from('event_types').select('id, name, description').order('name');

  return data || [];
};

export const fetchPlaces = async (): Promise<Array<SelectablePlace>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase.from('places').select('id, name').order('name');

  return data || [];
};
