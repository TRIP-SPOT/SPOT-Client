import { useState } from 'react';
import tinycolor from 'tinycolor2';
import { returnedResults } from 'reanimated-color-picker';
import {
  NICKNAME_COLOR_SET,
  NicknameColorSet,
} from '@/constants/NICKNAME_COLOR_SET';

export default function useColorPalette() {
  const [selectedColor, setSelectedColor] = useState(NICKNAME_COLOR_SET[0]);
  const [selectedPalette, setSelectedPalette] = useState<NicknameColorSet>(
    NICKNAME_COLOR_SET[0],
  );

  const onSelectColor = ({ hex }: returnedResults) => {
    setSelectedColor(hex);
  };

  const onChangeSelectedBarColor = (color: NicknameColorSet) => {
    setSelectedColor(color);
    setSelectedPalette(color);
  };

  const textColor = tinycolor(selectedColor).darken(25).toHexString();

  return {
    selectedColor,
    selectedPalette,
    onSelectColor,
    onChangeSelectedBarColor,
    textColor,
  };
}
