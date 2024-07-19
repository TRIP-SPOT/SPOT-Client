import { Button, Font } from 'design-system';
import { Text, View } from 'react-native';
import { returnedResults } from 'reanimated-color-picker';
import { useState } from 'react';
import tinycolor from 'tinycolor2';
import { useRoute } from '@react-navigation/native';
import { SignupRouteProps, SignupStackNavigation } from '@/types/navigation';
import Overlay from '@/components/signup/common/Overlay';
import Header from '@/components/signup/common/Header';
import {
  NICKNAME_COLOR_SET,
  NicknameColorSet,
} from '@/constants/NICKNAME_COLOR_SET';
import NicknameColorPalette from '@/components/signup/nicknameProfile/NicknameColorPalette';
import ColorSlider from '@/components/signup/nicknameProfile/ColorSlider';

interface NicknameProfileProps {
  navigation: SignupStackNavigation<'Signup/NicknameProfile'>;
}

export default function NicknameProfile({ navigation }: NicknameProfileProps) {
  const route = useRoute<SignupRouteProps<'Signup/NicknameProfile'>>();
  const { nickname } = route.params;
  const [selectColor, setSelectColor] = useState(NICKNAME_COLOR_SET[0]);
  const [selectedPalette, setSelectedPalette] = useState<NicknameColorSet>(
    NICKNAME_COLOR_SET[0],
  );

  const onSelectColor = ({ hex }: returnedResults) => {
    setSelectColor(hex);
  };

  const onChangeSelectedBarColor = (color: NicknameColorSet) => {
    setSelectColor(color);
    setSelectedPalette(color);
  };

  const getFontColor = () => {
    const textColor = tinycolor(selectColor);
    return textColor.darken(25).toHexString();
  };

  const handleNext = () => {
    navigation.navigate('Main');
  };

  return (
    <Overlay>
      <View className="flex-col flex justify-between items-center w-full h-full">
        <Header
          onBack={() => navigation.goBack()}
          onCancel={() => navigation.goBack()}
        />
        <View>
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
              className="w-[160px] h-[160px] rounded-full justify-center items-center"
              style={{
                backgroundColor: selectColor,
              }}
            >
              <Text
                className="font-Pretendard-Medium text-[40px]"
                style={{
                  color: getFontColor(),
                }}
              >
                {nickname}
              </Text>
            </View>
          </View>

          <View className="mt-[40px]">
            <NicknameColorPalette
              selectedPalette={selectedPalette}
              changeSelectedPalette={onChangeSelectedBarColor}
            />
          </View>

          <View className="mt-[64px]">
            <ColorSlider baseColor={selectedPalette} onChange={onSelectColor} />
          </View>
        </View>

        <View className="w-full">
          <Button onPress={handleNext}>
            <Font.Bold type="body2" color="white">
              다음
            </Font.Bold>
          </Button>
        </View>
      </View>
    </Overlay>
  );
}
