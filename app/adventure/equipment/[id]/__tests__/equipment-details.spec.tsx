import { cleanup, getByText, render, screen, within } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import EquipmentDetails from '../equipment-details';
import { Equipment, EquipmentEvent, TodoCollection } from '@/models';
import { EQUIPMENT, EQUIPMENT_EVENTS } from '../../__mocks__/data';

const testEquipment: Equipment = EQUIPMENT.find((x) => x.name === 'My Truck')!;
const minimalEquipment: Equipment = EQUIPMENT.find((x) => x.name === 'The bare minimum')!;
const testEquipmentEvents: EquipmentEvent[] = EQUIPMENT_EVENTS.filter((x) => x.equipment.id === testEquipment.id);

const testTodoCollections: TodoCollection[] = [];

describe('EquipmentDetails', () => {
  afterEach(() => cleanup());

  it('finds the test data', () => {
    expect(testEquipment).toBeTruthy();
    expect(minimalEquipment).toBeTruthy();
  });

  it('renders the name', () => {
    render(
      <EquipmentDetails
        equipment={testEquipment}
        equipmentEvents={testEquipmentEvents}
        todoCollections={testTodoCollections}
      />,
    );
    expect(screen.getByRole('heading', { level: 2, name: testEquipment.name })).toBeDefined();
  });

  it('renders the description', () => {
    render(
      <EquipmentDetails
        equipment={testEquipment}
        equipmentEvents={testEquipmentEvents}
        todoCollections={testTodoCollections}
      />,
    );
    expect(screen.getByText(testEquipment.description!)).toBeDefined();
  });

  describe('details section', () => {
    it('has a header', () => {
      render(
        <EquipmentDetails
          equipment={testEquipment}
          equipmentEvents={testEquipmentEvents}
          todoCollections={testTodoCollections}
        />,
      );
      const section = screen.getByTestId('details-section');
      expect(within(section).getByRole('heading', { level: 2, name: 'Details' })).toBeDefined();
    });

    it('renders the equipment type', () => {
      render(
        <EquipmentDetails
          equipment={testEquipment}
          equipmentEvents={testEquipmentEvents}
          todoCollections={testTodoCollections}
        />,
      );
      const section = screen.getByTestId('details-section');
      const element = within(section).getByText(testEquipment.equipmentType.name);
      expect(element).toBeDefined();
      expect(getByText(element, 'Equipment Type:')).toBeDefined();
    });

    describe.each([
      {
        field: 'purchaseDate',
        label: 'Purchase Date',
        overrideValue: '1982-08-13',
        outputValue: 'Aug 13, 1982',
      },
      {
        field: 'cost',
        label: 'Cost',
        overrideValue: '1987345432.9',
        outputValue: '$1,987,345,432.90',
      },
      {
        field: 'manufacturer',
        label: 'Manufacturer',
      },
      {
        field: 'model',
        label: 'Model',
      },
    ])('$field', ({ field, label, overrideValue, outputValue }) => {
      it('renders with a value', () => {
        const eq = { ...testEquipment };
        if (overrideValue) {
          (eq as any)[field] = overrideValue;
        }
        render(
          <EquipmentDetails
            equipment={eq}
            equipmentEvents={testEquipmentEvents}
            todoCollections={testTodoCollections}
          />,
        );
        const section = screen.getByTestId('details-section');
        const element = within(section).getByText(outputValue || (eq as any)[field]);
        expect(element).toBeDefined();
        expect(getByText(element, `${label}:`)).toBeDefined();
      });

      it('is not rendered if the value is null', () => {
        const eq = { ...testEquipment };
        (eq as any)[field] = null;
        render(
          <EquipmentDetails
            equipment={eq}
            equipmentEvents={testEquipmentEvents}
            todoCollections={testTodoCollections}
          />,
        );
        const section = screen.getByTestId('details-section');
        expect(within(section).queryByText(`${label}:`)).toBeNull();
      });
    });
  });

  describe('specification section', () => {
    it('is not rendered if there is no specifications data', () => {
      render(
        <EquipmentDetails
          equipment={{ ...testEquipment, weight: null, length: null, capacity: null }}
          equipmentEvents={testEquipmentEvents}
          todoCollections={testTodoCollections}
        />,
      );
      expect(screen.queryByTestId('specifications-section')).toBeNull();
    });

    it.each([
      {
        name: 'a weight is present',
        equipment: { ...minimalEquipment, weight: '5253 lb' },
      },
      {
        name: 'a length is present',
        equipment: { ...minimalEquipment, length: '19.5 Ft' },
      },
      {
        name: 'a capacity is present',
        equipment: { ...minimalEquipment, capacity: '1/2 ton total cargo' },
      },
    ])('is rendered when ' + '$name', ({ equipment }) => {
      render(
        <EquipmentDetails
          equipment={equipment}
          equipmentEvents={testEquipmentEvents}
          todoCollections={testTodoCollections}
        />,
      );
      const section = screen.getByTestId('specifications-section');
      expect(within(section).getByRole('heading', { level: 2, name: 'Specifications' })).toBeDefined();
    });

    describe.each([
      {
        field: 'weight',
        label: 'Weight',
      },
      {
        field: 'length',
        label: 'Length',
      },
      {
        field: 'capacity',
        label: 'Capacity',
      },
    ])('$field', ({ field, label }) => {
      it('renders with a value', () => {
        render(
          <EquipmentDetails
            equipment={testEquipment}
            equipmentEvents={testEquipmentEvents}
            todoCollections={testTodoCollections}
          />,
        );
        const section = screen.getByTestId('specifications-section');
        const element = within(section).getByText((testEquipment as any)[field]);
        expect(element).toBeDefined();
        expect(getByText(element, `${label}:`)).toBeDefined();
      });

      it('is not rendered if the value is null', () => {
        const eq = { ...testEquipment };
        (eq as any)[field] = null;
        render(
          <EquipmentDetails
            equipment={eq}
            equipmentEvents={testEquipmentEvents}
            todoCollections={testTodoCollections}
          />,
        );
        const section = screen.getByTestId('specifications-section');
        expect(within(section).queryByText(`${label}:`)).toBeNull();
      });
    });
  });

  describe('insurance section', () => {
    it('is not rendered if there is no insurance data', () => {
      render(
        <EquipmentDetails
          equipment={{
            ...testEquipment,
            insuranceCarrier: null,
            insurancePolicyNumber: null,
            insuranceContactName: null,
            insuranceContactPhoneNumber: null,
            insuranceContactEmail: null,
          }}
          equipmentEvents={testEquipmentEvents}
          todoCollections={testTodoCollections}
        />,
      );
      expect(screen.queryByTestId('insurance-section')).toBeNull();
    });

    it.each([
      {
        name: 'an insurance carrier is present',
        equipment: { ...minimalEquipment, insuranceCarrier: 'State Farm' },
      },
      {
        name: 'a policy number is present',
        equipment: { ...minimalEquipment, insurancePolicyNumber: '100493003-150' },
      },
      {
        name: 'a contact name is present',
        equipment: { ...minimalEquipment, insuranceContactName: 'Robert Greenfield' },
      },
      {
        name: 'a contact phone number is present',
        equipment: { ...minimalEquipment, insuranceContactPhoneNumber: '555-389-4493' },
      },
      {
        name: 'a contact email is present',
        equipment: { ...minimalEquipment, insuranceContactEmail: 'robert.greenfield@state.farm.ins' },
      },
    ])('is rendered when ' + '$name', ({ equipment }) => {
      render(
        <EquipmentDetails
          equipment={equipment}
          equipmentEvents={testEquipmentEvents}
          todoCollections={testTodoCollections}
        />,
      );
      const section = screen.getByTestId('insurance-section');
      expect(within(section).getByRole('heading', { level: 2, name: 'Insurance Information' })).toBeDefined();
    });

    describe.each([
      {
        field: 'insuranceCarrier',
        label: 'Carrier',
      },
      {
        field: 'insurancePolicyNumber',
        label: 'Policy Number',
      },
      {
        field: 'insuranceContactName',
        label: 'Contact',
      },
      {
        field: 'insuranceContactPhoneNumber',
        label: 'Phone Number',
      },
      {
        field: 'insuranceContactEmail',
        label: 'Email',
      },
    ])('$field', ({ field, label }) => {
      it('renders with a value', () => {
        render(
          <EquipmentDetails
            equipment={testEquipment}
            equipmentEvents={testEquipmentEvents}
            todoCollections={testTodoCollections}
          />,
        );
        const section = screen.getByTestId('insurance-section');
        const element = within(section).getByText((testEquipment as any)[field]);
        expect(element).toBeDefined();
        expect(getByText(element, `${label}:`)).toBeDefined();
      });

      it('is not rendered if the value is null', () => {
        const eq = { ...testEquipment };
        (eq as any)[field] = null;
        render(
          <EquipmentDetails
            equipment={eq}
            equipmentEvents={testEquipmentEvents}
            todoCollections={testTodoCollections}
          />,
        );
        const section = screen.getByTestId('insurance-section');
        expect(within(section).queryByText(`${label}:`)).toBeNull();
      });
    });
  });

  describe('maintenance events section', () => {
    it('renders a section header', () => {
      render(
        <EquipmentDetails
          equipment={testEquipment}
          equipmentEvents={testEquipmentEvents}
          todoCollections={testTodoCollections}
        />,
      );
      const section = screen.getByTestId('maintenance-events-section');
      expect(within(section).getByRole('heading', { level: 2, name: 'Maintenance Events' })).toBeDefined();
    });

    it('renders an add button', () => {
      render(
        <EquipmentDetails
          equipment={testEquipment}
          equipmentEvents={testEquipmentEvents}
          todoCollections={testTodoCollections}
        />,
      );
      const section = screen.getByTestId('maintenance-events-section');
      expect(within(section).getByRole('button', { name: 'Add Event' })).toBeDefined();
    });
  });
});
