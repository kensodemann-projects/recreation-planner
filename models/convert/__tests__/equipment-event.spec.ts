import { Equipment, EquipmentDTO, EquipmentEvent, EquipmentEventDTO } from '@/models';
import { describe, expect, it } from 'vitest';
import { convertToEquipmentEvent, convertToEquipmentEventDTO } from '../equipment-event';

describe('equipment event conversions', () => {
  describe('to equipment events', () => {
    const testCases: { name: string; value: EquipmentEventDTO; expected: EquipmentEvent }[] = [
      {
        name: 'converts a condition report',
        value: conditionReportFetchDTO,
        expected: conditionReport,
      },
      {
        name: 'converts a repair',
        value: repairFetchDTO,
        expected: repair,
      },
      {
        name: 'converts a usage reading',
        value: usageFetchDTO,
        expected: usage,
      },
      {
        name: 'converts periodic maintenance',
        value: maintenanceFetchDTO,
        expected: maintenance,
      },
    ];
    it.each(testCases)('$name', ({ value, expected }) => {
      expect(convertToEquipmentEvent(value)).toEqual(expected);
    });
  });

  describe('to DTO', () => {
    const testCases: { name: string; value: EquipmentEvent; expected: EquipmentEventDTO }[] = [
      {
        name: 'converts a condition report',
        value: conditionReport,
        expected: conditionReportDTO,
      },
      {
        name: 'converts a repair',
        value: repair,
        expected: repairDTO,
      },
      {
        name: 'converts a usage reading',
        value: usage,
        expected: usageDTO,
      },
      {
        name: 'converts periodic maintenance',
        value: maintenance,
        expected: maintenanceDTO,
      },
    ];
    it.each(testCases)('$name', ({ expected, value }) => {
      expect(convertToEquipmentEventDTO(value)).toEqual(expected);
    });
  });
});

const equipment: Omit<Equipment, 'equipmentType'> = {
  id: 99403,
  name: 'Planet Destroyer',
  description: 'The Vogons should destroy the Earth using this.',
  purchaseDate: '2025-03-28',
  cost: 2954932.34,
  manufacturer: 'Vogon Vehicles',
  model: 'DST-X3',
  identification: '1994-ff8ge-1234',
  length: '7 Miles, 4 feet',
  weight: '1.1 Million Tons (Roughly)',
  capacity: 'A full crew',
  licensePlateNumber: 'I<3DST',
  insuranceCarrier: 'Contructors Insurance',
  insurancePolicyNumber: '8849950-29934',
  insuranceContactName: 'Bob',
  insuranceContactPhoneNumber: '555-930-2994',
  insuranceContactEmail: 'bob@conins.com',
};

const equipmentDTO: EquipmentDTO = {
  id: 99403,
  name: 'Planet Destroyer',
  description: 'The Vogons should destroy the Earth using this.',
  purchase_date: '2025-03-28',
  cost: 2954932.34,
  manufacturer: 'Vogon Vehicles',
  model: 'DST-X3',
  identification: '1994-ff8ge-1234',
  length: '7 Miles, 4 feet',
  weight: '1.1 Million Tons (Roughly)',
  capacity: 'A full crew',
  license_plate_number: 'I<3DST',
  insurance_carrier: 'Contructors Insurance',
  insurance_policy_number: '8849950-29934',
  insurance_contact_name: 'Bob',
  insurance_contact_phone_number: '555-930-2994',
  insurance_contact_email: 'bob@conins.com',
  equipment_type_rid: 4,
};

const conditionReportDTO: EquipmentEventDTO = {
  name: 'Spring Inspection',
  description: 'Generally in good condition. Table needs reconditioning',
  equipment_rid: 99403,
  date: '2025-05-20',
  usage: null,
  cost: null,
  usage_units_rid: null,
  equipment_event_type_rid: 5,
};

const conditionReportFetchDTO: EquipmentEventDTO = {
  ...conditionReportDTO,
  id: 42,
  created_at: '2025-07-10T12:33:18.98179900',
  equipment_event_types: {
    id: 5,
    created_at: '2025-03-17T08:42:21.9934837',
    name: 'Condition Report',
    description: 'Inspect the equipment and provide a report of its current condition based on this assessment.',
  },
  equipment: equipmentDTO,
};

const conditionReport: EquipmentEvent = {
  id: 42,
  name: 'Spring Inspection',
  description: 'Generally in good condition. Table needs reconditioning',
  date: '2025-05-20',
  usage: null,
  cost: null,
  equipmentEventType: {
    id: 5,
    name: 'Condition Report',
    description: 'Inspect the equipment and provide a report of its current condition based on this assessment.',
  },
  equipment,
};

const repairDTO: EquipmentEventDTO = {
  name: 'Fix the wall',
  description: 'Repair wall damaged by a ball strike.',
  equipment_rid: 99403,
  date: '2027-06-13',
  usage: null,
  cost: 352.03,
  usage_units_rid: null,
  equipment_event_type_rid: 3,
};

const repairFetchDTO: EquipmentEventDTO = {
  ...repairDTO,
  id: 73,
  created_at: '2027-06-15T14:54:19.66535470',
  equipment_event_types: {
    id: 3,
    created_at: '2025-03-17T08:42:21.9934837',
    name: 'Repair',
    description: 'Unscheduled repair due to damage or breakdown.',
  },
  equipment: equipmentDTO,
};

const repair: EquipmentEvent = {
  id: 73,
  name: 'Fix the wall',
  description: 'Repair wall damaged by a ball strike.',
  date: '2027-06-13',
  usage: null,
  cost: 352.03,
  equipmentEventType: {
    id: 3,
    name: 'Repair',
    description: 'Unscheduled repair due to damage or breakdown.',
  },
  equipment,
};

const usageDTO: EquipmentEventDTO = {
  name: 'July Mileage Reading',
  description: null,
  equipment_rid: 99403,
  date: '2025-07-01',
  usage: 14394.3,
  cost: null,
  usage_units_rid: 1,
  equipment_event_type_rid: 1,
};

const usageFetchDTO: EquipmentEventDTO = {
  ...usageDTO,
  id: 3884,
  created_at: '2027-07-02T14:54:19.66535470',
  equipment_event_types: {
    id: 1,
    created_at: '2025-03-17T08:42:21.9934837',
    name: 'Mileage/Usage Reading',
    description: 'Periodic reading of the odometer or usage timer.',
  },
  usage_units: {
    id: 1,
    created_at: '2025-03-17T08:42:21.9934837',
    name: 'Miles',
  },
  equipment: equipmentDTO,
};

const usage: EquipmentEvent = {
  id: 3884,
  name: 'July Mileage Reading',
  description: null,
  date: '2025-07-01',
  usage: 14394.3,
  cost: null,
  equipmentEventType: {
    id: 1,
    name: 'Mileage/Usage Reading',
    description: 'Periodic reading of the odometer or usage timer.',
  },
  usageUnits: {
    id: 1,
    name: 'Miles',
  },
  equipment,
};

const maintenanceDTO: EquipmentEventDTO = {
  name: '2025 Oil Change',
  description: null,
  equipment_rid: 99403,
  date: '2025-05-15',
  usage: 11374.2,
  cost: 115.45,
  usage_units_rid: 1,
  equipment_event_type_rid: 2,
};

const maintenanceFetchDTO: EquipmentEventDTO = {
  ...maintenanceDTO,
  id: 341,
  created_at: '2027-05-15T14:54:19.66535470',
  equipment_event_types: {
    id: 2,
    created_at: '2025-03-17T08:42:21.9934837',
    name: 'Periodic Maintenance',
    description: 'Periodic change of oil and other fluids. May also include related periodic maintenance.',
  },
  usage_units: {
    id: 1,
    created_at: '2025-03-17T08:42:21.9934837',
    name: 'Miles',
  },
  equipment: equipmentDTO,
};

const maintenance: EquipmentEvent = {
  id: 341,
  name: '2025 Oil Change',
  description: null,
  date: '2025-05-15',
  usage: 11374.2,
  cost: 115.45,
  usageUnits: {
    id: 1,
    name: 'Miles',
  },
  equipmentEventType: {
    id: 2,
    name: 'Periodic Maintenance',
    description: 'Periodic change of oil and other fluids. May also include related periodic maintenance.',
  },
  equipment,
};
