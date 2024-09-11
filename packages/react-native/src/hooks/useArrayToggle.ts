import { useState } from 'react';

type Primitive = string | number | boolean | symbol | null | undefined;

type ToggleItem<T> = T extends Primitive
  ? (item: T) => void
  : (item: T, diffProperty: keyof T) => void;

function useArrayToggle<T>() {
  const [list, setList] = useState<T[]>([]);

  const toggleItem: ToggleItem<T> = ((item: T, diffProperty?: keyof T) => {
    setList((prev) => {
      if (diffProperty) {
        const itemExists = prev.some(
          (prevItem) => prevItem[diffProperty] === item[diffProperty],
        );
        if (itemExists) {
          return prev.filter(
            (prevItem) => prevItem[diffProperty] !== item[diffProperty],
          );
        }
      }

      const itemExists = prev.includes(item);
      if (itemExists) {
        return prev.filter((prevItem) => prevItem !== item);
      }

      return [...prev, item];
    });
  }) as ToggleItem<T>;

  return { list, toggleItem };
}

export default useArrayToggle;
