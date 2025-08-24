import { cleanup, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import MenuItem from '../menu-item';

vi.mock('next/navigation');

describe('Menu Item', () => {
  beforeEach(() => (usePathname as Mock).mockReturnValue('foobar'));
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
