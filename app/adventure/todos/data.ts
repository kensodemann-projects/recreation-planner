'use server';

import { TodoCollection, TodoItem } from '@/models';
import {
  convertToTodoCollection,
  convertToTodoCollectionDTO,
  convertToTodoItem,
  convertToTodoItemDTO,
} from '@/models/convert';
import { isLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';

const collectionSelectColumns = '*, todo_items(*)';
const collectionTable = 'todo_collections';
const itemTable = 'todo_items';

export const fetchOpenTodoCollections = async (): Promise<Array<TodoCollection>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase
    .from(collectionTable)
    .select(collectionSelectColumns)
    .eq('is_complete', false)
    .order('due_date', { nullsFirst: false })
    .order('created_at', { referencedTable: itemTable });

  return data?.map((p) => convertToTodoCollection(p) as TodoCollection) || [];
};

export const addTodoCollection = async (collection: TodoCollection): Promise<TodoCollection | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase
    .from(collectionTable)
    .insert(convertToTodoCollectionDTO(collection))
    .select(collectionSelectColumns);

  return data && data.length ? (convertToTodoCollection(data[0]) as TodoCollection) : null;
};

export const canDeleteTodoCollection = async (collection: TodoCollection): Promise<boolean> => {
  if (!(await isLoggedIn())) {
    return false;
  }
  return true;
};

export const updateTodoCollection = async (collection: TodoCollection): Promise<TodoCollection | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase
    .from(collectionTable)
    .update(convertToTodoCollectionDTO(collection))
    .eq('id', collection.id)
    .select(collectionSelectColumns);

  return data && data.length ? (convertToTodoCollection(data[0]) as TodoCollection) : null;
};

export const addTodoItem = async (item: TodoItem): Promise<TodoItem | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase.from(itemTable).insert(convertToTodoItemDTO(item)).select('*');

  return data && data.length ? (convertToTodoItem(data[0]) as TodoItem) : null;
};

export const canDeleteTodoItem = async (item: TodoItem): Promise<boolean> => {
  if (!(await isLoggedIn())) {
    return false;
  }
  return true;
};

export const updateTodoItem = async (item: TodoItem): Promise<TodoItem | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase.from(itemTable).update(convertToTodoItemDTO(item)).eq('id', item.id).select('*');

  return data && data.length ? (convertToTodoItem(data[0]) as TodoItem) : null;
};
