'use client';

import { ComponentPropsWithoutRef, useState } from 'react';
import Input from './input';

interface PasswordInputProperties extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string | undefined;
}

const PasswordInput = ({ label = 'Password', error, ...props }: PasswordInputProperties) => {
  const [visible, setVisible] = useState(false);

  console.log('PasswordInput rendering:', props.type, 'visible:', visible);

  return (
    <div className="relative">
      <Input
        label={label}
        error={error}
        type={visible ? 'text' : 'password'}
        {...props}
        className="pr-12" // Add padding for the icon button
      />
      <button
        type="button"
        tabIndex={-1}
        className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? (
          // Eye-off SVG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.02.152-2.004.437-2.925M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ) : (
          // Eye SVG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
