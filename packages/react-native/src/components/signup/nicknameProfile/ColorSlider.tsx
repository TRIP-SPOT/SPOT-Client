import ColorPicker, {
  returnedResults,
  SaturationSlider,
} from 'reanimated-color-picker';
import { NicknameColorSet } from '@/constants/NICKNAME_COLOR_SET';

interface ColorSliderProps {
  baseColor: NicknameColorSet;
  onChange: ({ hex }: returnedResults) => void;
}

export default function ColorSlider({ baseColor, onChange }: ColorSliderProps) {
  return (
    <ColorPicker
      style={{
        flex: 1,
      }}
      value={baseColor}
      onChange={onChange}
    >
      <SaturationSlider
        reverse
        style={{
          borderRadius: 50,
          height: 36,
        }}
      />
    </ColorPicker>
  );
}
