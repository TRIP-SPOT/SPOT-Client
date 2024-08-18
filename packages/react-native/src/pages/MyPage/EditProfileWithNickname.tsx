import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button, Font } from 'design-system';
import { MyPageRouteProps, MyPageStackNavigation } from '@/types/navigation';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import NicknameColorPalette from '@/components/signup/nicknameProfile/NicknameColorPalette';
import ColorSlider from '@/components/signup/nicknameProfile/ColorSlider';
import useColorPalette from '@/hooks/useColorPalette';
import Header from '@/components/common/Header';

interface EditProfileWithNicknameProps {
  navigation: MyPageStackNavigation<'myPage/editProfileWithNickname'>;
}

export default function EditProfileWithNickname({
  navigation,
}: EditProfileWithNicknameProps) {
  const route = useRoute<MyPageRouteProps<'myPage/editProfileWithNickname'>>();
  const { nickname } = route.params;
  const {
    selectedColor,
    selectedPalette,
    onSelectColor,
    onChangeSelectedBarColor,
    textColor,
  } = useColorPalette();

  return (
    <>
      <BackGroundGradient>
        <Header title="배경 색상 선택" />
        <View className="p-4 pt-14">
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
      </BackGroundGradient>

      <View className="bottom-16">
        <Button onPress={() => navigation.goBack()}>
          <Font.Bold type="title1" color="white">
            완료
          </Font.Bold>
        </Button>
      </View>
    </>
  );
}
