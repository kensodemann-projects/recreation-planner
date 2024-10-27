import { Place, PlaceType } from '@/models';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PlaceEditor from '../place-editor';

describe('Place Editor', () => {
  afterEach(() => cleanup());

  const placeTypes: Array<PlaceType> = [];

  describe('Name Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Name' })).toBeDefined();
    });

    describe('required error', () => {
      it('is not displayed initially', () => {
        render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Name is required')).toBeNull();
      });

      it('is displayed after blur', () => {
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

  describe('Description Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Description' })).toBeDefined();
    });
  });

  describe('Address Line 1 Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Line 1' })).toBeDefined();
    });
  });

  describe('Address Line 2 Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Line 2' })).toBeDefined();
    });
  });

  describe('City Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'City' })).toBeDefined();
    });
  });

  describe('State / Province Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'State / Province' })).toBeDefined();
    });
  });

  describe('Postal Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Postal Code' })).toBeDefined();
    });
  });

  describe('Phone Number Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Phone Number' })).toBeDefined();
    });
  });

  describe('Website Input', () => {
    it('exists', () => {
      render(<PlaceEditor types={placeTypes} onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Website' })).toBeDefined();
    });
  });

  describe('Create Button', () => {
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
