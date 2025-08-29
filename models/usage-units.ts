import { CommonData, CommonDataDTO } from './common-data';

export type UsageUnits = Omit<CommonData, 'description'>;
export type UsageUnitsDTO = Omit<CommonDataDTO, 'description'>;
