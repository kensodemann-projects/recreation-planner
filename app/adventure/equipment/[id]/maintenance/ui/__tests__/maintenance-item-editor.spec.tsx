import { MAINTENANCE_TYPES, MAINTENANCE_ITEMS, USAGE_UNITS } from '@/app/adventure/equipment/__mocks__/data';
import { MaintenanceItem } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MaintenanceItemEditor from '../maintenance-item-editor';

describe('Maintenace Item Editor', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  const getCostInput = () => screen.getByRole('spinbutton', { name: 'Cost' }) as HTMLInputElement;
  const getDateInput = () => screen.getByLabelText('Date') as HTMLInputElement;
  const getDescriptionInput = () => screen.getByRole('textbox', { name: 'Description' }) as HTMLInputElement;
  const getNameInput = () => screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
  const getTypeOfEventSelect = () => screen.getByRole('combobox', { name: 'Type of Event' }) as HTMLSelectElement;
  const getUsageInput = () => screen.getByRole('spinbutton', { name: 'Usage' }) as HTMLInputElement;
  const getUsageUnitsSelect = () => screen.getByRole('combobox', { name: 'Usage Units' }) as HTMLSelectElement;
  const getCancelButton = () => screen.getByRole('button', { name: 'Cancel' }) as HTMLButtonElement;
  const getCreateButton = () => screen.getByRole('button', { name: 'Create' }) as HTMLButtonElement;
  const getUpdateButton = () => screen.getByRole('button', { name: 'Update' }) as HTMLButtonElement;
  const nameErrorMessage = 'Name is required';
  const dateErrorMessage = 'Date is required';
  const usageErrorMessage = 'Usage is required';

  describe('name input', () => {
    describe('initial value', () => {
      it('has the name of the event', () => {
        render(
          <MaintenanceItemEditor
            maintenanceItem={MAINTENANCE_ITEMS[0]}
            maintenanceTypes={MAINTENANCE_TYPES}
            usageUnits={USAGE_UNITS}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        expect(getNameInput().value).toBe(MAINTENANCE_ITEMS[0].name);
      });
    });
  });

  describe('date input', () => {
    describe('initial value', () => {
      it('has the date of the event', () => {
        render(
          <MaintenanceItemEditor
            maintenanceItem={MAINTENANCE_ITEMS[0]}
            maintenanceTypes={MAINTENANCE_TYPES}
            usageUnits={USAGE_UNITS}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        expect(getDateInput().value).toBe(MAINTENANCE_ITEMS[0].date);
      });
    });
  });

  describe('Type of Event Selector', () => {
    describe('initial value', () => {
      it('is set to the equipment event type of the event', () => {
        render(
          <MaintenanceItemEditor
            maintenanceItem={MAINTENANCE_ITEMS[0]}
            maintenanceTypes={MAINTENANCE_TYPES}
            usageUnits={USAGE_UNITS}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        expect(+getTypeOfEventSelect().value).toBe(MAINTENANCE_ITEMS[0].maintenanceType.id);
      });
    });
  });

  describe('Description Input', () => {
    describe('initial value', () => {
      it('has the description of the equipment event', () => {
        expect(MAINTENANCE_ITEMS[0].description).toBeTruthy();
        render(
          <MaintenanceItemEditor
            maintenanceItem={MAINTENANCE_ITEMS[0]}
            maintenanceTypes={MAINTENANCE_TYPES}
            usageUnits={USAGE_UNITS}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        expect(getDescriptionInput().value).toBe(MAINTENANCE_ITEMS[0].description);
      });

      it('is blank if the equipment description is null', () => {
        render(
          <MaintenanceItemEditor
            maintenanceItem={{ ...MAINTENANCE_ITEMS[0], description: null }}
            maintenanceTypes={MAINTENANCE_TYPES}
            usageUnits={USAGE_UNITS}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        expect(getDescriptionInput().value).toBe('');
      });
    });
  });

  describe('Usage Input', () => {
    describe('initial value', () => {
      it('has the usage of the equipment event', () => {
        expect(MAINTENANCE_ITEMS[1].usage).toBeTruthy();
        render(
          <MaintenanceItemEditor
            maintenanceItem={MAINTENANCE_ITEMS[1]}
            maintenanceTypes={MAINTENANCE_TYPES}
            usageUnits={USAGE_UNITS}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        expect(getUsageInput().valueAsNumber).toBe(MAINTENANCE_ITEMS[1].usage);
      });

      it('is blank if the equipment usage is null', () => {
        expect(MAINTENANCE_ITEMS[0].usage).toBeNull();
        render(
          <MaintenanceItemEditor
            maintenanceItem={MAINTENANCE_ITEMS[0]}
            maintenanceTypes={MAINTENANCE_TYPES}
            usageUnits={USAGE_UNITS}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        expect(getUsageInput().value).toBe('');
      });
    });
  });

  describe('Usage Units Selector', () => {
    describe('initial value', () => {
      it('is set to the first usage units value when there is no usage units on the event', () => {
        render(
          <MaintenanceItemEditor
            maintenanceItem={MAINTENANCE_ITEMS[0]}
            maintenanceTypes={MAINTENANCE_TYPES}
            usageUnits={USAGE_UNITS}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        expect(+getUsageUnitsSelect().value).toBe(USAGE_UNITS[0].id);
      });

      it('is set to the usage units of the event', () => {
        render(
          <MaintenanceItemEditor
            maintenanceItem={MAINTENANCE_ITEMS[1]}
            maintenanceTypes={MAINTENANCE_TYPES}
            usageUnits={USAGE_UNITS}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        expect(+getUsageUnitsSelect().value).toBe(MAINTENANCE_ITEMS[1].usageUnits!.id);
      });
    });
  });

  describe('Cost Input', () => {
    describe('initial value', () => {
      it('has the cost of the equipment event', () => {
        expect(MAINTENANCE_ITEMS[1].cost).toBeTruthy();
        render(
          <MaintenanceItemEditor
            maintenanceItem={MAINTENANCE_ITEMS[1]}
            maintenanceTypes={MAINTENANCE_TYPES}
            usageUnits={USAGE_UNITS}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        expect(getCostInput().valueAsNumber).toBe(MAINTENANCE_ITEMS[1].cost);
      });

      it('is blank if the equipment cost is null', () => {
        expect(MAINTENANCE_ITEMS[0].cost).toBeNull();
        render(
          <MaintenanceItemEditor
            maintenanceItem={MAINTENANCE_ITEMS[0]}
            maintenanceTypes={MAINTENANCE_TYPES}
            usageUnits={USAGE_UNITS}
            onCancel={() => null}
            onConfirm={() => null}
          />,
        );
        expect(getCostInput().value).toBe('');
      });
    });
  });

  describe('for create', () => {
    let user: UserEvent;
    let cancelFired = false;
    let savedEvent: MaintenanceItem | Omit<MaintenanceItem, 'equipmentRid'> | null = null;
    beforeEach(() => {
      user = userEvent.setup();
      savedEvent = null;
      render(
        <MaintenanceItemEditor
          maintenanceTypes={MAINTENANCE_TYPES}
          usageUnits={USAGE_UNITS}
          onCancel={() => (cancelFired = true)}
          onConfirm={(evt) => (savedEvent = evt)}
        />,
      );
    });

    describe('Cancel Button', () => {
      it('exists', () => {
        expect(getCancelButton()).toBeDefined();
      });

      it('fires onCancel when clicked', async () => {
        await user.click(getCancelButton());
        expect(cancelFired).toBe(true);
      });
    });

    it('displays a create button', () => {
      expect(getCreateButton()).toBeDefined();
      expect(screen.queryByRole('button', { name: 'Update' })).toBeNull();
    });

    it('starts with a disabled create button', () => {
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('has default values for all fields', () => {
      expect(getNameInput().value).toBe('');
      expect(getDateInput().value).toBe('');
      expect(+getTypeOfEventSelect().value).toBe(MAINTENANCE_TYPES[0].id);
      expect(getDescriptionInput().value).toBe('');
      expect(getCostInput().value).toBe('');
      expect(getUsageInput().value).toBe('');
      expect(+getUsageUnitsSelect().value).toBe(USAGE_UNITS[0].id);
    });

    it('does not initially display any errors', () => {
      expect(getNameInput().classList).not.toContain('input-error');
      expect(screen.queryByText('Name is required')).toBeNull();
      expect(getDateInput().classList).not.toContain('input-error');
      expect(screen.queryByText('Date is required')).toBeNull();
      expect(getDescriptionInput().classList).not.toContain('textarea-error');
      expect(screen.queryByText('Description is required')).toBeNull();
      expect(getCostInput().classList).not.toContain('input-error');
      expect(screen.queryByText('Cost is required')).toBeNull();
      expect(getUsageInput().classList).not.toContain('input-error');
      expect(screen.queryByText('Usage is required')).toBeNull();
    });

    it('errors on no name', async () => {
      const nameInput = getNameInput();
      await user.click(nameInput);
      await user.tab();
      expect(nameInput.classList).toContain('input-error');
      expect(screen.getByText(nameErrorMessage)).toBeDefined();
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeTruthy();
      await user.type(nameInput, 'f');
      expect(nameInput.classList).not.toContain('input-error');
      expect(screen.queryByText(nameErrorMessage)).toBeNull();
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('errors on no date', async () => {
      const dateInput = getDateInput();
      await user.click(dateInput);
      await user.tab();
      expect(dateInput.classList).toContain('input-error');
      expect(screen.getByText(dateErrorMessage)).toBeDefined();
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeTruthy();
      await user.type(dateInput, '2025-01-15');
      expect(dateInput.classList).not.toContain('input-error');
      expect(screen.queryByText(dateErrorMessage)).toBeNull();
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('allows entry of a Mileage/Usage Reading event (miles)', async () => {
      await user.type(getNameInput(), 'Check the miles');
      await user.type(getDateInput(), '2025-03-18');
      await user.selectOptions(getTypeOfEventSelect(), '1');
      await user.click(getUsageInput());
      await user.tab();
      expect(getUsageInput().classList).toContain('input-error');
      expect(screen.getByText(usageErrorMessage)).toBeDefined();
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeTruthy();
      await user.type(getUsageInput(), '13435.3');
      expect(getUsageInput().classList).not.toContain('input-error');
      expect(screen.queryByText(usageErrorMessage)).toBeNull();
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(getCreateButton());
      expect(savedEvent).toEqual({
        name: 'Check the miles',
        date: '2025-03-18',
        maintenanceType: MAINTENANCE_TYPES.find((x) => x.id === 1),
        description: '',
        cost: 0,
        usage: 13435.3,
        usageUnits: USAGE_UNITS[0],
      });
    });

    it('allows entry of a Mileage/Usage Reading event (hours)', async () => {
      await user.type(getNameInput(), 'Check the hours');
      await user.type(getDateInput(), '2025-03-18');
      await user.selectOptions(getTypeOfEventSelect(), '1');
      await user.type(getUsageInput(), '143.5');
      await user.selectOptions(getUsageUnitsSelect(), '2');
      await user.click(getCreateButton());
      expect(savedEvent).toEqual({
        name: 'Check the hours',
        date: '2025-03-18',
        maintenanceType: MAINTENANCE_TYPES.find((x) => x.id === 1),
        description: '',
        cost: 0,
        usage: 143.5,
        usageUnits: USAGE_UNITS[1],
      });
    });

    it('allows entry of a Periodic Maintenance event', async () => {
      await user.type(getNameInput(), 'Wash the windows');
      await user.type(getDateInput(), '2025-03-31');
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeTruthy();
      await user.selectOptions(getTypeOfEventSelect(), '2');
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(getCreateButton());
      expect(savedEvent).toEqual({
        name: 'Wash the windows',
        date: '2025-03-31',
        maintenanceType: MAINTENANCE_TYPES.find((x) => x.id === 2),
        description: '',
        cost: 0,
        usage: 0,
      });
    });

    it('allows entry of a Repair event', async () => {
      await user.type(getNameInput(), 'Realign the main deflectors');
      await user.type(getDateInput(), '2025-06-15');
      await user.selectOptions(getTypeOfEventSelect(), '3');
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeTruthy();
      await user.type(getCostInput(), '4883.39');
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(getCreateButton());
      expect(savedEvent).toEqual({
        name: 'Realign the main deflectors',
        date: '2025-06-15',
        maintenanceType: MAINTENANCE_TYPES.find((x) => x.id === 3),
        description: '',
        cost: 4883.39,
        usage: 0,
      });
    });

    it('allows entry of an Improvement / Modification event', async () => {
      await user.type(getNameInput(), 'Add a massive death ray');
      await user.type(getDateInput(), '2025-07-04');
      await user.selectOptions(getTypeOfEventSelect(), '4');
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeTruthy();
      await user.type(getCostInput(), '51993.99');
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(getCreateButton());
      expect(savedEvent).toEqual({
        name: 'Add a massive death ray',
        date: '2025-07-04',
        maintenanceType: MAINTENANCE_TYPES.find((x) => x.id === 4),
        description: '',
        cost: 51993.99,
        usage: 0,
      });
    });

    it('allows entry of a Condition Report event', async () => {
      await user.type(getNameInput(), 'Fall condition report');
      await user.type(getDateInput(), '2025-10-15');
      await user.selectOptions(getTypeOfEventSelect(), '5');
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeTruthy();
      await user.type(getDescriptionInput(), 'Completely winterized and clean. Death ray is disconnected.');
      expect(getCreateButton().attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(getCreateButton());
      expect(savedEvent).toEqual({
        name: 'Fall condition report',
        date: '2025-10-15',
        maintenanceType: MAINTENANCE_TYPES.find((x) => x.id === 5),
        description: 'Completely winterized and clean. Death ray is disconnected.',
        cost: 0,
        usage: 0,
      });
    });

    it('allows entry of a fully specified event.', async () => {
      await user.type(getNameInput(), 'Realign the main deflectors');
      await user.type(getDateInput(), '2025-06-15');
      await user.selectOptions(getTypeOfEventSelect(), '3');
      await user.type(getDescriptionInput(), 'The main deflectors are required to stop the empire.');
      await user.type(getCostInput(), '48849.49');
      await user.type(getUsageInput(), '499');
      await user.selectOptions(getUsageUnitsSelect(), '2');
      await user.click(getCreateButton());
      expect(savedEvent).toEqual({
        name: 'Realign the main deflectors',
        date: '2025-06-15',
        maintenanceType: MAINTENANCE_TYPES.find((x) => x.id === 3),
        description: 'The main deflectors are required to stop the empire.',
        cost: 48849.49,
        usage: 499,
        usageUnits: USAGE_UNITS.find((x) => x.id === 2),
      });
    });
  });

  describe('for update', () => {
    let user: UserEvent;
    let savedEvent: MaintenanceItem | Omit<MaintenanceItem, 'equipmentRid'> | null = null;
    beforeEach(() => {
      user = userEvent.setup();
      savedEvent = null;
      render(
        <MaintenanceItemEditor
          maintenanceItem={MAINTENANCE_ITEMS[0]}
          maintenanceTypes={MAINTENANCE_TYPES}
          usageUnits={USAGE_UNITS}
          onCancel={() => null}
          onConfirm={(evt) => (savedEvent = evt)}
        />,
      );
    });

    it('displays an update button', () => {
      expect(getUpdateButton()).toBeDefined();
      expect(screen.queryByRole('button', { name: 'Create' })).toBeNull();
    });

    it('starts with a disabled update button', () => {
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('keeps the update button disabled if switching to a type that requires unentered data', async () => {
      await user.selectOptions(getTypeOfEventSelect(), '1');
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('enables the update button if the required data is filled in', async () => {
      await user.selectOptions(getTypeOfEventSelect(), '1');
      await user.type(getUsageInput(), '99340.9');
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(getUpdateButton());
      expect(savedEvent).toEqual({
        ...MAINTENANCE_ITEMS[0],
        maintenanceType: MAINTENANCE_TYPES.find((x) => x.id === 1),
        usage: 99340.9,
        usageUnits: USAGE_UNITS[0],
        cost: 0,
      });
    });

    it('enables update if switching to a type that does not require unentred data', async () => {
      await user.selectOptions(getTypeOfEventSelect(), '2');
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(getUpdateButton());
      expect(savedEvent).toEqual({
        ...MAINTENANCE_ITEMS[0],
        maintenanceType: MAINTENANCE_TYPES.find((x) => x.id === 2),
        cost: 0,
        usage: 0,
      });
    });

    it('enables the update if modifying the name', async () => {
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeTruthy();
      await user.type(getNameInput(), 'i');
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(getUpdateButton());
      expect(savedEvent).toEqual({
        ...MAINTENANCE_ITEMS[0],
        name: MAINTENANCE_ITEMS[0].name + 'i',
        cost: 0,
        usage: 0,
      });
    });

    it('enables the update if modifying the date', async () => {
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeTruthy();
      await user.clear(getDateInput());
      await user.type(getDateInput(), '2025-01-03');
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(getUpdateButton());
      expect(savedEvent).toEqual({
        ...MAINTENANCE_ITEMS[0],
        date: '2025-01-03',
        cost: 0,
        usage: 0,
      });
    });

    it('enables the update if modifying the description', async () => {
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeTruthy();
      await user.type(getDescriptionInput(), 'x');
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(getUpdateButton());
      expect(savedEvent).toEqual({
        ...MAINTENANCE_ITEMS[0],
        description: MAINTENANCE_ITEMS[0].description + 'x',
        cost: 0,
        usage: 0,
      });
    });

    it('enables the update if modifying the usage', async () => {
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeTruthy();
      await user.type(getUsageInput(), '42');
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(getUpdateButton());
      expect(savedEvent).toEqual({
        ...MAINTENANCE_ITEMS[0],
        cost: 0,
        usage: 42,
        usageUnits: USAGE_UNITS[0],
      });
    });

    it('enables the update if modifying the cost', async () => {
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeTruthy();
      await user.type(getCostInput(), '73');
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeFalsy();
      await user.click(getUpdateButton());
      expect(savedEvent).toEqual({
        ...MAINTENANCE_ITEMS[0],
        cost: 73,
        usage: 0,
      });
    });

    it('does not enable editing if modifying the units w/o any usage entered', async () => {
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeTruthy();
      await user.selectOptions(getUsageUnitsSelect(), '2');
      expect(getUpdateButton().attributes.getNamedItem('disabled')).toBeTruthy();
    });
  });
});
