import { Place, PlaceType } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

      it('is displayed after exit', async () => {
        const user = userEvent.setup();
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Name is required')).toBeDefined();
      });

      it('is no longer displayed after text entry', async () => {
        const user = userEvent.setup();
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        await user.click(inp);
        await user.tab();
        await user.type(inp, 'f');
        expect(screen.queryByText('Name is required')).toBeNull();
        await user.clear(inp);
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

      it('becomes enabled if a name is entered', async () => {
        const user = userEvent.setup();
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Create' });
        await user.type(screen.getByRole('textbox', { name: 'Name' }), 'f');
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      describe('on click', () => {
        it('includes the entered name', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), ' The Food Court     ');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(place!.name).toBe('The Food Court');
        });

        it('uses the first type if not set', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), ' The Food Court     ');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(place!.type).toEqual(PLACE_TYPES[0]);
        });

        it('includes the selected type', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), ' The Food Court     ');
          await user.selectOptions(screen.getByRole('combobox', { name: 'Type of place' }), '2');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(place!.type).toEqual(PLACE_TYPES[1]);
        });

        it('has an undefined ID', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), ' The Food Court     ');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(place!.id).toBeUndefined();
        });

        it('sets the unspecified values to null', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), ' The Food Court     ');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(place!.description).toBeNull();
          expect(place!.address.line1).toBeNull();
          expect(place!.address.line2).toBeNull();
          expect(place!.address.city).toBeNull();
          expect(place!.address.state).toBeNull();
          expect(place!.address.postal).toBeNull();
          expect(place!.website).toBeNull();
          expect(place!.phoneNumber).toBeNull();
        });

        it('includes description', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'The Food Court');
          await user.type(screen.getByRole('textbox', { name: 'Description' }), ' A place to get yummy food!  ');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(place!.description).toBe('A place to get yummy food!');
        });

        it('includes address line 1', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'The Food Court');
          await user.type(screen.getByRole('textbox', { name: 'Line 1' }), '   123 Foobar Lane  ');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(place!.address.line1).toBe('123 Foobar Lane');
        });

        it('includes address line 2', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'The Food Court');
          await user.type(screen.getByRole('textbox', { name: 'Line 2' }), '   Unit 4203  ');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(place!.address.line2).toBe('Unit 4203');
        });

        it('includes city', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'The Food Court');
          await user.type(screen.getByRole('textbox', { name: 'City' }), '   Waukesha  ');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(place!.address.city).toBe('Waukesha');
        });

        it('includes state', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'The Food Court');
          await user.type(screen.getByRole('textbox', { name: 'State / Province' }), '   WI  ');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(place!.address.state).toBe('WI');
        });

        it('includes postal', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'The Food Court');
          await user.type(screen.getByRole('textbox', { name: 'Postal Code' }), '   53819   ');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(place!.address.postal).toBe('53819');
        });

        it('includes phone number', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'The Food Court');
          await user.type(screen.getByRole('textbox', { name: 'Phone Number' }), ' (231) 243-1433   ');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(place!.phoneNumber).toBe('(231) 243-1433');
        });

        it('includes website', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={(p: Place) => (place = p)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'The Food Court');
          await user.type(screen.getByRole('textbox', { name: 'Website' }), '     https://the.food.court.com  ');
          await user.click(screen.getByRole('button', { name: 'Create' }));
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

      it('becomes enabled if the name is changed', async () => {
        const user = userEvent.setup();
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Name' }), 'f');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the place type is changed', async () => {
        const user = userEvent.setup();
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        await user.selectOptions(screen.getByRole('combobox', { name: 'Type of place' }), '4');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the description is changed', async () => {
        const user = userEvent.setup();
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Description' }), 'f');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the address line 1 is changed', async () => {
        const user = userEvent.setup();
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Line 1' }), 'f');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the address line 2 is changed', async () => {
        const user = userEvent.setup();
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Line 2' }), 'f');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the address city is changed', async () => {
        const user = userEvent.setup();
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'City' }), 'f');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the address state / province is changed', async () => {
        const user = userEvent.setup();
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'State / Province' }), 'S');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the address postal code is changed', async () => {
        const user = userEvent.setup();
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Postal Code' }), '-');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the phone number is changed', async () => {
        const user = userEvent.setup();
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Phone Number' }), '2');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('becomes enabled if the website is changed', async () => {
        const user = userEvent.setup();
        render(<PlaceEditor place={TEST_PLACE} types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Website' }), '/');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      describe('on click', () => {
        it('includes the original ID', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'f');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(place!.id).toBe(TEST_PLACE.id);
        });

        it('includes the updated name', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'f');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(place).toEqual({ ...TEST_PLACE, name: TEST_PLACE.name + 'f' });
        });

        it('includes the updated type', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          await user.selectOptions(screen.getByRole('combobox', { name: 'Type of place' }), '2');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(place).toEqual({ ...TEST_PLACE, type: PLACE_TYPES[1] });
        });

        it('includes the updated description', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          await user.type(screen.getByRole('textbox', { name: 'Description' }), 'f');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(place).toEqual({ ...TEST_PLACE, description: TEST_PLACE.description + 'f' });
        });

        it('includes the updated address line 1', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          await user.type(screen.getByRole('textbox', { name: 'Line 1' }), ' Dr.   ');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(place).toEqual({
            ...TEST_PLACE,
            address: { ...TEST_PLACE.address, line1: TEST_PLACE.address.line1 + ' Dr.' },
          });
        });

        it('includes the updated address line 2', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          await user.type(screen.getByRole('textbox', { name: 'Line 2' }), ' 3    ');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(place).toEqual({
            ...TEST_PLACE,
            address: { ...TEST_PLACE.address, line2: TEST_PLACE.address.line2 + ' 3' },
          });
        });

        it('includes the updated city', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          await user.type(screen.getByRole('textbox', { name: 'City' }), ' City   ');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(place).toEqual({
            ...TEST_PLACE,
            address: { ...TEST_PLACE.address, city: TEST_PLACE.address.city + ' City' },
          });
        });

        it('includes the updated state', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          const inp = screen.getByRole('textbox', { name: 'State / Province' });
          await user.clear(inp);
          await user.type(inp, '   MN  ');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(place).toEqual({ ...TEST_PLACE, address: { ...TEST_PLACE.address, state: 'MN' } });
        });

        it('includes the updated postal code', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          await user.type(screen.getByRole('textbox', { name: 'Postal Code' }), '-1194  ');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(place).toEqual({
            ...TEST_PLACE,
            address: { ...TEST_PLACE.address, postal: TEST_PLACE.address.postal + '-1194' },
          });
        });

        it('includes the updated phone number', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          await user.type(screen.getByRole('textbox', { name: 'Phone Number' }), ' ext-4273  ');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(place).toEqual({ ...TEST_PLACE, phoneNumber: TEST_PLACE.phoneNumber + ' ext-4273' });
        });

        it('includes the updated website', async () => {
          const user = userEvent.setup();
          let place: Place | null = null;
          render(
            <PlaceEditor
              place={TEST_PLACE}
              types={placeTypes}
              onCancel={() => null}
              onConfirm={(p: Place) => (place = p)}
            />,
          );
          await user.type(screen.getByRole('textbox', { name: 'Website' }), '?search=foobar  ');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(place).toEqual({ ...TEST_PLACE, website: TEST_PLACE.website + '?search=foobar' });
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

    it('fires onCancel when clicked', async () => {
      const user = userEvent.setup();
      let fired = false;
      render(<PlaceEditor types={placeTypes} onCancel={() => (fired = true)} onConfirm={() => null} />);
      await user.click(screen.getByRole('button', { name: 'Cancel' }));
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
