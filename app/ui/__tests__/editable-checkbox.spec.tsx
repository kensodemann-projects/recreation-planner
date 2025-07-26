import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import EditableCheckbox from '../editable-checkbox';

describe('Editable Checkbox Component', () => {
  afterEach(() => cleanup());

  it('contains a checkbox', () => {
    render(
      <EditableCheckbox
        checked={true}
        label="I am a test"
        onChange={() => null}
        onLabelChanged={() => null}
        onRemove={() => null}
      />,
    );
    expect(screen.getByRole('checkbox')).toBeDefined();
  });

  it('displays the label text', () => {
    render(
      <EditableCheckbox
        checked={true}
        label="I am a test"
        onChange={() => null}
        onLabelChanged={() => null}
        onRemove={() => null}
      />,
    );
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
        onRemove={() => null}
        onLabelChanged={() => null}
      />,
    );
    await user.click(screen.getByRole('checkbox'));
    expect(checked).toBe(false);
  });

  describe('edit mode', () => {
    it('is entered by clicking the label text', async () => {
      const user = userEvent.setup();
      render(
        <EditableCheckbox
          checked={true}
          label="I am a test"
          onChange={() => null}
          onLabelChanged={() => null}
          onRemove={() => null}
        />,
      );
      await user.click(screen.getByText('I am a test'));
      const inp = screen.getByRole('textbox');
      expect(screen.getByDisplayValue('I am a test')).toEqual(inp);
    });

    it('disables the checkbox', async () => {
      const user = userEvent.setup();
      render(
        <EditableCheckbox
          checked={true}
          label="I am a test"
          onChange={() => null}
          onLabelChanged={() => null}
          onRemove={() => null}
        />,
      );
      const cb = screen.getByRole('checkbox');
      expect(cb.attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(screen.getByText('I am a test'));
      expect(cb.attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('displays the action buttons', async () => {
      const user = userEvent.setup();
      render(
        <EditableCheckbox
          checked={true}
          label="I am a test"
          onChange={() => null}
          onLabelChanged={() => null}
          onRemove={() => null}
        />,
      );
      expect(screen.queryByTestId('remove-button')).toBeNull();
      expect(screen.queryByTestId('save-button')).toBeNull();
      await user.click(screen.getByText('I am a test'));
      expect(screen.getByTestId('remove-button')).toBeDefined();
      expect(screen.getByTestId('save-button')).toBeDefined();
    });

    describe('clicking the delete button', () => {
      describe('without a removeVerification', () => {
        it('emits onRemove', async () => {
          let removeCalled = false;
          const user = userEvent.setup();
          render(
            <EditableCheckbox
              checked={true}
              label="I am a test"
              onChange={() => null}
              onRemove={() => (removeCalled = true)}
              onLabelChanged={() => null}
            />,
          );
          await user.click(screen.getByText('I am a test'));
          await user.click(screen.getByTestId('remove-button'));
          expect(removeCalled).toBe(true);
        });

        it('exits edit mode', async () => {
          const user = userEvent.setup();
          render(
            <EditableCheckbox
              checked={true}
              label="I am a test"
              onChange={() => null}
              onLabelChanged={() => null}
              onRemove={() => null}
            />,
          );
          await user.click(screen.getByText('I am a test'));
          await user.click(screen.getByTestId('remove-button'));
          expect(screen.getByText('I am a test')).toBeDefined();
          expect(screen.queryByRole('textbox')).toBeNull();
          const cb = screen.getByRole('checkbox');
          expect(cb.attributes.getNamedItem('disabled')).toBeFalsy();
        });
      });

      describe('with a removeVerification', () => {
        it('does not immediatly emit onRemove', async () => {
          let removeCalled = false;
          const user = userEvent.setup();
          render(
            <EditableCheckbox
              checked={true}
              label="I am a test"
              onChange={() => null}
              onRemove={() => (removeCalled = true)}
              onLabelChanged={() => null}
              removeVerification="This for permanent, yo!"
            />,
          );
          await user.click(screen.getByText('I am a test'));
          await user.click(screen.getByTestId('remove-button'));
          expect(removeCalled).toBe(false);
        });

        it('does not immediatly exit edit mode', async () => {
          const user = userEvent.setup();
          render(
            <EditableCheckbox
              checked={true}
              label="I am a test"
              onChange={() => null}
              onLabelChanged={() => null}
              onRemove={() => null}
              removeVerification="This for permanent, yo!"
            />,
          );
          await user.click(screen.getByText('I am a test'));
          await user.click(screen.getByTestId('remove-button'));
          const inp = screen.getByRole('textbox');
          expect(screen.getByDisplayValue('I am a test')).toEqual(inp);
          const cb = screen.getByRole('checkbox');
          expect(cb.attributes.getNamedItem('disabled')).toBeTruthy();
        });

        describe('when the user confirms the delete', () => {
          it('emits onRemove', async () => {
            let removeCalled = false;
            const user = userEvent.setup();
            render(
              <EditableCheckbox
                checked={true}
                label="I am a test"
                onChange={() => null}
                onRemove={() => (removeCalled = true)}
                onLabelChanged={() => null}
                removeVerification="This for permanent, yo!"
              />,
            );
            await user.click(screen.getByText('I am a test'));
            await user.click(screen.getByTestId('remove-button'));
            await user.click(screen.getByText('Yes'));
            expect(removeCalled).toBe(true);
          });

          it('exits edit mode', async () => {
            const user = userEvent.setup();
            render(
              <EditableCheckbox
                checked={true}
                label="I am a test"
                onChange={() => null}
                onLabelChanged={() => null}
                onRemove={() => null}
                removeVerification="This for permanent, yo!"
              />,
            );
            await user.click(screen.getByText('I am a test'));
            await user.click(screen.getByTestId('remove-button'));
            await user.click(screen.getByText('Yes'));
            expect(screen.getByText('I am a test')).toBeDefined();
            expect(screen.queryByRole('textbox')).toBeNull();
            const cb = screen.getByRole('checkbox');
            expect(cb.attributes.getNamedItem('disabled')).toBeFalsy();
          });
        });

        describe('when the user denies the delete', () => {
          it('does not emit onRemove', async () => {
            let removeCalled = false;
            const user = userEvent.setup();
            render(
              <EditableCheckbox
                checked={true}
                label="I am a test"
                onChange={() => null}
                onRemove={() => (removeCalled = true)}
                onLabelChanged={() => null}
                removeVerification="This for permanent, yo!"
              />,
            );
            await user.click(screen.getByText('I am a test'));
            await user.click(screen.getByTestId('remove-button'));
            await user.click(screen.getByText('No'));
            expect(removeCalled).toBe(false);
          });

          it('exits edit mode', async () => {
            const user = userEvent.setup();
            render(
              <EditableCheckbox
                checked={true}
                label="I am a test"
                onChange={() => null}
                onLabelChanged={() => null}
                onRemove={() => null}
                removeVerification="This for permanent, yo!"
              />,
            );
            await user.click(screen.getByText('I am a test'));
            await user.click(screen.getByTestId('remove-button'));
            await user.click(screen.getByText('No'));
            expect(screen.getByText('I am a test')).toBeDefined();
            expect(screen.queryByRole('textbox')).toBeNull();
            const cb = screen.getByRole('checkbox');
            expect(cb.attributes.getNamedItem('disabled')).toBeFalsy();
          });
        });
      });
    });

    describe('clicking the save button', () => {
      it('emits onLabelChanged with the updated label', async () => {
        let newLabel = '';
        const user = userEvent.setup();
        render(
          <EditableCheckbox
            checked={true}
            label="I am a test"
            onChange={() => null}
            onRemove={() => null}
            onLabelChanged={(x) => (newLabel = x)}
          />,
        );
        await user.click(screen.getByText('I am a test'));
        await user.type(screen.getByRole('textbox'), ' and I rock!');
        await user.click(screen.getByTestId('save-button'));
        expect(newLabel).toBe('I am a test and I rock!');
      });

      it('exits edit mode', async () => {
        const user = userEvent.setup();
        render(
          <EditableCheckbox
            checked={true}
            label="I am a test"
            onChange={() => null}
            onLabelChanged={() => null}
            onRemove={() => null}
          />,
        );
        await user.click(screen.getByText('I am a test'));
        await user.click(screen.getByTestId('save-button'));
        expect(screen.getByText('I am a test')).toBeDefined();
        expect(screen.queryByRole('textbox')).toBeNull();
        const cb = screen.getByRole('checkbox');
        expect(cb.attributes.getNamedItem('disabled')).toBeFalsy();
      });
    });
  });
});
