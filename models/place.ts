export interface Place {
  id: string;
  name: string;
  line1?: string | undefined;
  line2?: string | undefined;
  city?: string | undefined;
  state?: string | undefined;
  postal?: string | undefined;
  phoneNumber?: string | undefined;
  typeName: string;
}
