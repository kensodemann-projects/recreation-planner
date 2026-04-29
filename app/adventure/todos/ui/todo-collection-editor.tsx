import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import { useForm } from '@/hooks/use-form';
import { TodoCollection } from '@/models';
import { isRequired } from '@/utils/input-validations';
import { useState } from 'react';

export interface TodoCollectionEditorProps {
  todoCollection?: TodoCollection | undefined;
  onConfirm: (todoCollection: TodoCollection) => void;
  onCancel: () => void;
}

const TodoCollectionEditor = ({ todoCollection, onCancel, onConfirm }: TodoCollectionEditorProps) => {
  const { fields, isDirty } = useForm({
    name: { initialValue: todoCollection?.name || '', validate: (v: string) => isRequired(v, 'Name') },
    dueDate: { initialValue: todoCollection?.dueDate || '' },
    description: { initialValue: todoCollection?.description || '' },
    isComplete: { initialValue: todoCollection?.isComplete || false },
  });
  const [busy, setBusy] = useState(false);

  const requiredFieldsHaveValues = !!fields.name.value.trim();
  const disableConfirmButton = !(requiredFieldsHaveValues && isDirty);

  return (
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-4 gap-x-4">
        <Input
          id="collection-name"
          className="col-span-4 md:col-span-3"
          type="text"
          label="Name"
          value={fields.name.value}
          disabled={busy}
          error={fields.name.error}
          onBlur={fields.name.validate}
          onChange={(evt) => fields.name.setValue(evt.target.value)}
        />
        <Input
          id="collection-due-date"
          className="col-span-4 md:col-span-1"
          type="date"
          label="Due Date"
          value={fields.dueDate.value}
          disabled={busy}
          onChange={(evt) => fields.dueDate.setValue(evt.target.value)}
        />
        <Description
          id="place-description"
          className="col-span-4 mt-2"
          label="Description"
          rows={3}
          value={fields.description.value}
          disabled={busy}
          onChange={(evt) => fields.description.setValue(evt.target.value)}
        />
        <label className="label">
          <input
            type="checkbox"
            className="checkbox"
            checked={fields.isComplete.value}
            disabled={busy}
            onChange={(evt) => fields.isComplete.setValue(evt.target.checked)}
          />
          Archived
        </label>
      </div>

      <div className="flex flow-row gap-8 justify-end mt-4">
        <button className="btn" onClick={() => onCancel()} disabled={busy}>
          Cancel
        </button>
        <button
          className="btn btn-primary min-w-24"
          onClick={() => {
            setBusy(true);
            const data: Pick<TodoCollection, 'name' | 'description' | 'isComplete' | 'dueDate'> = {
              name: fields.name.value!,
              description: fields.description.value,
              isComplete: fields.isComplete.value,
              dueDate: fields.dueDate.value || null,
            };
            onConfirm(
              todoCollection
                ? { ...todoCollection, ...data }
                : { ...data, equipmentRid: null, eventRid: null, todoItems: [] },
            );
          }}
          disabled={disableConfirmButton || busy}
        >
          {busy ? BusyIndicator : todoCollection ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default TodoCollectionEditor;
