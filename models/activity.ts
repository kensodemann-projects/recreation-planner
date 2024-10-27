import { CommonData } from './common-data';

export interface Activity extends CommonData {
  beginDate: string;
  beginTime?: string | undefined;
  endDate?: string | undefined;
  endTime?: string | undefined;
  locationName: string;
  typeName: string;
}
