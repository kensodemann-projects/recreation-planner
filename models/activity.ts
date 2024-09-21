export interface Activity {
  id: string;
  beginDate: string;
  beginTime?: string | undefined;
  endDate?: string | undefined;
  endTime?: string | undefined;
  description: string;
  locationName: string;
  typeName: string;
}
