import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import AlertDialog from '../alert-dialog';
import userEvent from '@testing-library/user-event';

describe('alert dialog', () => {
  afterEach(() => cleanup());

  it('renders the title', () => {
    render(
      <AlertDialog title="I am alerting you" message="Danger Will Robbinson." isOpen={true} onResponse={() => null} />,
    );
    expect(screen.getByText('I am alerting you')).toBeDefined();
  });

  it('renders the message', () => {
    render(
      <AlertDialog title="I am alerting you" message="Danger Will Robbinson." isOpen={true} onResponse={() => null} />,
    );
    expect(screen.getByText('Danger Will Robbinson.')).toBeDefined();
  });

  it('opens the dialog when isOpen is true', () => {
    render(
      <AlertDialog title="I am alerting you" message="Danger Will Robbinson." isOpen={true} onResponse={() => null} />,
    );
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce();
    expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled();
  });

  it('closes the dialog when isOpen is false', () => {
    render(
      <AlertDialog title="I am alerting you" message="Danger Will Robbinson." isOpen={false} onResponse={() => null} />,
    );
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledOnce();
  });

  it('responds true on "OK"', async () => {
    let response: boolean | null = null;
    const user = userEvent.setup();
    render(
      <AlertDialog
        title="I am alerting you"
        message="Danger Will Robbinson."
        isOpen={true}
        onResponse={(x) => (response = x)}
      />,
    );
    const button = screen.getByText('OK');
    await user.click(button);
    expect(response).toBe(true);
  });
});
