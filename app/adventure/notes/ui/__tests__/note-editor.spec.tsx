import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import NotesEditor from '../note-editor';
import userEvent from '@testing-library/user-event';
import { Note } from '@/models';

const topicInput = () => screen.getByRole('textbox', { name: 'Topic' });
const descriptionInput = () => screen.getByRole('textbox', { name: 'Description' });
const cancelButton = () => screen.getByRole('button', { name: 'Cancel' });
const createButton = () => screen.getByRole('button', { name: 'Create' });
const updateButton = () => screen.getByRole('button', { name: 'Update' });

describe('Notes Editor', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('renders', () => {
    const res = render(<NotesEditor onCancel={() => null} onConfirm={() => null} />);
    expect(res).toBeTruthy();
  });

  describe('topic input', () => {
    it('exists', () => {
      render(<NotesEditor onCancel={() => null} onConfirm={() => null} />);
      expect(topicInput()).toBeDefined();
    });

    describe('required error', () => {
      it('is not displayed initially', () => {
        render(<NotesEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = topicInput();
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Topic is required')).toBeNull();
      });

      it('is displayed after tabbing out of the input', async () => {
        const user = userEvent.setup();
        render(<NotesEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = topicInput();
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Topic is required')).toBeDefined();
      });

      it('is no longer displayed after text entry', async () => {
        const user = userEvent.setup();
        render(<NotesEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = topicInput();
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Topic is required')).toBeDefined();
        await user.type(inp, 'f');
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Topic is required')).toBeNull();
      });
    });
  });

  describe('description input', () => {
    it('exists', () => {
      render(<NotesEditor onCancel={() => null} onConfirm={() => null} />);
      expect(descriptionInput()).toBeDefined();
    });

    it('is not required', async () => {
      const user = userEvent.setup();
      render(<NotesEditor onCancel={() => null} onConfirm={() => null} />);
      const inp = descriptionInput();
      await user.click(inp);
      await user.tab();
      expect(inp.classList).not.toContain('input-error');
      expect(screen.queryByText('Description is required')).toBeNull();
    });
  });

  describe('cancel button', () => {
    it('exists', () => {
      render(<NotesEditor onCancel={() => null} onConfirm={() => null} />);
      expect(cancelButton()).toBeDefined();
    });

    it('triggers onCancel when clicked', async () => {
      let cancelCalled = false;
      const user = userEvent.setup();
      render(<NotesEditor onCancel={() => (cancelCalled = true)} onConfirm={() => null} />);
      await user.click(cancelButton());
      expect(cancelCalled).toBe(true);
    });
  });

  describe('for create', () => {
    it('has a create button', () => {
      render(<NotesEditor onCancel={() => null} onConfirm={() => null} />);
      expect(createButton()).toBeDefined();
      expect(screen.queryByRole('button', { name: 'Update' })).toBeNull();
    });

    it('will create a note without a description', async () => {
      let note: Note | null = null;
      const user = userEvent.setup();
      render(<NotesEditor onCancel={() => null} onConfirm={(n) => (note = n)} />);
      await user.type(topicInput(), 'This is a test note');
      await user.click(createButton());
      expect(note).toEqual({
        name: 'This is a test note',
        description: '',
        equipmentRid: null,
        eventRid: null,
        placeRid: null,
      });
    });

    it('will not create a note with an empty topic', async () => {
      let note: Note | null = null;
      const user = userEvent.setup();
      render(<NotesEditor onCancel={() => null} onConfirm={(n) => (note = n)} />);
      await user.type(topicInput(), '  ');
      await user.type(descriptionInput(), 'Testing this is just a good idea.');
      await user.click(createButton());
      expect(note).toBeNull();
    });
  });

  describe('for update', () => {
    it('has an update button', () => {
      render(
        <NotesEditor
          note={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            equipmentRid: 19,
            eventRid: null,
            placeRid: null,
          }}
          onCancel={() => null}
          onConfirm={() => null}
        />,
      );
      expect(updateButton()).toBeDefined();
      expect(screen.queryByRole('button', { name: 'Create' })).toBeNull();
    });

    it('initializes the input fields', () => {
      render(
        <NotesEditor
          note={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            equipmentRid: 19,
            eventRid: null,
            placeRid: null,
          }}
          onCancel={() => null}
          onConfirm={() => null}
        />,
      );
      expect((topicInput() as HTMLInputElement).value).toBe('So Long');
      expect((descriptionInput() as HTMLTextAreaElement).value).toBe('Thanks for the fish');
    });

    it('does not allow updating to a blank topic', async () => {
      let note: Note | null = null;
      const user = userEvent.setup();
      render(
        <NotesEditor
          note={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            equipmentRid: 19,
            eventRid: null,
            placeRid: null,
          }}
          onCancel={() => null}
          onConfirm={(n) => (note = n)}
        />,
      );
      const inp = topicInput();
      await user.clear(inp);
      await user.type(inp, '    ');
      await user.click(updateButton());
      expect(note).toBeNull();
    });

    it('does not allow updating an unchanged note', async () => {
      let note: Note | null = null;
      const user = userEvent.setup();
      render(
        <NotesEditor
          note={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            equipmentRid: 19,
            eventRid: null,
            placeRid: null,
          }}
          onCancel={() => null}
          onConfirm={(n) => (note = n)}
        />,
      );
      await user.click(updateButton());
      expect(note).toBeNull();
    });

    it('does not allow updating note that just has whitespace added at the end', async () => {
      let note: Note | null = null;
      const user = userEvent.setup();
      render(
        <NotesEditor
          note={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            equipmentRid: 19,
            eventRid: null,
            placeRid: null,
          }}
          onCancel={() => null}
          onConfirm={(n) => (note = n)}
        />,
      );
      await user.type(topicInput(), '   ');
      await user.type(descriptionInput(), '   ');
      await user.click(updateButton());
      expect(note).toBeNull();
    });

    it('allows updating an equipment note', async () => {
      let note: Note | null = null;
      const user = userEvent.setup();
      render(
        <NotesEditor
          note={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            equipmentRid: 19,
            eventRid: null,
            placeRid: null,
          }}
          onCancel={() => null}
          onConfirm={(n) => (note = n)}
        />,
      );
      await user.type(topicInput(), ' and...');
      await user.type(descriptionInput(), ', all of them');
      await user.click(updateButton());
      expect(note).toEqual({
        id: 42,
        name: 'So Long and...',
        description: 'Thanks for the fish, all of them',
        equipmentRid: 19,
        eventRid: null,
        placeRid: null,
      });
    });

    it('allows updating an event note', async () => {
      let note: Note | null = null;
      const user = userEvent.setup();
      render(
        <NotesEditor
          note={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            eventRid: 19,
            equipmentRid: null,
            placeRid: null,
          }}
          onCancel={() => null}
          onConfirm={(n) => (note = n)}
        />,
      );
      await user.type(topicInput(), ' and...');
      await user.type(descriptionInput(), ', all of them');
      await user.click(updateButton());
      expect(note).toEqual({
        id: 42,
        name: 'So Long and...',
        description: 'Thanks for the fish, all of them',
        eventRid: 19,
        equipmentRid: null,
        placeRid: null,
      });
    });

    it('allows updating a place note', async () => {
      let note: Note | null = null;
      const user = userEvent.setup();
      render(
        <NotesEditor
          note={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            placeRid: 19,
            equipmentRid: null,
            eventRid: null,
          }}
          onCancel={() => null}
          onConfirm={(n) => (note = n)}
        />,
      );
      await user.type(topicInput(), ' and...');
      await user.type(descriptionInput(), ', all of them');
      await user.click(updateButton());
      expect(note).toEqual({
        id: 42,
        name: 'So Long and...',
        description: 'Thanks for the fish, all of them',
        placeRid: 19,
        equipmentRid: null,
        eventRid: null,
      });
    });
  });
});
