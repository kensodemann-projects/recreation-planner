'use client';

import { FocusEventHandler, ChangeEventHandler } from 'react';

const ValidatedInput = ({
  id,
  type,
  label,
  value,
  error,
  onBlur,
  onChange,
}: {
  id: string;
  type: string;
  label: string;
  value: string;
  error?: string | undefined;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <div className="label-text">{label}</div>
      </div>
      <input
        id={id}
        type={type}
        className={`input input-bordered ${error ? 'input-error' : null}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? <div className="label-text-alt text-error">{error}</div> : <div className="label-text-alt">&nbsp;</div>}
    </label>
  );
};

export default ValidatedInput;
