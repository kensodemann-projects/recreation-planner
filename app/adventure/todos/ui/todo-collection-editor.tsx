import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import { useFormControl } from '@/hooks/use-form-control';
import { TodoCollection } from '@/models';
import { isRequired } from '@/utils/input-validations';
import { useState } from 'react';

export interface TodoCollectionEditorProps {
  todoCollection?: TodoCollection | undefined;
  onConfirm: (todoCollection: TodoCollection) => void;
  onCancel: () => void;
}

const TodoCollectionEditor = ({ todoCollection, onCancel, onConfirm }: TodoCollectionEditorProps) => {
  const {
    value: name,
    error: nameError,
    setValue: setName,
    validate: validateName,
  } = useFormControl(todoCollection?.name || '', (value: string | undefined) => isRequired(value, 'Name'));
  const { value: dueDate, setValue: setDueDate } = useFormControl(todoCollection?.dueDate || '');
  const { value: description, setValue: setDescription } = useFormControl(todoCollection?.description || '');
  const { value: isComplete, setValue: setIsComplete } = useFormControl(todoCollection?.isComplete || false);
  const [busy, setBusy] = useState(false);

  const disableConfirmButton =
    !name ||
    !(
      dueDate !== (todoCollection?.dueDate || '') ||
      name !== (todoCollection?.name || '') ||
      description !== (todoCollection?.description || '') ||
      isComplete !== (todoCollection?.isComplete || false)
    );

  return (
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-4 gap-x-4">
        <Input
          id="collection-name"
          className="col-span-4 md:col-span-3"
          type="text"
          label="Name"
          value={name}
          disabled={busy}
          error={nameError}
          onBlur={validateName}
          onChange={(evt) => setName(evt.target.value)}
        />
        <Input
          id="collection-due-date"
          className="col-span-4 md:col-span-1"
          type="date"
          label="Due Date"
          value={dueDate}
          disabled={busy}
          onChange={(evt) => setDueDate(evt.target.value)}
        />
        <Description
          id="place-description"
          className="col-span-4 mt-2"
          label="Description"
          rows={3}
          value={description}
          disabled={busy}
          onChange={(evt) => setDescription(evt.target.value)}
        />
        <label className="label">
          <input
            type="checkbox"
            className="checkbox"
            checked={isComplete}
            disabled={busy}
            onChange={(evt) => setIsComplete(evt.target.checked)}
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
            const data = {
              name: name!,
              description: description || null,
              isComplete: isComplete || false,
              dueDate: dueDate || null,
            };
            onConfirm(todoCollection ? { ...todoCollection, ...data } : { ...data, todoItems: [] });
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
