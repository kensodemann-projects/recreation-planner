import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { EQUIPMENT } from '../../../__mocks__/data';
import { canDeleteEquipment, fetchEquipment } from '../../../data';
import DeleteEquipmentPage from '../page';

vi.mock('../../../data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Delete Equipment Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the equipment', async () => {
      await DeleteEquipmentPage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchEquipment).toHaveBeenCalledExactlyOnceWith(3);
    });

    it('determines if the equipment can be deleted', async () => {
      await DeleteEquipmentPage({ params: Promise.resolve({ id: '3' }) });
      expect(canDeleteEquipment).toHaveBeenCalledExactlyOnceWith(EQUIPMENT.find((x) => x.id === 3));
    });

    it('renders the delete equipment component', async () => {
      const jsx = await DeleteEquipmentPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Remove Equipment' })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await DeleteEquipmentPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });

    describe('if the equipment cannot be fetched', () => {
      it('renders an error message', async () => {
        const jsx = await DeleteEquipmentPage({ params: Promise.resolve({ id: '524' }) });
        render(jsx);
        expect(screen.getByText('Failed to fetch the equipment')).toBeDefined();
      });

      it('does not render the delete equipment component', async () => {
        const jsx = await DeleteEquipmentPage({ params: Promise.resolve({ id: '524' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'Remove Equipment' })).toBeNull();
      });
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('does not fetch the equipment', async () => {
      await DeleteEquipmentPage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchEquipment).not.toHaveBeenCalled();
    });

    it('does not determine if the equipment can be deleted', async () => {
      await DeleteEquipmentPage({ params: Promise.resolve({ id: '3' }) });
      expect(canDeleteEquipment).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await DeleteEquipmentPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the delete equipment component', async () => {
      const jsx = await DeleteEquipmentPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Remove Equipment' })).toBeNull();
    });
  });
});
