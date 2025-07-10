import { UsageUnits, UsageUnitsDTO } from '../usage-units';

export const convertToUsageUnits = (dto: UsageUnitsDTO): UsageUnits => ({
  id: dto.id,
  name: dto.name,
});

export const convertToUsageUnitsDTO = (UsageUnits: UsageUnits): UsageUnitsDTO => ({
  id: UsageUnits.id,
  name: UsageUnits.name,
});
