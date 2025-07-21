import { EQUIPMENT } from '@/app/adventure/equipment/__mocks__/data';
import { fetchEquipment, fetchEquipmentEventTypes, fetchUsageUnits } from '@/app/adventure/equipment/data';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import CreateEquipmentEventPage from '../page';

vi.mock('@/app/adventure/equipment/data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Create Equipment Event Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (fetchEquipment as Mock).mockResolvedValue(EQUIPMENT[0]);
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the equipment', async () => {
      const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(fetchEquipment).toHaveBeenCalledExactlyOnceWith(7342);
    });

    it('fetches the equipment event types', async () => {
      const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(fetchEquipmentEventTypes).toHaveBeenCalledExactlyOnceWith();
    });

    it('fetches the usage units', async () => {
      const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(fetchUsageUnits).toHaveBeenCalledExactlyOnceWith();
    });

    it('renders the create equipment event component', async () => {
      const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Add a New Maintenance Event' })).toBeDefined();
      expect(screen.getByRole('heading', { level: 2, name: `For: ${EQUIPMENT[0].name}` })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });

    it('does not render the failed fetch error message', async () => {
      const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.queryByText('Failed to fetch the equipment')).toBeNull();
    });

    describe('if the equipment fetch fails', () => {
      beforeEach(() => {
        (fetchEquipment as Mock).mockResolvedValue(null);
      });

      it('renders a simple error message', async () => {
        const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
        render(jsx);
        expect(screen.getByText('Failed to fetch the equipment')).toBeDefined();
      });

      it('does not fetch anything else', async () => {
        const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
        render(jsx);
        expect(fetchEquipmentEventTypes).not.toHaveBeenCalled();
        expect(fetchUsageUnits).not.toHaveBeenCalled();
      });

      it('does not render the create equipment event component', async () => {
        const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'Add a New Maintenance Event' })).toBeNull();
        expect(screen.queryByRole('heading', { level: 2, name: `For: ${EQUIPMENT[0].name}` })).toBeNull();
      });

      it('does not render the must be logged in component', async () => {
        const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
      });
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('does not fetch anything', async () => {
      const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(fetchEquipment).not.toHaveBeenCalled();
      expect(fetchEquipmentEventTypes).not.toHaveBeenCalled();
      expect(fetchUsageUnits).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the create todo collection component', async () => {
      const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Add a New Maintenance Event' })).toBeNull();
    });

    it('does not render the failed fetch error message', async () => {
      const jsx = await CreateEquipmentEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.queryByText('Failed to fetch the equipment')).toBeNull();
    });
  });
});
