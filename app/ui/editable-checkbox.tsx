'use client';

import { ComponentPropsWithoutRef, useState } from 'react';

interface TodoItemProperties extends ComponentPropsWithoutRef<'input'> {
  label: string;
  onLabelChanged?: (value: string) => unknown;
}

const EditableCheckbox = ({ label, onLabelChanged, ...props }: TodoItemProperties) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="form-control mt-4">
      <div className="flex flex-row grow gap-4 items-center cursor-pointer">
        <input type="checkbox" className="checkbox" disabled={editMode} {...props} />
        {editMode ? (
          <input
            type="text"
            defaultValue={label}
            className="input input-bordered w-full max-w-xs"
            onBlur={(evt) => {
              setEditMode(false);
              onLabelChanged?.(evt.target.value);
            }}
          />
        ) : (
          <div className="label-text min-w-xs min-h-4" tabIndex={0} onClick={() => setEditMode(true)}>
            {label}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableCheckbox;
