import { ItineraryItem } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ItineraryItemEditor from '../itinerary-item-editor';

const activityInput = () => screen.getByRole('textbox', { name: 'Activity' });
const descriptionInput = () => screen.getByRole('textbox', { name: 'Description' });
const dateInput = () => screen.getByLabelText('Date');
const timeInput = () => screen.getByLabelText('Time');
const cancelButton = () => screen.getByRole('button', { name: 'Cancel' });
const createButton = () => screen.getByRole('button', { name: 'Create' });
const updateButton = () => screen.getByRole('button', { name: 'Update' });

describe('Itinerary Item Editor', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('renders', () => {
    const res = render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
    expect(res).toBeTruthy();
  });

  describe('activity input', () => {
    it('exists', () => {
      render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
      expect(activityInput()).toBeDefined();
    });

    describe('required error', () => {
      it('is not displayed initially', () => {
        render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = activityInput();
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Activity is required')).toBeNull();
      });

      it('is displayed after tabbing out of the input', async () => {
        const user = userEvent.setup();
        render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = activityInput();
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Activity is required')).toBeDefined();
      });

      it('is no longer displayed after text entry', async () => {
        const user = userEvent.setup();
        render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = activityInput();
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Activity is required')).toBeDefined();
        await user.type(inp, 'f');
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Activity is required')).toBeNull();
      });
    });
  });

  describe('date input', () => {
    it('exists', () => {
      render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
      expect(dateInput()).toBeDefined();
    });

    describe('required error', () => {
      it('is not displayed initially', () => {
        render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = dateInput();
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Date is required')).toBeNull();
      });

      it('is displayed after tabbing out of the input', async () => {
        const user = userEvent.setup();
        render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = dateInput();
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Date is required')).toBeDefined();
      });

      it('is no longer displayed after text entry', async () => {
        const user = userEvent.setup();
        render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = dateInput();
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Date is required')).toBeDefined();
        await user.type(inp, '2024-04-14');
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Date is required')).toBeNull();
      });
    });
  });

  describe('time input', () => {
    it('exists', () => {
      render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
      expect(timeInput()).toBeDefined();
    });

    describe('required error', () => {
      it('is not displayed initially', () => {
        render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = timeInput();
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Time is required')).toBeNull();
      });

      it('is displayed after tabbing out of the input', async () => {
        const user = userEvent.setup();
        render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = timeInput();
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Time is required')).toBeDefined();
      });

      it('is no longer displayed after text entry', async () => {
        const user = userEvent.setup();
        render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = timeInput();
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Time is required')).toBeDefined();
        await user.type(inp, '14:04');
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Time is required')).toBeNull();
      });
    });
  });

  describe('description input', () => {
    it('exists', () => {
      render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
      expect(descriptionInput()).toBeDefined();
    });

    it('is not required', async () => {
      const user = userEvent.setup();
      render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
      const inp = descriptionInput();
      await user.click(inp);
      await user.tab();
      expect(inp.classList).not.toContain('input-error');
      expect(screen.queryByText('Description is required')).toBeNull();
    });
  });

  describe('cancel button', () => {
    it('exists', () => {
      render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
      expect(cancelButton()).toBeDefined();
    });

    it('triggers onCancel when clicked', async () => {
      let cancelCalled = false;
      const user = userEvent.setup();
      render(<ItineraryItemEditor onCancel={() => (cancelCalled = true)} onConfirm={() => null} />);
      await user.click(cancelButton());
      expect(cancelCalled).toBe(true);
    });
  });

  describe('for create', () => {
    it('has a create button', () => {
      render(<ItineraryItemEditor onCancel={() => null} onConfirm={() => null} />);
      expect(createButton()).toBeDefined();
      expect(screen.queryByRole('button', { name: 'Update' })).toBeNull();
    });

    it('will create an item without a description', async () => {
      let item: ItineraryItem | null = null;
      const user = userEvent.setup();
      render(<ItineraryItemEditor onCancel={() => null} onConfirm={(x) => (item = x)} />);
      await user.type(activityInput(), 'This is a test item');
      await user.type(dateInput(), '2025-03-12');
      await user.type(timeInput(), '09:00');
      await user.click(createButton());
      expect(item).toEqual({
        name: 'This is a test item',
        description: '',
        eventRid: -1,
        date: '2025-03-12',
        time: '09:00',
      });
    });

    it('will not create a note with an empty activity', async () => {
      let item: ItineraryItem | null = null;
      const user = userEvent.setup();
      render(<ItineraryItemEditor onCancel={() => null} onConfirm={(x) => (item = x)} />);
      await user.type(activityInput(), '  ');
      await user.type(descriptionInput(), 'Testing this is just a good idea.');
      await user.type(dateInput(), '2025-03-12');
      await user.type(timeInput(), '09:00');
      await user.click(createButton());
      expect(item).toBeNull();
    });

    it('will not create a note with an empty date', async () => {
      let item: ItineraryItem | null = null;
      const user = userEvent.setup();
      render(<ItineraryItemEditor onCancel={() => null} onConfirm={(x) => (item = x)} />);
      await user.type(activityInput(), 'Derp!');
      await user.type(descriptionInput(), 'Testing this is just a good idea.');
      await user.type(timeInput(), '09:00');
      await user.click(createButton());
      expect(item).toBeNull();
    });

    it('will not create a note with an empty time', async () => {
      let item: ItineraryItem | null = null;
      const user = userEvent.setup();
      render(<ItineraryItemEditor onCancel={() => null} onConfirm={(x) => (item = x)} />);
      await user.type(activityInput(), 'Derp!');
      await user.type(descriptionInput(), 'Testing this is just a good idea.');
      await user.type(dateInput(), '2001-08-30');
      await user.click(createButton());
      expect(item).toBeNull();
    });
  });

  describe('for update', () => {
    it('has an update button', () => {
      render(
        <ItineraryItemEditor
          item={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            eventRid: 17,
            date: '2001-04-18',
            time: '08:42',
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
        <ItineraryItemEditor
          item={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            eventRid: 17,
            date: '2001-04-18',
            time: '08:42',
          }}
          onCancel={() => null}
          onConfirm={() => null}
        />,
      );
      expect((activityInput() as HTMLInputElement).value).toBe('So Long');
      expect((descriptionInput() as HTMLTextAreaElement).value).toBe('Thanks for the fish');
      expect((dateInput() as HTMLInputElement).value).toBe('2001-04-18');
      expect((timeInput() as HTMLInputElement).value).toBe('08:42');
    });

    it('does not allow updating to a blank activity name', async () => {
      let item: ItineraryItem | null = null;
      const user = userEvent.setup();
      render(
        <ItineraryItemEditor
          item={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            eventRid: 17,
            date: '2001-04-18',
            time: '08:42',
          }}
          onCancel={() => null}
          onConfirm={(x) => (item = x)}
        />,
      );
      const inp = activityInput();
      await user.clear(inp);
      await user.type(inp, '    ');
      await user.click(updateButton());
      expect(item).toBeNull();
    });

    it('does not allow updating an unchanged note', async () => {
      let item: ItineraryItem | null = null;
      const user = userEvent.setup();
      render(
        <ItineraryItemEditor
          item={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            eventRid: 17,
            date: '2001-04-18',
            time: '08:42',
          }}
          onCancel={() => null}
          onConfirm={(x) => (item = x)}
        />,
      );
      await user.click(updateButton());
      expect(item).toBeNull();
    });

    it('does not allow updating note that just has whitespace added at the end', async () => {
      let item: ItineraryItem | null = null;
      const user = userEvent.setup();
      render(
        <ItineraryItemEditor
          item={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            eventRid: 17,
            date: '2001-04-18',
            time: '08:42',
          }}
          onCancel={() => null}
          onConfirm={(x) => (item = x)}
        />,
      );
      await user.type(activityInput(), '   ');
      await user.type(descriptionInput(), '   ');
      await user.click(updateButton());
      expect(item).toBeNull();
    });

    it('allows updating an itinerary item if the name is changed', async () => {
      let item: ItineraryItem | null = null;
      const user = userEvent.setup();
      render(
        <ItineraryItemEditor
          item={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            eventRid: 17,
            date: '2001-04-18',
            time: '08:42',
          }}
          onCancel={() => null}
          onConfirm={(x) => (item = x)}
        />,
      );
      await user.type(activityInput(), ' and...');
      await user.click(updateButton());
      expect(item).toEqual({
        id: 42,
        name: 'So Long and...',
        description: 'Thanks for the fish',
        eventRid: 17,
        date: '2001-04-18',
        time: '08:42',
      });
    });

    it('allows updating an itinerary item if the description is changed', async () => {
      let item: ItineraryItem | null = null;
      const user = userEvent.setup();
      render(
        <ItineraryItemEditor
          item={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            eventRid: 17,
            date: '2001-04-18',
            time: '08:42',
          }}
          onCancel={() => null}
          onConfirm={(x) => (item = x)}
        />,
      );
      await user.type(descriptionInput(), ', all of them');
      await user.click(updateButton());
      expect(item).toEqual({
        id: 42,
        name: 'So Long',
        description: 'Thanks for the fish, all of them',
        eventRid: 17,
        date: '2001-04-18',
        time: '08:42',
      });
    });

    it('allows updating an itinerary item if the date is changed', async () => {
      let item: ItineraryItem | null = null;
      const user = userEvent.setup();
      render(
        <ItineraryItemEditor
          item={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            eventRid: 17,
            date: '2001-04-18',
            time: '08:42',
          }}
          onCancel={() => null}
          onConfirm={(x) => (item = x)}
        />,
      );
      const input = dateInput();
      await user.clear(input);
      await user.type(input, '2025-03-16');
      await user.click(updateButton());
      expect(item).toEqual({
        id: 42,
        name: 'So Long',
        description: 'Thanks for the fish',
        eventRid: 17,
        date: '2025-03-16',
        time: '08:42',
      });
    });

    it('allows updating an itinerary item if the time is changed', async () => {
      let item: ItineraryItem | null = null;
      const user = userEvent.setup();
      render(
        <ItineraryItemEditor
          item={{
            id: 42,
            name: 'So Long',
            description: 'Thanks for the fish',
            eventRid: 17,
            date: '2001-04-18',
            time: '08:42',
          }}
          onCancel={() => null}
          onConfirm={(x) => (item = x)}
        />,
      );
      const input = timeInput();
      await user.clear(input);
      await user.type(input, '09:13');
      await user.click(updateButton());
      expect(item).toEqual({
        id: 42,
        name: 'So Long',
        description: 'Thanks for the fish',
        eventRid: 17,
        date: '2001-04-18',
        time: '09:13',
      });
    });
  });
});
