import { Note } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Notes from '../notes';

describe('notes list', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('displays each note', () => {
    render(<Notes notes={TEST_NOTES} baseHref="/adventure/events/42/notes" />);
    expect(screen.queryAllByRole('listitem').length).toBe(TEST_NOTES.length);
  });
});

const TEST_NOTES: Note[] = [
  {
    id: 1,
    name: 'This test has a descr',
    description: 'Well, that is so exciting!',
    eventRid: 42,
    equipmentRid: null,
    placeRid: null,
  },
  { id: 2, name: 'This has a null description', description: null, eventRid: 42, equipmentRid: null, placeRid: null },
  {
    id: 3,
    name: 'Test, test, test',
    description: 'This is more and more test data.',
    eventRid: 42,
    equipmentRid: null,
    placeRid: null,
  },
  { id: 4, name: 'In the fridge', description: 'I see dead things!', eventRid: 42, equipmentRid: null, placeRid: null },
  {
    id: 5,
    name: 'Love can hurt',
    description: 'She was the apple of my eye, but she is a reptile.',
    eventRid: 42,
    equipmentRid: null,
    placeRid: null,
  },
  {
    id: 6,
    name: 'Poison me',
    description: 'Let the flickering and rattling begin.',
    eventRid: 42,
    equipmentRid: null,
    placeRid: null,
  },
];
