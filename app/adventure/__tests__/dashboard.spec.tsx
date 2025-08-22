import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Dashboard from '../dashboard';
import { EVENTS } from '../events/__mocks__/data';

describe('dashboard component', () => {
  beforeEach(() => vi.clearAllMocks());

  afterEach(() => cleanup());

  describe('with current events', () => {
    it('displays the "Upcoming Trips & Events" header', () => {
      render(<Dashboard currentEvents={EVENTS} />);
      expect(screen.getByRole('heading', { name: 'Upcoming Trips & Events', level: 2 })).toBeDefined();
    });
  });

  describe('without current events', () => {
    it('does not display the "Upcoming Trips & Events" header', () => {
      render(<Dashboard currentEvents={[]} />);
      expect(screen.queryByRole('heading', { name: 'Upcoming Trips & Events', level: 2 })).toBeNull();
    });
  });
});
