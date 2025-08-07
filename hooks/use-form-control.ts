import { useState } from 'react';

export const useFormControl = <T>(initialValue: T, validations?: (val: T) => string) => {
  const [value, setValueInternal] = useState<T>(initialValue);
  const [error, setError] = useState<string | undefined>();

  const setValue = (inputValue: T) => {
    setValueInternal(inputValue);
    setError(validations && validations(inputValue));
  };

  const validate = () => {
    setError(validations && validations(value));
  };

  return { value, error, setValue, validate };
};
