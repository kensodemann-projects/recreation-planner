const performQuery = async <T>(query: any): Promise<T | null> => {
  const { data, error } = await query;
  if (error) {
    console.error('Failed to execute query', error);
    return null;
  }
  return data;
};

export const executeQuery = async <T>(query: any): Promise<T | null> => {
  try {
    return await performQuery(query);
  } catch (err: unknown) {
    console.error(err);
    return null;
  }
};
