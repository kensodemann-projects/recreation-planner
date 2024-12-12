import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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

  it('toggles', () => {
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
    const cb = screen.getByRole('checkbox');
    fireEvent.click(cb);
    expect(checked).toBe(false);
  });

  describe('edit mode', () => {
    it('is entered by clicking the label text', () => {
      render(<EditableCheckbox checked={true} label="I am a test" onChange={() => null} />);
      const el = screen.getByText('I am a test');
      fireEvent.click(el);
      const inp = screen.getByRole('textbox');
      expect(screen.getByDisplayValue('I am a test')).toEqual(inp);
    });

    it('disables the checkbox', () => {
      render(<EditableCheckbox checked={true} label="I am a test" onChange={() => null} />);
      const cb = screen.getByRole('checkbox');
      expect(cb.attributes.getNamedItem('disabled')).toBeFalsy();
      const el = screen.getByText('I am a test');
      fireEvent.click(el);
      expect(cb.attributes.getNamedItem('disabled')).toBeTruthy();
    });

    describe('on blur', () => {
      it('returns the edited label', () => {
        let label: string = 'I am a test';
        render(
          <EditableCheckbox checked={true} label={label} onChange={() => null} onLabelChanged={(x) => (label = x)} />,
        );
        const el = screen.getByText('I am a test');
        fireEvent.click(el);
        const inp = screen.getByRole('textbox');
        fireEvent.change(inp, { target: { value: 'This is another test' } });
        fireEvent.blur(inp);
        expect(label).toBe('This is another test');
      });

      it('exits edit mode', () => {
        render(<EditableCheckbox checked={true} label="I am a test" onChange={() => null} />);
        const el = screen.getByText('I am a test');
        fireEvent.click(el);
        const inp = screen.getByRole('textbox');
        fireEvent.blur(inp);
        expect(screen.getByText('I am a test')).toBeDefined();
        expect(screen.queryByRole('textbox')).toBeNull();
      });

      it('the checkbox is enabled', () => {
        render(<EditableCheckbox checked={true} label="I am a test" onChange={() => null} />);
        const cb = screen.getByRole('checkbox');
        const el = screen.getByText('I am a test');
        fireEvent.click(el);
        const inp = screen.getByRole('textbox');
        fireEvent.blur(inp);
        expect(cb.attributes.getNamedItem('disabled')).toBeFalsy();
      });
    });
  });
});
