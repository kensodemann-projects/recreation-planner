import { Note } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import NoteCard from '../note-card';

vi.mock('../../data');

describe('Note Card', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('renders the title', () => {
    render(<NoteCard baseHref={`/adventure/event/${TEST_NOTE.eventRid}/notes`} note={TEST_NOTE} />);
    expect(screen.getByRole('heading', { level: 3, name: TEST_NOTE.name })).toBeDefined();
  });

  it('renders the description', () => {
    render(<NoteCard baseHref={`/adventure/event/${TEST_NOTE.eventRid}/notes`} note={TEST_NOTE} />);
    expect(screen.getByText(TEST_NOTE.description!)).toBeDefined();
    const links = screen.queryAllByRole('link');
  });

  it('includes delete and update links', () => {
    render(<NoteCard baseHref={`/adventure/event/${TEST_NOTE.eventRid}/notes`} note={TEST_NOTE} />);
    const links = screen.queryAllByRole('link');
    expect(links.length).toBe(2);
    expect(links[0]).toHaveProperty('href', expect.stringMatching(/\/7314159\/delete$/));
    expect(links[1]).toHaveProperty('href', expect.stringMatching(/\/7314159\/update$/));
  });
});

const TEST_NOTE: Note = {
  id: 7314159,
  name: 'This is a test note',
  description: 'This is only a test. In the event of a real note, you will be notified and your reaction noted.',
  eventRid: 4273,
  equipmentRid: null,
  placeRid: null,
};
