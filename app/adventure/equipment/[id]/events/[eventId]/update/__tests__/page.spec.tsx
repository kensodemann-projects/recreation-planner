import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import UpdateEquipmentEventPage from '../page';
import { fetchEquipmentEvent, fetchEquipmentEventTypes, fetchUsageUnits } from '@/app/adventure/equipment/data';
import { EQUIPMENT_EVENTS } from '@/app/adventure/equipment/__mocks__/data';

vi.mock('@/utils/supabase/auth');
vi.mock('@/app/adventure/equipment/data');
vi.mock('next/navigation');

describe('equipment event update page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetchEquipmentEvent as Mock).mockResolvedValue(EQUIPMENT_EVENTS[1]);
  });
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the equipmnt event', async () => {
      await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
      expect(fetchEquipmentEvent).toHaveBeenCalledExactlyOnceWith(42);
    });

    it('fetches the equipment event types', async () => {
      await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
      expect(fetchEquipmentEventTypes).toHaveBeenCalledExactlyOnceWith();
    });

    it('fetches the usage units', async () => {
      await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
      expect(fetchUsageUnits).toHaveBeenCalledExactlyOnceWith();
    });

    it('renders the page headers', async () => {
      const jsx = await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Update Maintenance Event' })).toBeDefined();
      expect(
        screen.getByRole('heading', { level: 2, name: `For: ${EQUIPMENT_EVENTS[1].equipment.name}` }),
      ).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });

    it('does not renders a fetch failure message', async () => {
      const jsx = await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
      render(jsx);
      expect(screen.queryByText('Failed to fetch the maintenance event')).toBeNull();
    });

    describe('if the maintenance event cannot be fetched', () => {
      beforeEach(() => {
        (fetchEquipmentEvent as Mock).mockResolvedValueOnce(null);
      });

      it('does not fetch the extra data', async () => {
        await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
        expect(fetchEquipmentEventTypes).not.toHaveBeenCalled();
        expect(fetchUsageUnits).not.toHaveBeenCalled();
      });

      it('renders a simple error message', async () => {
        const jsx = await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
        render(jsx);
        expect(screen.getByText('Failed to fetch the maintenance event')).toBeDefined();
      });

      it('does not render the page headers', async () => {
        const jsx = await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'Update Maintenance Event' })).toBeNull();
        expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
      });

      it('does not render the must be logged in component', async () => {
        const jsx = await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
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
      await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
      expect(fetchEquipmentEvent).not.toHaveBeenCalled();
      expect(fetchEquipmentEventTypes).not.toHaveBeenCalled();
      expect(fetchUsageUnits).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the page headers', async () => {
      const jsx = await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Update Maintenance Event' })).toBeNull();
    });

    it('does not renders a fetch failure message', async () => {
      const jsx = await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2', eventId: '42' }) });
      render(jsx);
      expect(screen.queryByText('Failed to fetch the maintenance event')).toBeNull();
    });
  });
});
