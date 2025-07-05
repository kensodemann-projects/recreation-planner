export interface CommonData {
  id?: number | undefined;
  name: string;
  description?: string | null;
}

export interface CommonDataDTO {
  id?: number;
  created_at?: string;
  name: string;
  description?: string | null;
}
