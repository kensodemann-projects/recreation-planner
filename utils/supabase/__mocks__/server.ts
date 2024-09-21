import { vi } from 'vitest';

export const createClient = vi.fn().mockReturnValue({
  auth: {
    getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'foo', name: 'test user' } } }),
  },
});
