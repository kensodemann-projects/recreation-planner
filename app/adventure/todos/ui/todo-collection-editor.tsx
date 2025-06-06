import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import { useFormControl } from '@/hooks/use-form-control';
import { TodoCollection } from '@/models';
import { isRequired } from '@/utils/input-validations';

export interface TodoCollectionEditorProps {
  todoCollection?: TodoCollection | undefined;
  onConfirm: (todoCollection: TodoCollection) => void;
  onCancel: () => void;
}

const TodoCollectionEditor = ({ todoCollection, onCancel, onConfirm }: TodoCollectionEditorProps) => {
  const {
    value: name,
    dirty: nameDirty,
    error: nameError,
    touched: nameTouched,
    handleChange: handleNameChange,
    handleBlur: handleNameBlur,
  } = useFormControl(todoCollection?.name || '', (value: string | undefined) => isRequired(value, 'Name'));
  const {
    value: description,
    dirty: descriptionDirty,
    handleChange: setDescription,
  } = useFormControl(todoCollection?.description || '');

  const disableConfirmButton = !!nameError || !(nameDirty || descriptionDirty);

  return (
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-4 gap-x-4">
        <Input
          id="collection-name"
          className="col-span-4"
          type="text"
          label="Name"
          value={name}
          error={nameTouched ? nameError : ''}
          onBlur={handleNameBlur}
          onChange={(evt) => handleNameChange(evt.target.value)}
        />
        <Description
          id="place-description"
          className="col-span-4 mt-4"
          label="Description"
          rows={3}
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
      </div>

      <div className="flex flow-row gap-8 justify-end mt-4">
        <button className="btn" onClick={() => onCancel()}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() =>
            onConfirm({
              id: todoCollection ? todoCollection.id : undefined,
              name: name!,
              description: description || null,
              isComplete: todoCollection ? todoCollection.isComplete : false,
              dueDate: todoCollection ? todoCollection.dueDate : null,
              todoItems: todoCollection ? todoCollection.todoItems : [],
            })
          }
          disabled={disableConfirmButton}
        >
          {todoCollection ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default TodoCollectionEditor;
