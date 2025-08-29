export interface CommonData {
  id?: number;
  name: string;
  description: string | null;
}

export type SelectableData = Omit<CommonData, 'description'>;

export interface CommonDataDTO {
  id?: number;
  created_at?: string;
  name: string;
  description: string | null;
}
