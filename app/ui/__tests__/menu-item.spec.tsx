import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import MenuItem from '../menu-item';

describe('Menu Item', () => {
  afterEach(() => cleanup());

  it('displays the content', () => {
    render(<MenuItem onClick={() => null}>I am content</MenuItem>);
    expect(screen.getByText('I am content')).toBeDefined();
  });

  describe('with an href', () => {
    it('includes a link', () => {
      render(
        <MenuItem href="foobar" onClick={() => null}>
          I am content
        </MenuItem>,
      );
      expect(screen.getByRole('link', { name: 'I am content' })).toBeDefined();
    });
  });

  describe('without an href', () => {
    it('does not include a link', () => {
      render(<MenuItem onClick={() => null}>I am content</MenuItem>);
      expect(screen.queryByRole('link')).toBeNull();
    });
  });
});
