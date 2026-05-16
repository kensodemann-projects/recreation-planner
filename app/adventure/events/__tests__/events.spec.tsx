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

  describe('with upcoming events', () => {
    it('renders the "Upcoming Trips & Events" section heading', () => {
      render(<Events upcomingEvents={EVENTS} priorEvents={[]} />);
      expect(screen.getByRole('heading', { name: 'Upcoming Trips & Events' })).toBeDefined();
    });

    it('renders a card for each upcoming event', () => {
      render(<Events upcomingEvents={EVENTS} priorEvents={[]} />);
      const cards = screen.getAllByTestId('event-card');
      expect(cards).toHaveLength(EVENTS.length);
    });

    it('does not render the events list', () => {
      render(<Events upcomingEvents={EVENTS} priorEvents={[]} />);
      expect(screen.queryByTestId('events-list')).toBeNull();
    });

    it('does not render the events table', () => {
      render(<Events upcomingEvents={EVENTS} priorEvents={[]} />);
      expect(screen.queryByTestId('events-table')).toBeNull();
    });
  });

  describe('with prior events', () => {
    it('renders the "Prior Trips & Events" section heading', () => {
      render(<Events upcomingEvents={[]} priorEvents={EVENTS} />);
      expect(screen.getByRole('heading', { name: 'Prior Trips & Events' })).toBeDefined();
    });

    it('renders a card for each prior event', () => {
      render(<Events upcomingEvents={[]} priorEvents={EVENTS} />);
      const cards = screen.getAllByTestId('event-card');
      expect(cards).toHaveLength(EVENTS.length);
    });

    it('does not render the events list', () => {
      render(<Events upcomingEvents={[]} priorEvents={EVENTS} />);
      expect(screen.queryByTestId('events-list')).toBeNull();
    });

    it('does not render the events table', () => {
      render(<Events upcomingEvents={[]} priorEvents={EVENTS} />);
      expect(screen.queryByTestId('events-table')).toBeNull();
    });
  });

  describe('with no events', () => {
    it('does not render the upcoming section', () => {
      render(<Events upcomingEvents={[]} priorEvents={[]} />);
      expect(screen.queryByRole('heading', { name: 'Upcoming Trips & Events' })).toBeNull();
    });

    it('does not render the prior section', () => {
      render(<Events upcomingEvents={[]} priorEvents={[]} />);
      expect(screen.queryByRole('heading', { name: 'Prior Trips & Events' })).toBeNull();
    });
  });
});
