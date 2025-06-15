import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import EquipmentEditor from '../equipment-editor';
import { Equipment } from '@/models';

describe('Equipment Editor', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('name input', () => {
    it('exists', () => {
      render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
      const inp = screen.getByRole('textbox', { name: 'Name' });
      expect(inp).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no collection', () => {
        render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the name of the collection', () => {
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_EQUIPMENT.name);
      });
    });

    describe('required error', () => {
      it('is not displayed initially', () => {
        render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Name is required')).toBeNull();
      });

      it('is displayed after tabbing out of the input', async () => {
        const user = userEvent.setup();
        render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Name is required')).toBeDefined();
      });

      it('is no longer displayed after text entry', async () => {
        const user = userEvent.setup();
        render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Name is required')).toBeDefined();
        await user.type(inp, 'f');
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Name is required')).toBeNull();
      });
    });
  });

  describe('Description Input', () => {
    it('exists', () => {
      render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('textbox', { name: 'Description' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no equipment', () => {
        render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Description' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the description of the equipment', () => {
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Description' }) as HTMLInputElement;
        expect(inp.value).toBe(TEST_EQUIPMENT.description);
      });

      it('is blank if the equipment description is null', () => {
        render(
          <EquipmentEditor
            equipment={{ ...TEST_EQUIPMENT, description: null }}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByRole('textbox', { name: 'Description' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });
    });
  });

  describe('Purchase Date Input', () => {
    it('exists', () => {
      render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByLabelText('Purchase Date')).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no equipment', () => {
        render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByLabelText('Purchase Date') as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the purchase date of the equipment', () => {
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByLabelText('Purchase Date') as HTMLInputElement;
        expect(inp.value).toBe(TEST_EQUIPMENT.purchaseDate);
      });

      it('is blank if the equipment purchase date is null', () => {
        render(
          <EquipmentEditor
            equipment={{ ...TEST_EQUIPMENT, purchaseDate: null }}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByLabelText('Purchase Date') as HTMLInputElement;
        expect(inp.value).toBe('');
      });
    });
  });

  describe('Cost Input', () => {
    it('exists', () => {
      render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
      expect(screen.getByRole('spinbutton', { name: 'Cost' })).toBeDefined();
    });

    describe('initial value', () => {
      it('is blank with no equipment', () => {
        render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('spinbutton', { name: 'Cost' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });

      it('has the cost of the equipment', () => {
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('spinbutton', { name: 'Cost' }) as HTMLInputElement;
        expect(parseFloat(inp.value)).toBe(TEST_EQUIPMENT.cost);
      });

      it('is blank if the equipment cost is null', () => {
        render(
          <EquipmentEditor
            equipment={{ ...TEST_EQUIPMENT, cost: null }}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        const inp = screen.getByRole('spinbutton', { name: 'Cost' }) as HTMLInputElement;
        expect(inp.value).toBe('');
      });
    });
  });

  describe('Cancel Button', () => {
    it('exists', () => {
      render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
      const btn = screen.getByRole('button', { name: 'Cancel' });
      expect(btn).toBeDefined();
    });

    it('fires onCancel when clicked', async () => {
      const user = userEvent.setup();
      let fired = false;
      render(<EquipmentEditor onCancel={() => (fired = true)} onConfirm={() => null} />);
      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(fired).toBe(true);
    });
  });

  describe('Confirm Button', () => {
    describe('for create', () => {
      it('create exists', () => {
        render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Create' });
        expect(btn).toBeDefined();
      });

      it('update does not exist', () => {
        render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.queryByRole('button', { name: 'Update' });
        expect(btn).toBeNull();
      });

      it('starts disabled', () => {
        render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Create' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('is disabled without a name', async () => {
        const user = userEvent.setup();
        render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Description' }), 'This is a large Class C RV');
        await user.type(screen.getByLabelText('Purchase Date'), '2025-05-31');
        await user.type(screen.getByRole('spinbutton', { name: 'Cost' }), '94995.34');
        const btn = screen.getByRole('button', { name: 'Create' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('is enabled with a name', async () => {
        const user = userEvent.setup();
        render(<EquipmentEditor onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Coachman Something');
        const btn = screen.getByRole('button', { name: 'Create' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      describe('on click', () => {
        it('includes the entered data', async () => {
          let equipment: Equipment | null = null;
          const user = userEvent.setup();
          render(<EquipmentEditor onCancel={() => null} onConfirm={(e) => (equipment = e)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Test Equipment');
          await user.type(
            screen.getByRole('textbox', { name: 'Description' }),
            'This is the description of the equipment',
          );
          await user.type(screen.getByLabelText('Purchase Date'), '2025-05-31');
          await user.type(screen.getByRole('spinbutton', { name: 'Cost' }), '94995.34');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(equipment).toEqual({
            name: 'Test Equipment',
            description: 'This is the description of the equipment',
            purchaseDate: '2025-05-31',
            cost: 94995.34,
          });
        });

        it('uses null for optional items that are not entered', async () => {
          let equipment: Equipment | null = null;
          const user = userEvent.setup();
          render(<EquipmentEditor onCancel={() => null} onConfirm={(e) => (equipment = e)} />);
          await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Test Equipment');
          await user.click(screen.getByRole('button', { name: 'Create' }));
          expect(equipment).toEqual({
            name: 'Test Equipment',
            description: null,
            purchaseDate: null,
            cost: null,
          });
        });
      });
    });

    describe('for update', () => {
      it('update button exist', () => {
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn).toBeDefined();
      });

      it('create button does not exist', () => {
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.queryByRole('button', { name: 'Create' });
        expect(btn).toBeNull();
      });

      it('begins disabled', () => {
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('is enabled if the description is cleared', async () => {
        const user = userEvent.setup();
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        await user.clear(screen.getByRole('textbox', { name: 'Description' }));
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('is enabled if the description is changed', async () => {
        const user = userEvent.setup();
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('textbox', { name: 'Description' }), 'more stuff');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('is disabled if the name is cleared', async () => {
        const user = userEvent.setup();
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        await user.clear(screen.getByRole('textbox', { name: 'Name' }));
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
      });

      it('becomes enabled if the cleared name gets new data', async () => {
        const user = userEvent.setup();
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        const inp = screen.getByRole('textbox', { name: 'Name' });
        await user.clear(inp);
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
        await user.type(inp, 'This is new data');
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('is enabled if the purchse date is cleared', async () => {
        const user = userEvent.setup();
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        await user.clear(screen.getByLabelText('Purchase Date'));
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('is enabled if the purcase date is changed', async () => {
        const user = userEvent.setup();
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        await user.clear(screen.getByLabelText('Purchase Date'));
        await user.type(screen.getByLabelText('Purchase Date'), '2023-07-02');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('is enabled if the cost is cleared', async () => {
        const user = userEvent.setup();
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        await user.clear(screen.getByRole('spinbutton', { name: 'Cost' }));
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      it('is enabled if the cost is changed', async () => {
        const user = userEvent.setup();
        render(<EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={() => null} />);
        await user.type(screen.getByRole('spinbutton', { name: 'Cost' }), '4');
        const btn = screen.getByRole('button', { name: 'Update' });
        expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
      });

      describe('on click', () => {
        it('resolves the updated data', async () => {
          let equipment: Equipment | null = null;
          const user = userEvent.setup();
          render(
            <EquipmentEditor equipment={TEST_EQUIPMENT} onCancel={() => null} onConfirm={(c) => (equipment = c)} />,
          );
          const name = screen.getByRole('textbox', { name: 'Name' });
          const description = screen.getByRole('textbox', { name: 'Description' });
          await user.clear(name);
          await user.type(name, 'Test Equipment');
          await user.type(description, ' This is extra stuff added to the description.');
          await user.click(screen.getByRole('button', { name: 'Update' }));
          expect(equipment).toEqual({
            ...TEST_EQUIPMENT,
            name: 'Test Equipment',
            description: TEST_EQUIPMENT.description + ' This is extra stuff added to the description.',
          });
        });
      });
    });
  });
});

const TEST_EQUIPMENT: Equipment = {
  id: 42,
  name: 'Vogon Planet Destroyer',
  description: 'Providing quality destruction of your useless planet since 1964',
  purchaseDate: '2021-03-15',
  cost: 15483.34,
};
