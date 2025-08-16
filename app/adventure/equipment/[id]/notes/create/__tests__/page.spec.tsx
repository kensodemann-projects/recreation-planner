import { EQUIPMENT } from '@/app/adventure/equipment/__mocks__/data';
import { fetchEquipment } from '@/app/adventure/equipment/data';
import { Equipment } from '@/models';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import CreateNoteForEventPage from '../page';

vi.mock('@/app/adventure/equipment/data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Create Notes Page', () => {
  let testEquipment: Equipment;
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      testEquipment = EQUIPMENT.find((x) => x.id === 1)!;
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('finds a test equipment', () => {
      expect(testEquipment).toBeTruthy();
    });

    it('fetches the equipment', async () => {
      const jsx = await CreateNoteForEventPage({ params: Promise.resolve({ id: '1' }) });
      render(jsx);
      expect(fetchEquipment).toHaveBeenCalledExactlyOnceWith(1);
    });

    it('renders the event fetch failure message if the event fetch fails', async () => {
      const jsx = await CreateNoteForEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.getByText('Failed to fetch the event')).toBeDefined();
    });

    it('renders the create note component', async () => {
      const jsx = await CreateNoteForEventPage({ params: Promise.resolve({ id: '1' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Add a New Note' })).toBeDefined();
      expect(screen.getByRole('heading', { level: 2, name: `For Equipment: ${testEquipment.name}` })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await CreateNoteForEventPage({ params: Promise.resolve({ id: '1' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });

    it('does not render event fetch failure message', async () => {
      const jsx = await CreateNoteForEventPage({ params: Promise.resolve({ id: '1' }) });
      render(jsx);
      expect(screen.queryByText('Failed to fetch the event')).toBeNull();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('does not fetche the event', async () => {
      const jsx = await CreateNoteForEventPage({ params: Promise.resolve({ id: '1' }) });
      render(jsx);
      expect(fetchEquipment).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await CreateNoteForEventPage({ params: Promise.resolve({ id: '1' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the create note component', async () => {
      const jsx = await CreateNoteForEventPage({ params: Promise.resolve({ id: '1' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Add a New Note' })).toBeNull();
    });

    it('does not render event fetch failure message', async () => {
      const jsx = await CreateNoteForEventPage({ params: Promise.resolve({ id: '7342' }) });
      render(jsx);
      expect(screen.queryByText('Failed to fetch the event')).toBeNull();
    });
  });
});
