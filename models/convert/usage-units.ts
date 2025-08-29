import { UsageUnits, UsageUnitsDTO } from '../usage-units';

export const convertToUsageUnits = (dto: UsageUnitsDTO): UsageUnits => ({
  id: dto.id,
  name: dto.name,
});
