import { MaintenanceType, MaintenanceTypeDTO } from '../maintenance-type';

export const convertToMaintenanceType = (dto: MaintenanceTypeDTO): MaintenanceType => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
});
