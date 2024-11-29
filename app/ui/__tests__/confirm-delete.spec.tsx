import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import ConfirmDelete from '../confirm-delete';

describe('Confirm Delete Component', () => {
  afterEach(() => cleanup());

  it('renders the section header', () => {
    render(<ConfirmDelete entityName="A Test Item" onConfirm={() => undefined} onDeny={() => undefined} />);
    expect(screen.getByRole('heading', { level: 2, name: 'A Test Item can be removed' })).toBeDefined();
  });

  it('raises confirm on yes', () => {
    let confirm = false;
    let deny = false;
    render(<ConfirmDelete entityName="A Test Item" onConfirm={() => (confirm = true)} onDeny={() => (deny = true)} />);
    const btn = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(btn);
    expect(confirm).toBe(true);
    expect(deny).toBe(false);
  });

  it('raises deny on no', () => {
    let confirm = false;
    let deny = false;
    render(<ConfirmDelete entityName="A Test Item" onConfirm={() => (confirm = true)} onDeny={() => (deny = true)} />);
    const btn = screen.getByRole('button', { name: 'No' });
    fireEvent.click(btn);
    expect(confirm).toBe(false);
    expect(deny).toBe(true);
  });
});
