import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import Select from '@/app/ui/select';
import { useFormControl } from '@/hooks/use-form-control';
import { MaintenanceItem, MaintenanceType, UsageUnits } from '@/models';
import { isRequired } from '@/utils/input-validations';
import { useState } from 'react';

interface MaintenanceItemEditorProps {
  maintenanceItem?: MaintenanceItem;
  maintenanceTypes: MaintenanceType[];
  usageUnits: UsageUnits[];
  onConfirm: (e: MaintenanceItem | Omit<MaintenanceItem, 'equipmentRid'>) => void;
  onCancel: () => void;
}

const MaintenanceItemEditor = ({
  maintenanceItem,
  maintenanceTypes,
  usageUnits,
  onCancel,
  onConfirm,
}: MaintenanceItemEditorProps) => {
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
  } = useFormControl(maintenanceItem?.name || '', (value: string | undefined) => isRequired(value, 'Name'));
  const { value: eventTypeId, setValue: setEventTypeId } = useFormControl(
    maintenanceItem?.maintenanceType.id || maintenanceTypes[0].id,
  );
  const { value: usageUnitsId, setValue: setUsageUnitsId } = useFormControl(
    maintenanceItem?.usageUnits?.id || usageUnits[0].id,
  );
  const {
    value: eventDate,
    error: eventDateError,
    setValue: setEventDate,
    validate: validateEventDate,
  } = useFormControl(maintenanceItem?.date || '', (value: string | undefined) => isRequired(value, 'Date'));
  const {
    value: description,
    error: descriptionError,
    setValue: setDescription,
    validate: validateDescription,
  } = useFormControl(maintenanceItem?.description || '', (value: string | undefined) =>
    checkDescriptionValidity(eventTypeId || 0, value),
  );
  const {
    value: usage,
    error: usageError,
    setValue: setUsage,
    validate: validateUsage,
  } = useFormControl(maintenanceItem?.usage ?? '', (value: string | number | undefined) =>
    checkUsageValidity(eventTypeId || 0, value),
  );
  const {
    value: cost,
    error: costError,
    setValue: setCost,
    validate: validateCost,
  } = useFormControl(maintenanceItem?.cost ?? '', (value: string | number | undefined) =>
    checkCostValidity(eventTypeId || 0, value),
  );
  const [busy, setBusy] = useState(false);

  const requiredFieldsHaveValues = !!(
    name.trim() &&
    eventDate.trim() &&
    ((eventTypeId === 1 && (usage || usage === 0)) ||
      eventTypeId === 2 ||
      (eventTypeId === 3 && (cost || cost === 0)) ||
      (eventTypeId === 4 && (cost || cost === 0)) ||
      (eventTypeId === 5 && description.trim()))
  );

  const isDirty =
    maintenanceItem?.maintenanceType.id !== eventTypeId ||
    maintenanceItem?.name !== name.trim() ||
    maintenanceItem?.date !== eventDate.trim() ||
    (maintenanceItem?.description || '') !== description.trim() ||
    (maintenanceItem?.cost || '') !== cost ||
    (maintenanceItem?.usage || '') !== usage ||
    (usage && maintenanceItem?.usageUnits?.id !== usageUnitsId);

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
          values={maintenanceTypes}
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
            const data: Omit<MaintenanceItem, 'equipmentRid'> = {
              name: name!,
              date: eventDate!,
              description: description,
              cost: cost || cost === 0 ? Number(cost) : null,
              usage: usage || usage === 0 ? Number(usage) : null,
              maintenanceType: maintenanceTypes.find((x) => x.id === +(eventTypeId || '1'))!,
              usageUnits: usage || usage === 0 ? usageUnits.find((x) => x.id === +(usageUnitsId || '1'))! : undefined,
            };
            onConfirm(maintenanceItem ? { ...maintenanceItem, ...data } : data);
          }}
          disabled={disableConfirmButton || busy}
        >
          {busy ? BusyIndicator : maintenanceItem ? 'Update' : 'Create'}
        </button>
      </section>
    </div>
  );
};

export default MaintenanceItemEditor;
