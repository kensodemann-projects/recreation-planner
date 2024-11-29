import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import CannotDelete from '../cannot-delete';

describe('Cannot Delete Component', () => {
  afterEach(() => cleanup());

  it('renders the section header', () => {
    render(<CannotDelete entityName="A Test Item" onClick={() => undefined} />);
    expect(screen.getByRole('heading', { level: 2, name: 'A Test Item cannot be removed' })).toBeDefined();
  });

  it('raises click on OK', () => {
    let confirm = false;
    render(<CannotDelete entityName="A Test Item" onClick={() => (confirm = true)} />);
    const btn = screen.getByRole('button', { name: 'OK' });
    fireEvent.click(btn);
    expect(confirm).toBe(true);
  });
});
