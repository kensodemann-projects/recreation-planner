import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import UpdateEquipmentEventPage from '../page';

vi.mock('@/utils/supabase/auth');

describe('equipment event update page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('renders the update equipment event component', async () => {
      const jsx = await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Update Maintenance Event' })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('renders the must be logged in component', async () => {
      const jsx = await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the update equipment event component', async () => {
      const jsx = await UpdateEquipmentEventPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Update Maintenance Event' })).toBeNull();
    });
  });
});
