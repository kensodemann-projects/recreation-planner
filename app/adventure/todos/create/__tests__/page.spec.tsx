import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CreateTodoCollectionPage from '../page';

vi.mock('next/navigation');

describe('Create Todo Collection Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('renders the create todo collection component', async () => {
    const jsx = await CreateTodoCollectionPage();
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Add a New Todo Collection' })).toBeDefined();
  });

  it('does not render the must be logged in component', async () => {
    const jsx = await CreateTodoCollectionPage();
    render(jsx);
    expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
  });
});
