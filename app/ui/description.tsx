'use client';

import { ChangeEventHandler, ComponentPropsWithoutRef, FocusEventHandler } from 'react';

interface DescriptionProperties extends ComponentPropsWithoutRef<'textarea'> {
  id: string;
  label: string;
  value: string | undefined;
  className?: string | undefined;
  error?: string | undefined;
  onBlur?: FocusEventHandler<HTMLTextAreaElement> | undefined;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
}

const Description = ({ id, label, value, className, error, onBlur, onChange, ...props }: DescriptionProperties) => {
  return (
    <label className={`floating-label ${className}`}>
      <span className="label">{label}</span>
      <textarea
        id={id}
        className={`textarea textarea-bordered w-full ${error ? 'textarea-error' : null}`}
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

export default Description;
