'use client';

import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ComponentPropsWithoutRef, useState } from 'react';
import ConfirmationDialog from './confirmation-dialog';

interface TodoItemProperties extends ComponentPropsWithoutRef<'input'> {
  label: string;
  onLabelChanged: (value: string) => unknown;
  onRemove: () => unknown;
  removeVerification?: string;
}

const EditableCheckbox = ({ label, onLabelChanged, onRemove, removeVerification, ...props }: TodoItemProperties) => {
  const [editMode, setEditMode] = useState(!label);
  const [value, setValue] = useState(label);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="form-control mt-4">
      <div className="flex flex-row grow gap-4 items-center cursor-pointer">
        <input type="checkbox" className="checkbox" disabled={editMode} {...props} />
        {editMode ? (
          <div className="join w-full">
            <input
              autoFocus={true}
              type="text"
              value={value}
              className="join-item input input-bordered w-full max-w-xs"
              onChange={(evt) => setValue(evt.target.value)}
            />
            <button
              className="join-item btn btn-error"
              onClick={() => {
                if (removeVerification) {
                  setShowConfirm(true);
                } else {
                  onRemove();
                  setEditMode(false);
                }
              }}
              data-testid="remove-button"
            >
              <TrashIcon className="w-4" />
            </button>
            <button
              className="join-item btn btn-primary"
              onClick={() => {
                onLabelChanged(value);
                setEditMode(false);
              }}
              data-testid="save-button"
            >
              <CheckIcon className="w-4" />
            </button>
          </div>
        ) : (
          <div className="label-text min-w-28 min-h-4" tabIndex={0} onClick={() => setEditMode(true)}>
            {label}
          </div>
        )}
      </div>
      <ConfirmationDialog
        isOpen={showConfirm}
        title="Are you sure?"
        message={removeVerification || ''}
        onResponse={(confirmed) => {
          setShowConfirm(false);
          setEditMode(false);
          if (confirmed) {
            onRemove();
          }
        }}
      />
    </div>
  );
};

export default EditableCheckbox;
