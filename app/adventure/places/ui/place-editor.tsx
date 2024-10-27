'use client';

import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import Select from '@/app/ui/select';
import { useInputValidation } from '@/hooks/use-input-validation';
import { Place, PlaceType } from '@/models';
import { isRequired } from '@/utils/input-validations';
import { useState } from 'react';

export interface PlaceEditorProps {
  types: Array<PlaceType>;
  onConfirm: (place: Place) => void;
  onCancel: () => void;
}

const PlaceEditor = ({ types, onConfirm, onCancel }: PlaceEditorProps) => {
  const {
    value: placeName,
    error: placeNameError,
    touched: placeNameTouched,
    handleChange: handlePlaceNameChange,
    handleBlur: handlePlaceNameBlur,
  } = useInputValidation((value: string) => isRequired(value, 'Name'));

  const [description, setDescription] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postal, setPostal] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [placeTypeId, setPlaceTypeId] = useState<number>();

  const disableButton = !!placeNameError;

  const buildPlace = (): Place => ({
    name: placeName.trim(),
    type: types.find((t) => t.id === placeTypeId) || types[0],
    address: {
      line1: addressLine1.trim() || null,
      line2: addressLine2.trim() || null,
      city: city.trim() || null,
      state: state.trim() || null,
      postal: postal.trim() || null,
    },
    description: description.trim() || null,
    phoneNumber: phoneNumber.trim() || null,
    website: website.trim() || null,
  });

  return (
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-4 gap-x-4">
        <Input
          id="place-name"
          className="col-span-4 md:col-span-3"
          type="text"
          label="Name"
          value={placeName}
          error={placeNameTouched ? placeNameError : ''}
          onBlur={handlePlaceNameBlur}
          onChange={(evt) => handlePlaceNameChange(evt.target.value)}
        />
        <Select
          id="place-type"
          className="col-span-4 md:col-span-1"
          label="Type of place"
          value={placeTypeId}
          values={types}
          onChange={(evt) => setPlaceTypeId(+evt.target.value)}
        />
        <Description
          id="place-description"
          className="col-span-4"
          label="Description"
          rows={3}
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
        <Input
          id="address-line-1"
          className="col-span-4"
          type="text"
          label="Line 1"
          value={addressLine1}
          onChange={(evt) => setAddressLine1(evt.target.value)}
        />
        <Input
          id="address-line-2"
          className="col-span-4"
          type="text"
          label="Line 2"
          value={addressLine2}
          onChange={(evt) => setAddressLine2(evt.target.value)}
        />
        <Input
          id="city"
          className="col-span-4 md:col-span-2"
          type="text"
          label="City"
          value={city}
          onChange={(evt) => setCity(evt.target.value)}
        />
        <Input
          id="state"
          className="col-span-2 md:col-span-1"
          type="text"
          label="State / Province"
          value={state}
          onChange={(evt) => setState(evt.target.value)}
        />
        <Input
          id="postal-code"
          className="col-span-2 md:col-span-1"
          type="text"
          label="Postal Code"
          value={postal}
          onChange={(evt) => setPostal(evt.target.value)}
        />
        <Input
          id="phone-number"
          className="col-span-4"
          type="text"
          label="Phone Number"
          value={phoneNumber}
          onChange={(evt) => setPhoneNumber(evt.target.value)}
        />
        <Input
          id="website"
          className="col-span-4"
          type="text"
          label="Website"
          value={website}
          onChange={(evt) => setWebsite(evt.target.value)}
        />
      </div>
      <div className="flex flow-row gap-8 justify-end mt-4">
        <button className="btn" onClick={() => onCancel()}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          disabled={disableButton}
          onClick={() => {
            const place = buildPlace();
            onConfirm(place);
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default PlaceEditor;
