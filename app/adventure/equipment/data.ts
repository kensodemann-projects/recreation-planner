'use server';

import { Equipment } from '@/models';
import { convertToEquipment, convertToEquipmentDTO } from '@/models/convert';
import { isLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';

const equipmentSelectColumns = '*';
const equipmentTable = 'equipment';

export const fetchAllEquipment = async (): Promise<Array<Equipment>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase.from(equipmentTable).select(equipmentSelectColumns).order('name');

  return data?.map((p) => convertToEquipment(p) as Equipment) || [];
};

export const fetchEquipment = async (id: number): Promise<Equipment | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase.from(equipmentTable).select(equipmentSelectColumns).eq('id', id).single();

  return data ? (convertToEquipment(data) as Equipment) : null;
};

export const addEquipment = async (equipment: Equipment): Promise<Equipment | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase
    .from(equipmentTable)
    .insert(convertToEquipmentDTO(equipment))
    .select(equipmentSelectColumns)
    .single();

  return data ? (convertToEquipment(data) as Equipment) : null;
};

export const canDeleteEquipment = async (equipment: Equipment): Promise<boolean> => {
  if (!(await isLoggedIn())) {
    return false;
  }
  return true;
};

export const updateEquipment = async (item: Equipment): Promise<Equipment | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase
    .from(equipmentTable)
    .update(convertToEquipmentDTO(item))
    .eq('id', item.id)
    .select(equipmentSelectColumns)
    .single();

  return data ? (convertToEquipment(data) as Equipment) : null;
};
