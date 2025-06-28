import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import EquipmentPage from '../page';
import { fetchEquipment, fetchTodoCollectionsForEquipment } from '../../data';
import { EQUIPMENT } from '../../__mocks__/data';

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
      const eq = EQUIPMENT.find((x) => x.id === 2);
      const jsx = await EquipmentPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 2, name: eq!.name })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await EquipmentPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });

    describe('if the equipment cannot be fetched', () => {
      it('renders an error message', async () => {
        const jsx = await EquipmentPage({ params: Promise.resolve({ id: '52' }) });
        render(jsx);
        expect(screen.getByText('Failed to fetch the equipment')).toBeDefined();
      });

      it('does not render the delete equipment component', async () => {
        const jsx = await EquipmentPage({ params: Promise.resolve({ id: '52' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'Equipment Details' })).toBeNull();
      });
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
