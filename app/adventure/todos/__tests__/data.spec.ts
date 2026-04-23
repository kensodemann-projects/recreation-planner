import { executeQuery } from '@/utils/data';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import {
  addTodoCollection,
  addTodoItem,
  canDeleteTodoCollection,
  canDeleteTodoItem,
  deleteTodoCollection,
  deleteTodoItem,
  fetchDueTodoCollections,
  fetchTodoCollection,
  fetchTodoCollections,
  updateTodoCollection,
  updateTodoItem,
} from '../data';

vi.mock('@/utils/supabase/auth');
vi.mock('@/utils/supabase/server');
vi.mock('@/utils/data', () => ({ executeQuery: vi.fn() }));

// --- Test data ---

const todoItemDTO = {
  id: 5,
  name: 'Tent',
  is_complete: false,
  todo_collection_rid: 1,
};

const todoItem = {
  id: 5,
  name: 'Tent',
  isComplete: false,
  todoCollectionRid: 1,
};

const todoCollectionDTO = {
  id: 1,
  name: 'Pack for camping',
  description: 'Things to bring',
  due_date: '2025-07-01',
  is_complete: false,
  event_rid: null,
  equipment_rid: null,
  todo_items: [],
};

const todoCollection = {
  id: 1,
  name: 'Pack for camping',
  description: 'Things to bring',
  dueDate: '2025-07-01',
  isComplete: false,
  eventRid: null,
  event: undefined,
  equipmentRid: null,
  equipment: undefined,
  todoItems: [],
};

const todoCollectionDTOWithItems = {
  ...todoCollectionDTO,
  todo_items: [todoItemDTO],
};

const todoCollectionWithItems = {
  ...todoCollection,
  todoItems: [todoItem],
};

// --- Helpers ---

const buildChainableMock = () => {
  const chain: Record<string, Mock> = {};
  ['select', 'insert', 'update', 'delete', 'eq', 'single', 'order', 'lt'].forEach((method) => {
    chain[method] = vi.fn().mockReturnValue(chain);
  });
  return chain;
};

// --- Tests ---

describe('todos data', () => {
  let mockFrom: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    const chain = buildChainableMock();
    mockFrom = vi.fn().mockReturnValue(chain);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(createClient).mockReturnValue({ from: mockFrom } as any);
  });

  // ---------------------------------------------------------------------------
  // fetchTodoCollections
  // ---------------------------------------------------------------------------

  describe('fetchTodoCollections', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns an empty array', async () => {
        expect(await fetchTodoCollections()).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchTodoCollections();
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue([todoCollectionDTO]);
        });

        it('calls executeQuery', async () => {
          await fetchTodoCollections();
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the todo_collections table', async () => {
          await fetchTodoCollections();
          expect(mockFrom).toHaveBeenCalledWith('todo_collections');
        });

        it('returns the converted todo collections', async () => {
          expect(await fetchTodoCollections()).toEqual([todoCollection]);
        });

        it('converts nested todo items', async () => {
          (executeQuery as Mock).mockResolvedValueOnce([todoCollectionDTOWithItems]);
          expect(await fetchTodoCollections()).toEqual([todoCollectionWithItems]);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns an empty array', async () => {
          expect(await fetchTodoCollections()).toEqual([]);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchTodoCollection
  // ---------------------------------------------------------------------------

  describe('fetchTodoCollection', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns null', async () => {
        expect(await fetchTodoCollection(1)).toBeNull();
      });

      it('does not access the database', async () => {
        await fetchTodoCollection(1);
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(todoCollectionDTO);
        });

        it('calls executeQuery', async () => {
          await fetchTodoCollection(1);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the todo_collections table', async () => {
          await fetchTodoCollection(1);
          expect(mockFrom).toHaveBeenCalledWith('todo_collections');
        });

        it('returns the converted todo collection', async () => {
          expect(await fetchTodoCollection(1)).toEqual(todoCollection);
        });

        it('converts nested todo items', async () => {
          (executeQuery as Mock).mockResolvedValueOnce(todoCollectionDTOWithItems);
          expect(await fetchTodoCollection(1)).toEqual(todoCollectionWithItems);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await fetchTodoCollection(1)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchDueTodoCollections
  // ---------------------------------------------------------------------------

  describe('fetchDueTodoCollections', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns an empty array', async () => {
        expect(await fetchDueTodoCollections('2025-07-01')).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchDueTodoCollections('2025-07-01');
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue([todoCollectionDTO]);
        });

        it('calls executeQuery', async () => {
          await fetchDueTodoCollections('2025-07-01');
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the todo_collections table', async () => {
          await fetchDueTodoCollections('2025-07-01');
          expect(mockFrom).toHaveBeenCalledWith('todo_collections');
        });

        it('returns the converted todo collections', async () => {
          expect(await fetchDueTodoCollections('2025-07-01')).toEqual([todoCollection]);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns an empty array', async () => {
          expect(await fetchDueTodoCollections('2025-07-01')).toEqual([]);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // addTodoCollection
  // ---------------------------------------------------------------------------

  describe('addTodoCollection', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns null', async () => {
        expect(await addTodoCollection(todoCollection)).toBeNull();
      });

      it('does not access the database', async () => {
        await addTodoCollection(todoCollection);
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      describe('when the insert succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(todoCollectionDTO);
        });

        it('calls executeQuery', async () => {
          await addTodoCollection(todoCollection);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('inserts into the todo_collections table', async () => {
          await addTodoCollection(todoCollection);
          expect(mockFrom).toHaveBeenCalledWith('todo_collections');
        });

        it('returns the converted todo collection', async () => {
          expect(await addTodoCollection(todoCollection)).toEqual(todoCollection);
        });
      });

      describe('when the insert fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await addTodoCollection(todoCollection)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // canDeleteTodoCollection
  // ---------------------------------------------------------------------------

  describe('canDeleteTodoCollection', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns false', async () => {
        expect(await canDeleteTodoCollection(todoCollection)).toBe(false);
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      it('returns true', async () => {
        expect(await canDeleteTodoCollection(todoCollection)).toBe(true);
      });
    });
  });

  // ---------------------------------------------------------------------------
  // deleteTodoCollection
  // ---------------------------------------------------------------------------

  describe('deleteTodoCollection', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('does not access the database', async () => {
        await deleteTodoCollection(todoCollection);
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
        (executeQuery as Mock).mockResolvedValue(null);
      });

      it('calls executeQuery', async () => {
        await deleteTodoCollection(todoCollection);
        expect(executeQuery).toHaveBeenCalledOnce();
      });

      it('deletes from the todo_collections table', async () => {
        await deleteTodoCollection(todoCollection);
        expect(mockFrom).toHaveBeenCalledWith('todo_collections');
      });
    });
  });

  // ---------------------------------------------------------------------------
  // updateTodoCollection
  // ---------------------------------------------------------------------------

  describe('updateTodoCollection', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns null', async () => {
        expect(await updateTodoCollection(todoCollection)).toBeNull();
      });

      it('does not access the database', async () => {
        await updateTodoCollection(todoCollection);
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      describe('when the update succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(todoCollectionDTO);
        });

        it('calls executeQuery', async () => {
          await updateTodoCollection(todoCollection);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('updates the todo_collections table', async () => {
          await updateTodoCollection(todoCollection);
          expect(mockFrom).toHaveBeenCalledWith('todo_collections');
        });

        it('returns the converted todo collection', async () => {
          expect(await updateTodoCollection(todoCollection)).toEqual(todoCollection);
        });
      });

      describe('when the update fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await updateTodoCollection(todoCollection)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // addTodoItem
  // ---------------------------------------------------------------------------

  describe('addTodoItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns null', async () => {
        expect(await addTodoItem(todoItem)).toBeNull();
      });

      it('does not access the database', async () => {
        await addTodoItem(todoItem);
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      describe('when the insert succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(todoItemDTO);
        });

        it('calls executeQuery', async () => {
          await addTodoItem(todoItem);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('inserts into the todo_items table', async () => {
          await addTodoItem(todoItem);
          expect(mockFrom).toHaveBeenCalledWith('todo_items');
        });

        it('returns the converted todo item', async () => {
          expect(await addTodoItem(todoItem)).toEqual(todoItem);
        });
      });

      describe('when the insert fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await addTodoItem(todoItem)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // canDeleteTodoItem
  // ---------------------------------------------------------------------------

  describe('canDeleteTodoItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns false', async () => {
        expect(await canDeleteTodoItem(todoItem)).toBe(false);
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      it('returns true', async () => {
        expect(await canDeleteTodoItem(todoItem)).toBe(true);
      });
    });
  });

  // ---------------------------------------------------------------------------
  // deleteTodoItem
  // ---------------------------------------------------------------------------

  describe('deleteTodoItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('does not access the database', async () => {
        await deleteTodoItem(todoItem);
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
        (executeQuery as Mock).mockResolvedValue(null);
      });

      it('calls executeQuery', async () => {
        await deleteTodoItem(todoItem);
        expect(executeQuery).toHaveBeenCalledOnce();
      });

      it('deletes from the todo_items table', async () => {
        await deleteTodoItem(todoItem);
        expect(mockFrom).toHaveBeenCalledWith('todo_items');
      });
    });
  });

  // ---------------------------------------------------------------------------
  // updateTodoItem
  // ---------------------------------------------------------------------------

  describe('updateTodoItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns null', async () => {
        expect(await updateTodoItem(todoItem)).toBeNull();
      });

      it('does not access the database', async () => {
        await updateTodoItem(todoItem);
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      describe('when the update succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(todoItemDTO);
        });

        it('calls executeQuery', async () => {
          await updateTodoItem(todoItem);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('updates the todo_items table', async () => {
          await updateTodoItem(todoItem);
          expect(mockFrom).toHaveBeenCalledWith('todo_items');
        });

        it('returns the converted todo item', async () => {
          expect(await updateTodoItem(todoItem)).toEqual(todoItem);
        });
      });

      describe('when the update fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await updateTodoItem(todoItem)).toBeNull();
        });
      });
    });
  });
});
