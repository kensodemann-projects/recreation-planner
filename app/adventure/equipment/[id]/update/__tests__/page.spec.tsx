import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { fetchEquipment, fetchEquipmentTypes } from '../../../data';
import UpdateEquipmentPage from '../page';

vi.mock('../../../data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Update Equipment Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the equipment', async () => {
      await UpdateEquipmentPage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchEquipment).toHaveBeenCalledExactlyOnceWith(2);
    });

    it('fetches the equipment types', async () => {
      await UpdateEquipmentPage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchEquipmentTypes).toHaveBeenCalledExactlyOnceWith();
    });

    it('renders the update equipment component', async () => {
      const jsx = await UpdateEquipmentPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Update the Equipment' })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await UpdateEquipmentPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });

    describe('if the equipment cannot be fetched', () => {
      it('renders an error message', async () => {
        const jsx = await UpdateEquipmentPage({ params: Promise.resolve({ id: '23' }) });
        render(jsx);
        expect(screen.getByText('Failed to fetch the equipment')).toBeDefined();
      });

      it('does not render the update equipment component', async () => {
        const jsx = await UpdateEquipmentPage({ params: Promise.resolve({ id: '23' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'Update the Equipment' })).toBeNull();
      });
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('does not fetch the equipment', async () => {
      await UpdateEquipmentPage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchEquipment).not.toHaveBeenCalled();
    });

    it('does not fetch the equipment types', async () => {
      await UpdateEquipmentPage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchEquipmentTypes).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await UpdateEquipmentPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the update equipment component', async () => {
      const jsx = await UpdateEquipmentPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Update the Equipment' })).toBeNull();
    });
  });
});
