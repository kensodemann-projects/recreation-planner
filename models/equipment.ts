import { CommonData, CommonDataDTO } from './common-data';
import { EquipmentType, EquipmentTypeDTO } from './equipment-type';

export interface EquipmentDTO extends CommonDataDTO {
  purchase_date: string | null;
  cost: number | null;
  manufacturer: string | null;
  model: string | null;
  identification: string | null;
  length: string | null;
  weight: string | null;
  capacity: string | null;
  license_plate_number: string | null;
  insurance_carrier: string | null;
  insurance_policy_number: string | null;
  insurance_contact_name: string | null;
  insurance_contact_phone_number: string | null;
  insurance_contact_email: string | null;
  equipment_type_rid: number;
  equipment_types?: EquipmentTypeDTO;
}

export interface Equipment extends CommonData {
  purchaseDate: string | null;
  cost: number | null;
  manufacturer: string | null;
  model: string | null;
  identification: string | null;
  length: string | null;
  weight: string | null;
  capacity: string | null;
  licensePlateNumber: string | null;
  insuranceCarrier: string | null;
  insurancePolicyNumber: string | null;
  insuranceContactName: string | null;
  insuranceContactPhoneNumber: string | null;
  insuranceContactEmail: string | null;
  equipmentType: EquipmentType;
}
