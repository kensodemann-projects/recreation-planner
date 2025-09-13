import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import EventDetails from '../event-details';
import { testEvent } from './test-data';

describe('Event Details', () => {
  afterEach(() => cleanup());

  it('renders the name', () => {
    render(<EventDetails event={testEvent} />);
    expect(screen.getByRole('heading', { level: 2, name: testEvent.name })).toBeDefined();
  });

  it('renders the event type', () => {
    render(<EventDetails event={testEvent} />);
    expect(screen.getByText(testEvent.type.name)).toBeDefined();
  });

  it('renders the date information', () => {
    render(<EventDetails event={testEvent} />);
    expect(screen.getByText('Sep 28, 2024 at 6:30 PM - Sep 30, 2024 at 10:30 PM')).toBeDefined();
  });

  it('renders the description', () => {
    render(<EventDetails event={testEvent} />);
    expect(screen.getByText(testEvent.description)).toBeDefined();
  });

  it('renders a location section', () => {
    render(<EventDetails event={testEvent} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Location' })).toBeDefined();
  });

  describe('todo section', () => {
    it('renders the add button', () => {
      render(<EventDetails event={testEvent} />);
      expect(screen.getByRole('button', { name: 'Add Todo Collection' })).toBeDefined();
    });

    it('renders the todo collections', () => {
      render(<EventDetails event={testEvent} />);
      testEvent.todoCollections
        .filter((x) => !x.isComplete)
        .forEach((c) => expect(screen.getByRole('heading', { level: 3, name: c.name })).toBeDefined());
    });
  });

  describe('notes section', () => {
    it('renders the add button', () => {
      render(<EventDetails event={testEvent} />);
      expect(screen.getByRole('button', { name: 'Add Note' })).toBeDefined();
    });
  });
});
