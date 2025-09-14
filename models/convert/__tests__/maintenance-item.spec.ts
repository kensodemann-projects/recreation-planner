import { MaintenanceItem, MaintenanceItemDTO } from '@/models';
import { describe, expect, it } from 'vitest';
import { convertToMaintenance, convertToMaintenanceDTO } from '../maintenance-item';

describe('maintenance item conversions', () => {
  describe('to maintenance item', () => {
    const testCases: { name: string; value: MaintenanceItemDTO; expected: MaintenanceItem }[] = [
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
      expect(convertToMaintenance(value)).toEqual(expected);
    });
  });

  describe('to DTO', () => {
    const testCases: { name: string; value: MaintenanceItem; expected: MaintenanceItemDTO }[] = [
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
      {
        name: 'trims the strings',
        value: untrimmed,
        expected: trimmedDTO,
      },
      {
        name: 'converts an empty description to null',
        value: noDescription,
        expected: noDescriptionDTO,
      },
    ];
    it.each(testCases)('$name', ({ expected, value }) => {
      expect(convertToMaintenanceDTO(value)).toEqual(expected);
    });
  });
});

const conditionReportDTO: MaintenanceItemDTO = {
  name: 'Spring Inspection',
  description: 'Generally in good condition. Table needs reconditioning',
  equipment_rid: 99403,
  date: '2025-05-20',
  usage: null,
  cost: null,
  usage_units_rid: null,
  maintenance_type_rid: 5,
};

const conditionReportFetchDTO: MaintenanceItemDTO = {
  ...conditionReportDTO,
  id: 42,
  created_at: '2025-07-10T12:33:18.98179900',
  maintenance_types: {
    id: 5,
    created_at: '2025-03-17T08:42:21.9934837',
    name: 'Condition Report',
    description: 'Inspect the equipment and provide a report of its current condition based on this assessment.',
  },
};

const conditionReport: MaintenanceItem = {
  id: 42,
  name: 'Spring Inspection',
  description: 'Generally in good condition. Table needs reconditioning',
  date: '2025-05-20',
  usage: null,
  cost: null,
  maintenanceType: {
    id: 5,
    name: 'Condition Report',
    description: 'Inspect the equipment and provide a report of its current condition based on this assessment.',
  },
  equipmentRid: 99403,
};

const repairDTO: MaintenanceItemDTO = {
  name: 'Fix the wall',
  description: 'Repair wall damaged by a ball strike.',
  equipment_rid: 99403,
  date: '2027-06-13',
  usage: null,
  cost: 352.03,
  usage_units_rid: null,
  maintenance_type_rid: 3,
};

const repairFetchDTO: MaintenanceItemDTO = {
  ...repairDTO,
  id: 73,
  created_at: '2027-06-15T14:54:19.66535470',
  maintenance_types: {
    id: 3,
    created_at: '2025-03-17T08:42:21.9934837',
    name: 'Repair',
    description: 'Unscheduled repair due to damage or breakdown.',
  },
};

const repair: MaintenanceItem = {
  id: 73,
  name: 'Fix the wall',
  description: 'Repair wall damaged by a ball strike.',
  date: '2027-06-13',
  usage: null,
  cost: 352.03,
  maintenanceType: {
    id: 3,
    name: 'Repair',
    description: 'Unscheduled repair due to damage or breakdown.',
  },
  equipmentRid: 99403,
};

const usageDTO: MaintenanceItemDTO = {
  name: 'July Mileage Reading',
  description: null,
  equipment_rid: 99403,
  date: '2025-07-01',
  usage: 14394.3,
  cost: null,
  usage_units_rid: 1,
  maintenance_type_rid: 1,
};

const usageFetchDTO: MaintenanceItemDTO = {
  ...usageDTO,
  id: 3884,
  created_at: '2027-07-02T14:54:19.66535470',
  maintenance_types: {
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
};

const usage: MaintenanceItem = {
  id: 3884,
  name: 'July Mileage Reading',
  description: null,
  date: '2025-07-01',
  usage: 14394.3,
  cost: null,
  maintenanceType: {
    id: 1,
    name: 'Mileage/Usage Reading',
    description: 'Periodic reading of the odometer or usage timer.',
  },
  usageUnits: {
    id: 1,
    name: 'Miles',
  },
  equipmentRid: 99403,
};

const maintenanceDTO: MaintenanceItemDTO = {
  name: '2025 Oil Change',
  description: null,
  equipment_rid: 99403,
  date: '2025-05-15',
  usage: 11374.2,
  cost: 115.45,
  usage_units_rid: 1,
  maintenance_type_rid: 2,
};

const maintenanceFetchDTO: MaintenanceItemDTO = {
  ...maintenanceDTO,
  id: 341,
  created_at: '2027-05-15T14:54:19.66535470',
  maintenance_types: {
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
};

const maintenance: MaintenanceItem = {
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
  maintenanceType: {
    id: 2,
    name: 'Periodic Maintenance',
    description: 'Periodic change of oil and other fluids. May also include related periodic maintenance.',
  },
  equipmentRid: 99403,
};

const untrimmed: MaintenanceItem = {
  id: 73,
  name: '   Fix the wall  ',
  description: '      Repair wall damaged by a ball strike. ',
  date: '    2027-06-13 ',
  usage: null,
  cost: 352.03,
  maintenanceType: {
    id: 3,
    name: 'Repair',
    description: 'Unscheduled repair due to damage or breakdown.',
  },
  equipmentRid: 99403,
};

const trimmedDTO: MaintenanceItemDTO = {
  name: 'Fix the wall',
  description: 'Repair wall damaged by a ball strike.',
  equipment_rid: 99403,
  date: '2027-06-13',
  usage: null,
  cost: 352.03,
  usage_units_rid: null,
  maintenance_type_rid: 3,
};

const noDescription: MaintenanceItem = {
  id: 73,
  name: '   Fix the wall  ',
  description: '      ',
  date: '    2027-06-13 ',
  usage: null,
  cost: 352.03,
  maintenanceType: {
    id: 3,
    name: 'Repair',
    description: 'Unscheduled repair due to damage or breakdown.',
  },
  equipmentRid: 99403,
};

const noDescriptionDTO: MaintenanceItemDTO = {
  name: 'Fix the wall',
  description: null,
  equipment_rid: 99403,
  date: '2027-06-13',
  usage: null,
  cost: 352.03,
  usage_units_rid: null,
  maintenance_type_rid: 3,
};
