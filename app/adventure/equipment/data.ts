'use server';

import { Equipment, EquipmentDTO, TodoCollection } from '@/models';
import { convertToEquipment, convertToEquipmentDTO, convertToTodoCollection } from '@/models/convert';
import { executeQuery } from '@/utils/data';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

const equipmentSelectColumns = '*';
const equipmentTable = 'equipment';

const equipmentQuery = (supabase: SupabaseClient, id?: number): any => {
  const query = supabase.from(equipmentTable).select(equipmentSelectColumns);
  if (id) {
    return query.eq('id', id).single();
  } else {
    return query.order('name');
  }
};

const todoCollectionsQuery = (supabase: SupabaseClient, equipmentRid: number): any => {
  return supabase
    .from('todo_collections')
    .select('*, todo_items(*)')
    .eq('equipment_rid', equipmentRid)
    .eq('is_complete', false)
    .order('due_date', { nullsFirst: false })
    .order('created_at', { referencedTable: 'todo_items' });
};

const equipmentInsert = (supabase: SupabaseClient, equipment: Equipment): any => {
  return supabase.from(equipmentTable).insert(convertToEquipmentDTO(equipment)).select(equipmentSelectColumns).single();
};

const equipmentDelete = (supabase: SupabaseClient, equipment: Equipment): any => {
  return supabase.from('equipment').delete().eq('id', equipment.id);
};

const equipmentUpdate = (supabase: SupabaseClient, equipment: Equipment): any => {
  return supabase
    .from(equipmentTable)
    .update(convertToEquipmentDTO(equipment))
    .eq('id', equipment.id)
    .select(equipmentSelectColumns)
    .single();
};

export const fetchAllEquipment = async (): Promise<Equipment[]> => {
  if (await isNotLoggedIn()) {
    return [];
  }

  const supabase = createClient();
  const query = equipmentQuery(supabase);
  const data = await executeQuery<EquipmentDTO[]>(query);
  return (data || []).map((p) => convertToEquipment(p) as Equipment);
};

export const fetchEquipment = async (id: number): Promise<Equipment | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = equipmentQuery(supabase, id);
  const data = await executeQuery<EquipmentDTO>(query);
  return data ? (convertToEquipment(data) as Equipment) : null;
};

export const fetchTodoCollectionsForEquipment = async (equipmentRid: number): Promise<TodoCollection[] | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = todoCollectionsQuery(supabase, equipmentRid);
  const data = await executeQuery<EquipmentDTO[]>(query);
  return (data || []).map((p) => convertToTodoCollection(p) as TodoCollection);
};

export const addEquipment = async (equipment: Equipment): Promise<Equipment | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = equipmentInsert(supabase, equipment);
  const data = await executeQuery<EquipmentDTO>(query);
  return data ? (convertToEquipment(data) as Equipment) : null;
};

export const canDeleteEquipment = async (equipment: Equipment): Promise<boolean> => {
  if (await isNotLoggedIn()) {
    return false;
  }
  return true;
};

export const deleteEquipment = async (equipment: Equipment): Promise<void> => {
  if (await isNotLoggedIn()) {
    return;
  }

  const supabase = createClient();
  const query = equipmentDelete(supabase, equipment);
  await executeQuery(query);
};

export const updateEquipment = async (equipment: Equipment): Promise<Equipment | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = equipmentUpdate(supabase, equipment);
  const data = await executeQuery<EquipmentDTO>(query);
  return data ? (convertToEquipment(data) as Equipment) : null;
};
