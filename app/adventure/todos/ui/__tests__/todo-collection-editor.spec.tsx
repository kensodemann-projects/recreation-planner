import { TodoCollection } from '@/models';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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

      it('is displayed after blur', () => {
        render(<TodoCollectionEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        fireEvent.blur(inp);
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Name is required')).toBeDefined();
      });

      it('is no lonber displayed after text entry', () => {
        render(<TodoCollectionEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        fireEvent.blur(inp);
        fireEvent.change(inp, { target: { value: 'f' } });
        expect(screen.queryByText('Name is required')).toBeNull();
        fireEvent.change(inp, { target: { value: '' } });
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Name is required')).toBeDefined();
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

      it('is blank if the place description is null', () => {
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
});

const TEST_COLLECTION: TodoCollection = {
  id: 7314159,
  name: 'This is a test collection',
  description: 'The point of this collection is simply to do a thing',
  dueDate: '2025-03-17',
  isComplete: false,
  todos: [],
};
