import { cleanup, getByText, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Dashboard from '../dashboard';
import { EVENTS } from '../events/__mocks__/data';

describe('dashboard component', () => {
  beforeEach(() => vi.clearAllMocks());

  afterEach(() => cleanup());

  describe('with current events', () => {
    it('displays the "Upcoming Trips & Events" header', () => {
      render(<Dashboard currentEvents={EVENTS} latestEvents={[]} />);
      expect(screen.getByRole('heading', { name: 'Upcoming Events', level: 2 })).toBeDefined();
    });

    it('displays the events', () => {
      render(<Dashboard currentEvents={EVENTS} latestEvents={[]} />);
      EVENTS.forEach((e) => expect(screen.getByRole('link', { name: e.name })));
    });

    it('displays a no events message', () => {
      render(<Dashboard currentEvents={EVENTS} latestEvents={[]} />);
      expect(screen.queryByText('You have no upcoming events.')).toBeNull();
    });
  });

  describe('without current events', () => {
    it('displays the "Upcoming Events" header', () => {
      render(<Dashboard currentEvents={[]} latestEvents={[]} />);
      expect(screen.getByRole('heading', { name: 'Upcoming Events', level: 2 })).toBeDefined();
    });

    it('displays a no events message', () => {
      render(<Dashboard currentEvents={[]} latestEvents={[]} />);
      expect(screen.getByText('You have no upcoming events.')).toBeDefined();
    });
  });

  describe('with recently created events', () => {
    it('displays the "Most Recent Events" header', () => {
      render(<Dashboard currentEvents={[]} latestEvents={[EVENTS[0], EVENTS[2], EVENTS[3]]} />);
      expect(screen.getByRole('heading', { name: 'Most Recent Events', level: 2 })).toBeDefined();
    });

    it('displays the events', () => {
      render(<Dashboard currentEvents={[]} latestEvents={[EVENTS[0], EVENTS[2], EVENTS[3]]} />);
      expect(screen.getByRole('link', { name: EVENTS[0].name }));
      expect(screen.getByRole('link', { name: EVENTS[2].name }));
      expect(screen.getByRole('link', { name: EVENTS[3].name }));
    });

    it('does not display a no events message', () => {
      render(<Dashboard currentEvents={[]} latestEvents={[EVENTS[0], EVENTS[2], EVENTS[3]]} />);
      expect(screen.queryByText('You have no events.')).toBeNull();
    });
  });

  describe('without recently created events', () => {
    it('displays the "Most Recent Events" header', () => {
      render(<Dashboard currentEvents={[]} latestEvents={[]} />);
      expect(screen.getByRole('heading', { name: 'Most Recent Events', level: 2 })).toBeDefined();
    });

    it('displays a no events message', () => {
      render(<Dashboard currentEvents={[]} latestEvents={[]} />);
      expect(screen.getByText('You have no events.')).toBeDefined();
    });
  });
});
