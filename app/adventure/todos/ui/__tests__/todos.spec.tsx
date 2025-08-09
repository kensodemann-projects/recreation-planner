import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TODO_COLLECTIONS } from '../../__mocks__/data';
import Todos from '../todos';
import userEvent from '@testing-library/user-event';

const verifyDisplayedCollections = (showArchived: boolean) =>
  TODO_COLLECTIONS.filter((x) => showArchived || !x.isComplete).forEach((c) =>
    expect(screen.getByRole('heading', { level: 3, name: c.name })).toBeDefined(),
  );

describe('todos component', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('has reasonable test data', () => {
    expect(TODO_COLLECTIONS.filter((x) => x.isComplete)).toBeTruthy();
    expect(TODO_COLLECTIONS.filter((x) => !x.isComplete)).toBeTruthy();
  });

  it('displays the todos collections', () => {
    render(<Todos collections={TODO_COLLECTIONS} baseHref="/does/not/matter/here" />);
    verifyDisplayedCollections(false);
  });

  describe('show archived toggle', () => {
    it('toggles the display of archived collections', async () => {
      const user = userEvent.setup();
      render(<Todos collections={TODO_COLLECTIONS} baseHref="/does/not/matter/here" />);
      const toggle = screen.getByRole('checkbox', { name: 'Show Archived' });
      await user.click(toggle);
      verifyDisplayedCollections(true);
      await user.click(toggle);
      verifyDisplayedCollections(false);
    });
  });
});
