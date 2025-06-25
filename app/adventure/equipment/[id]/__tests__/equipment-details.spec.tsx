import { cleanup, getByText, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import EquipmentDetails from '../equipment-details';
import { Equipment, TodoCollection } from '@/models';

const testEquipment: Equipment = {
  id: 42,
  name: 'The Heart of Gold',
  description: 'An oppulant intergalactic space craft, populated primarily by self-important poofters.',
  purchaseDate: '1982-08-13',
  cost: 1987345432.9,
};

const testTodoCollections: TodoCollection[] = [];

describe('EquipmentDetails', () => {
  afterEach(() => cleanup());

  it('renders the name', () => {
    render(<EquipmentDetails equipment={testEquipment} todoCollections={testTodoCollections} />);
    expect(screen.getByRole('heading', { level: 2, name: testEquipment.name })).toBeDefined();
  });

  it('renders the description', () => {
    render(<EquipmentDetails equipment={testEquipment} todoCollections={testTodoCollections} />);
    expect(
      screen.getByText('An oppulant intergalactic space craft, populated primarily by self-important poofters.'),
    ).toBeDefined();
  });

  it('renders the purchase date', () => {
    render(<EquipmentDetails equipment={testEquipment} todoCollections={testTodoCollections} />);
    const element = screen.getByText('Aug 13, 1982');
    expect(element).toBeDefined();
    expect(getByText(element, 'Purchase Date:')).toBeDefined();
  });

  it('does not render the purchase date if it is null', () => {
    render(
      <EquipmentDetails equipment={{ ...testEquipment, purchaseDate: null }} todoCollections={testTodoCollections} />,
    );
    expect(screen.queryByText('Purchase Date:')).toBeNull();
  });

  it('renders the cost', () => {
    render(<EquipmentDetails equipment={testEquipment} todoCollections={testTodoCollections} />);
    const element = screen.getByText('$1,987,345,432.90');
    expect(element).toBeDefined();
    expect(getByText(element, 'Cost:')).toBeDefined();
  });

  it('does not render the cost if it is null', () => {
    render(<EquipmentDetails equipment={{ ...testEquipment, cost: null }} todoCollections={testTodoCollections} />);
    expect(screen.queryByText('Cost:')).toBeNull();
  });
});
