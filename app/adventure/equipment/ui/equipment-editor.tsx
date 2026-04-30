import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import SectionHeader from '@/app/ui/section-header';
import Select from '@/app/ui/select';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { useForm } from '@/hooks/use-form';
import { Equipment, EquipmentType } from '@/models';
import { isRequired } from '@/utils/input-validations';
import { useState } from 'react';

export interface EquipmentEditorProps {
  equipment?: Equipment | undefined;
  equipmentTypes: EquipmentType[];
  onConfirm: (e: Equipment) => void;
  onCancel: () => void;
}

const EquipmentEditor = ({ equipment, equipmentTypes, onCancel, onConfirm }: EquipmentEditorProps) => {
  const { fields, isDirty } = useForm({
    name: { initialValue: equipment?.name || '', validate: (value: string | undefined) => isRequired(value, 'Name') },
    description: { initialValue: equipment?.description || '' },
    purchaseDate: { initialValue: equipment?.purchaseDate || '' },
    cost: { initialValue: equipment?.cost || '' },
    manufacturer: { initialValue: equipment?.manufacturer || '' },
    model: { initialValue: equipment?.model || '' },
    identification: { initialValue: equipment?.identification || '' },
    length: { initialValue: equipment?.length || '' },
    weight: { initialValue: equipment?.weight || '' },
    capacity: { initialValue: equipment?.capacity || '' },
    licensePlateNumber: { initialValue: equipment?.licensePlateNumber || '' },
    insuranceCarrier: { initialValue: equipment?.insuranceCarrier || '' },
    insurancePolicyNumber: { initialValue: equipment?.insurancePolicyNumber || '' },
    insuranceContactName: { initialValue: equipment?.insuranceContactName || '' },
    insuranceContactPhoneNumber: { initialValue: equipment?.insuranceContactPhoneNumber || '' },
    insuranceContactEmail: { initialValue: equipment?.insuranceContactEmail || '' },
    equipmentTypeId: { initialValue: equipment?.equipmentType.id || equipmentTypes[0].id },
  });

  const [busy, setBusy] = useState(false);
  const requiredFieldsHaveValues = !!fields.name.value.trim();
  const disableConfirmButton = !(requiredFieldsHaveValues && isDirty);

  return (
    <div className="p-2 md:p-4">
      <section>
        <div className="grid grid-cols-4 gap-x-4">
          <Input
            id="equipment-name"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Name"
            value={fields.name.value}
            disabled={busy}
            error={fields.name.error}
            onBlur={fields.name.validate}
            onChange={(evt) => fields.name.setValue(evt.target.value)}
          />

          <Select
            id="equipment-type"
            className="col-span-4 md:col-span-2"
            disabled={busy}
            label="Type of Equipment"
            value={fields.equipmentTypeId.value}
            values={equipmentTypes}
            onChange={(evt) => fields.equipmentTypeId.setValue(+evt.target.value)}
          />

          <Description
            id="equipment-description"
            className="col-span-4"
            label="Description"
            rows={3}
            value={fields.description.value}
            disabled={busy}
            onChange={(evt) => fields.description.setValue(evt.target.value)}
          />

          <Input
            id="equipment-purchase-date"
            className="col-span-4 md:col-span-2"
            type="date"
            label="Purchase Date"
            value={fields.purchaseDate.value}
            disabled={busy}
            onChange={(evt) => fields.purchaseDate.setValue(evt.target.value)}
          />

          <Input
            id="equipment-cost"
            className="col-span-4 md:col-span-2"
            type="number"
            value={fields.cost.value ?? undefined}
            label="Cost"
            disabled={busy}
            onChange={(evt) => fields.cost.setValue(evt.target.value && evt.target.valueAsNumber)}
          />

          <Input
            id="equipment-manufacturer"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Manufacturer"
            value={fields.manufacturer.value}
            disabled={busy}
            onChange={(evt) => fields.manufacturer.setValue(evt.target.value)}
          />

          <Input
            id="equipment-model"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Model"
            value={fields.model.value}
            disabled={busy}
            onChange={(evt) => fields.model.setValue(evt.target.value)}
          />

          <Input
            id="equipment-identification"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Identification"
            value={fields.identification.value}
            disabled={busy}
            onChange={(evt) => fields.identification.setValue(evt.target.value)}
          />

          <Input
            id="equipment-license-plate-number"
            className="col-span-4 md:col-span-2"
            type="text"
            label="License Plate"
            value={fields.licensePlateNumber.value}
            disabled={busy}
            onChange={(evt) => fields.licensePlateNumber.setValue(evt.target.value)}
          />
        </div>
      </section>

      <section>
        <SectionHeader>
          <SubtitleHeading>Specifications</SubtitleHeading>
        </SectionHeader>

        <div className="grid grid-cols-4 gap-x-4">
          <Input
            id="equipment-weight"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Weight"
            value={fields.weight.value}
            disabled={busy}
            onChange={(evt) => fields.weight.setValue(evt.target.value)}
          />

          <Input
            id="equipment-length"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Length"
            value={fields.length.value}
            disabled={busy}
            onChange={(evt) => fields.length.setValue(evt.target.value)}
          />

          <Input
            id="equipment-capacity"
            className="col-span-4"
            type="text"
            label="Capacity"
            value={fields.capacity.value}
            disabled={busy}
            onChange={(evt) => fields.capacity.setValue(evt.target.value)}
          />
        </div>
      </section>

      <section>
        <SectionHeader>
          <SubtitleHeading>Insurance</SubtitleHeading>
        </SectionHeader>

        <div className="grid grid-cols-4 gap-x-4">
          <Input
            id="equipment-insurance-carrier"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Carrier"
            value={fields.insuranceCarrier.value}
            disabled={busy}
            onChange={(evt) => fields.insuranceCarrier.setValue(evt.target.value)}
          />

          <Input
            id="equipment-insurance-policy-number"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Policy Number"
            value={fields.insurancePolicyNumber.value}
            disabled={busy}
            onChange={(evt) => fields.insurancePolicyNumber.setValue(evt.target.value)}
          />

          <Input
            id="equipment-insurance-conact-name"
            className="col-span-4"
            type="text"
            label="Contact Name"
            value={fields.insuranceContactName.value}
            disabled={busy}
            onChange={(evt) => fields.insuranceContactName.setValue(evt.target.value)}
          />

          <Input
            id="equipment-insurance-contact-phone-number"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Contact Phone Number"
            value={fields.insuranceContactPhoneNumber.value}
            disabled={busy}
            onChange={(evt) => fields.insuranceContactPhoneNumber.setValue(evt.target.value)}
          />

          <Input
            id="equipment-insurance-contact-email"
            className="col-span-4 md:col-span-2"
            type="email"
            label="Contact Email"
            value={fields.insuranceContactEmail.value}
            disabled={busy}
            onChange={(evt) => fields.insuranceContactEmail.setValue(evt.target.value)}
          />
        </div>
      </section>

      <section className="flex flow-row gap-8 justify-end mt-4">
        <button className="btn" onClick={() => onCancel()}>
          Cancel
        </button>
        <button
          className="btn btn-primary min-w-24"
          onClick={() => {
            setBusy(true);
            const data: Equipment = {
              name: fields.name.value,
              description: fields.description.value,
              purchaseDate: fields.purchaseDate.value,
              cost: Number(fields.cost.value),
              manufacturer: fields.manufacturer.value,
              model: fields.model.value,
              identification: fields.identification.value,
              length: fields.length.value,
              weight: fields.weight.value,
              capacity: fields.capacity.value,
              licensePlateNumber: fields.licensePlateNumber.value,
              insuranceCarrier: fields.insuranceCarrier.value,
              insurancePolicyNumber: fields.insurancePolicyNumber.value,
              insuranceContactName: fields.insuranceContactName.value,
              insuranceContactPhoneNumber: fields.insuranceContactPhoneNumber.value,
              insuranceContactEmail: fields.insuranceContactEmail.value,
              equipmentType: equipmentTypes.find((x) => x.id === fields.equipmentTypeId.value)!,
            };
            onConfirm(equipment ? { ...equipment, ...data } : data);
          }}
          disabled={disableConfirmButton || busy}
        >
          {busy ? BusyIndicator : equipment ? 'Update' : 'Create'}
        </button>
      </section>
    </div>
  );
};

export default EquipmentEditor;
