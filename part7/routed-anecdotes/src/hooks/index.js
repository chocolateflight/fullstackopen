import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onReset = () => {
    setValue('');
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    inputs: {
      type,
      value,
      onChange,
    },
    onReset,
  };
};
