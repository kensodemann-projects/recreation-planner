import { createClient } from '@/utils/supabase/server';
import { type Mock, vi } from 'vitest';

export interface SupabaseChainableMock extends Record<string, Mock> {
  select: Mock;
  insert: Mock;
  update: Mock;
  delete: Mock;
  eq: Mock;
  gt: Mock;
  gte: Mock;
  lt: Mock;
  lte: Mock;
  single: Mock;
  order: Mock;
  or: Mock;
  limit: Mock;
}

export const buildSupabaseChainableMock = (): SupabaseChainableMock => {
  const chain: Record<string, Mock> = {};
  ['select', 'insert', 'update', 'delete', 'eq', 'gt', 'gte', 'lt', 'lte', 'single', 'order', 'or', 'limit'].forEach(
    (method) => {
      chain[method] = vi.fn().mockReturnValue(chain);
    },
  );
  return chain as SupabaseChainableMock;
};

export const setLoggedOut = () => {
  const client = createClient();
  (createClient as Mock).mockClear();
  (client.auth.getUser as Mock).mockClear();
  (client.auth.getUser as Mock).mockResolvedValue({ data: { user: null }, error: null });
};

export const setLoggedIn = () => {
  const client = createClient();
  (createClient as Mock).mockClear();
  (client.auth.getUser as Mock).mockClear();
  (client.auth.getUser as Mock).mockResolvedValue({ data: { user: { id: 'foo', name: 'Bar Baz' } }, error: null });
};
