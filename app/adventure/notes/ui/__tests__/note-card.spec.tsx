import { Note } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import NoteCard from '../note-card';

vi.mock('../../data');
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

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
  });

  it('includes delete and update links', () => {
    render(<NoteCard baseHref={`/adventure/event/${TEST_NOTE.eventRid}/notes`} note={TEST_NOTE} />);
    const links = screen.queryAllByRole('link');
    expect(links.length).toBe(2);
    expect(links[0]).toHaveProperty('href', expect.stringMatching(/\/7314159\/delete$/));
    expect(links[1]).toHaveProperty('href', expect.stringMatching(/\/7314159\/update$/));
  });

  describe('delete link', () => {
    it('links to the delete page for the collection', () => {
      render(<NoteCard baseHref={`/adventure/event/${TEST_NOTE.eventRid}/notes`} note={TEST_NOTE} />);
      const link = screen.getByRole('button', { name: /delete/i }).closest('a');
      expect(link?.getAttribute('href')).toBe(`/adventure/event/${TEST_NOTE.eventRid}/notes/${TEST_NOTE.id}/delete`);
    });
  });

  describe('edit link', () => {
    it('links to the update page for the event', () => {
      render(<NoteCard baseHref={`/adventure/event/${TEST_NOTE.eventRid}/notes`} note={TEST_NOTE} />);
      const link = screen.getByRole('button', { name: /edit/i }).closest('a');
      expect(link?.getAttribute('href')).toBe(`/adventure/event/${TEST_NOTE.eventRid}/notes/${TEST_NOTE.id}/update`);
    });
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
