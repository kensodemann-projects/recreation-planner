import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import ConfirmDelete from '../confirm-delete';

describe('Confirm Delete Component', () => {
  afterEach(() => cleanup());

  it('renders the section header', () => {
    render(<ConfirmDelete entityName="A Test Item" onConfirm={() => undefined} onDeny={() => undefined} />);
    expect(screen.getByRole('heading', { level: 2, name: 'A Test Item can be removed' })).toBeDefined();
  });

  it('raises confirm on yes', async () => {
    const user = userEvent.setup();
    let confirm = false;
    let deny = false;
    render(<ConfirmDelete entityName="A Test Item" onConfirm={() => (confirm = true)} onDeny={() => (deny = true)} />);
    await user.click(screen.getByRole('button', { name: 'Yes' }));
    expect(confirm).toBe(true);
    expect(deny).toBe(false);
  });

  it('raises deny on no', async () => {
    const user = userEvent.setup();
    let confirm = false;
    let deny = false;
    render(<ConfirmDelete entityName="A Test Item" onConfirm={() => (confirm = true)} onDeny={() => (deny = true)} />);
    await user.click(screen.getByRole('button', { name: 'No' }));
    expect(confirm).toBe(false);
    expect(deny).toBe(true);
  });
});
