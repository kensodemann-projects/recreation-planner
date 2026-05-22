import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PlaceTypeIcon from '../place-type-icon';

describe('PlaceTypeIcon', () => {
  afterEach(() => cleanup());

  describe('known place types', () => {
    it.each([
      'Attraction',
      'Campground',
      'Lodging',
      'Motorplex',
      'Museum',
      'Restaurant',
      'Sports Arena',
      'State Park',
      'Theater',
    ])('renders an icon for %s', (typeName) => {
      render(<PlaceTypeIcon typeName={typeName} />);
      expect(screen.getByRole('img', { name: `${typeName} icon` })).toBeDefined();
    });
  });

  describe('unknown place type', () => {
    it('renders a fallback icon for an unrecognised place type', () => {
      render(<PlaceTypeIcon typeName="Unknown Type" />);
      expect(screen.getByRole('img', { name: 'Unknown Type icon' })).toBeDefined();
    });
  });

  describe('className', () => {
    it('applies a default class to the icon', () => {
      render(<PlaceTypeIcon typeName="State Park" />);
      const icon = screen.getByRole('img', { name: 'State Park icon' });
      expect(icon.querySelector('svg')?.classList.contains('w-6')).toBe(true);
    });

    it('applies a custom class when provided', () => {
      render(<PlaceTypeIcon typeName="State Park" className="w-8 h-8" />);
      const icon = screen.getByRole('img', { name: 'State Park icon' });
      expect(icon.querySelector('svg')?.classList.contains('w-8')).toBe(true);
    });
  });
});
