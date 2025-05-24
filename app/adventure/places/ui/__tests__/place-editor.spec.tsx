import { Place, PlaceType } from '@/models';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PlaceEditor from '../place-editor';

describe('Place Editor', () => {
  afterEach(() => cleanup());

  const placeTypes: Array<PlaceType> = [...PLACE_TYPES];

  describe('Name Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Name' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no place', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the name of the place', () => {
        render(<PlaceEditor types={placeTypes} place={TEST_PLACE} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_PLACE.name);
      });
    });

    describe('required error', () => {
      it('is not displayed initially', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Name is required')).toBeNull();
      });

      it('is displayed after blur-sm', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        fireEvent.blur(inp);
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Name is required')).toBeDefined();
      });

      it('is no lonber displayed after text entry', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
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

  describe('place type selector', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('combobox', { name: 'Type of place' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is the first type with no place', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const sel = screen.getByRole('combobox', { name: 'Type of place' }) as HTMLSelectElement;
        expect(+sel.value).toBe(PLACE_TYPES[0].id);
      });

      it('has the type of the place', () => {
        render(<PlaceEditor types={placeTypes} place={TEST_PLACE} onCancel={() => null} onConfirm={() => null} />);
        const sel = screen.getByRole('combobox', { name: 'Type of place' }) as HTMLSelectElement;
        expect(+sel.value).toBe(TEST_PLACE.type.id);
      });
    });
  });

  describe('Description Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Description' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no place', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Description' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the description of the place', () => {
        render(<PlaceEditor types={placeTypes} place={TEST_PLACE} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Description' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_PLACE.description);
      });

      it('is blank if the place description is null', () => {
        render(
          <PlaceEditor
            types={placeTypes}
            place={{ ...TEST_PLACE, description: null }}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByRole('textbox', { name: 'Description' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });
    });
  });

  describe('Address Line 1 Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Line 1' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no place', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Line 1' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the address line 1 of the place', () => {
        render(<PlaceEditor types={placeTypes} place={TEST_PLACE} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Line 1' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_PLACE.address.line1);
      });

      it('is blank if the place address line 1 is null', () => {
        render(
          <PlaceEditor
            types={placeTypes}
            place={{ ...TEST_PLACE, address: { ...TEST_PLACE.address, line1: null } }}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByRole('textbox', { name: 'Line 1' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });
    });
  });

  describe('Address Line 2 Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Line 2' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no place', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Line 2' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the address line 2 of the place', () => {
        render(<PlaceEditor types={placeTypes} place={TEST_PLACE} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Line 2' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_PLACE.address.line2);
      });

      it('is blank if the place address line 2 is null', () => {
        render(
          <PlaceEditor
            types={placeTypes}
            place={{ ...TEST_PLACE, address: { ...TEST_PLACE.address, line2: null } }}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByRole('textbox', { name: 'Line 2' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });
    });
  });

  describe('City Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'City' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no place', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'City' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the address city of the place', () => {
        render(<PlaceEditor types={placeTypes} place={TEST_PLACE} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'City' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_PLACE.address.city);
      });

      it('is blank if the place address city is null', () => {
        render(
          <PlaceEditor
            types={placeTypes}
            place={{ ...TEST_PLACE, address: { ...TEST_PLACE.address, city: null } }}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByRole('textbox', { name: 'City' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });
    });
  });

  describe('State / Province Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'State / Province' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no place', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'State / Province' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the address state / province of the place', () => {
        render(<PlaceEditor types={placeTypes} place={TEST_PLACE} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'State / Province' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_PLACE.address.state);
      });

      it('is blank if the place address state / province is null', () => {
        render(
          <PlaceEditor
            types={placeTypes}
            place={{ ...TEST_PLACE, address: { ...TEST_PLACE.address, state: null } }}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByRole('textbox', { name: 'State / Province' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });
    });
  });

  describe('Postal Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Postal Code' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no place', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Postal Code' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the postal code of the place', () => {
        render(<PlaceEditor types={placeTypes} place={TEST_PLACE} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Postal Code' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_PLACE.address.postal);
      });

      it('is blank if the place postal code is null', () => {
        render(
          <PlaceEditor
            types={placeTypes}
            place={{ ...TEST_PLACE, address: { ...TEST_PLACE.address, postal: null } }}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByRole('textbox', { name: 'Postal Code' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });
    });
  });

  describe('Phone Number Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Phone Number' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no place', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Phone Number' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the phone number of the place', () => {
        render(<PlaceEditor types={placeTypes} place={TEST_PLACE} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Phone Number' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_PLACE.phoneNumber);
      });

      it('is blank if the place phone number is null', () => {
        render(
          <PlaceEditor
            types={placeTypes}
            place={{ ...TEST_PLACE, phoneNumber: null }}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByRole('textbox', { name: 'Phone Number' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });
    });
  });

  describe('Website Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Website' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no place', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Website' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the website of the place', () => {
        render(<PlaceEditor types={placeTypes} place={TEST_PLACE} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Website' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_PLACE.website);
      });

      it('is blank if the place website is null', () => {
        render(
          <PlaceEditor
            types={placeTypes}
            place={{ ...TEST_PLACE, website: null }}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByRole('textbox', { name: 'Website' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });
    });
  });

  describe('Confirm Button', () => {
    describe('for create', () => {
      it('exists', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Create' });
        expect(btn).toBeDefined();
      });

      it('starts disabled', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Create' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('becomes enabled if a name is entered', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Create' });
        const inp = screen.getByRole('textbox', { name: 'Name' });
        fireEvent.change(inp, { target: { value: 'f' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      describe('on click', () => {
        it('includes the entered name', () => {
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          const btn = screen.getByRole('button', { name: 'Create' });
          const inp = screen.getByRole('textbox', { name: 'Name' });
          fireEvent.change(inp, { target: { value: ' The Food Court     ' } });
          fireEvent.click(btn);
          expect(place!.name).toBe('The Food Court');
        });

        it('uses the first type if not set', () => {
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          const btn = screen.getByRole('button', { name: 'Create' });
          const inp = screen.getByRole('textbox', { name: 'Name' });
          fireEvent.change(inp, { target: { value: ' The Food Court     ' } });
          fireEvent.click(btn);
          expect(place!.type).toEqual(PLACE_TYPES[0]);
        });

        it('includes the selected type', () => {
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          const btn = screen.getByRole('button', { name: 'Create' });
          const inp = screen.getByRole('textbox', { name: 'Name' });
          const sel = screen.getByRole('combobox', { name: 'Type of place' });
          fireEvent.change(inp, { target: { value: ' The Food Court     ' } });
          fireEvent.change(sel, { target: { value: '2' } });
          fireEvent.click(btn);
          expect(place!.type).toEqual(PLACE_TYPES[1]);
        });

        it('has an undefined ID', () => {
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          const btn = screen.getByRole('button', { name: 'Create' });
          const inp = screen.getByRole('textbox', { name: 'Name' });
          fireEvent.change(inp, { target: { value: ' The Food Court     ' } });
          fireEvent.click(btn);
          expect(place!.id).toBeUndefined();
        });

        it('sets the unspecified values to null', () => {
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          const btn = screen.getByRole('button', { name: 'Create' });
          const inp = screen.getByRole('textbox', { name: 'Name' });
          fireEvent.change(inp, { target: { value: 'The Food Court' } });
          fireEvent.click(btn);
          expect(place!.description).toBeNull();
          expect(place!.address.line1).toBeNull();
          expect(place!.address.line2).toBeNull();
          expect(place!.address.city).toBeNull();
          expect(place!.address.state).toBeNull();
          expect(place!.address.postal).toBeNull();
          expect(place!.website).toBeNull();
          expect(place!.phoneNumber).toBeNull();
        });

        it('includes description', () => {
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const descriptionInput = screen.getByRole('textbox', { name: 'Description' });
          fireEvent.change(nameInput, { target: { value: 'The Food Court' } });
          fireEvent.change(descriptionInput, { target: { value: '   A place to get yummy food!  ' } });
          fireEvent.click(btn);
          expect(place!.description).toBe('A place to get yummy food!');
        });

        it('includes address line 1', () => {
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const addressLine1Input = screen.getByRole('textbox', { name: 'Line 1' });
          fireEvent.change(nameInput, { target: { value: 'The Food Court' } });
          fireEvent.change(addressLine1Input, { target: { value: '   123 Foobar Lane  ' } });
          fireEvent.click(btn);
          expect(place!.address.line1).toBe('123 Foobar Lane');
        });

        it('includes address line 2', () => {
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const addressLine2Input = screen.getByRole('textbox', { name: 'Line 2' });
          fireEvent.change(nameInput, { target: { value: 'The Food Court' } });
          fireEvent.change(addressLine2Input, { target: { value: '   Unit 4203  ' } });
          fireEvent.click(btn);
          expect(place!.address.line2).toBe('Unit 4203');
        });

        it('includes city', () => {
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const cityInput = screen.getByRole('textbox', { name: 'City' });
          fireEvent.change(nameInput, { target: { value: 'The Food Court' } });
          fireEvent.change(cityInput, { target: { value: ' Waukesha   ' } });
          fireEvent.click(btn);
          expect(place!.address.city).toBe('Waukesha');
        });

        it('includes state', () => {
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const stateInput = screen.getByRole('textbox', { name: 'State / Province' });
          fireEvent.change(nameInput, { target: { value: 'The Food Court' } });
          fireEvent.change(stateInput, { target: { value: '       WI ' } });
          fireEvent.click(btn);
          expect(place!.address.state).toBe('WI');
        });

        it('includes postal', () => {
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const postalInput = screen.getByRole('textbox', { name: 'Postal Code' });
          fireEvent.change(nameInput, { target: { value: 'The Food Court' } });
          fireEvent.change(postalInput, { target: { value: '  53819 ' } });
          fireEvent.click(btn);
          expect(place!.address.postal).toBe('53819');
        });

        it('includes phone number', () => {
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const phoneNumberInput = screen.getByRole('textbox', { name: 'Phone Number' });
          fireEvent.change(nameInput, { target: { value: 'The Food Court' } });
          fireEvent.change(phoneNumberInput, { target: { value: ' (231) 243-1433 ' } });
          fireEvent.click(btn);
          expect(place!.phoneNumber).toBe('(231) 243-1433');
        });

        it('includes website', () => {
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          const btn = screen.getByRole('button', { name: 'Create' });
          const nameInput = screen.getByRole('textbox', { name: 'Name' });
          const websiteInput = screen.getByRole('textbox', { name: 'Website' });
          fireEvent.change(nameInput, { target: { value: 'The Food Court' } });
          fireEvent.change(websiteInput, { target: { value: '    https://the.food.court.com  ' } });
          fireEvent.click(btn);
          expect(place!.website).toBe('https://the.food.court.com');
        });
      });
    });

    describe('for update', () => {
      it('exists', () => {
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn).toBeDefined();
      });

      it('starts disabled', () => {
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('becomes enabled if the name is changed', () => {
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('textbox', { name: 'Name' });
        fireEvent.change(inp, { target: { value: TEST_PLACE.name + 'f' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the place type is changed', () => {
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        const sel = screen.getByRole('combobox', { name: 'Type of place' });
        fireEvent.change(sel, { target: { value: 4 } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the description is changed', () => {
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('textbox', { name: 'Description' });
        fireEvent.change(inp, { target: { value: TEST_PLACE.description + 'f' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the address line 1 is changed', () => {
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('textbox', { name: 'Line 1' });
        fireEvent.change(inp, { target: { value: TEST_PLACE.address.line1 + 'f' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the address line 2 is changed', () => {
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('textbox', { name: 'Line 2' });
        fireEvent.change(inp, { target: { value: TEST_PLACE.address.line2 + 'f' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the address city is changed', () => {
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('textbox', { name: 'City' });
        fireEvent.change(inp, { target: { value: TEST_PLACE.address.city + 'f' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the address state / province is changed', () => {
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('textbox', { name: 'State / Province' });
        fireEvent.change(inp, { target: { value: TEST_PLACE.address.state + 'S' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the address postal code is changed', () => {
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('textbox', { name: 'Postal Code' });
        fireEvent.change(inp, { target: { value: TEST_PLACE.address.postal + '-' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the phone number is changed', () => {
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('textbox', { name: 'Phone Number' });
        fireEvent.change(inp, { target: { value: TEST_PLACE.phoneNumber + '2' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the website is changed', () => {
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        const inp = screen.getByRole('textbox', { name: 'Website' });
        fireEvent.change(inp, { target: { value: TEST_PLACE.website + '/' } });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      describe('on click', () => {
        it('includes the original ID', () => {
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const inp = screen.getByRole('textbox', { name: 'Name' });
          fireEvent.change(inp, { target: { value: ' The Food Court     ' } });
          fireEvent.click(btn);
          expect(place!.id).toBe(TEST_PLACE.id);
        });

        it('includes the updated name', () => {
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const inp = screen.getByRole('textbox', { name: 'Name' });
          fireEvent.change(inp, { target: { value: ' The Food Court     ' } });
          fireEvent.click(btn);
          expect(place).toEqual({ ...TEST_PLACE, name: 'The Food Court' });
        });

        it('includes the updated type', () => {
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const sel = screen.getByRole('combobox', { name: 'Type of place' });
          fireEvent.change(sel, { target: { value: '2' } });
          fireEvent.click(btn);
          expect(place).toEqual({ ...TEST_PLACE, type: PLACE_TYPES[1] });
        });

        it('includes the updated description', () => {
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const descriptionInput = screen.getByRole('textbox', { name: 'Description' });
          fireEvent.change(descriptionInput, { target: { value: '   A place to get yummy food!  ' } });
          fireEvent.click(btn);
          expect(place).toEqual({ ...TEST_PLACE, description: 'A place to get yummy food!' });
        });

        it('includes the updated address line 1', () => {
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const addressLine1Input = screen.getByRole('textbox', { name: 'Line 1' });
          fireEvent.change(addressLine1Input, { target: { value: '   123 Foobar Lane  ' } });
          fireEvent.click(btn);
          expect(place).toEqual({ ...TEST_PLACE, address: { ...TEST_PLACE.address, line1: '123 Foobar Lane' } });
        });

        it('includes the updated address line 2', () => {
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const addressLine2Input = screen.getByRole('textbox', { name: 'Line 2' });
          fireEvent.change(addressLine2Input, { target: { value: '   Unit 4203  ' } });
          fireEvent.click(btn);
          expect(place).toEqual({ ...TEST_PLACE, address: { ...TEST_PLACE.address, line2: 'Unit 4203' } });
        });

        it('includes the updated city', () => {
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const cityInput = screen.getByRole('textbox', { name: 'City' });
          fireEvent.change(cityInput, { target: { value: ' Waukesha   ' } });
          fireEvent.click(btn);
          expect(place).toEqual({ ...TEST_PLACE, address: { ...TEST_PLACE.address, city: 'Waukesha' } });
        });

        it('includes the updated state', () => {
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const stateInput = screen.getByRole('textbox', { name: 'State / Province' });
          fireEvent.change(stateInput, { target: { value: '       WI ' } });
          fireEvent.click(btn);
          expect(place).toEqual({ ...TEST_PLACE, address: { ...TEST_PLACE.address, state: 'WI' } });
        });

        it('includes the updated postal code', () => {
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const postalInput = screen.getByRole('textbox', { name: 'Postal Code' });
          fireEvent.change(postalInput, { target: { value: '  53819 ' } });
          fireEvent.click(btn);
          expect(place).toEqual({ ...TEST_PLACE, address: { ...TEST_PLACE.address, postal: '53819' } });
        });

        it('includes the updated phone number', () => {
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const phoneNumberInput = screen.getByRole('textbox', { name: 'Phone Number' });
          fireEvent.change(phoneNumberInput, { target: { value: ' (231) 243-1433 ' } });
          fireEvent.click(btn);
          expect(place).toEqual({ ...TEST_PLACE, phoneNumber: '(231) 243-1433' });
        });

        it('includes the updated website', () => {
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          const btn = screen.getByRole('button', { name: 'Update' });
          const websiteInput = screen.getByRole('textbox', { name: 'Website' });
          fireEvent.change(websiteInput, { target: { value: '    https://the.food.court.com  ' } });
          fireEvent.click(btn);
          expect(place).toEqual({ ...TEST_PLACE, website: 'https://the.food.court.com' });
        });
      });
    });
  });

  describe('Cancel Button', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      const btn = screen.getByRole('button', { name: 'Cancel' });
      expect(btn).toBeDefined();
    });

    it('fires onCancel when clicked', () => {
      let fired = false;
      render(<PlaceEditor types={placeTypes} onCancel={() => (fired = true)} onConfirm={() => null} />);
      const btn = screen.getByRole('button', { name: 'Cancel' });
      fireEvent.click(btn);
      expect(fired).toBe(true);
    });
  });
});

const PLACE_TYPES: Array<PlaceType> = [
  {
    id: 1,
    name: 'State Park',
    description: 'A state owned property for camping and recreation.',
  },
  {
    id: 2,
    name: 'Race Track',
    description: 'A place where it is OK to drive really fast.',
  },
  {
    id: 3,
    name: 'Sports Arena',
    description: 'Go sports!!',
  },
  {
    id: 4,
    name: 'Hotel',
    description: 'A place to lodge for the night.',
  },
];

const TEST_PLACE: Place = {
  id: 4,
  name: 'LaBahn Arena',
  description: 'Where the UW Badgers women play their home games.',
  address: {
    line1: '105 East Campus Mall',
    line2: 'The main bowl',
    city: 'Madison',
    state: 'WI',
    postal: '53715',
  },
  phoneNumber: '(608) 555 - 1234',
  website: 'https://winners.edu',
  type: PLACE_TYPES[2],
};
