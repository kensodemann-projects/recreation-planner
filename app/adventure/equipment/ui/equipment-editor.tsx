import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import { useFormControl } from '@/hooks/use-form-control';
import { Equipment } from '@/models';
import { isRequired } from '@/utils/input-validations';
import { useState } from 'react';

export interface EquipmentEditorProps {
  equipment?: Equipment | undefined;
  onConfirm: (e: Equipment) => void;
  onCancel: () => void;
}

const EquipmentEditor = ({ equipment, onCancel, onConfirm }: EquipmentEditorProps) => {
  const {
    value: name,
    dirty: nameDirty,
    error: nameError,
    touched: nameTouched,
    handleChange: setName,
    handleBlur: handleNameBlur,
  } = useFormControl(equipment?.name || '', (value: string | undefined) => isRequired(value, 'Name'));
  const {
    value: description,
    dirty: descriptionDirty,
    handleChange: setDescription,
  } = useFormControl(equipment?.description || '');
  const {
    value: purchaseDate,
    dirty: purchaseDateDirty,
    handleChange: setPurchaseDate,
  } = useFormControl(equipment?.purchaseDate || '');
  const { value: cost, dirty: costDirty, handleChange: setCost } = useFormControl(equipment?.cost || null);
  const [busy, setBusy] = useState(false);

  const disableConfirmButton = !name || !(nameDirty || descriptionDirty || purchaseDateDirty || costDirty);

  return (
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-4 gap-x-4">
        <Input
          id="equipment-name"
          className="col-span-4"
          type="text"
          label="Name"
          value={name}
          disabled={busy}
          error={nameTouched ? nameError : ''}
          onBlur={handleNameBlur}
          onChange={(evt) => setName(evt.target.value)}
        />

        <Description
          id="equipment-description"
          className="col-span-4"
          label="Description"
          rows={3}
          value={description}
          disabled={busy}
          onChange={(evt) => setDescription(evt.target.value)}
        />

        <Input
          id="equipment-purchase-date"
          className="col-span-4 md:col-span-2"
          type="date"
          label="Purchase Date"
          value={purchaseDate}
          disabled={busy}
          onChange={(evt) => setPurchaseDate(evt.target.value)}
        />

        <Input
          id="equipment-cost"
          className="col-span-4 md:col-span-2"
          type="number"
          value={cost ?? undefined}
          label="Cost"
          disabled={busy}
          onChange={(evt) => setCost(evt.target.valueAsNumber)}
        />
      </div>

      <div className="flex flow-row gap-8 justify-end mt-4">
        <button className="btn" onClick={() => onCancel()}>
          Cancel
        </button>
        <button
          className="btn btn-primary min-w-24"
          onClick={() => {
            setBusy(true);
            const data = {
              name: name!,
              description: description || null,
              purchaseDate: purchaseDate || null,
              cost: cost || null,
            };
            onConfirm(equipment ? { ...equipment, ...data } : data);
          }}
          disabled={disableConfirmButton || busy}
        >
          {busy ? BusyIndicator : equipment ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default EquipmentEditor;
