import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Page from '../page';

const router = {
  push: vi.fn(),
};

vi.mock('@/utils/supabase/auth');

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a onClick={() => router.push(href)}>{children}</a>;
  },
}));

describe('Home Page', () => {
  afterEach(() => cleanup());
  beforeEach(() => vi.clearAllMocks());

  it('has a header', async () => {
    const page = await Page();
    render(page);
    expect(screen.getByRole('heading', { level: 1, name: 'Recreation Planner' })).toBeDefined();
  });

  describe('navigation', () => {
    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      it('is labeled "Start Your Adventures" ', async () => {
        const page = await Page();
        render(page);
        expect(screen.queryByText('Login')).toBeNull();
        expect(screen.getByText('Start Your Adventures')).toBeDefined();
      });

      it('links to the adventure route', async () => {
        const user = userEvent.setup();
        const page = await Page();
        render(page);
        const link = screen.getByText('Start Your Adventures');
        await user.click(link);
        expect(router.push).toHaveBeenCalledExactlyOnceWith('/adventure');
      });

      it('includes an appropriate tag line', async () => {
        const page = await Page();
        render(page);
        expect(screen.getByText('Your adventures await')).toBeDefined();
        expect(screen.queryByText('Log in to start planning your next adventure')).toBeNull();
      });
    });

    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('is labeled "Login" ', async () => {
        const page = await Page();
        render(page);
        expect(screen.getByText('Login')).toBeDefined();
        expect(screen.queryByText('Start Your Adventures')).toBeNull();
      });

      it('links to the login route', async () => {
        const user = userEvent.setup();
        const page = await Page();
        render(page);
        const link = screen.getByText('Login');
        await user.click(link);
        expect(router.push).toHaveBeenCalledExactlyOnceWith('/login');
      });

      it('includes an appropriate tag line', async () => {
        const page = await Page();
        render(page);
        expect(screen.queryByText('Your adventures await')).toBeNull();
        expect(screen.getByText('Log in to start planning your next adventure')).toBeDefined();
      });
    });
  });
});
