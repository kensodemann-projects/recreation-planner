import { fetchEvent } from '@/app/adventure/events/data';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import CreateTodoCollectionForEventPage from '../page';

vi.mock('@/app/adventure/events/data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Create Todo Collection Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (fetchEvent as Mock).mockResolvedValue({
        id: 314,
        beginDate: '2024-09-28',
        beginTime: '18:30',
        endDate: '2024-09-30',
        endTime: '22:30',
        name: "Women's Hockey Tournament",
        description: 'A three day long tournament of women playing hockey',
      });
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the event', async () => {
      const jsx = await CreateTodoCollectionForEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(fetchEvent).toHaveBeenCalledExactlyOnceWith(7342);
    });

    it('renders the create todo collection component', async () => {
      const jsx = await CreateTodoCollectionForEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Add a New Todo Collection' })).toBeDefined();
      expect(
        screen.getByRole('heading', { level: 2, name: "For Trip / Event: Women's Hockey Tournament" }),
      ).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await CreateTodoCollectionForEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('does not fetche the event', async () => {
      const jsx = await CreateTodoCollectionForEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(fetchEvent).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await CreateTodoCollectionForEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the create todo collection component', async () => {
      const jsx = await CreateTodoCollectionForEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Add a New Todo Collection' })).toBeNull();
    });
  });
});
