import { Font } from 'design-system';
import { View } from 'react-native';
import Header from '@/components/signup/Header';
import Overlay from '@/components/signup/Overlay';
import { SignupRouteProps, SignupStackNavigation } from '@/types/navigation';
import ColorPicker, {
  OpacitySlider,
  Panel1,
  returnedResults,
  SaturationSlider,
} from 'reanimated-color-picker';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface NicknameProfileProps {
  navigation: SignupStackNavigation<'Signup/NicknameProfile'>;
  route: SignupRouteProps<'Signup/NicknameProfile'>;
}

const COLOR_SET = [
  '#F7AFAF',
  '#F7D6AF',
  '#F7F4AF',
  '#AFF7B2',
  '#AFE1F7',
  '#BEAFF7',
];

type ColorPick = (typeof COLOR_SET)[number];

export default function NicknameProfile({
  navigation,
  route,
}: NicknameProfileProps) {
  const nickname = route.params.nickname;
  const [selectColor, setSelectColor] = useState('');
  const [selectBarColor, setSelectBarColor] = useState<ColorPick>(COLOR_SET[0]);

  const onSelectColor = ({ hex }: returnedResults) => {
    setSelectColor(hex);
  };

  const onChangeSelectedBarColor = (color: ColorPick) => {
    setSelectColor(color);
    setSelectBarColor(color);
  };

  return (
    <Overlay>
      <View>
        <Header
          onBack={() => navigation.goBack()}
          onCancel={() => navigation.goBack()}
        />
        <View className="flex w-full mt-[30px]">
          <Font type="mainTitle" color="white">
            배경 색상을
          </Font>
          <Font type="mainTitle" color="white">
            선택하세요
          </Font>
        </View>
        <View className="flex justify-center items-center mt-[60px]">
          <View
            className="w-[140px] h-[140px] rounded-full justify-center items-center"
            style={{
              backgroundColor: selectColor,
            }}
          >
            <Font.Bold color="red" type="title1">
              {nickname}
            </Font.Bold>
          </View>
        </View>
        <View className="flex flex-row gap-4 justify-center items-center mt-[40px]">
          {COLOR_SET.map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => onChangeSelectedBarColor(color)}
            >
              <View
                className="w-[40px] h-[40px] rounded-full"
                style={{
                  backgroundColor: color,
                  borderColor: 'white',
                  borderWidth: selectBarColor === color ? 3 : 0,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View className="mt-[64px]">
          <ColorPicker
            style={{
              flex: 1,
            }}
            value={selectBarColor}
            onChange={onSelectColor}
          >
            <SaturationSlider
              reverse
              style={{
                borderRadius: 50,
                height: 36,
              }}
            />
          </ColorPicker>
        </View>
      </View>
    </Overlay>
  );
}
