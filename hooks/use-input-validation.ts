import { useState } from 'react';

export const useInputValidation = (validations: (val: string) => string) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (inputValue: string) => {
    setValue(inputValue);
    if (touched) {
      setError(validations(inputValue));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validations(value));
  };

  return { value, error, handleBlur, handleChange };
};
