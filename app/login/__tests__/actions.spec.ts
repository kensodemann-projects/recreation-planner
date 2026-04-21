import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { login, logout } from '../actions';

vi.mock('@/utils/supabase/server');
vi.mock('next/cache');
vi.mock('next/navigation');

import { createClient } from '@/utils/supabase/server';

describe('login actions', () => {
  let mockSignInWithPassword: Mock;
  let mockGetUser: Mock;
  let mockSignOut: Mock;

  beforeEach(() => {
    mockSignInWithPassword = vi.fn();
    mockGetUser = vi.fn();
    mockSignOut = vi.fn();

    vi.mocked(createClient).mockReturnValue({
      auth: {
        signInWithPassword: mockSignInWithPassword,
        getUser: mockGetUser,
        signOut: mockSignOut,
      },
    } as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    describe('on success', () => {
      beforeEach(() => {
        mockSignInWithPassword.mockResolvedValue({ error: null });
      });

      it('calls signInWithPassword with the provided email and password', async () => {
        await login('test@example.com', 'mypassword').catch(() => {});
        expect(mockSignInWithPassword).toHaveBeenCalledWith({ email: 'test@example.com', password: 'mypassword' });
      });

      it('revalidates the root layout path', async () => {
        await login('test@example.com', 'mypassword').catch(() => {});
        expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
      });

      it('redirects to /adventure', async () => {
        await login('test@example.com', 'mypassword').catch(() => {});
        expect(redirect).toHaveBeenCalledWith('/adventure');
      });
    });

    describe('on failure', () => {
      beforeEach(() => {
        mockSignInWithPassword.mockResolvedValue({ error: { message: 'Invalid login credentials' } });
      });

      it('returns success: false', async () => {
        const result = await login('test@example.com', 'wrongpassword');
        expect(result).toEqual({ error: 'Invalid login credentials', success: false });
      });

      it('does not revalidate the path', async () => {
        await login('test@example.com', 'wrongpassword');
        expect(revalidatePath).not.toHaveBeenCalled();
      });

      it('does not redirect', async () => {
        await login('test@example.com', 'wrongpassword');
        expect(redirect).not.toHaveBeenCalled();
      });
    });
  });

  describe('logout', () => {
    describe('when a user is logged in', () => {
      beforeEach(() => {
        mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123' } } });
      });

      it('calls signOut', async () => {
        await logout().catch(() => {});
        expect(mockSignOut).toHaveBeenCalled();
      });

      it('revalidates the root layout path', async () => {
        await logout().catch(() => {});
        expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
      });

      it('redirects to /', async () => {
        await logout().catch(() => {});
        expect(redirect).toHaveBeenCalledWith('/');
      });
    });

    describe('when no user is logged in', () => {
      beforeEach(() => {
        mockGetUser.mockResolvedValue({ data: { user: null } });
      });

      it('does not call signOut', async () => {
        await logout().catch(() => {});
        expect(mockSignOut).not.toHaveBeenCalled();
      });

      it('revalidates the root layout path', async () => {
        await logout().catch(() => {});
        expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
      });

      it('redirects to /', async () => {
        await logout().catch(() => {});
        expect(redirect).toHaveBeenCalledWith('/');
      });
    });
  });
});
