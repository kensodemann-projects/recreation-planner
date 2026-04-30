'use client';

import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import Select from '@/app/ui/select';
import { useForm } from '@/hooks/use-form';
import { Place, PlaceType } from '@/models';
import { isHttpUrl, isRequired } from '@/utils/input-validations';
import { useState } from 'react';

export interface PlaceEditorProps {
  types: Array<PlaceType>;
  place?: Place;
  onConfirm: (place: Place) => void;
  onCancel: () => void;
}

const PlaceEditor = ({ place, types, onConfirm, onCancel }: PlaceEditorProps) => {
  const { fields, isDirty } = useForm({
    placeName: { initialValue: place?.name || '', validate: (value: string | undefined) => isRequired(value, 'Name') },
    description: { initialValue: place?.description || '' },
    addressLine1: { initialValue: place?.address?.line1 || '' },
    addressLine2: { initialValue: place?.address?.line2 || '' },
    addressCity: { initialValue: place?.address?.city || '' },
    addressState: { initialValue: place?.address?.state || '' },
    addressPostal: { initialValue: place?.address?.postal || '' },
    phoneNumber: { initialValue: place?.phoneNumber || '' },
    website: { initialValue: place?.website || '', validate: (value: string | undefined) => isHttpUrl(value) },
    placeTypeId: { initialValue: place?.type.id || types[0].id! },
  });

  const [busy, setBusy] = useState(false);

  const requiredFieldsHaveValues = !!fields.placeName.value.trim();
  const disableConfirmButton = !(requiredFieldsHaveValues && isDirty);

  const buildPlace = (): Place => ({
    id: place?.id,
    name: fields.placeName.value,
    type: types.find((t) => t.id === fields.placeTypeId.value) || types[0],
    address: {
      line1: fields.addressLine1.value,
      line2: fields.addressLine2.value,
      city: fields.addressCity.value,
      state: fields.addressState.value,
      postal: fields.addressPostal.value,
    },
    description: fields.description.value,
    phoneNumber: fields.phoneNumber.value,
    website: fields.website.value,
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
          value={fields.placeName.value}
          error={fields.placeName.error}
          onBlur={fields.placeName.validate}
          onChange={(evt) => fields.placeName.setValue(evt.target.value)}
        />
        <Select
          id="place-type"
          className="col-span-4 md:col-span-2"
          disabled={busy}
          label="Type of place"
          value={fields.placeTypeId.value}
          values={types}
          onChange={(evt) => fields.placeTypeId.setValue(+evt.target.value)}
        />
        <Description
          id="place-description"
          className="col-span-4"
          disabled={busy}
          label="Description"
          rows={3}
          value={fields.description.value}
          onChange={(evt) => fields.description.setValue(evt.target.value)}
        />
        <Input
          id="address-line-1"
          className="col-span-4"
          type="text"
          disabled={busy}
          label="Line 1"
          value={fields.addressLine1.value}
          onChange={(evt) => fields.addressLine1.setValue(evt.target.value)}
        />
        <Input
          id="address-line-2"
          className="col-span-4"
          type="text"
          disabled={busy}
          label="Line 2"
          value={fields.addressLine2.value}
          onChange={(evt) => fields.addressLine2.setValue(evt.target.value)}
        />
        <Input
          id="city"
          className="col-span-4 md:col-span-2"
          type="text"
          disabled={busy}
          label="City"
          value={fields.addressCity.value}
          onChange={(evt) => fields.addressCity.setValue(evt.target.value)}
        />
        <Input
          id="state"
          className="col-span-2 md:col-span-1"
          type="text"
          disabled={busy}
          label="State / Province"
          value={fields.addressState.value}
          onChange={(evt) => fields.addressState.setValue(evt.target.value)}
        />
        <Input
          id="postal-code"
          className="col-span-2 md:col-span-1"
          type="text"
          disabled={busy}
          label="Postal Code"
          value={fields.addressPostal.value}
          onChange={(evt) => fields.addressPostal.setValue(evt.target.value)}
        />
        <Input
          id="phone-number"
          className="col-span-4"
          type="text"
          disabled={busy}
          label="Phone Number"
          value={fields.phoneNumber.value}
          onChange={(evt) => fields.phoneNumber.setValue(evt.target.value)}
        />
        <Input
          id="website"
          className="col-span-4"
          type="text"
          disabled={busy}
          label="Website"
          value={fields.website.value}
          error={fields.website.error}
          onBlur={fields.website.validate}
          onChange={(evt) => fields.website.setValue(evt.target.value)}
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
