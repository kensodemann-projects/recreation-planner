import { vi } from 'vitest';

export const isNotLoggedIn = vi.fn().mockResolvedValue(false);
