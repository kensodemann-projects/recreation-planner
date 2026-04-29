import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import { useForm } from '@/hooks/use-form';
import { ItineraryItem } from '@/models';
import { isRequired } from '@/utils/input-validations';
import { useState } from 'react';

export interface ItineraryItemEditorProps {
  item?: ItineraryItem;
  onConfirm: (n: ItineraryItem) => void;
  onCancel: () => void;
}

const ItineraryItemEditor = ({ item, onCancel, onConfirm }: ItineraryItemEditorProps) => {
  const { fields, isDirty } = useForm({
    name: { initialValue: item?.name || '', validate: (v: string) => isRequired(v, 'Activity') },
    date: { initialValue: item?.date || '', validate: (v: string) => isRequired(v, 'Date') },
    time: { initialValue: item?.time || '', validate: (v: string) => isRequired(v, 'Time') },
    description: { initialValue: item?.description || '' },
  });

  const [busy, setBusy] = useState(false);

  const buildItem = (): ItineraryItem => ({
    ...item,
    name: fields.name.value,
    description: fields.description.value,
    eventRid: item?.eventRid || -1,
    date: fields.date.value,
    time: fields.time.value,
  });

  const requiredFieldsHaveValues =
    !!fields.name.value.trim() && !!fields.date.value.trim() && !!fields.time.value.trim();
  const disableConfirmButton = !(requiredFieldsHaveValues && isDirty);

  return (
    <div className="p-2 md:p-4">
      <section>
        <div className="grid grid-cols-4 gap-x-4">
          <Input
            id="item-name"
            label="Activity"
            className="col-span-4"
            value={fields.name.value}
            disabled={busy}
            error={fields.name.error}
            onBlur={fields.name.validate}
            onChange={(evt) => fields.name.setValue(evt.target.value)}
          />
          <Input
            id="item-date"
            type="date"
            label="Date"
            className="col-span-4 md:col-span-2"
            value={fields.date.value}
            disabled={busy}
            error={fields.date.error}
            onBlur={fields.date.validate}
            onChange={(evt) => fields.date.setValue(evt.target.value)}
          />
          <Input
            id="item-time"
            type="time"
            label="Time"
            className="col-span-4 md:col-span-2"
            value={fields.time.value}
            disabled={busy}
            error={fields.time.error}
            onBlur={fields.time.validate}
            onChange={(evt) => fields.time.setValue(evt.target.value)}
          />
          <Description
            id="item-description"
            label="Description"
            className="col-span-4"
            value={fields.description.value}
            disabled={busy}
            onChange={(evt) => fields.description.setValue(evt.target.value)}
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
            onConfirm(buildItem());
          }}
          disabled={busy || disableConfirmButton}
        >
          {busy ? BusyIndicator : item ? 'Update' : 'Create'}
        </button>
      </section>
    </div>
  );
};

export default ItineraryItemEditor;
