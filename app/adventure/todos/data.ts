/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { TodoCollection, TodoCollectionDTO, TodoItem, TodoItemDTO } from '@/models';
import {
  convertToTodoCollection,
  convertToTodoCollectionDTO,
  convertToTodoItem,
  convertToTodoItemDTO,
} from '@/models/convert';
import { executeQuery } from '@/utils/data';
import { withAuth } from '@/utils/supabase/auth';
import { SupabaseClient } from '@supabase/supabase-js';

const collectionSelectColumns =
  '*, equipment(*, equipment_types!inner(*)), events(*, event_types!inner(*), places(*, place_types(*))  ), todo_items(*)';
const collectionTable = 'todo_collections';
const itemTable = 'todo_items';

const todoCollectionQuery = (supabase: SupabaseClient, id?: number): any => {
  const query = supabase.from(collectionTable).select(collectionSelectColumns);

  if (id) {
    return query.eq('id', id).order('created_at', { referencedTable: itemTable }).single();
  } else {
    return query.order('due_date', { nullsFirst: false }).order('created_at', { referencedTable: itemTable });
  }
};

const dueTodoCollectionQuery = (supabase: SupabaseClient, endDate: string): any =>
  supabase
    .from(collectionTable)
    .select(collectionSelectColumns)
    .lt('due_date', endDate)
    .order('due_date')
    .order('created_at');

const todoCollectionInsert = (supabase: SupabaseClient, collection: TodoCollection): any => {
  return supabase
    .from(collectionTable)
    .insert(convertToTodoCollectionDTO(collection))
    .select(collectionSelectColumns)
    .single();
};

const todoCollectionUpdate = (supabase: SupabaseClient, collection: TodoCollection): any => {
  return supabase
    .from(collectionTable)
    .update(convertToTodoCollectionDTO(collection))
    .eq('id', collection.id)
    .select(collectionSelectColumns)
    .single();
};

const todoCollectionDelete = (supabase: SupabaseClient, collection: TodoCollection): any =>
  supabase.from(collectionTable).delete().eq('id', collection.id);

const todoItemInsert = (supabase: SupabaseClient, item: TodoItem): any => {
  return supabase.from(itemTable).insert(convertToTodoItemDTO(item)).select('*').single();
};

const todoItemUpdate = (supabase: SupabaseClient, item: TodoItem): any => {
  return supabase.from(itemTable).update(convertToTodoItemDTO(item)).eq('id', item.id).select('*').single();
};

const todoItemDelete = (supabase: SupabaseClient, item: TodoItem): any =>
  supabase.from(itemTable).delete().eq('id', item.id);

export const fetchTodoCollections = async (): Promise<TodoCollection[]> => {
  const data = await withAuth((supabase: SupabaseClient) =>
    executeQuery<TodoCollectionDTO[]>(todoCollectionQuery(supabase)),
  );
  return (data || []).map((p) => convertToTodoCollection(p) as TodoCollection);
};

export const fetchTodoCollection = async (id: number): Promise<TodoCollection | null> => {
  const data = await withAuth((supabase: SupabaseClient) =>
    executeQuery<TodoCollectionDTO>(todoCollectionQuery(supabase, id)),
  );
  return data && (convertToTodoCollection(data) as TodoCollection);
};

export const fetchDueTodoCollections = async (dueDate: string): Promise<TodoCollection[]> => {
  const data = await withAuth((supabase: SupabaseClient) =>
    executeQuery<TodoCollectionDTO[]>(dueTodoCollectionQuery(supabase, dueDate)),
  );
  return (data || []).map((p) => convertToTodoCollection(p) as TodoCollection);
};

export const addTodoCollection = async (collection: TodoCollection): Promise<TodoCollection | null> => {
  const data = await withAuth((supabase: SupabaseClient) =>
    executeQuery<TodoCollectionDTO>(todoCollectionInsert(supabase, collection)),
  );
  return data && (convertToTodoCollection(data) as TodoCollection);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const canDeleteTodoCollection = async (collection: TodoCollection): Promise<boolean> => {
  return !!(await withAuth(async () => true));
};

export const deleteTodoCollection = async (collection: TodoCollection): Promise<void> => {
  await withAuth((supabase: SupabaseClient) => executeQuery<void>(todoCollectionDelete(supabase, collection)));
};

export const updateTodoCollection = async (collection: TodoCollection): Promise<TodoCollection | null> => {
  const data = await withAuth((supabase: SupabaseClient) =>
    executeQuery<TodoCollectionDTO>(todoCollectionUpdate(supabase, collection)),
  );
  return data && (convertToTodoCollection(data) as TodoCollection);
};

export const addTodoItem = async (item: TodoItem): Promise<TodoItem | null> => {
  const data = await withAuth((supabase: SupabaseClient) => executeQuery<TodoItemDTO>(todoItemInsert(supabase, item)));
  return data && (convertToTodoItem(data) as TodoItem);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const canDeleteTodoItem = async (item: TodoItem): Promise<boolean> => {
  return !!(await withAuth(async () => true));
};

export const deleteTodoItem = async (item: TodoItem): Promise<void> => {
  await withAuth((supabase: SupabaseClient) => executeQuery<void>(todoItemDelete(supabase, item)));
};

export const updateTodoItem = async (item: TodoItem): Promise<TodoItem | null> => {
  const data = await withAuth((supabase: SupabaseClient) => executeQuery<TodoItemDTO>(todoItemUpdate(supabase, item)));
  return data && (convertToTodoItem(data) as TodoItem);
};
