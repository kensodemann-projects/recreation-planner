import { Equipment, EquipmentDTO } from '../equipment';
import { TodoCollection } from '../todo-collection';
import { convertToEquipmentEvent } from './equipment-event';
import { convertToEquipmentType } from './equipment-type';
import { convertToNote } from './note';
import { convertToTodoCollection } from './todo-collection';

export const convertToEquipment = (dto: EquipmentDTO): Equipment => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  purchaseDate: dto.purchase_date,
  cost: dto.cost,
  manufacturer: dto.manufacturer,
  model: dto.model,
  identification: dto.identification,
  length: dto.length,
  weight: dto.weight,
  capacity: dto.capacity,
  licensePlateNumber: dto.license_plate_number,
  insuranceCarrier: dto.insurance_carrier,
  insurancePolicyNumber: dto.insurance_policy_number,
  insuranceContactName: dto.insurance_contact_name,
  insuranceContactPhoneNumber: dto.insurance_contact_phone_number,
  insuranceContactEmail: dto.insurance_contact_email,
  equipmentType: convertToEquipmentType(dto.equipment_types!),
  equipmentEvents: dto.equipment_events && dto.equipment_events.map((e) => convertToEquipmentEvent(e)),
  notes: dto.notes && dto.notes.map((n) => convertToNote(n)),
  todoCollections:
    dto.todo_collections && dto.todo_collections.map((c) => convertToTodoCollection(c) as TodoCollection),
});

export const convertToEquipmentDTO = (equipment: Equipment): EquipmentDTO => ({
  name: equipment.name.trim(),
  description: equipment.description?.trim() || null,
  purchase_date: equipment.purchaseDate?.trim() || null,
  cost: equipment.cost || null,
  manufacturer: equipment.manufacturer?.trim() || null,
  model: equipment.model?.trim() || null,
  identification: equipment.identification?.trim() || null,
  length: equipment.length?.trim() || null,
  weight: equipment.weight?.trim() || null,
  capacity: equipment.capacity?.trim() || null,
  license_plate_number: equipment.licensePlateNumber?.trim() || null,
  insurance_carrier: equipment.insuranceCarrier?.trim() || null,
  insurance_policy_number: equipment.insurancePolicyNumber?.trim() || null,
  insurance_contact_name: equipment.insuranceContactName?.trim() || null,
  insurance_contact_phone_number: equipment.insuranceContactPhoneNumber?.trim() || null,
  insurance_contact_email: equipment.insuranceContactEmail?.trim() || null,
  equipment_type_rid: equipment.equipmentType.id!,
});
