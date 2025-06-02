import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import EditableCheckbox from '../editable-checkbox';

describe('Editable Checkbox Component', () => {
  afterEach(() => cleanup());

  it('contains a checkbox', () => {
    render(<EditableCheckbox checked={true} label="I am a test" onChange={() => null} />);
    expect(screen.getByRole('checkbox')).toBeDefined();
  });

  it('displays the label text', () => {
    render(<EditableCheckbox checked={true} label="I am a test" onChange={() => null} />);
    expect(screen.getByText('I am a test')).toBeDefined();
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('toggles', async () => {
    const user = userEvent.setup();
    let checked: boolean = true;
    render(
      <EditableCheckbox
        checked={checked}
        label="I am a test"
        onChange={(evt) => {
          checked = evt.target.checked;
        }}
      />,
    );
    await user.click(screen.getByRole('checkbox'));
    expect(checked).toBe(false);
  });

  describe('edit mode', () => {
    it('is entered by clicking the label text', async () => {
      const user = userEvent.setup();
      render(<EditableCheckbox checked={true} label="I am a test" onChange={() => null} />);
      await user.click(screen.getByText('I am a test'));
      const inp = screen.getByRole('textbox');
      expect(screen.getByDisplayValue('I am a test')).toEqual(inp);
    });

    it('disables the checkbox', async () => {
      const user = userEvent.setup();
      render(<EditableCheckbox checked={true} label="I am a test" onChange={() => null} />);
      const cb = screen.getByRole('checkbox');
      expect(cb.attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(screen.getByText('I am a test'));
      expect(cb.attributes.getNamedItem('disabled')).toBeTruthy();
    });

    describe('leaving the input', () => {
      it('returns the edited label', async () => {
        const user = userEvent.setup();
        let label: string = 'I am a test';
        render(
          <EditableCheckbox checked={true} label={label} onChange={() => null} onLabelChanged={(x) => (label = x)} />,
        );
        await user.click(screen.getByText('I am a test'));
        await user.type(screen.getByRole('textbox'), '. I am only a test!');
        await user.tab();
        expect(label).toBe('I am a test. I am only a test!');
      });

      it('exits edit mode', async () => {
        const user = userEvent.setup();
        render(<EditableCheckbox checked={true} label="I am a test" onChange={() => null} />);
        await user.click(screen.getByText('I am a test'));
        await user.click(screen.getByRole('textbox'));
        await user.tab();
        expect(screen.getByText('I am a test')).toBeDefined();
        expect(screen.queryByRole('textbox')).toBeNull();
      });

      it('enables the checkbox', async () => {
        const user = userEvent.setup();
        render(<EditableCheckbox checked={true} label="I am a test" onChange={() => null} />);
        await user.click(screen.getByText('I am a test'));
        await user.click(screen.getByRole('textbox'));
        await user.tab();
        const cb = screen.getByRole('checkbox');
        expect(cb.attributes.getNamedItem('disabled')).toBeFalsy();
      });
    });
  });
});
