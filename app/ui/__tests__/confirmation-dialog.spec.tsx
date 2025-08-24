import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import ConfirmationDialog from '../confirmation-dialog';
import userEvent from '@testing-library/user-event';

describe('conformation dialog', () => {
  afterEach(() => cleanup());

  it('renders the title', () => {
    render(
      <ConfirmationDialog
        title="Are you sure?"
        message="This change is for reals."
        isOpen={true}
        onResponse={() => null}
      />,
    );
    expect(screen.getByText('Are you sure?')).toBeDefined();
  });

  it('renders the message', () => {
    render(
      <ConfirmationDialog
        title="Are you sure?"
        message="This change is for reals."
        isOpen={true}
        onResponse={() => null}
      />,
    );
    expect(screen.getByText('This change is for reals.')).toBeDefined();
  });

  it('opens the dialog when isOpen is true', () => {
    render(
      <ConfirmationDialog
        title="Are you sure?"
        message="This change is for reals."
        isOpen={true}
        onResponse={() => null}
      />,
    );
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce();
    expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled();
  });

  it('closes the dialog when isOpen is false', () => {
    render(
      <ConfirmationDialog
        title="Are you sure?"
        message="This change is for reals."
        isOpen={false}
        onResponse={() => null}
      />,
    );
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledOnce();
  });

  it('responds true on "yes"', async () => {
    let response: boolean | null = null;
    const user = userEvent.setup();
    render(
      <ConfirmationDialog
        title="Are you sure?"
        message="This change is for reals."
        isOpen={true}
        onResponse={(x) => (response = x)}
      />,
    );
    const button = screen.getByText('Yes');
    await user.click(button);
    expect(response).toBe(true);
  });

  it('responds false on "no"', async () => {
    let response: boolean | null = null;
    const user = userEvent.setup();
    render(
      <ConfirmationDialog
        title="Are you sure?"
        message="This change is for reals."
        isOpen={true}
        onResponse={(x) => (response = x)}
      />,
    );
    const button = screen.getByText('No');
    await user.click(button);
    expect(response).toBe(false);
  });
});
