import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
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
      (isLoggedIn as Mock).mockResolvedValue(true);
      (fetchEquipment as Mock).mockResolvedValue({
        id: 3,
        name: 'Minimal amount of data',
      });
    });

    it('fetches the equipment', async () => {
      await DeleteEquipmentPage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchEquipment).toHaveBeenCalledExactlyOnceWith(3);
    });

    it('determines if the equipment can be deleted', async () => {
      await DeleteEquipmentPage({ params: Promise.resolve({ id: '3' }) });
      expect(canDeleteEquipment).toHaveBeenCalledExactlyOnceWith({
        id: 3,
        name: 'Minimal amount of data',
      });
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
      beforeEach(() => {
        (fetchEquipment as Mock).mockResolvedValue(null);
      });

      it('renders an error message', async () => {
        const jsx = await DeleteEquipmentPage({ params: Promise.resolve({ id: '3' }) });
        render(jsx);
        expect(screen.getByText('Failed to fetch the equipment')).toBeDefined();
      });

      it('does not render the delete equipment component', async () => {
        const jsx = await DeleteEquipmentPage({ params: Promise.resolve({ id: '3' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'Remove Equipment' })).toBeNull();
      });
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
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
