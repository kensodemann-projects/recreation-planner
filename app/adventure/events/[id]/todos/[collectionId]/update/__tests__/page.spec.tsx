import { fetchTodoCollection } from '@/app/adventure/todos/data';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import UpdateTodoCollectionPage from '../page';

vi.mock('@/app/adventure/todos/data');
vi.mock('next/navigation');

describe('Update Todo Collection for Event Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('fetches the collection', async () => {
    await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3', collectionId: '2' }) });
    expect(fetchTodoCollection).toHaveBeenCalledExactlyOnceWith(2);
  });

  it('renders the update todo collection component', async () => {
    const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3', collectionId: '2' }) });
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Update the Todo Collection' })).toBeDefined();
  });

  describe('if the todo collection cannot be fetched', () => {
    it('renders an error message', async () => {
      const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3', collectionId: '524' }) });
      render(jsx);
      expect(screen.getByText('Failed to fetch the todo collection')).toBeDefined();
    });

    it('does not render the update todo collection component', async () => {
      const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3', collectionId: '524' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Update the Todo Collection' })).toBeNull();
    });
  });
});
