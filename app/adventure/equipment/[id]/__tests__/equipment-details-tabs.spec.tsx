import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import EquipmentDetailsTabs from '../eqipment-details-tabs';
import { useSearchParams } from 'next/navigation';
import { Equipment, MaintenanceItem, TodoCollection } from '@/models';
import { EQUIPMENT, MAINTENANCE_ITEMS } from '../../__mocks__/data';

const truck: Equipment = EQUIPMENT.find((x) => x.name === 'My Truck')!;
const maintenanceItems: MaintenanceItem[] = MAINTENANCE_ITEMS.filter((x) => x.equipmentRid === truck.id);
const todoCollections: TodoCollection[] = [];
const testEquipment = { ...truck, maintenanceItems, todoCollections };

vi.mock('next/navigation');

describe('Equipment Details Tabs', () => {
  afterEach(() => cleanup());
  beforeEach(() => vi.clearAllMocks());

  it('renders three tabs', () => {
    render(<EquipmentDetailsTabs equipment={testEquipment} />);
    const tabs = screen.getAllByRole('radio');
    expect(tabs.length).toBe(3);
  });

  it('renders the Todos tab', () => {
    render(<EquipmentDetailsTabs equipment={testEquipment} />);
    expect(screen.getByRole('radio', { name: 'Todos' }));
  });

  it('renders the Maintenance tab', () => {
    render(<EquipmentDetailsTabs equipment={testEquipment} />);
    expect(screen.getByRole('radio', { name: 'Maintenance' }));
  });

  it('renders the Notes tab', () => {
    render(<EquipmentDetailsTabs equipment={testEquipment} />);
    expect(screen.getByRole('radio', { name: 'Notes' }));
  });

  describe('setting the active tab', () => {
    it('defaults the first tab', () => {
      render(<EquipmentDetailsTabs equipment={testEquipment} />);
      const tabs = screen.getAllByRole('radio');
      expect(tabs[0]).toHaveProperty('defaultChecked', true);
      expect(tabs[1]).toHaveProperty('defaultChecked', false);
      expect(tabs[2]).toHaveProperty('defaultChecked', false);
    });

    it('sets the tab to Todos', () => {
      (useSearchParams as Mock).mockReturnValue(new URLSearchParams({ lastActivity: 'Todos' }));
      render(<EquipmentDetailsTabs equipment={testEquipment} />);
      expect(screen.getByRole('radio', { name: 'Todos' })).toHaveProperty('defaultChecked', true);
      expect(screen.getByRole('radio', { name: 'Maintenance' })).toHaveProperty('defaultChecked', false);
      expect(screen.getByRole('radio', { name: 'Notes' })).toHaveProperty('defaultChecked', false);
    });

    it('sets the tab to Maintenance', () => {
      (useSearchParams as Mock).mockReturnValue(new URLSearchParams({ lastActivity: 'Maintenance' }));
      render(<EquipmentDetailsTabs equipment={testEquipment} />);
      expect(screen.getByRole('radio', { name: 'Todos' })).toHaveProperty('defaultChecked', false);
      expect(screen.getByRole('radio', { name: 'Maintenance' })).toHaveProperty('defaultChecked', true);
      expect(screen.getByRole('radio', { name: 'Notes' })).toHaveProperty('defaultChecked', false);
    });

    it('sets the tab to Notes', () => {
      (useSearchParams as Mock).mockReturnValue(new URLSearchParams({ lastActivity: 'Notes' }));
      render(<EquipmentDetailsTabs equipment={testEquipment} />);
      expect(screen.getByRole('radio', { name: 'Todos' })).toHaveProperty('defaultChecked', false);
      expect(screen.getByRole('radio', { name: 'Maintenance' })).toHaveProperty('defaultChecked', false);
      expect(screen.getByRole('radio', { name: 'Notes' })).toHaveProperty('defaultChecked', true);
    });
  });
});
