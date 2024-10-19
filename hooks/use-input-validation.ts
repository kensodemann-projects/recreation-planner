import { useState } from 'react';

export const useInputValidation = (validations: (val: string) => string) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(validations(''));

  const handleChange = (inputValue: string) => {
    setValue(inputValue);
    setError(validations(inputValue));
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validations(value));
  };

  return { value, error, touched, handleBlur, handleChange };
};
