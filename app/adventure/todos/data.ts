'use server';

import { TodoCollection } from '@/models';
import { convertToTodoCollection } from '@/models/convert';
import { isLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';

const selectColumns = '*, todo_items(*)';

export const fetchOpenTodoCollections = async (): Promise<Array<TodoCollection>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase
    .from('todo_collections')
    .select(selectColumns)
    .eq('is_complete', false)
    .order('due_date', { nullsFirst: false });

  return data?.map((p) => convertToTodoCollection(p) as TodoCollection) || [];
};
