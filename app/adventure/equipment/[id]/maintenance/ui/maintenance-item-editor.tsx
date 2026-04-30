import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import Select from '@/app/ui/select';
import { useForm } from '@/hooks/use-form';
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
  const checkCostValidity = (cost: string | number | undefined): string => {
    return fields.eventTypeId.value === 3 || fields.eventTypeId.value === 4 ? isRequired(cost, 'Cost') : '';
  };
  const checkDescriptionValidity = (description: string | undefined): string => {
    return fields.eventTypeId.value === 5 ? isRequired(description, 'Description') : '';
  };
  const checkUsageValidity = (usage: string | number | undefined): string => {
    return fields.eventTypeId.value === 1 ? isRequired(usage, 'Usage') : '';
  };

  const { fields, isDirty } = useForm({
    name: {
      initialValue: maintenanceItem?.name || '',
      validate: (value: string | undefined) => isRequired(value, 'Name'),
    },
    eventDate: {
      initialValue: maintenanceItem?.date || '',
      validate: (value: string | undefined) => isRequired(value, 'Date'),
    },
    eventTypeId: { initialValue: maintenanceItem?.maintenanceType.id || maintenanceTypes[0].id },
    usageUnitsId: { initialValue: maintenanceItem?.usageUnits?.id || usageUnits[0].id },
    description: {
      initialValue: maintenanceItem?.description || '',
      validate: (value: string | undefined) => checkDescriptionValidity(value),
    },
    usage: {
      initialValue: maintenanceItem?.usage ?? '',
      validate: (value: string | number | undefined) => checkUsageValidity(value),
    },
    cost: {
      initialValue: maintenanceItem?.cost ?? '',
      validate: (value: string | number | undefined) => checkCostValidity(value),
    },
  });

  const [busy, setBusy] = useState(false);

  const requiredFieldsHaveValues = !!(
    fields.name.value.trim() &&
    fields.eventDate.value.trim() &&
    ((fields.eventTypeId.value === 1 && (fields.usage.value || fields.usage.value === 0)) ||
      fields.eventTypeId.value === 2 ||
      (fields.eventTypeId.value === 3 && (fields.cost.value || fields.cost.value === 0)) ||
      (fields.eventTypeId.value === 4 && (fields.cost.value || fields.cost.value === 0)) ||
      (fields.eventTypeId.value === 5 && fields.description.value.trim()))
  );
  const disableConfirmButton = !(requiredFieldsHaveValues && isDirty);

  return (
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-4 gap-x-4">
        <Input
          id="equipment-event-name"
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
          id="equipment-event-type"
          className="col-span-4 md:col-span-2 xl:col-span-1"
          disabled={busy}
          label="Type of Event"
          value={fields.eventTypeId.value}
          values={maintenanceTypes}
          onChange={(evt) => fields.eventTypeId.setValue(+evt.target.value)}
        />

        <Input
          id="equipment-event-date"
          className="col-span-4 xl:col-span-1"
          type="date"
          label="Date"
          value={fields.eventDate.value}
          disabled={busy}
          error={fields.eventDate.error}
          onBlur={fields.eventDate.validate}
          onChange={(evt) => fields.eventDate.setValue(evt.target.value)}
        />

        <Description
          id="equipment-event-description"
          className="col-span-4"
          label="Description"
          rows={3}
          value={fields.description.value}
          error={fields.description.error}
          disabled={busy}
          onBlur={fields.description.validate}
          onChange={(evt) => fields.description.setValue(evt.target.value)}
        />

        <Input
          id="equipment-event-cost"
          className="col-span-4 xl:col-span-2"
          type="number"
          label="Cost"
          value={fields.cost.value}
          error={fields.cost.error}
          disabled={busy}
          onBlur={fields.cost.validate}
          onChange={(evt) => fields.cost.setValue(evt.target.value && evt.target.valueAsNumber)}
        />

        <Input
          id="equipment-event-usage"
          className="col-span-4 md:col-span-2 xl:col-span-1"
          type="number"
          label="Usage"
          value={fields.usage.value}
          error={fields.usage.error}
          disabled={busy}
          onBlur={fields.usage.validate}
          onChange={(evt) => fields.usage.setValue(evt.target.value && evt.target.valueAsNumber)}
        />

        <Select
          id="equipment-event-usage-units"
          className="col-span-4 md:col-span-2 xl:col-span-1"
          disabled={busy}
          label="Usage Units"
          value={fields.usageUnitsId.value}
          values={usageUnits}
          onChange={(evt) => fields.usageUnitsId.setValue(+evt.target.value)}
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
              name: fields.name.value,
              date: fields.eventDate.value,
              description: fields.description.value,
              cost: fields.cost.value || fields.cost.value === 0 ? Number(fields.cost.value) : null,
              usage: fields.usage.value || fields.usage.value === 0 ? Number(fields.usage.value) : null,
              maintenanceType: maintenanceTypes.find((x) => x.id === +(fields.eventTypeId.value || '1'))!,
              usageUnits:
                fields.usage.value || fields.usage.value === 0
                  ? usageUnits.find((x) => x.id === +(fields.usageUnitsId.value || '1'))!
                  : undefined,
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
