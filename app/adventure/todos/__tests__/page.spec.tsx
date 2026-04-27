import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchTodoCollections } from '../data';
import TodosPage from '../page';

vi.mock('../data');

describe('Todos Page', () => {
  afterEach(() => cleanup());
  beforeEach(() => vi.clearAllMocks());

  it('renders the todos component', async () => {
    const jsx = await TodosPage();
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Todos' })).toBeDefined();
  });

  it('does not render the must be logged in component', async () => {
    const jsx = await TodosPage();
    render(jsx);
    expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
  });

  it('fetches the open TODO collections', async () => {
    await TodosPage();
    expect(fetchTodoCollections).toHaveBeenCalledExactlyOnceWith();
  });
});
