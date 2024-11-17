import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import EventDetails from '../event-details';

const testEvent = {
  id: 314,
  beginDate: '2024-09-28',
  beginTime: '18:30',
  endDate: '2024-09-30',
  endTime: '22:30',
  name: "Women's Hockey Tournament",
  description: 'A three day long tournament of women playing hockey',
  place: {
    id: 32,
    name: 'Richard Bong State Park',
    address: {
      line1: '26313 Burlington Rd.',
      city: 'Kansasville',
      state: 'WI',
      postal: '53139',
    },
    phoneNumber: '(262) 878-5600',
    website: 'https://dnr.wisconsin.gov/topic/parks/richardbong',
  },
  type: {
    id: 2,
    name: 'Sporting Event',
    description: 'The primary purpose of the activity is to view a competition.',
  },
};

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
});
