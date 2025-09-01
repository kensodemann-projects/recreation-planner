import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import { useFormControl } from '@/hooks/use-form-control';
import { ItineraryItem } from '@/models';
import { isRequired } from '@/utils/input-validations';
import { useState } from 'react';

export interface ItineraryItemEditorProps {
  item?: ItineraryItem;
  onConfirm: (n: ItineraryItem) => void;
  onCancel: () => void;
}

const ItineraryItemEditor = ({ item, onCancel, onConfirm }: ItineraryItemEditorProps) => {
  const {
    value: name,
    error: nameError,
    setValue: setName,
    validate: validateName,
  } = useFormControl(item?.name || '', (value: string) => isRequired(value, 'Activity'));
  const {
    value: date,
    error: dateError,
    setValue: setDate,
    validate: validateDate,
  } = useFormControl(item?.date || '', (value: string) => isRequired(value, 'Date'));
  const {
    value: time,
    error: timeError,
    setValue: setTime,
    validate: validateTime,
  } = useFormControl(item?.time || '', (value: string) => isRequired(value, 'Time'));
  const { value: description, setValue: setDescription } = useFormControl(item?.description || '');
  const [busy, setBusy] = useState(false);

  const buildItem = (): ItineraryItem => ({
    ...item,
    name,
    description,
    eventRid: item?.eventRid || -1,
    date,
    time,
  });

  const requiredFieldsHaveValues = !!name.trim() && !!date.trim() && !!time.trim();
  const isDirty =
    name.trim() !== (item?.name || '') ||
    description.trim() !== (item?.description || '') ||
    date.trim() !== (item?.date || '') ||
    time.trim() !== (item?.time || '');
  const disableConfirmButton = !(requiredFieldsHaveValues && isDirty);

  return (
    <div className="p-2 md:p-4">
      <section>
        <div className="grid grid-cols-4 gap-x-4">
          <Input
            id="item-name"
            label="Activity"
            className="col-span-4"
            value={name}
            disabled={busy}
            error={nameError}
            onBlur={validateName}
            onChange={(evt) => setName(evt.target.value)}
          />
          <Input
            id="item-date"
            type="date"
            label="Date"
            className="col-span-4 md:col-span-2"
            value={date}
            disabled={busy}
            error={dateError}
            onBlur={validateDate}
            onChange={(evt) => setDate(evt.target.value)}
          />
          <Input
            id="item-time"
            type="time"
            label="Time"
            className="col-span-4 md:col-span-2"
            value={time}
            disabled={busy}
            error={timeError}
            onBlur={validateTime}
            onChange={(evt) => setTime(evt.target.value)}
          />
          <Description
            id="item-description"
            label="Description"
            className="col-span-4"
            value={description}
            disabled={busy}
            onChange={(evt) => setDescription(evt.target.value)}
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
