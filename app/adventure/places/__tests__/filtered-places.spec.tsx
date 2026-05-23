import { Place, PlaceType } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { PLACE_TYPES, PLACES } from '../__mocks__/data';
import FilteredPlaces from '../filtered-places';

describe('Filtered Places', () => {
  afterEach(() => cleanup());

  const placeTypes: PlaceType[] = [...PLACE_TYPES];
  const places: Place[] = [...PLACES];

  describe('Place Type filter', () => {
    it('renders the Place Type dropdown', () => {
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      expect(screen.getByRole('combobox', { name: 'Place Type' })).toBeDefined();
    });

    it('populates the dropdown with all place types', () => {
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      const select = screen.getByRole('combobox', { name: 'Place Type' }) as HTMLSelectElement;
      placeTypes.forEach((t) => {
        expect(select).toBeDefined();
        expect(screen.getByRole('option', { name: t.name })).toBeDefined();
      });
    });

    it('includes an "All" option', () => {
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      expect(screen.getByRole('option', { name: 'All' })).toBeDefined();
    });

    it('defaults to "All" (no filter active)', () => {
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      const select = screen.getByRole('combobox', { name: 'Place Type' }) as HTMLSelectElement;
      expect(select.value).toBe('');
    });
  });

  describe('when no filter is active', () => {
    it('shows all places', () => {
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      places.forEach((p) => {
        expect(screen.getByRole('link', { name: p.name })).toBeDefined();
      });
    });
  });

  describe('when a Place Type is selected', () => {
    it('shows only places of the selected type', async () => {
      const user = userEvent.setup();
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      const select = screen.getByRole('combobox', { name: 'Place Type' });

      await user.selectOptions(select, String(PLACE_TYPES[0].id));

      const stateParkPlaces = PLACES.filter((p) => p.type.id === PLACE_TYPES[0].id);
      const otherPlaces = PLACES.filter((p) => p.type.id !== PLACE_TYPES[0].id);

      stateParkPlaces.forEach((p) => {
        expect(screen.getByRole('link', { name: p.name })).toBeDefined();
      });
      otherPlaces.forEach((p) => {
        expect(screen.queryByRole('link', { name: p.name })).toBeNull();
      });
    });

    it('updates live when the selection changes', async () => {
      const user = userEvent.setup();
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      const select = screen.getByRole('combobox', { name: 'Place Type' });

      await user.selectOptions(select, String(PLACE_TYPES[1].id));

      const raceTrackPlaces = PLACES.filter((p) => p.type.id === PLACE_TYPES[1].id);
      const otherPlaces = PLACES.filter((p) => p.type.id !== PLACE_TYPES[1].id);

      raceTrackPlaces.forEach((p) => {
        expect(screen.getByRole('link', { name: p.name })).toBeDefined();
      });
      otherPlaces.forEach((p) => {
        expect(screen.queryByRole('link', { name: p.name })).toBeNull();
      });
    });
  });

  describe('Search input', () => {
    it('renders a search input', () => {
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      expect(screen.getByRole('searchbox', { name: 'Search' })).toBeDefined();
    });

    it('defaults to empty', () => {
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      const input = screen.getByRole('searchbox', { name: 'Search' }) as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('filters places by name as the user types', async () => {
      const user = userEvent.setup();
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      const input = screen.getByRole('searchbox', { name: 'Search' });

      await user.type(input, 'bong');

      expect(screen.getByRole('link', { name: 'Richard Bong State Park' })).toBeDefined();
      expect(screen.queryByRole('link', { name: 'Burnet State Park' })).toBeNull();
    });

    it('is case-insensitive', async () => {
      const user = userEvent.setup();
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      const input = screen.getByRole('searchbox', { name: 'Search' });

      await user.type(input, 'BONG');

      expect(screen.getByRole('link', { name: 'Richard Bong State Park' })).toBeDefined();
    });

    it('combines with the Place Type filter', async () => {
      const user = userEvent.setup();
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);

      await user.selectOptions(screen.getByRole('combobox', { name: 'Place Type' }), String(PLACE_TYPES[0].id));
      await user.type(screen.getByRole('searchbox', { name: 'Search' }), 'bong');

      expect(screen.getByRole('link', { name: 'Richard Bong State Park' })).toBeDefined();
      expect(screen.queryByRole('link', { name: 'Burnet State Park' })).toBeNull();
      expect(screen.queryByRole('link', { name: 'Indianapolis Motor Speedway' })).toBeNull();
    });
  });

  describe('Clear Filter', () => {
    it('renders', () => {
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      expect(screen.getByRole('button', { name: /clear filter/i })).toBeDefined();
    });

    it('resets the filter and shows all places', async () => {
      const user = userEvent.setup();
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      const select = screen.getByRole('combobox', { name: 'Place Type' });

      await user.selectOptions(select, String(PLACE_TYPES[0].id));

      const clearButton = screen.getByRole('button', { name: /clear filter/i });
      await user.click(clearButton);

      places.forEach((p) => {
        expect(screen.getByRole('link', { name: p.name })).toBeDefined();
      });
    });

    it('resets the search input', async () => {
      const user = userEvent.setup();
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      const input = screen.getByRole('searchbox', { name: 'Search' }) as HTMLInputElement;

      await user.type(input, 'bong');

      await user.click(screen.getByRole('button', { name: /clear filter/i }));

      expect(input.value).toBe('');
    });

    it('resets the Place Type dropdown to "All"', async () => {
      const user = userEvent.setup();
      render(<FilteredPlaces places={places} placeTypes={placeTypes} />);
      const select = screen.getByRole('combobox', { name: 'Place Type' }) as HTMLSelectElement;

      await user.selectOptions(select, String(PLACE_TYPES[0].id));

      const clearButton = screen.getByRole('button', { name: /clear filter/i });
      await user.click(clearButton);

      expect(select.value).toBe('');
    });
  });
});
