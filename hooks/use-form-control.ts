import { useState } from 'react';

export const useFormControl = <T>(initialValue?: T | undefined, validations?: (val: T | undefined) => string) => {
  const [value, setValue] = useState<T | undefined>(initialValue);
  const [dirty, setDirty] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(validations && validations(initialValue));

  const handleChange = (inputValue: T | undefined) => {
    setDirty(true);
    setValue(inputValue);
    setError(validations && validations(inputValue));
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return { value, dirty, error, touched, handleBlur, handleChange };
};
