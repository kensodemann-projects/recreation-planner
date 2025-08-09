'use client';

import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import Select from '@/app/ui/select';
import { useFormControl } from '@/hooks/use-form-control';
import { Place, PlaceType } from '@/models';
import { isRequired } from '@/utils/input-validations';
import { useState } from 'react';

export interface PlaceEditorProps {
  types: Array<PlaceType>;
  place?: Place;
  onConfirm: (place: Place) => void;
  onCancel: () => void;
}

const PlaceEditor = ({ place, types, onConfirm, onCancel }: PlaceEditorProps) => {
  const {
    value: placeName,
    error: placeNameError,
    setValue: setPlaceName,
    validate: validatePlaceName,
  } = useFormControl(place?.name || '', (value: string | undefined) => isRequired(value, 'Name'));

  const { value: description, setValue: setDescription } = useFormControl(place?.description || '');
  const { value: addressLine1, setValue: setAddressLine1 } = useFormControl(place?.address?.line1 || '');
  const { value: addressLine2, setValue: setAddressLine2 } = useFormControl(place?.address?.line2 || '');
  const { value: addressCity, setValue: setCity } = useFormControl(place?.address?.city || '');
  const { value: addressState, setValue: setState } = useFormControl(place?.address?.state || '');
  const { value: addressPostal, setValue: setPostal } = useFormControl(place?.address?.postal || '');
  const { value: phoneNumber, setValue: setPhoneNumber } = useFormControl(place?.phoneNumber || '');
  const { value: website, setValue: setWebsite } = useFormControl(place?.website || '');
  const { value: placeTypeId, setValue: setPlaceTypeId } = useFormControl<number>(place?.type.id || types[0].id!);

  const [busy, setBusy] = useState(false);

  const requiredFieldsHaveValues = !!placeName.trim();

  const isDirty =
    placeName.trim() !== (place?.name || '') ||
    description.trim() !== (place?.description || '') ||
    addressLine1.trim() !== (place?.address?.line1 || '') ||
    addressLine2.trim() !== (place?.address?.line2 || '') ||
    addressCity.trim() !== (place?.address?.city || '') ||
    addressState.trim() !== (place?.address?.state || '') ||
    addressPostal.trim() !== (place?.address?.postal || '') ||
    phoneNumber.trim() !== (place?.phoneNumber || '') ||
    website.trim() !== (place?.website || '') ||
    placeTypeId !== place?.type.id;

  const disableConfirmButton = !(requiredFieldsHaveValues && isDirty);

  const buildPlace = (): Place => ({
    id: place?.id,
    name: placeName!,
    type: types.find((t) => t.id === placeTypeId) || types[0],
    address: {
      line1: addressLine1,
      line2: addressLine2,
      city: addressCity,
      state: addressState,
      postal: addressPostal,
    },
    description: description,
    phoneNumber: phoneNumber,
    website: website,
  });

  return (
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-4 gap-x-4">
        <Input
          id="place-name"
          className="col-span-4 md:col-span-2"
          disabled={busy}
          type="text"
          label="Name"
          value={placeName}
          error={placeNameError}
          onBlur={validatePlaceName}
          onChange={(evt) => setPlaceName(evt.target.value)}
        />
        <Select
          id="place-type"
          className="col-span-4 md:col-span-2"
          disabled={busy}
          label="Type of place"
          value={placeTypeId}
          values={types}
          onChange={(evt) => setPlaceTypeId(+evt.target.value)}
        />
        <Description
          id="place-description"
          className="col-span-4"
          disabled={busy}
          label="Description"
          rows={3}
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
        <Input
          id="address-line-1"
          className="col-span-4"
          type="text"
          disabled={busy}
          label="Line 1"
          value={addressLine1}
          onChange={(evt) => setAddressLine1(evt.target.value)}
        />
        <Input
          id="address-line-2"
          className="col-span-4"
          type="text"
          disabled={busy}
          label="Line 2"
          value={addressLine2}
          onChange={(evt) => setAddressLine2(evt.target.value)}
        />
        <Input
          id="city"
          className="col-span-4 md:col-span-2"
          type="text"
          disabled={busy}
          label="City"
          value={addressCity}
          onChange={(evt) => setCity(evt.target.value)}
        />
        <Input
          id="state"
          className="col-span-2 md:col-span-1"
          type="text"
          disabled={busy}
          label="State / Province"
          value={addressState}
          onChange={(evt) => setState(evt.target.value)}
        />
        <Input
          id="postal-code"
          className="col-span-2 md:col-span-1"
          type="text"
          disabled={busy}
          label="Postal Code"
          value={addressPostal}
          onChange={(evt) => setPostal(evt.target.value)}
        />
        <Input
          id="phone-number"
          className="col-span-4"
          type="text"
          disabled={busy}
          label="Phone Number"
          value={phoneNumber}
          onChange={(evt) => setPhoneNumber(evt.target.value)}
        />
        <Input
          id="website"
          className="col-span-4"
          type="text"
          disabled={busy}
          label="Website"
          value={website}
          onChange={(evt) => setWebsite(evt.target.value)}
        />
      </div>
      <div className="flex flow-row gap-8 justify-end mt-4">
        <button className="btn" disabled={busy} onClick={() => onCancel()}>
          Cancel
        </button>
        <button
          className="btn btn-primary min-w-24"
          disabled={disableConfirmButton || busy}
          onClick={() => {
            setBusy(true);
            const place = buildPlace();
            onConfirm(place);
          }}
        >
          {busy ? BusyIndicator : place ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default PlaceEditor;
