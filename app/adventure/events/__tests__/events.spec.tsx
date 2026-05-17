import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EVENTS } from '../__mocks__/data';
import Events from '../events';

vi.mock('../events-list', () => ({ default: () => <div data-testid="events-list" /> }));
vi.mock('../events-table', () => ({ default: () => <div data-testid="events-table" /> }));
vi.mock('../ui/event-card', () => ({
  default: ({ event }: { event: { name: string } }) => <div data-testid="event-card">{event.name}</div>,
}));

describe('Events', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('upcoming events', () => {
    it('renders the "Upcoming Trips & Events" section heading', () => {
      render(<Events upcomingEvents={EVENTS} priorEvents={[]} />);
      expect(screen.getByRole('heading', { name: 'Upcoming Trips & Events' })).toBeDefined();
    });

    it('renders a card for each upcoming event', () => {
      render(<Events upcomingEvents={EVENTS} priorEvents={[]} />);
      const cards = screen.getAllByTestId('event-card');
      expect(cards).toHaveLength(EVENTS.length);
    });

    it('displays a no events message', () => {
      render(<Events upcomingEvents={[]} priorEvents={EVENTS} />);
      expect(screen.getByRole('heading', { name: 'Upcoming Trips & Events' })).toBeDefined();
      expect(screen.getByText('You have no upcoming events.')).toBeDefined();
    });
  });

  describe('prior events', () => {
    it('renders the "Prior Trips & Events" section heading', () => {
      render(<Events upcomingEvents={[]} priorEvents={EVENTS} />);
      expect(screen.getByRole('heading', { name: 'Prior Trips & Events' })).toBeDefined();
    });

    it('renders a card for each prior event', () => {
      render(<Events upcomingEvents={[]} priorEvents={EVENTS} />);
      const cards = screen.getAllByTestId('event-card');
      expect(cards).toHaveLength(EVENTS.length);
    });

    it('displays a no events message', () => {
      render(<Events upcomingEvents={EVENTS} priorEvents={[]} />);
      expect(screen.getByRole('heading', { name: 'Prior Trips & Events' })).toBeDefined();
      expect(screen.getByText('You have no prior events.')).toBeDefined();
    });
  });

  describe('Show All checkboxes', () => {
    it('renders two Show All checkboxes when both sections are present', () => {
      render(<Events upcomingEvents={[]} priorEvents={[]} />);
      const checkboxes = screen.getAllByLabelText('Show All', { selector: 'input[type="checkbox"]' });
      expect(checkboxes.length).toBeGreaterThanOrEqual(2);
    });
  });
});
