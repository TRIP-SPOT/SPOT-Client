import { Button, Font } from 'design-system';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Overlay from '@/components/signup/common/Overlay';
import NicknameColorPalette from '@/components/signup/nicknameProfile/NicknameColorPalette';
import ColorSlider from '@/components/signup/nicknameProfile/ColorSlider';
import useColorPalette from '@/hooks/useColorPalette';
import SignupHeader from '@/components/signup/common/Header';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import { AppStorage } from '@/utils/storage';
import useNicknameColorMutation from '@/apis/mutations/useNicknameColorMutation';
import MutationLoadingModal from '@/components/common/MutationLoadingModal';

interface NicknameProfileProps {
  navigation: StackNavigation<'Signup/NicknameProfile'>;
}

export default function NicknameProfile({ navigation }: NicknameProfileProps) {
  const route = useRoute<StackRouteProps<'Signup/NicknameProfile'>>();
  const { postLoading, postMutate } = useNicknameColorMutation();
  const { nickname } = route.params;
  const {
    selectedColor,
    selectedPalette,
    onSelectColor,
    onChangeSelectedBarColor,
    textColor,
  } = useColorPalette();

  const handleNext = async () => {
    await postMutate(selectedColor);
    await AppStorage.saveData({
      key: 'nickname',
      value: {
        value: nickname,
        colorSet: {
          color: textColor,
          bgColor: selectedColor,
        },
      },
    });

    navigation.reset({ routes: [{ name: 'Main' }] });
  };

  return (
    <Overlay>
      <MutationLoadingModal isSubmiting={postLoading} />
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
