/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import {
  Equipment,
  EquipmentDTO,
  MaintenanceItem,
  MaintenanceItemDTO,
  EquipmentType,
  EquipmentTypeDTO,
  MaintenanceType,
  MaintenanceTypeDTO,
  UsageUnits,
  UsageUnitsDTO,
} from '@/models';
import {
  convertToEquipment,
  convertToEquipmentDTO,
  convertToMaintenance,
  convertToMaintenanceDTO,
  convertToMaintenanceType,
  convertToEquipmentType,
  convertToUsageUnits,
} from '@/models/convert';
import { executeQuery } from '@/utils/data';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

const equipmentSelectColumns = '*, equipment_types!inner(*)';
const maintenanceItemsSelectColumns = '*, maintenance_types!inner(*), usage_units(*)';
const childTableColumns = `, maintenance_items(${maintenanceItemsSelectColumns}), notes(*), todo_collections(*, todo_items(*))`;
const equipmentTable = 'equipment';
const maintenanceItemsTable = 'maintenance_items';

const equipmentQuery = (supabase: SupabaseClient, id?: number): any => {
  const query = supabase.from(equipmentTable).select(equipmentSelectColumns);
  if (id) {
    return query.eq('id', id).single();
  } else {
    return query.order('name');
  }
};

const fullEquipmentQuery = (supabase: SupabaseClient, id?: number): any => {
  const query = supabase.from(equipmentTable).select(equipmentSelectColumns + childTableColumns);
  if (id) {
    return query.eq('id', id).single();
  } else {
    return query.order('name');
  }
};

const equipmentInsert = (supabase: SupabaseClient, equipment: Equipment): any =>
  supabase.from(equipmentTable).insert(convertToEquipmentDTO(equipment)).select(equipmentSelectColumns).single();

const equipmentDelete = (supabase: SupabaseClient, equipment: Equipment): any =>
  supabase.from('equipment').delete().eq('id', equipment.id);

const equipmentUpdate = (supabase: SupabaseClient, equipment: Equipment): any =>
  supabase
    .from(equipmentTable)
    .update(convertToEquipmentDTO(equipment))
    .eq('id', equipment.id)
    .select(equipmentSelectColumns)
    .single();

const equipmentTypesQuery = (supabase: SupabaseClient): any =>
  supabase.from('equipment_types').select('*').order('name');

const maintenanceTypesQuery = (supabase: SupabaseClient): any =>
  supabase.from('maintenance_types').select('*').order('name');

const usageUnitsQuery = (supabase: SupabaseClient): any => supabase.from('usage_units').select('*').order('id');

const maintenanceItemQuery = (supabase: SupabaseClient, id: number): any =>
  supabase.from(maintenanceItemsTable).select(maintenanceItemsSelectColumns).eq('id', id).single();

const maintenanceItemInsert = (supabase: SupabaseClient, item: MaintenanceItem): any =>
  supabase
    .from(maintenanceItemsTable)
    .insert(convertToMaintenanceDTO(item))
    .select(maintenanceItemsSelectColumns)
    .single();

const maintenanceItemDelete = (supabase: SupabaseClient, item: MaintenanceItem): any =>
  supabase.from(maintenanceItemsTable).delete().eq('id', item.id);

const maintenanceItemUpdate = (supabase: SupabaseClient, item: MaintenanceItem): any =>
  supabase
    .from(maintenanceItemsTable)
    .update(convertToMaintenanceDTO(item))
    .eq('id', item.id)
    .select(maintenanceItemsSelectColumns)
    .single();

export const fetchAllEquipment = async (): Promise<Equipment[]> => {
  if (await isNotLoggedIn()) {
    return [];
  }

  const supabase = createClient();
  const query = equipmentQuery(supabase);
  const data = await executeQuery<EquipmentDTO[]>(query);
  return (data || []).map((p) => convertToEquipment(p) as Equipment);
};

export const fetchEquipment = async (id: number, full?: boolean): Promise<Equipment | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = full ? fullEquipmentQuery(supabase, id) : equipmentQuery(supabase, id);
  const data = await executeQuery<EquipmentDTO>(query);
  return data ? (convertToEquipment(data) as Equipment) : null;
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const fetchEquipmentTypes = async (): Promise<EquipmentType[]> => {
  if (await isNotLoggedIn()) {
    return [];
  }

  const supabase = createClient();
  const query = equipmentTypesQuery(supabase);
  const data = await executeQuery<EquipmentTypeDTO[]>(query);
  return (data || []).map((p) => convertToEquipmentType(p) as EquipmentType);
};

export const fetchMaintenanceItem = async (id: number): Promise<MaintenanceItem | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = maintenanceItemQuery(supabase, id);
  const data = await executeQuery<MaintenanceItemDTO>(query);
  return data && convertToMaintenance(data);
};

export const addMaintenanceItem = async (item: MaintenanceItem): Promise<MaintenanceItem | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = maintenanceItemInsert(supabase, item);
  const data = await executeQuery<MaintenanceItemDTO>(query);
  return data ? convertToMaintenance(data) : null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const canDeleteMaintenanceItem = async (item: MaintenanceItem): Promise<boolean> => {
  if (await isNotLoggedIn()) {
    return false;
  }
  return true;
};

export const deleteMaintenanceItem = async (item: MaintenanceItem): Promise<void> => {
  if (await isNotLoggedIn()) {
    return;
  }

  const supabase = createClient();
  const query = maintenanceItemDelete(supabase, item);
  await executeQuery(query);
};

export const updateMaintenanceItem = async (item: MaintenanceItem): Promise<MaintenanceItem | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = maintenanceItemUpdate(supabase, item);
  const data = await executeQuery<MaintenanceItemDTO>(query);
  return data ? convertToMaintenance(data) : null;
};

export const fetchMaintenanceTypes = async (): Promise<MaintenanceType[]> => {
  if (await isNotLoggedIn()) {
    return [];
  }

  const supabase = createClient();
  const query = maintenanceTypesQuery(supabase);
  const data = await executeQuery<MaintenanceTypeDTO[]>(query);
  return (data || []).map((p) => convertToMaintenanceType(p) as MaintenanceType);
};

export const fetchUsageUnits = async (): Promise<UsageUnits[]> => {
  if (await isNotLoggedIn()) {
    return [];
  }

  const supabase = createClient();
  const query = usageUnitsQuery(supabase);
  const data = await executeQuery<UsageUnitsDTO[]>(query);
  return (data || []).map((p) => convertToUsageUnits(p) as UsageUnits);
};
