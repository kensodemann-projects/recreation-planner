import { CommonData, CommonDataDTO } from './common-data';
import { EquipmentEvent, EquipmentEventDTO } from './equipment-event';
import { EquipmentType, EquipmentTypeDTO } from './equipment-type';
import { Note, NoteDTO } from './note';
import { TodoCollection, TodoCollectionDTO } from './todo-collection';

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
  equipment_events?: EquipmentEventDTO[];
  notes?: NoteDTO[];
  todo_collections?: TodoCollectionDTO[];
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
  equipmentEvents?: EquipmentEvent[];
  notes?: Note[];
  todoCollections?: TodoCollection[];
}
