import { createClient } from '@/utils/supabase/server';
import { type Mock, vi } from 'vitest';

export const buildChainableMock = () => {
  const chain: Record<string, Mock> = {};
  ['select', 'insert', 'update', 'delete', 'eq', 'gt', 'lt', 'single', 'order', 'or', 'limit'].forEach((method) => {
    chain[method] = vi.fn().mockReturnValue(chain);
  });
  return chain;
};

export const setLoggedOut = () => {
  const client = createClient();
  (client.auth.getUser as Mock).mockResolvedValue({ data: { user: null }, error: null });
  vi.clearAllMocks();
};

export const setLoggedIn = () => {
  const client = createClient();
  (client.auth.getUser as Mock).mockResolvedValue({ data: { user: { id: 'foo', name: 'Bar Baz' } }, error: null });
  vi.clearAllMocks();
};
