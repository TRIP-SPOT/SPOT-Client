import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import {
  NICKNAME_COLOR_SET,
  NicknameColorSet,
} from '@/constants/NICKNAME_COLOR_SET';

interface NicknameColorPaletteProps {
  selectedPalette: NicknameColorSet;
  changeSelectedPalette: (color: NicknameColorSet) => void;
}

export default function NicknameColorPalette({
  selectedPalette,
  changeSelectedPalette,
}: NicknameColorPaletteProps) {
  return NICKNAME_COLOR_SET.map((color) => (
    <TouchableOpacity key={color} onPress={() => changeSelectedPalette(color)}>
      <View
        className="w-[40px] h-[40px] rounded-full"
        style={{
          backgroundColor: color,
          borderColor: 'white',
          borderWidth: selectedPalette === color ? 3 : 0,
        }}
      />
    </TouchableOpacity>
  ));
}
