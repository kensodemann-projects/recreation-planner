import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { fetchAllEquipment } from '../data';
import EquipmentPage from '../page';

vi.mock('../data');
vi.mock('@/utils/supabase/auth');

describe('Equipment Page', () => {
  afterEach(() => cleanup());
  beforeEach(() => vi.clearAllMocks());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the equipment', async () => {
      const jsx = await EquipmentPage();
      render(jsx);
      expect(fetchAllEquipment).toHaveBeenCalledExactlyOnceWith();
    });

    it('renders the equipment component', async () => {
      const jsx = await EquipmentPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Equipment' })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await EquipmentPage();
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('renders the must be logged in component', async () => {
      const jsx = await EquipmentPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not fetch the equipment', async () => {
      const jsx = await EquipmentPage();
      render(jsx);
      expect(fetchAllEquipment).not.toHaveBeenCalled();
    });

    it('does not render the equipment component', async () => {
      const jsx = await EquipmentPage();
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Equipment' })).toBeNull();
    });
  });
});
