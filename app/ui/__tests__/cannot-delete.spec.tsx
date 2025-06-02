import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import CannotDelete from '../cannot-delete';

describe('Cannot Delete Component', () => {
  afterEach(() => cleanup());

  it('renders the section header', () => {
    render(<CannotDelete entityName="A Test Item" onClick={() => undefined} />);
    expect(screen.getByRole('heading', { level: 2, name: 'A Test Item cannot be removed' })).toBeDefined();
  });

  it('raises click on OK', async () => {
    const user = userEvent.setup();
    let confirm = false;
    render(<CannotDelete entityName="A Test Item" onClick={() => (confirm = true)} />);
    await user.click(screen.getByRole('button', { name: 'OK' }));
    expect(confirm).toBe(true);
  });
});
