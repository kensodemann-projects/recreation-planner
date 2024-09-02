import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '../page';

describe('Home Page', () => {
  it('has a header', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined();
  });
});
