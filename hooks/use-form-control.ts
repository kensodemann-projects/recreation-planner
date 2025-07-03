import { useState } from 'react';

export const useFormControl = <T>(initialValue?: T | undefined, validations?: (val: T | undefined) => string) => {
  const [value, setValueInternal] = useState<T | undefined>(initialValue);
  const [error, setError] = useState<string | undefined>();

  const setValue = (inputValue: T | undefined) => {
    setValueInternal(inputValue);
    setError(validations && validations(inputValue));
  };

  const validate = () => {
    setError(validations && validations(value));
  };

  return { value, error, setValue, validate };
};
