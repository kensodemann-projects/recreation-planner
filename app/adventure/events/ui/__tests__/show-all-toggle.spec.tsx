import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ShowAllToggle from '../show-all-toggle';

describe('ShowAllToggle', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('renders the checkbox', () => {
    render(<ShowAllToggle onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeDefined();
  });

  it('renders the "Show All" label', () => {
    render(<ShowAllToggle onChange={vi.fn()} />);
    expect(screen.getByText('Show All')).toBeDefined();
  });

  it('renders the checkbox as unchecked when checked is false', () => {
    render(<ShowAllToggle checked={false} onChange={vi.fn()} />);
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(false);
  });

  it('renders the checkbox as unchecked when checked is not provided', () => {
    render(<ShowAllToggle onChange={vi.fn()} />);
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(false);
  });

  it('renders the checkbox as checked when checked is true', () => {
    render(<ShowAllToggle checked={true} onChange={vi.fn()} />);
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(true);
  });

  it('calls onChange with true when the checkbox is clicked while unchecked', async () => {
    const onChange = vi.fn();
    render(<ShowAllToggle checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('calls onChange with false when the checkbox is clicked while checked', async () => {
    const onChange = vi.fn();
    render(<ShowAllToggle checked={true} onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledExactlyOnceWith(false);
  });
});
