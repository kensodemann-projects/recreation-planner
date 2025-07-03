'use server';

import { TodoCollection, TodoCollectionDTO, TodoItem, TodoItemDTO } from '@/models';
import {
  convertToTodoCollection,
  convertToTodoCollectionDTO,
  convertToTodoItem,
  convertToTodoItemDTO,
} from '@/models/convert';
import { executeQuery } from '@/utils/data';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

const collectionSelectColumns = '*, todo_items(*)';
const collectionTable = 'todo_collections';
const itemTable = 'todo_items';

const todoCollectionQuery = (supabase: SupabaseClient, id?: number): any => {
  const query = supabase.from(collectionTable).select(collectionSelectColumns);

  if (id) {
    return query.eq('id', id).order('created_at', { referencedTable: itemTable }).single();
  } else {
    return query
      .eq('is_complete', false)
      .order('due_date', { nullsFirst: false })
      .order('created_at', { referencedTable: itemTable });
  }
};

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

const todoItemInsert = (supabase: SupabaseClient, item: TodoItem): any => {
  return supabase.from(itemTable).insert(convertToTodoItemDTO(item)).select('*').single();
};

const todoItemUpdate = (supabase: SupabaseClient, item: TodoItem): any => {
  return supabase.from(itemTable).update(convertToTodoItemDTO(item)).eq('id', item.id).select('*').single();
};

export const fetchOpenTodoCollections = async (): Promise<TodoCollection[]> => {
  if (await isNotLoggedIn()) {
    return [];
  }

  const supabase = createClient();
  const query = todoCollectionQuery(supabase);
  const data = await executeQuery<TodoCollectionDTO[]>(query);
  return (data || []).map((p) => convertToTodoCollection(p) as TodoCollection);
};

export const fetchTodoCollection = async (id: number): Promise<TodoCollection | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = todoCollectionQuery(supabase, id);
  const data = await executeQuery<TodoCollectionDTO>(query);
  return data && (convertToTodoCollection(data) as TodoCollection);
};

export const addTodoCollection = async (collection: TodoCollection): Promise<TodoCollection | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = todoCollectionInsert(supabase, collection);
  const data = await executeQuery<TodoCollectionDTO>(query);
  return data && (convertToTodoCollection(data) as TodoCollection);
};

export const canDeleteTodoCollection = async (collection: TodoCollection): Promise<boolean> => {
  if (await isNotLoggedIn()) {
    return false;
  }
  return true;
};

export const updateTodoCollection = async (collection: TodoCollection): Promise<TodoCollection | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = todoCollectionUpdate(supabase, collection);
  const data = await executeQuery<TodoCollectionDTO>(query);
  return data && (convertToTodoCollection(data) as TodoCollection);
};

export const addTodoItem = async (item: TodoItem): Promise<TodoItem | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = todoItemInsert(supabase, item);
  const data = await executeQuery<TodoItemDTO>(query);
  return data && (convertToTodoItem(data) as TodoItem);
};

export const canDeleteTodoItem = async (item: TodoItem): Promise<boolean> => {
  if (await isNotLoggedIn()) {
    return false;
  }
  return true;
};

export const updateTodoItem = async (item: TodoItem): Promise<TodoItem | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = todoItemUpdate(supabase, item);
  const data = await executeQuery<TodoItemDTO>(query);
  return data && (convertToTodoItem(data) as TodoItem);
};
