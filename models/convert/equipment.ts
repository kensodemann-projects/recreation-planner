import { Equipment, EquipmentDTO } from '../equipment';
import { TodoItem, TodoItemDTO } from '../todo-item';
import { convertToEquipmentType } from './equipment-type';

export const convertToEquipment = (dto: Partial<EquipmentDTO>): Partial<Equipment> => ({
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
  equipmentType: dto.equipment_types && convertToEquipmentType(dto.equipment_types),
});

export const convertToEquipmentDTO = (equipment: Equipment): EquipmentDTO => ({
  name: equipment.name,
  description: equipment.description || null,
  purchase_date: equipment.purchaseDate || null,
  cost: equipment.cost ?? null,
  manufacturer: equipment.manufacturer || null,
  model: equipment.model || null,
  identification: equipment.identification || null,
  length: equipment.length || null,
  weight: equipment.weight || null,
  capacity: equipment.capacity || null,
  license_plate_number: equipment.licensePlateNumber || null,
  insurance_carrier: equipment.insuranceCarrier || null,
  insurance_policy_number: equipment.insurancePolicyNumber || null,
  insurance_contact_name: equipment.insuranceContactName || null,
  insurance_contact_phone_number: equipment.insuranceContactPhoneNumber || null,
  insurance_contact_email: equipment.insuranceContactEmail || null,
  equipment_type_rid: equipment.equipmentType.id!,
});
