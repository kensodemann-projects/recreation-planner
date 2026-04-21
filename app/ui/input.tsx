'use client';

import { ComponentPropsWithoutRef } from 'react';

interface InputProperties extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string | undefined;
}

const Input = ({ label, className, error, ...props }: InputProperties) => {
  return (
    <div className={className}>
      <label className="floating-label">
        <span>{label}</span>
        <input {...props} className={`input input-md w-full ${error ? 'input-error' : null}`} placeholder={label} />
      </label>
      <div className="text-error text-sm pb-2">{error ? error : '\u00A0'}</div>
    </div>
  );
};

export default Input;
