import { Note } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Notes from '../notes';

describe('notes list', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('displays each note', () => {
    render(<Notes notes={TEST_NOTES} />);
    expect(screen.queryAllByRole('listitem').length).toBe(TEST_NOTES.length);
  });
});

const TEST_NOTES: Note[] = [
  { id: 1, name: 'This test has a descr', description: 'Well, that is so exciting!' },
  { id: 2, name: 'This has a null description', description: null },
  { id: 3, name: 'Test, test, test', description: 'This is more and more test data.' },
  { id: 4, name: 'In the fridge', description: 'I see dead things!' },
  { id: 5, name: 'Love can hurt', description: 'She was the apple of my eye, but she is a reptile.' },
  { id: 6, name: 'Poison me', description: 'Let the flickering and rattling begin.' },
];
