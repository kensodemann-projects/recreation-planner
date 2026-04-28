export type QueryResult<T> =
  | { success: true; data: T }
  | { success: false; error: 'NOT_FOUND' | 'NOT_AUTHENTICATED' | 'SERVER_ERROR'; data?: never };

/* eslint-disable @typescript-eslint/no-explicit-any */
const performQuery = async <T>(query: any): Promise<QueryResult<T>> => {
  const { data, error } = await query;
  if (error) {
    console.error('Failed to execute query', error);
    return { success: false, error: error.code === 'PGRST116' ? 'NOT_FOUND' : 'SERVER_ERROR' };
  }
  return { success: true, data };
};

export const executeQuery = async <T>(query: any): Promise<QueryResult<T>> => {
  try {
    return await performQuery(query);
  } catch (err: unknown) {
    console.error(err);
    return { success: false, error: 'SERVER_ERROR' };
  }
};
