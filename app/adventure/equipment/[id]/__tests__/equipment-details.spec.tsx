import { cleanup, getByText, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import EquipmentDetails from '../equipment-details';
import { Equipment, TodoCollection } from '@/models';
import { EQUIPMENT } from '../../__mocks__/data';

const testEquipment: Equipment = EQUIPMENT.find((x) => x.name === 'My Truck')!;
const minimalEquipment: Equipment = EQUIPMENT.find((x) => x.name === 'The bare minimum')!;

const testTodoCollections: TodoCollection[] = [];

describe('EquipmentDetails', () => {
  afterEach(() => cleanup());

  it('finds the test data', () => {
    expect(testEquipment).toBeTruthy();
    expect(minimalEquipment).toBeTruthy();
  });

  it('renders the name', () => {
    render(<EquipmentDetails equipment={testEquipment} todoCollections={testTodoCollections} />);
    expect(screen.getByRole('heading', { level: 2, name: testEquipment.name })).toBeDefined();
  });

  it('renders the description', () => {
    render(<EquipmentDetails equipment={testEquipment} todoCollections={testTodoCollections} />);
    expect(screen.getByText(testEquipment.description!)).toBeDefined();
  });

  describe('details section', () => {
    it('has a header', () => {
      render(<EquipmentDetails equipment={testEquipment} todoCollections={testTodoCollections} />);
      expect(screen.getByRole('heading', { level: 2, name: 'Details' })).toBeDefined();
    });

    it('renders the equipment type', () => {
      render(<EquipmentDetails equipment={testEquipment} todoCollections={testTodoCollections} />);
      const element = screen.getByText(testEquipment.equipmentType.name);
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
        render(<EquipmentDetails equipment={eq} todoCollections={testTodoCollections} />);
        const element = screen.getByText(outputValue || (eq as any)[field]);
        expect(element).toBeDefined();
        expect(getByText(element, `${label}:`)).toBeDefined();
      });

      it('not render if the value is null', () => {
        const eq = { ...testEquipment };
        (eq as any)[field] = null;
        render(<EquipmentDetails equipment={eq} todoCollections={testTodoCollections} />);
        expect(screen.queryByText(`${label}:`)).toBeNull();
      });
    });
  });

  describe('specification section', () => {
    it('is not rendered if there is no specifications data', () => {
      render(
        <EquipmentDetails
          equipment={{ ...testEquipment, weight: null, length: null, capacity: null }}
          todoCollections={testTodoCollections}
        />,
      );
      expect(screen.queryByRole('heading', { level: 2, name: 'Specifications' })).toBeNull();
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
      render(<EquipmentDetails equipment={equipment} todoCollections={testTodoCollections} />);
      expect(screen.getByRole('heading', { level: 2, name: 'Specifications' })).toBeDefined();
    });

    describe.each([
      {
        field: 'manufacturer',
        label: 'Manufacturer',
      },
      {
        field: 'model',
        label: 'Model',
      },
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
        render(<EquipmentDetails equipment={testEquipment} todoCollections={testTodoCollections} />);
        const element = screen.getByText((testEquipment as any)[field]);
        expect(element).toBeDefined();
        expect(getByText(element, `${label}:`)).toBeDefined();
      });

      it('not render if the value is null', () => {
        const eq = { ...testEquipment };
        (eq as any)[field] = null;
        render(<EquipmentDetails equipment={eq} todoCollections={testTodoCollections} />);
        expect(screen.queryByText(`${label}:`)).toBeNull();
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
          todoCollections={testTodoCollections}
        />,
      );
      expect(screen.queryByRole('heading', { level: 2, name: 'Insurance Information' })).toBeNull();
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
      render(<EquipmentDetails equipment={equipment} todoCollections={testTodoCollections} />);
      expect(screen.getByRole('heading', { level: 2, name: 'Insurance Information' })).toBeDefined();
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
        render(<EquipmentDetails equipment={testEquipment} todoCollections={testTodoCollections} />);
        const element = screen.getByText((testEquipment as any)[field]);
        expect(element).toBeDefined();
        expect(getByText(element, `${label}:`)).toBeDefined();
      });

      it('not render if the value is null', () => {
        const eq = { ...testEquipment };
        (eq as any)[field] = null;
        render(<EquipmentDetails equipment={eq} todoCollections={testTodoCollections} />);
        expect(screen.queryByText(`${label}:`)).toBeNull();
      });
    });
  });

  describe('maintenance events section', () => {
    it('renders a section header', () => {
      render(<EquipmentDetails equipment={testEquipment} todoCollections={testTodoCollections} />);
      expect(screen.getByRole('heading', { level: 2, name: 'Maintenance Events' })).toBeDefined();
    });

    it('renders an add button', () => {
      render(<EquipmentDetails equipment={testEquipment} todoCollections={testTodoCollections} />);
      expect(screen.getByRole('button', { name: 'Add Event' })).toBeDefined();
    });
  });
});
