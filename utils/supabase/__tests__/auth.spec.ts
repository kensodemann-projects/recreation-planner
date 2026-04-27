import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createClient } from '../server';
import { isNotLoggedIn, withAuth } from '../auth';

vi.mock('../server');

const mockCreateClient = vi.mocked(createClient);

describe('isNotLoggedIn', () => {
  it('returns false when a user is logged in', async () => {
    expect(await isNotLoggedIn()).toBe(false);
  });

  it('returns true when no user is logged in', async () => {
    mockCreateClient.mockReturnValueOnce({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    expect(await isNotLoggedIn()).toBe(true);
  });
});

describe('withAuth', () => {
  const mockFn = vi.fn();

  beforeEach(() => {
    mockFn.mockReset();
  });

  it('calls fn with the supabase client when a user is logged in', async () => {
    mockFn.mockResolvedValue('result');
    const result = await withAuth(mockFn);

    expect(mockFn).toHaveBeenCalledOnce();
    expect(result).toBe('result');
  });

  it('passes the supabase client to fn', async () => {
    mockFn.mockResolvedValue(null);
    await withAuth(mockFn);

    const supabase = mockCreateClient.mock.results[0].value;
    expect(mockFn).toHaveBeenCalledWith(supabase);
  });

  it('returns null when no user is logged in', async () => {
    mockCreateClient.mockReturnValueOnce({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const result = await withAuth(mockFn);

    expect(mockFn).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
