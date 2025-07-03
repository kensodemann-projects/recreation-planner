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
    error: nameError,
    setValue: setName,
    validate: validateName,
  } = useFormControl(equipment?.name || '', (value: string | undefined) => isRequired(value, 'Name'));
  const { value: description, setValue: setDescription } = useFormControl(equipment?.description || '');
  const { value: purchaseDate, setValue: setPurchaseDate } = useFormControl(equipment?.purchaseDate || '');
  const { value: cost, setValue: setCost } = useFormControl(equipment?.cost || '');
  const [busy, setBusy] = useState(false);

  const disableConfirmButton =
    !name ||
    !(
      name !== (equipment?.name || '') ||
      description !== (equipment?.description || '') ||
      purchaseDate !== (equipment?.purchaseDate || '') ||
      cost !== (equipment?.cost || '')
    );

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
          error={nameError}
          onBlur={validateName}
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
          onChange={(evt) => setCost(evt.target.value && evt.target.valueAsNumber)}
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
              cost: Number(cost) || null,
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
