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

const TodoCollectionEditor = ({ todoCollection }: TodoCollectionEditorProps) => {
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

  return (
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-4 gap-x-4">
        <Input
          id="collection-name"
          className="col-span-4 md:col-span-3"
          type="text"
          label="Name"
          value={name}
          error={nameTouched ? nameError : ''}
          onBlur={handleNameBlur}
          onChange={(evt) => handleNameChange(evt.target.value)}
        />
        <Description
          id="place-description"
          className="col-span-4"
          label="Description"
          rows={3}
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
      </div>
    </div>
  );
};

export default TodoCollectionEditor;
