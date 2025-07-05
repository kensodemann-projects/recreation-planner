import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import CreateEquipmentPage from '../page';
import { fetchEquipmentTypes } from '../../data';

vi.mock('../../data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Create Equipment Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the equipment types', async () => {
      await CreateEquipmentPage();
      expect(fetchEquipmentTypes).toHaveBeenCalledExactlyOnceWith();
    });

    it('renders the create todo collection component', async () => {
      const jsx = await CreateEquipmentPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Add a New Piece of Equipment' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('does not fetch the equipment types', async () => {
      await CreateEquipmentPage();
      expect(fetchEquipmentTypes).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await CreateEquipmentPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
