import { Equipment, EquipmentDTO } from '../equipment';
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
