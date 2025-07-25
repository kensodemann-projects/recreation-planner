import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import CreateTodoCollectionForEquipmentPage from '../page';
import { fetchEquipment } from '@/app/adventure/equipment/data';
import { EQUIPMENT } from '@/app/adventure/equipment/__mocks__/data';

vi.mock('@/app/adventure/equipment/data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Create Todo Collection Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (fetchEquipment as Mock).mockResolvedValue(EQUIPMENT[1]);
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the equipment', async () => {
      const jsx = await CreateTodoCollectionForEquipmentPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(fetchEquipment).toHaveBeenCalledExactlyOnceWith(7342);
    });

    it('renders the create todo collection component', async () => {
      const jsx = await CreateTodoCollectionForEquipmentPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Add a New Todo Collection' })).toBeDefined();
      expect(screen.getByRole('heading', { level: 2, name: `For Equipment: ${EQUIPMENT[1].name}` })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await CreateTodoCollectionForEquipmentPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('does not fetche the equipment', async () => {
      const jsx = await CreateTodoCollectionForEquipmentPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(fetchEquipment).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await CreateTodoCollectionForEquipmentPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the create todo collection component', async () => {
      const jsx = await CreateTodoCollectionForEquipmentPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Add a New Todo Collection' })).toBeNull();
    });
  });
});
