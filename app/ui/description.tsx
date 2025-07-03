'use client';

import { ComponentPropsWithoutRef } from 'react';

interface DescriptionProperties extends ComponentPropsWithoutRef<'textarea'> {
  label: string;
  error?: string | undefined;
}

const Description = ({ label, className, error, ...props }: DescriptionProperties) => {
  return (
    <label className={`floating-label ${className}`}>
      <span className="label">{label}</span>
      <textarea
        {...props}
        className={`textarea textarea-bordered w-full ${error ? 'textarea-error' : null}`}
        placeholder={label}
      />
      <div className="text-error text-sm pb-2">{error ? error : '\u00A0'}</div>
    </label>
  );
};

export default Description;
