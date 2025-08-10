import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import Select from '@/app/ui/select';
import { useFormControl } from '@/hooks/use-form-control';
import { EquipmentEvent, EquipmentEventType, UsageUnits } from '@/models';
import { isRequired } from '@/utils/input-validations';
import { useState } from 'react';

interface EquipmentEventEditorProps {
  equipmentEvent?: EquipmentEvent;
  equipmentEventTypes: EquipmentEventType[];
  usageUnits: UsageUnits[];
  onConfirm: (e: EquipmentEvent | Omit<EquipmentEvent, 'equipmentRid'>) => void;
  onCancel: () => void;
}

const EquipmentEventEditor = ({
  equipmentEvent,
  equipmentEventTypes,
  usageUnits,
  onCancel,
  onConfirm,
}: EquipmentEventEditorProps) => {
  const checkCostValidity = (eventTypeId: number, cost: string | number | undefined): string => {
    return eventTypeId === 3 || eventTypeId === 4 ? isRequired(cost, 'Cost') : '';
  };

  const checkDescriptionValidity = (eventTypeId: number, description: string | undefined): string => {
    return eventTypeId === 5 ? isRequired(description, 'Description') : '';
  };

  const checkUsageValidity = (eventTypeId: number, usage: string | number | undefined): string => {
    return eventTypeId === 1 ? isRequired(usage, 'Usage') : '';
  };

  const {
    value: name,
    error: nameError,
    setValue: setName,
    validate: validateName,
  } = useFormControl(equipmentEvent?.name || '', (value: string | undefined) => isRequired(value, 'Name'));
  const { value: eventTypeId, setValue: setEventTypeId } = useFormControl(
    equipmentEvent?.equipmentEventType.id || equipmentEventTypes[0].id,
  );
  const { value: usageUnitsId, setValue: setUsageUnitsId } = useFormControl(
    equipmentEvent?.usageUnits?.id || usageUnits[0].id,
  );
  const {
    value: eventDate,
    error: eventDateError,
    setValue: setEventDate,
    validate: validateEventDate,
  } = useFormControl(equipmentEvent?.date || '', (value: string | undefined) => isRequired(value, 'Date'));
  const {
    value: description,
    error: descriptionError,
    setValue: setDescription,
    validate: validateDescription,
  } = useFormControl(equipmentEvent?.description || '', (value: string | undefined) =>
    checkDescriptionValidity(eventTypeId || 0, value),
  );
  const {
    value: usage,
    error: usageError,
    setValue: setUsage,
    validate: validateUsage,
  } = useFormControl(equipmentEvent?.usage || '', (value: string | number | undefined) =>
    checkUsageValidity(eventTypeId || 0, value),
  );
  const {
    value: cost,
    error: costError,
    setValue: setCost,
    validate: validateCost,
  } = useFormControl(equipmentEvent?.cost || '', (value: string | number | undefined) =>
    checkCostValidity(eventTypeId || 0, value),
  );
  const [busy, setBusy] = useState(false);

  const requiredFieldsHaveValues = !!(
    name.trim() &&
    eventDate.trim() &&
    ((eventTypeId === 1 && usage) ||
      eventTypeId === 2 ||
      (eventTypeId === 3 && cost) ||
      (eventTypeId === 4 && cost) ||
      (eventTypeId === 5 && description.trim()))
  );

  const isDirty =
    equipmentEvent?.equipmentEventType.id !== eventTypeId ||
    equipmentEvent?.name !== name.trim() ||
    equipmentEvent?.date !== eventDate.trim() ||
    (equipmentEvent?.description || '') !== description.trim() ||
    (equipmentEvent?.cost || '') !== cost ||
    (equipmentEvent?.usage || '') !== usage ||
    (usage && equipmentEvent?.usageUnits?.id !== usageUnitsId);

  const disableConfirmButton = !(requiredFieldsHaveValues && isDirty);

  return (
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-4 gap-x-4">
        <Input
          id="equipment-event-name"
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
          id="equipment-event-type"
          className="col-span-4 md:col-span-2 xl:col-span-1"
          disabled={busy}
          label="Type of Event"
          value={eventTypeId}
          values={equipmentEventTypes}
          onChange={(evt) => setEventTypeId(+evt.target.value)}
        />

        <Input
          id="equipment-event-date"
          className="col-span-4 xl:col-span-1"
          type="date"
          label="Date"
          value={eventDate}
          disabled={busy}
          error={eventDateError}
          onBlur={validateEventDate}
          onChange={(evt) => setEventDate(evt.target.value)}
        />

        <Description
          id="equipment-event-description"
          className="col-span-4"
          label="Description"
          rows={3}
          value={description}
          error={descriptionError}
          disabled={busy}
          onBlur={validateDescription}
          onChange={(evt) => setDescription(evt.target.value)}
        />

        <Input
          id="equipment-event-cost"
          className="col-span-4 xl:col-span-2"
          type="number"
          label="Cost"
          value={cost}
          error={costError}
          disabled={busy}
          onBlur={validateCost}
          onChange={(evt) => setCost(evt.target.value && evt.target.valueAsNumber)}
        />

        <Input
          id="equipment-event-usage"
          className="col-span-4 md:col-span-2 xl:col-span-1"
          type="number"
          label="Usage"
          value={usage}
          error={usageError}
          disabled={busy}
          onBlur={validateUsage}
          onChange={(evt) => setUsage(evt.target.value && evt.target.valueAsNumber)}
        />

        <Select
          id="equipment-event-usage-units"
          className="col-span-4 md:col-span-2 xl:col-span-1"
          disabled={busy}
          label="Usage Units"
          value={usageUnitsId}
          values={usageUnits}
          onChange={(evt) => setUsageUnitsId(+evt.target.value)}
        />
      </div>

      <section className="flex flow-row gap-8 justify-end mt-4">
        <button className="btn" onClick={() => onCancel()}>
          Cancel
        </button>
        <button
          className="btn btn-primary min-w-24"
          onClick={() => {
            setBusy(true);
            const data: Omit<EquipmentEvent, 'equipmentRid'> = {
              name: name!,
              date: eventDate!,
              description: description,
              cost: Number(cost),
              usage: Number(usage),
              equipmentEventType: equipmentEventTypes.find((x) => x.id === +(eventTypeId || '1'))!,
              usageUnits: usage ? usageUnits.find((x) => x.id === +(usageUnitsId || '1'))! : undefined,
            };
            onConfirm(equipmentEvent ? { ...equipmentEvent, ...data } : data);
          }}
          disabled={disableConfirmButton || busy}
        >
          {busy ? BusyIndicator : equipmentEvent ? 'Update' : 'Create'}
        </button>
      </section>
    </div>
  );
};

export default EquipmentEventEditor;
