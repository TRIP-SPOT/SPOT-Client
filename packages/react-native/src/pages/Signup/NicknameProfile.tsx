import { Button, Font } from 'design-system';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SignupRouteProps, SignupStackNavigation } from '@/types/navigation';
import Overlay from '@/components/signup/common/Overlay';
import NicknameColorPalette from '@/components/signup/nicknameProfile/NicknameColorPalette';
import ColorSlider from '@/components/signup/nicknameProfile/ColorSlider';
import useColorPalette from '@/hooks/useColorPalette';
import SignupHeader from '@/components/signup/common/Header';

interface NicknameProfileProps {
  navigation: SignupStackNavigation<'Signup/NicknameProfile'>;
}

export default function NicknameProfile({ navigation }: NicknameProfileProps) {
  const route = useRoute<SignupRouteProps<'Signup/NicknameProfile'>>();
  const { nickname } = route.params;
  const {
    selectedColor,
    selectedPalette,
    onSelectColor,
    onChangeSelectedBarColor,
    textColor,
  } = useColorPalette();

  const handleNext = () => {
    navigation.navigate('Main');
  };

  return (
    <Overlay>
      <View className="flex-col flex justify-between items-center w-full h-full">
        <SignupHeader
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
              className="w-40 h-40 rounded-full justify-center items-center"
              style={{
                backgroundColor: selectedColor,
              }}
            >
              <Text
                className="font-Pretendard-Medium text-[40px]"
                style={{
                  color: textColor,
                }}
              >
                {nickname}
              </Text>
            </View>
          </View>

          <View className="mt-8">
            <NicknameColorPalette
              selectedPalette={selectedPalette}
              changeSelectedPalette={onChangeSelectedBarColor}
            />
          </View>

          <View className="mt-8">
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
