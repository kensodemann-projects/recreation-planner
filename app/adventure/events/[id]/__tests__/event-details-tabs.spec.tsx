import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, Mock, vi } from 'vitest';
import EventDetailsTabs from '../event-details-tabs';
import { testEvent } from './test-data';
import { beforeEach } from 'node:test';
import { useSearchParams } from 'next/navigation';

vi.mock('next/navigation');

describe('Event Details Tabs', () => {
  afterEach(() => cleanup());
  beforeEach(() => vi.clearAllMocks());

  it('renders three tabs', () => {
    render(<EventDetailsTabs event={testEvent} />);
    const tabs = screen.getAllByRole('radio');
    expect(tabs.length).toBe(3);
  });

  it('renders the Todos tab', () => {
    render(<EventDetailsTabs event={testEvent} />);
    expect(screen.getByRole('radio', { name: 'Todos' }));
  });

  it('renders the Itinerary tab', () => {
    render(<EventDetailsTabs event={testEvent} />);
    expect(screen.getByRole('radio', { name: 'Itinerary' }));
  });

  it('renders the Notes tab', () => {
    render(<EventDetailsTabs event={testEvent} />);
    expect(screen.getByRole('radio', { name: 'Notes' }));
  });

  describe('setting the active tab', () => {
    it('defaults the first tab', () => {
      render(<EventDetailsTabs event={testEvent} />);
      const tabs = screen.getAllByRole('radio');
      expect(tabs[0]).toHaveProperty('defaultChecked', true);
      expect(tabs[1]).toHaveProperty('defaultChecked', false);
      expect(tabs[2]).toHaveProperty('defaultChecked', false);
    });

    it('sets the tab to Todos', () => {
      (useSearchParams as Mock).mockReturnValue(new URLSearchParams({ lastActivity: 'Todos' }));
      render(<EventDetailsTabs event={testEvent} />);
      expect(screen.getByRole('radio', { name: 'Todos' })).toHaveProperty('defaultChecked', true);
      expect(screen.getByRole('radio', { name: 'Itinerary' })).toHaveProperty('defaultChecked', false);
      expect(screen.getByRole('radio', { name: 'Notes' })).toHaveProperty('defaultChecked', false);
    });

    it('sets the tab to Itinerary', () => {
      (useSearchParams as Mock).mockReturnValue(new URLSearchParams({ lastActivity: 'Itinerary' }));
      render(<EventDetailsTabs event={testEvent} />);
      expect(screen.getByRole('radio', { name: 'Todos' })).toHaveProperty('defaultChecked', false);
      expect(screen.getByRole('radio', { name: 'Itinerary' })).toHaveProperty('defaultChecked', true);
      expect(screen.getByRole('radio', { name: 'Notes' })).toHaveProperty('defaultChecked', false);
    });

    it('sets the tab to Notes', () => {
      (useSearchParams as Mock).mockReturnValue(new URLSearchParams({ lastActivity: 'Notes' }));
      render(<EventDetailsTabs event={testEvent} />);
      expect(screen.getByRole('radio', { name: 'Todos' })).toHaveProperty('defaultChecked', false);
      expect(screen.getByRole('radio', { name: 'Itinerary' })).toHaveProperty('defaultChecked', false);
      expect(screen.getByRole('radio', { name: 'Notes' })).toHaveProperty('defaultChecked', true);
    });
  });
});
