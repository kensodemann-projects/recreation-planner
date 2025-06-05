import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ReservationEditor from '../reservation-editor';

describe('Reservation Editor', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('Cancel Button', () => {
    it('exists', () => {
      render(<ReservationEditor onCancel={() => null} onConfirm={() => null} />);
      const btn = screen.getByRole('button', { name: 'Cancel' });
      expect(btn).toBeDefined();
    });

    it('fires onCancel when clicked', async () => {
      const user = userEvent.setup();
      let fired = false;
      render(<ReservationEditor onCancel={() => (fired = true)} onConfirm={() => null} />);
      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(fired).toBe(true);
    });
  });
});
