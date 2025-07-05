import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import SectionHeader from '@/app/ui/section-header';
import Select from '@/app/ui/select';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { useFormControl } from '@/hooks/use-form-control';
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
  const {
    value: name,
    error: nameError,
    setValue: setName,
    validate: validateName,
  } = useFormControl(equipment?.name || '', (value: string | undefined) => isRequired(value, 'Name'));
  const { value: equipmentTypeId, setValue: setEquipmentTypeId } = useFormControl(
    equipment?.equipmentType.id || equipmentTypes[0].id,
  );
  const { value: description, setValue: setDescription } = useFormControl(equipment?.description || '');
  const { value: purchaseDate, setValue: setPurchaseDate } = useFormControl(equipment?.purchaseDate || '');
  const { value: cost, setValue: setCost } = useFormControl(equipment?.cost || '');
  const { value: manufacturer, setValue: setManufacturer } = useFormControl(equipment?.manufacturer || '');
  const { value: model, setValue: setModel } = useFormControl(equipment?.model || '');
  const { value: identification, setValue: setIdentification } = useFormControl(equipment?.identification || '');
  const { value: length, setValue: setLength } = useFormControl(equipment?.length || '');
  const { value: weight, setValue: setWeight } = useFormControl(equipment?.weight || '');
  const { value: capacity, setValue: setCapacity } = useFormControl(equipment?.capacity || '');
  const { value: licensePlateNumber, setValue: setLicencePlateNumber } = useFormControl(
    equipment?.licensePlateNumber || '',
  );
  const { value: insuranceCarrier, setValue: setInsuranceCarrier } = useFormControl(equipment?.insuranceCarrier || '');
  const { value: insurancePolicyNumber, setValue: setInsurancePolicyNumber } = useFormControl(
    equipment?.insurancePolicyNumber || '',
  );
  const { value: insuranceContactName, setValue: setInsuranceContactName } = useFormControl(
    equipment?.insuranceContactName || '',
  );
  const { value: insuranceContactPhoneNumber, setValue: setInsuranceContactPhoneNumber } = useFormControl(
    equipment?.insuranceContactPhoneNumber || '',
  );
  const { value: insuranceContactEmail, setValue: setInsuranceContactEmail } = useFormControl(
    equipment?.insuranceContactEmail || '',
  );
  const [busy, setBusy] = useState(false);

  const disableConfirmButton =
    !name ||
    (name === (equipment?.name || '') &&
      equipmentTypeId === equipment?.equipmentType.id &&
      description === (equipment?.description || '') &&
      purchaseDate === (equipment?.purchaseDate || '') &&
      cost === (equipment?.cost || '') &&
      manufacturer === (equipment?.manufacturer || '') &&
      model === (equipment?.model || '') &&
      identification === (equipment?.identification || '') &&
      licensePlateNumber === (equipment?.licensePlateNumber || '') &&
      weight === (equipment?.weight || '') &&
      length === (equipment?.length || '') &&
      capacity === (equipment?.capacity || '') &&
      insuranceCarrier === (equipment?.insuranceCarrier || '') &&
      insurancePolicyNumber === (equipment?.insurancePolicyNumber || '') &&
      insuranceContactName === (equipment?.insuranceContactName || '') &&
      insuranceContactPhoneNumber === (equipment?.insuranceContactPhoneNumber || '') &&
      insuranceContactEmail === (equipment?.insuranceContactEmail || ''));

  return (
    <div className="p-2 md:p-4">
      <section>
        <div className="grid grid-cols-4 gap-x-4">
          <Input
            id="equipment-name"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Name"
            value={name}
            disabled={busy}
            error={nameError}
            onBlur={validateName}
            onChange={(evt) => setName(evt.target.value)}
          />

          <Select
            id="equipment-type"
            className="col-span-4 md:col-span-2"
            disabled={busy}
            label="Type of Equipment"
            value={equipmentTypeId}
            values={equipmentTypes}
            onChange={(evt) => setEquipmentTypeId(+evt.target.value)}
          />

          <Description
            id="equipment-description"
            className="col-span-4"
            label="Description"
            rows={3}
            value={description}
            disabled={busy}
            onChange={(evt) => setDescription(evt.target.value)}
          />

          <Input
            id="equipment-identification"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Identification"
            value={identification}
            disabled={busy}
            onChange={(evt) => setIdentification(evt.target.value)}
          />

          <Input
            id="equipment-license-plate-number"
            className="col-span-4 md:col-span-2"
            type="text"
            label="License Plate"
            value={licensePlateNumber}
            disabled={busy}
            onChange={(evt) => setLicencePlateNumber(evt.target.value)}
          />

          <Input
            id="equipment-purchase-date"
            className="col-span-4 md:col-span-2"
            type="date"
            label="Purchase Date"
            value={purchaseDate}
            disabled={busy}
            onChange={(evt) => setPurchaseDate(evt.target.value)}
          />

          <Input
            id="equipment-cost"
            className="col-span-4 md:col-span-2"
            type="number"
            value={cost ?? undefined}
            label="Cost"
            disabled={busy}
            onChange={(evt) => setCost(evt.target.value && evt.target.valueAsNumber)}
          />
        </div>
      </section>

      <section>
        <SectionHeader>
          <SubtitleHeading>Specifications</SubtitleHeading>
        </SectionHeader>

        <div className="grid grid-cols-4 gap-x-4">
          <Input
            id="equipment-manufacturer"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Manufacturer"
            value={manufacturer}
            disabled={busy}
            onChange={(evt) => setManufacturer(evt.target.value)}
          />

          <Input
            id="equipment-model"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Model"
            value={model}
            disabled={busy}
            onChange={(evt) => setModel(evt.target.value)}
          />

          <Input
            id="equipment-weight"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Weight"
            value={weight}
            disabled={busy}
            onChange={(evt) => setWeight(evt.target.value)}
          />

          <Input
            id="equipment-length"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Length"
            value={length}
            disabled={busy}
            onChange={(evt) => setLength(evt.target.value)}
          />

          <Input
            id="equipment-capacity"
            className="col-span-4"
            type="text"
            label="Capacity"
            value={capacity}
            disabled={busy}
            onChange={(evt) => setCapacity(evt.target.value)}
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
            value={insuranceCarrier}
            disabled={busy}
            onChange={(evt) => setInsuranceCarrier(evt.target.value)}
          />

          <Input
            id="equipment-insurance-policy-number"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Policy Number"
            value={insurancePolicyNumber}
            disabled={busy}
            onChange={(evt) => setInsurancePolicyNumber(evt.target.value)}
          />

          <Input
            id="equipment-insurance-conact-name"
            className="col-span-4"
            type="text"
            label="Contact Name"
            value={insuranceContactName}
            disabled={busy}
            onChange={(evt) => setInsuranceContactName(evt.target.value)}
          />

          <Input
            id="equipment-insurance-contact-phone-number"
            className="col-span-4 md:col-span-2"
            type="text"
            label="Contact Phone Number"
            value={insuranceContactPhoneNumber}
            disabled={busy}
            onChange={(evt) => setInsuranceContactPhoneNumber(evt.target.value)}
          />

          <Input
            id="equipment-insurance-contact-email"
            className="col-span-4 md:col-span-2"
            type="email"
            label="Contact Email"
            value={insuranceContactEmail}
            disabled={busy}
            onChange={(evt) => setInsuranceContactEmail(evt.target.value)}
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
              name: name!,
              description: description || null,
              purchaseDate: purchaseDate || null,
              cost: Number(cost) || null,
              manufacturer: manufacturer || null,
              model: model || null,
              identification: identification || null,
              length: length || null,
              weight: weight || null,
              capacity: capacity || null,
              licensePlateNumber: licensePlateNumber || null,
              insuranceCarrier: insuranceCarrier || null,
              insurancePolicyNumber: insurancePolicyNumber || null,
              insuranceContactName: insuranceContactName || null,
              insuranceContactPhoneNumber: insuranceContactPhoneNumber || null,
              insuranceContactEmail: insuranceContactEmail || null,
              equipmentType: equipmentTypes.find((x) => x.id === equipmentTypeId)!,
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
