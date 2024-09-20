import { vi } from 'vitest';

export const login = vi.fn().mockResolvedValue(undefined);
export const logout = vi.fn().mockResolvedValue(undefined);
