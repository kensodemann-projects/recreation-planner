'use client';

import { FocusEventHandler, ChangeEventHandler, ComponentPropsWithoutRef } from 'react';

interface InputProperties extends ComponentPropsWithoutRef<'input'> {
  id: string;
  type: string;
  label: string;
  value: string | number | undefined;
  className?: string | undefined;
  error?: string | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

const Input = ({ id, type, label, value, className, error, onBlur, onChange, ...props }: InputProperties) => {
  return (
    <label className={`floating-label ${className}`}>
      <span>{label}</span>
      <input
        id={id}
        type={type}
        className={`input input-md w-full ${error ? 'input-error' : null}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
        {...props}
      />
      {error ? <div className="label-text-alt text-error">{error}</div> : <div className="label-text-alt">&nbsp;</div>}
    </label>
  );
};

export default Input;
