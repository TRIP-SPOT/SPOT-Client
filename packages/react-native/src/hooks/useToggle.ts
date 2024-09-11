import { useState } from 'react';

export default function useToggle(defaultValue?: boolean) {
  const [value, setValue] = useState(defaultValue || false);

  const toggle = (inputValue?: boolean) => {
    if (typeof inputValue === 'undefined') return setValue((prev) => !prev);
    return setValue(inputValue);
  };

  return [value, toggle] as [boolean, (inputValue?: boolean) => void];
}
