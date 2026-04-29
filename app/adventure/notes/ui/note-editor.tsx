import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import { useForm } from '@/hooks/use-form';
import { Note } from '@/models';
import { isRequired } from '@/utils/input-validations';
import { useState } from 'react';

export interface NoteEditorProps {
  note?: Note;
  onConfirm: (n: Note) => void;
  onCancel: () => void;
}

const NoteEditor = ({ note, onCancel, onConfirm }: NoteEditorProps) => {
  const { fields, isDirty } = useForm({
    name: { initialValue: note?.name || '', validate: (v: string) => isRequired(v, 'Topic') },
    description: { initialValue: note?.description || '' },
  });
  const [busy, setBusy] = useState(false);

  const disableConfirmButton = !isDirty || !fields.name.value.trim();

  const buildNote = (): Note => ({
    ...note,
    name: fields.name.value,
    description: fields.description.value,
    eventRid: note?.eventRid || null,
    equipmentRid: note?.equipmentRid || null,
    placeRid: note?.placeRid || null,
  });

  return (
    <div className="p-2 md:p-4">
      <section>
        <div className="grid grid-cols-4 gap-x-4">
          <Input
            id="notes-topic"
            label="Topic"
            className="col-span-4"
            value={fields.name.value}
            disabled={busy}
            error={fields.name.error}
            onBlur={fields.name.validate}
            onChange={(evt) => fields.name.setValue(evt.target.value)}
          />
          <Description
            id="notes-description"
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

export default NoteEditor;
