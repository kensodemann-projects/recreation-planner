import { Event, EventType, SelectablePlace } from '@/models';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import EventEditor from '../event-editor';

describe('Activity Editor', () => {
  afterEach(() => cleanup());

  const eventTypes: Array<EventType> = [...EVENT_TYPES];
  const places: Array<SelectablePlace> = [...PLACES];

  it('exists', () => {
    const res = render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
    expect(res).toBeTruthy();
  });

  describe('Name Input', () => {
    it('exists', () => {
      render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Name' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no event', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the name of the event', () => {
        render(
          <EventEditor
            types={eventTypes}
            places={places}
            event={TEST_EVENT}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_EVENT.name);
      });
    });

    describe('required error', () => {
      it('is not displayed initially', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Name is required')).toBeNull();
      });

      it('is displayed after blur', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        fireEvent.blur(inp);
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Name is required')).toBeDefined();
      });

      it('is no lonber displayed after text entry', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
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

  describe('Type of Event Selector', () => {
    it('exists', () => {
      render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('combobox', { name: 'Type of Event / Trip' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is set to the first event type with no event', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const sel = screen.getByRole('combobox', { name: 'Type of Event / Trip' }) as HTMLSelectElement;
        expect(+sel.value).toBe(EVENT_TYPES[0].id);
      });

      it('is set to the event type of the event', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const sel = screen.getByRole('combobox', { name: 'Type of Event / Trip' }) as HTMLSelectElement;
        expect(+sel.value).toBe(TEST_EVENT.type.id);
      });
    });
  });

  describe('Location Selector', () => {
    it('exists', () => {
      render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('combobox', { name: 'Location' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is set to the first location with no event', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const sel = screen.getByRole('combobox', { name: 'Location' }) as HTMLSelectElement;
        expect(+sel.value).toBe(PLACES[0].id);
      });

      it('is set to the location of the event', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const sel = screen.getByRole('combobox', { name: 'Location' }) as HTMLSelectElement;
        expect(+sel.value).toBe(TEST_EVENT.place.id);
      });
    });
  });

  describe('Begin Date Input', () => {
    it('exists', () => {
      render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByLabelText('Begin Date')).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no event', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByLabelText('Begin Date') as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the begin date of the event', () => {
        render(
          <EventEditor
            types={eventTypes}
            places={places}
            event={TEST_EVENT}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByLabelText('Begin Date') as HTMLInputElement;
        expect(inp.value).toBe(TEST_EVENT.beginDate);
      });
    });

    describe('required error', () => {
      it('is not displayed initially', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByLabelText('Begin Date') as HTMLInputElement;
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Begin Date is required')).toBeNull();
      });

      it('is displayed after blur', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByLabelText('Begin Date') as HTMLInputElement;
        fireEvent.blur(inp);
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Begin Date is required')).toBeDefined();
      });

      it('is no lonber displayed after text entry', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByLabelText('Begin Date') as HTMLInputElement;
        fireEvent.blur(inp);
        fireEvent.change(inp, { target: { value: '2024-01-15' } });
        expect(screen.queryByText('Begin Date is required')).toBeNull();
        fireEvent.change(inp, { target: { value: '' } });
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Begin Date is required')).toBeDefined();
      });
    });
  });

  describe('Begin Time Input', () => {
    it('exists', () => {
      render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByLabelText('Begin Time')).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no event', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByLabelText('Begin Time') as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the begin time of the event', () => {
        render(
          <EventEditor
            types={eventTypes}
            places={places}
            event={TEST_EVENT}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByLabelText('Begin Time') as HTMLInputElement;
        expect(inp.value).toBe(TEST_EVENT.beginTime);
      });
    });
  });

  describe('End Date Input', () => {
    it('exists', () => {
      render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByLabelText('End Date')).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no event', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByLabelText('End Date') as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the end date of the event', () => {
        render(
          <EventEditor
            types={eventTypes}
            places={places}
            event={TEST_EVENT}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByLabelText('End Date') as HTMLInputElement;
        expect(inp.value).toBe(TEST_EVENT.endDate);
      });
    });
  });

  describe('End Time Input', () => {
    it('exists', () => {
      render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByLabelText('End Time')).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no event', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByLabelText('End Time') as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the end date of the event', () => {
        render(
          <EventEditor
            types={eventTypes}
            places={places}
            event={TEST_EVENT}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByLabelText('End Time') as HTMLInputElement;
        expect(inp.value).toBe(TEST_EVENT.endTime);
      });
    });
  });

  describe('Description Input', () => {
    it('exists', () => {
      render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Description' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no event', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Description' }) as HTMLTextAreaElement;
        expect(inp.value).toBe('');
      });

      it('has the description of the event', () => {
        render(
          <EventEditor
            types={eventTypes}
            places={places}
            event={TEST_EVENT}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByRole('textbox', { name: 'Description' }) as HTMLTextAreaElement;
        expect(inp.value).toBe(TEST_EVENT.description);
      });
    });
  });

  describe('Confirm Button', () => {
    describe('for create', () => {
      it('exists', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        expect(screen.getByRole('button', { name: 'Create' })).toBeDefined();
      });

      it('starts disabled', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Create' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('becomes enabled if a name and begin date are entered', () => {
        render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Create' });
        const nameInp = screen.getByRole('textbox', { name: 'Name' });
        const beginDateInp = screen.getByLabelText('Begin Date');
        fireEvent.change(nameInp, { target: { value: 'f' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
        fireEvent.change(beginDateInp, { target: { value: '2024-12-31' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      describe('on click', () => {
        it('includes the entered name', () => {
          let event: Event | null = null;
          render(
            <EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={(e) => (event = e)} />,
          );
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const beginDateInput = screen.getByLabelText('Begin Date');
          fireEvent.change(nameInput, { target: { value: ' Buy some food  ' } });
          fireEvent.change(beginDateInput, { target: { value: '2024-08-01' } });
          fireEvent.click(btn);
          expect(event!.name).toBe('Buy some food');
        });

        it('includes the entered begin date', () => {
          let event: Event | null = null;
          render(
            <EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={(e) => (event = e)} />,
          );
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const beginDateInput = screen.getByLabelText('Begin Date');
          fireEvent.change(nameInput, { target: { value: ' Buy some food  ' } });
          fireEvent.change(beginDateInput, { target: { value: '2024-08-01' } });
          fireEvent.click(btn);
          expect(event!.beginDate).toBe('2024-08-01');
        });

        it('uses the first type if not set', () => {
          let event: Event | null = null;
          render(
            <EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={(e) => (event = e)} />,
          );
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const beginDateInput = screen.getByLabelText('Begin Date');
          fireEvent.change(nameInput, { target: { value: ' Buy some food  ' } });
          fireEvent.change(beginDateInput, { target: { value: '2024-08-01' } });
          fireEvent.click(btn);
          expect(event!.type).toEqual(EVENT_TYPES[0]);
        });

        it('includes the selected type', () => {
          let event: Event | null = null;
          render(
            <EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={(e) => (event = e)} />,
          );
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const beginDateInput = screen.getByLabelText('Begin Date');
          const sel = screen.getByRole('combobox', { name: 'Type of Event / Trip' });
          fireEvent.change(nameInput, { target: { value: ' Buy some food  ' } });
          fireEvent.change(beginDateInput, { target: { value: '2024-08-01' } });
          fireEvent.change(sel, { target: { value: '2' } });
          fireEvent.click(btn);
          expect(event!.type).toEqual(EVENT_TYPES[1]);
        });

        it('uses the first place if not set', () => {
          let event: Event | null = null;
          render(
            <EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={(e) => (event = e)} />,
          );
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const beginDateInput = screen.getByLabelText('Begin Date');
          fireEvent.change(nameInput, { target: { value: ' Buy some food  ' } });
          fireEvent.change(beginDateInput, { target: { value: '2024-08-01' } });
          fireEvent.click(btn);
          expect(event!.place).toEqual(PLACES[0]);
        });

        it('includes the selected place', () => {
          let event: Event | null = null;
          render(
            <EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={(e) => (event = e)} />,
          );
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const beginDateInput = screen.getByLabelText('Begin Date');
          const sel = screen.getByRole('combobox', { name: 'Location' });
          fireEvent.change(nameInput, { target: { value: ' Buy some food  ' } });
          fireEvent.change(beginDateInput, { target: { value: '2024-08-01' } });
          fireEvent.change(sel, { target: { value: '32' } });
          fireEvent.click(btn);
          expect(event!.place).toEqual(PLACES[2]);
        });

        it('has an undefined ID', () => {
          let event: Event | null = null;
          render(
            <EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={(e) => (event = e)} />,
          );
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const beginDateInput = screen.getByLabelText('Begin Date');
          fireEvent.change(nameInput, { target: { value: ' Buy some food  ' } });
          fireEvent.change(beginDateInput, { target: { value: '2024-08-01' } });
          fireEvent.click(btn);
          expect(event!.id).toBeUndefined();
        });

        it('sets the unspecified values to null', () => {
          let event: Event | null = null;
          render(
            <EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={(e) => (event = e)} />,
          );
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const beginDateInput = screen.getByLabelText('Begin Date');
          fireEvent.change(nameInput, { target: { value: ' Buy some food  ' } });
          fireEvent.change(beginDateInput, { target: { value: '2024-08-01' } });
          fireEvent.click(btn);
          expect(event!.description).toBeNull();
          expect(event!.beginTime).toBeNull();
          expect(event!.endDate).toBeNull();
          expect(event!.endTime).toBeNull();
        });

        it('includes the begin time', () => {
          let event: Event | null = null;
          render(
            <EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={(e) => (event = e)} />,
          );
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const beginDateInput = screen.getByLabelText('Begin Date');
          const beginTimeInput = screen.getByLabelText('Begin Time');
          fireEvent.change(nameInput, { target: { value: ' Buy some food  ' } });
          fireEvent.change(beginDateInput, { target: { value: '2024-08-01' } });
          fireEvent.change(beginTimeInput, { target: { value: '17:43' } });
          fireEvent.click(btn);
          expect(event!.beginTime).toEqual('17:43');
        });

        it('includes the end date', () => {
          let event: Event | null = null;
          render(
            <EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={(e) => (event = e)} />,
          );
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const beginDateInput = screen.getByLabelText('Begin Date');
          const endDateInput = screen.getByLabelText('End Date');
          fireEvent.change(nameInput, { target: { value: ' Buy some food  ' } });
          fireEvent.change(beginDateInput, { target: { value: '2024-08-01' } });
          fireEvent.change(endDateInput, { target: { value: '2024-08-03' } });
          fireEvent.click(btn);
          expect(event!.endDate).toEqual('2024-08-03');
        });

        it('includes the end time', () => {
          let event: Event | null = null;
          render(
            <EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={(e) => (event = e)} />,
          );
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const beginDateInput = screen.getByLabelText('Begin Date');
          const endTimeInput = screen.getByLabelText('End Time');
          fireEvent.change(nameInput, { target: { value: ' Buy some food  ' } });
          fireEvent.change(beginDateInput, { target: { value: '2024-08-01' } });
          fireEvent.change(endTimeInput, { target: { value: '19:01' } });
          fireEvent.click(btn);
          expect(event!.endTime).toEqual('19:01');
        });

        it('includes the description', () => {
          let event: Event | null = null;
          render(
            <EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={(e) => (event = e)} />,
          );
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const beginDateInput = screen.getByLabelText('Begin Date');
          const descriptionInput = screen.getByRole('textbox', { name: 'Description' });
          fireEvent.change(nameInput, { target: { value: ' Buy some food  ' } });
          fireEvent.change(beginDateInput, { target: { value: '2024-08-01' } });
          fireEvent.change(descriptionInput, { target: { value: '   Hi!      ' } });
          fireEvent.click(btn);
          expect(event!.description).toEqual('Hi!');
        });
      });
    });

    describe('for update', () => {
      it('exists', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        expect(screen.getByRole('button', { name: 'Update' })).toBeDefined();
      });

      it('starts disabled', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('becomes enabled if the name is changed', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('textbox', { name: 'Name' });
        fireEvent.change(inp, { target: { value: TEST_EVENT.name + 'f' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('remains disabled if the name is made blank', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('textbox', { name: 'Name' });
        fireEvent.change(inp, { target: { value: '' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('becomes enabled if the type of event is changed', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('combobox', { name: 'Type of Event / Trip' });
        fireEvent.change(inp, { target: { value: '4' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the place is changed', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('combobox', { name: 'Location' });
        fireEvent.change(inp, { target: { value: '42' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the description is changed', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('textbox', { name: 'Description' });
        fireEvent.change(inp, { target: { value: TEST_EVENT.description + 'w' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the begin date is changed', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByLabelText('Begin Date');
        fireEvent.change(inp, { target: { value: '2024-12-31' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('remains disabled if the begin date is removed', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByLabelText('Begin Date');
        fireEvent.change(inp, { target: { value: '' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('becomes enabled if the end date is changed', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByLabelText('End Date');
        fireEvent.change(inp, { target: { value: '2024-12-31' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the begin time is changed', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByLabelText('Begin Time');
        fireEvent.change(inp, { target: { value: '09:42' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the end time is changed', () => {
        render(
          <EventEditor
            event={TEST_EVENT}
            types={eventTypes}
            places={places}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByLabelText('End Time');
        fireEvent.change(inp, { target: { value: '14:42' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      describe('on click', () => {
        it('includes the original ID', () => {
          let event: Event | null = null;
          render(
            <EventEditor
              event={TEST_EVENT}
              types={eventTypes}
              places={places}
              onCancel={() => null}
              onConfirm={(e) => (event = e)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const inp = screen.getByRole('textbox', { name: 'Name' });
          fireEvent.change(inp, { target: { value: ' Buy some food     ' } });
          fireEvent.click(btn);
          expect(event!.id).toBe(TEST_EVENT.id);
        });

        it('includes the updated name', () => {
          let event: Event | null = null;
          render(
            <EventEditor
              event={TEST_EVENT}
              types={eventTypes}
              places={places}
              onCancel={() => null}
              onConfirm={(e) => (event = e)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const inp = screen.getByRole('textbox', { name: 'Name' });
          fireEvent.change(inp, { target: { value: ' Buy some food     ' } });
          fireEvent.click(btn);
          expect(event).toEqual({ ...TEST_EVENT, name: 'Buy some food' });
        });

        it('includes the updated type', () => {
          let event: Event | null = null;
          render(
            <EventEditor
              event={TEST_EVENT}
              types={eventTypes}
              places={places}
              onCancel={() => null}
              onConfirm={(e) => (event = e)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const sel = screen.getByRole('combobox', { name: 'Type of Event / Trip' });
          fireEvent.change(sel, { target: { value: '2' } });
          fireEvent.click(btn);
          expect(event).toEqual({ ...TEST_EVENT, type: EVENT_TYPES[1] });
        });

        it('includes the updated place', () => {
          let event: Event | null = null;
          render(
            <EventEditor
              event={TEST_EVENT}
              types={eventTypes}
              places={places}
              onCancel={() => null}
              onConfirm={(e) => (event = e)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const sel = screen.getByRole('combobox', { name: 'Location' });
          fireEvent.change(sel, { target: { value: '32' } });
          fireEvent.click(btn);
          expect(event).toEqual({ ...TEST_EVENT, place: PLACES[2] });
        });

        it('includes the updated begin date', () => {
          let event: Event | null = null;
          render(
            <EventEditor
              event={TEST_EVENT}
              types={eventTypes}
              places={places}
              onCancel={() => null}
              onConfirm={(e) => (event = e)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const inp = screen.getByLabelText('Begin Date');
          fireEvent.change(inp, { target: { value: '2024-10-30' } });
          fireEvent.click(btn);
          expect(event).toEqual({ ...TEST_EVENT, beginDate: '2024-10-30' });
        });

        it('includes the updated begin time', () => {
          let event: Event | null = null;
          render(
            <EventEditor
              event={TEST_EVENT}
              types={eventTypes}
              places={places}
              onCancel={() => null}
              onConfirm={(e) => (event = e)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const inp = screen.getByLabelText('Begin Time');
          fireEvent.change(inp, { target: { value: '13:42' } });
          fireEvent.click(btn);
          expect(event).toEqual({ ...TEST_EVENT, beginTime: '13:42' });
        });

        it('includes the updated end date', () => {
          let event: Event | null = null;
          render(
            <EventEditor
              event={TEST_EVENT}
              types={eventTypes}
              places={places}
              onCancel={() => null}
              onConfirm={(e) => (event = e)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const inp = screen.getByLabelText('End Date');
          fireEvent.change(inp, { target: { value: '2024-10-30' } });
          fireEvent.click(btn);
          expect(event).toEqual({ ...TEST_EVENT, endDate: '2024-10-30' });
        });

        it('includes the updated end time', () => {
          let event: Event | null = null;
          render(
            <EventEditor
              event={TEST_EVENT}
              types={eventTypes}
              places={places}
              onCancel={() => null}
              onConfirm={(e) => (event = e)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const inp = screen.getByLabelText('End Time');
          fireEvent.change(inp, { target: { value: '13:42' } });
          fireEvent.click(btn);
          expect(event).toEqual({ ...TEST_EVENT, endTime: '13:42' });
        });

        it('includes the updated description', () => {
          let event: Event | null = null;
          render(
            <EventEditor
              event={TEST_EVENT}
              types={eventTypes}
              places={places}
              onCancel={() => null}
              onConfirm={(e) => (event = e)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const inp = screen.getByRole('textbox', { name: 'Description' });
          fireEvent.change(inp, { target: { value: TEST_EVENT.description + 'y' } });
          fireEvent.click(btn);
          expect(event).toEqual({ ...TEST_EVENT, description: TEST_EVENT.description + 'y' });
        });
      });
    });
  });

  describe('Cancel Button', () => {
    it('exists', () => {
      render(<EventEditor types={eventTypes} places={places} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeDefined();
    });

    it('fires onCancel when clicked', () => {
      let fired = false;
      render(<EventEditor types={eventTypes} places={places} onCancel={() => (fired = true)} onConfirm={() => null} />);
      const btn = screen.getByRole('button', { name: 'Cancel' });
      fireEvent.click(btn);
      expect(fired).toBe(true);
    });
  });
});

const EVENT_TYPES: Array<EventType> = [
  {
    id: 4,
    name: 'Camping',
    description: 'Take the RV to a destination, relax, and explore.',
  },
  {
    id: 2,
    name: 'Sporting Event',
    description: 'The primary purpose of the activity is to view a competition.',
  },
  {
    id: 1,
    name: 'Vacation',
    description: 'Visit a destination for the sole purpose of visiting the location.',
  },
];

const PLACES: Array<SelectablePlace> = [
  {
    id: 13,
    name: 'Burnet State Park',
  },
  {
    id: 21,
    name: 'Indianapolis Motor Speedway',
  },
  {
    id: 32,
    name: 'Richard Bong State Park',
  },
  {
    id: 24,
    name: 'LaBahn Arena',
  },
];

const TEST_EVENT: Event = {
  id: 314,
  beginDate: '2024-09-28',
  beginTime: '18:30',
  endDate: '2024-09-30',
  endTime: '22:30',
  name: "Women's Hockey Tournament",
  description: 'A three day long tournament of women playing hockey',
  place: PLACES[3],
  type: EVENT_TYPES[1],
};
