import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import { useFormControl } from '@/hooks/use-form-control';
import { Note } from '@/models';
import { isRequired } from '@/utils/input-validations';
import { useState } from 'react';

export interface NotesEditorProps {
  note?: Note;
  equipmentId?: number;
  eventId?: number;
  placeId?: number;
  onConfirm: (n: Note) => void;
  onCancel: () => void;
}

const NotesEditor = ({
  note,
  onCancel,
  onConfirm,
  equipmentId: equipmentRid,
  eventId: eventRid,
  placeId: placeRid,
}: NotesEditorProps) => {
  const {
    value: name,
    error: nameError,
    setValue: setName,
    validate: validateName,
  } = useFormControl(note?.name || '', (value: string) => isRequired(value, 'Topic'));
  const { value: description, setValue: setDescription } = useFormControl(note?.description || '');
  const [busy, setBusy] = useState(false);

  const buildNote = (): Note => ({
    ...note,
    name,
    description,
    equipmentRid: note?.equipmentRid || equipmentRid,
    eventRid: note?.eventRid || eventRid,
    placeRid: note?.placeRid || placeRid,
  });

  const isDirty = name.trim() !== (note?.name || '') || description.trim() !== (note?.description || '');
  const disableConfirmButton = !(name.trim() && isDirty);

  return (
    <div className="p-2 md:p-4">
      <section>
        <div className="grid grid-cols-4 gap-x-4">
          <Input
            id="notes-topic"
            label="Topic"
            className="col-span-4"
            value={name}
            disabled={busy}
            error={nameError}
            onBlur={validateName}
            onChange={(evt) => setName(evt.target.value)}
          />
          <Description
            id="notes-description"
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
            onConfirm(buildNote());
          }}
          disabled={busy || disableConfirmButton}
        >
          {busy ? BusyIndicator : note ? 'Update' : 'Create'}
        </button>
      </section>
    </div>
  );
};

export default NotesEditor;
