import { useState } from 'react';

export default function useToggle(defaultValue?: boolean) {
  const [value, setValue] = useState(defaultValue || false);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  return [value, toggle] as [boolean, () => void];
}
