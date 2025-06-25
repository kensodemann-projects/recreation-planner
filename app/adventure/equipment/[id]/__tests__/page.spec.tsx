import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import EquipmentPage from '../page';
import { fetchEquipment, fetchTodoCollectionsForEquipment } from '../../data';

vi.mock('@/utils/supabase/auth');
vi.mock('../../data');

describe('Equipment Page', () => {
  beforeEach(() => vi.clearAllMocks());

  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('fetches the equipment', async () => {
      await EquipmentPage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchEquipment).toHaveBeenCalledExactlyOnceWith(2);
    });

    it('fetches the todo collection for the equipment', async () => {
      await EquipmentPage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchTodoCollectionsForEquipment).toHaveBeenCalledExactlyOnceWith(2);
    });

    it('renders the page header', async () => {
      const jsx = await EquipmentPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Equipment Details' })).toBeDefined();
    });

    it('renders the equipment details', async () => {
      (fetchEquipment as Mock).mockResolvedValueOnce({
        id: 73,
        name: "Feynman's Van",
      });
      const jsx = await EquipmentPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 2, name: "Feynman's Van" })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await EquipmentPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
    });

    it('does not fetch any data', async () => {
      await EquipmentPage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchEquipment).not.toHaveBeenCalled();
      // expect(fetchTodoCollectionsForEvent).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await EquipmentPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the page header', async () => {
      const jsx = await EquipmentPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Equipment Details' })).toBeNull();
    });
  });
});
