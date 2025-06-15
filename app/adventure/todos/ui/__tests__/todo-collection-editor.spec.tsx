import { TodoCollection } from '@/models';
import { cleanup, getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import TodoCollectionEditor from '../todo-collection-editor';

describe('TODO Editor', () => {
  afterEach(() => cleanup());

  describe('Name Input', () => {
    it('exists', () => {
      render(<TodoCollectionEditor onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Name' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no collection', () => {
        render(<TodoCollectionEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the name of the collection', () => {
        render(<TodoCollectionEditor todoCollection={TEST_COLLECTION} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_COLLECTION.name);
      });
    });

    describe('required error', () => {
      it('is not displayed initially', () => {
        render(<TodoCollectionEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Name is required')).toBeNull();
      });

      it('is displayed after tabbing out of the input', async () => {
        const user = userEvent.setup();
        render(<TodoCollectionEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Name is required')).toBeDefined();
      });

      it('is no longer displayed after text entry', async () => {
        const user = userEvent.setup();
        render(<TodoCollectionEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Name is required')).toBeDefined();
        await user.type(inp, 'f');
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Name is required')).toBeNull();
      });
    });
  });

  describe('Description Input', () => {
    it('exists', () => {
      render(<TodoCollectionEditor onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Description' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no todo collection', () => {
        render(<TodoCollectionEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Description' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the description of the Todo Collection', () => {
        render(<TodoCollectionEditor todoCollection={TEST_COLLECTION} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Description' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_COLLECTION.description);
      });

      it('is blank if the todo collection description is null', () => {
        render(
          <TodoCollectionEditor
            todoCollection={{ ...TEST_COLLECTION, description: null }}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByRole('textbox', { name: 'Description' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });
    });
  });

  describe('Cancel Button', () => {
    it('exists', () => {
      render(<TodoCollectionEditor todoCollection={TEST_COLLECTION} onCancel={() => null} onConfirm={() => null} />);
      const btn = screen.getByRole('button', { name: 'Cancel' });
      expect(btn).toBeDefined();
    });

    it('fires onCancel when clicked', async () => {
      const user = userEvent.setup();
      let fired = false;
      render(
        <TodoCollectionEditor
          todoCollection={TEST_COLLECTION}
          onCancel={() => (fired = true)}
          onConfirm={() => null}
        />,
      );
      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(fired).toBe(true);
    });
  });

  describe('Confirm Button', () => {
    describe('for create', () => {
      it('exists', () => {
        render(<TodoCollectionEditor onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Create' });
        expect(btn).toBeDefined();
      });

      it('starts disabled', () => {
        render(<TodoCollectionEditor onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Create' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('is disabled without a name', async () => {
        const user = userEvent.setup();
        render(<TodoCollectionEditor onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Description' }), 'This is a collection');
        const btn = screen.getByRole('button', { name: 'Create' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('is enabled with a name', async () => {
        const user = userEvent.setup();
        render(<TodoCollectionEditor onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Test Collection');
        const btn = screen.getByRole('button', { name: 'Create' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      describe('on click', () => {
        it('includes the entered data', async () => {
          let collection: TodoCollection | null = null;
          const user = userEvent.setup();
          render(<TodoCollectionEditor onCancel={() => null} onConfirm={(c) => (collection = c)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Test Collection');
          await user.type(
            screen.getByRole('textbox', { name: 'Description' }),
            'This is the description of the collection',
          );
          await user.type(screen.getByLabelText('Due Date'), '2025-06-08');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(collection).toEqual({
            name: 'Test Collection',
            description: 'This is the description of the collection',
            dueDate: '2025-06-08',
            isComplete: false,
            todoItems: [],
          });
        });

        it('allows a completed collection to be created', async () => {
          let collection: TodoCollection | null = null;
          const user = userEvent.setup();
          render(<TodoCollectionEditor onCancel={() => null} onConfirm={(c) => (collection = c)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Test Collection');
          await user.type(
            screen.getByRole('textbox', { name: 'Description' }),
            'This is the description of the collection',
          );
          await user.type(screen.getByLabelText('Due Date'), '2025-06-08');
          await user.click(screen.getByRole('checkbox', { name: 'Complete (hide the collection)' }));
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(collection).toEqual({
            name: 'Test Collection',
            description: 'This is the description of the collection',
            dueDate: '2025-06-08',
            isComplete: true,
            todoItems: [],
          });
        });

        it('uses null for optional items that are not entered', async () => {
          let collection: TodoCollection | null = null;
          const user = userEvent.setup();
          render(<TodoCollectionEditor onCancel={() => null} onConfirm={(c) => (collection = c)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Test Collection');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(collection).toEqual({
            name: 'Test Collection',
            description: null,
            dueDate: null,
            isComplete: false,
            todoItems: [],
          });
        });
      });
    });

    describe('for update', () => {
      it('exists', () => {
        render(<TodoCollectionEditor todoCollection={TEST_COLLECTION} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn).toBeDefined();
      });

      it('begins disabled', () => {
        render(<TodoCollectionEditor todoCollection={TEST_COLLECTION} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('is enabled if the due date is cleared', async () => {
        const user = userEvent.setup();
        render(<TodoCollectionEditor todoCollection={TEST_COLLECTION} onCancel={() => null} onConfirm={() => null} />);
        await user.clear(screen.getByLabelText('Due Date'));
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('is enabled if the due date is changed', async () => {
        const user = userEvent.setup();
        render(<TodoCollectionEditor todoCollection={TEST_COLLECTION} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByLabelText('Due Date');
        await user.clear(inp);
        await user.type(inp, '2026-03-17');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('is enabled if the description is cleared', async () => {
        const user = userEvent.setup();
        render(<TodoCollectionEditor todoCollection={TEST_COLLECTION} onCancel={() => null} onConfirm={() => null} />);
        await user.clear(screen.getByRole('textbox', { name: 'Description' }));
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('is enabled if the description is changed', async () => {
        const user = userEvent.setup();
        render(<TodoCollectionEditor todoCollection={TEST_COLLECTION} onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Description' }), 'more stuff');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('is disabled if the name is cleared', async () => {
        const user = userEvent.setup();
        render(<TodoCollectionEditor todoCollection={TEST_COLLECTION} onCancel={() => null} onConfirm={() => null} />);
        await user.clear(screen.getByRole('textbox', { name: 'Name' }));
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('becomes enabled if the cleared name gets new data', async () => {
        const user = userEvent.setup();
        render(<TodoCollectionEditor todoCollection={TEST_COLLECTION} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        await user.clear(inp);
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
        await user.type(inp, 'This is new data');
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('is enabled if the name is changed', async () => {
        const user = userEvent.setup();
        render(<TodoCollectionEditor todoCollection={TEST_COLLECTION} onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Name' }), 'more stuff');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('is enabled if the copmleted flag is changed', async () => {
        const user = userEvent.setup();
        render(<TodoCollectionEditor todoCollection={TEST_COLLECTION} onCancel={() => null} onConfirm={() => null} />);
        await user.click(screen.getByRole('checkbox', { name: 'Complete (hide the collection)' }));
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      describe('on click', () => {
        it('resolves the updated data', async () => {
          let collection: TodoCollection | null = null;
          const user = userEvent.setup();
          render(
            <TodoCollectionEditor
              todoCollection={TEST_COLLECTION}
              onCancel={() => null}
              onConfirm={(c) => (collection = c)}
            />,
          );
          const dueDate = screen.getByLabelText('Due Date');
          const name = screen.getByRole('textbox', { name: 'Name' });
          const description = screen.getByRole('textbox', { name: 'Description' });
          await user.clear(name);
          await user.type(name, 'Test Collection');
          await user.type(description, ' This is extra stuff added to the description.');
          await user.clear(dueDate);
          await user.type(dueDate, '2025-06-15');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(collection).toEqual({
            ...TEST_COLLECTION,
            name: 'Test Collection',
            description: TEST_COLLECTION.description + ' This is extra stuff added to the description.',
            dueDate: '2025-06-15',
          });
        });

        it('preserves the event ref ID', async () => {
          let collection: TodoCollection | null = null;
          const user = userEvent.setup();
          render(
            <TodoCollectionEditor
              todoCollection={{ ...TEST_COLLECTION, eventRid: 4439 }}
              onCancel={() => null}
              onConfirm={(c) => (collection = c)}
            />,
          );
          const name = screen.getByRole('textbox', { name: 'Name' });
          const description = screen.getByRole('textbox', { name: 'Description' });
          await user.clear(name);
          await user.type(name, 'Test Collection');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(collection).toEqual({
            ...TEST_COLLECTION,
            name: 'Test Collection',
            eventRid: 4439,
          });
        });

        it('allows a collection to be marked as not complete', async () => {
          let collection: TodoCollection | null = null;
          const user = userEvent.setup();
          render(
            <TodoCollectionEditor
              todoCollection={TEST_COLLECTION}
              onCancel={() => null}
              onConfirm={(c) => (collection = c)}
            />,
          );
          await user.click(screen.getByRole('checkbox', { name: 'Complete (hide the collection)' }));
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(collection).toEqual({
            ...TEST_COLLECTION,
            isComplete: false,
          });
        });

        it('allows a collection to be marked complete', async () => {
          let collection: TodoCollection | null = null;
          const user = userEvent.setup();
          render(
            <TodoCollectionEditor
              todoCollection={{ ...TEST_COLLECTION, isComplete: false }}
              onCancel={() => null}
              onConfirm={(c) => (collection = c)}
            />,
          );
          await user.click(screen.getByRole('checkbox', { name: 'Complete (hide the collection)' }));
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(collection).toEqual({
            ...TEST_COLLECTION,
            isComplete: true,
          });
        });
      });
    });
  });
});

const TEST_COLLECTION: TodoCollection = {
  id: 7314159,
  name: 'This is a test collection',
  description: 'The point of this collection is simply to do a thing',
  dueDate: '2025-03-17',
  isComplete: true,
  todoItems: [
    {
      id: 1,
      name: 'test the add',
      isComplete: true,
      todoCollectionRid: 7314159,
    },
    {
      id: 2,
      name: 'test the update',
      isComplete: false,
      todoCollectionRid: 7314159,
    },
  ],
};
