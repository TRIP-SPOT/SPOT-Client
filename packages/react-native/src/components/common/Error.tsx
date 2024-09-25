import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Font } from 'design-system';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigation } from '@/types/navigation';

export default function Error() {
  const navigation = useNavigation<StackNavigation<'Home/Main'>>();

  return (
    <LinearGradient
      colors={['#FF1919', '#000000']}
      start={{ x: 0, y: -0.5 }}
      end={{ x: 0, y: 0.5 }}
      className="h-full"
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.4)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="h-full"
      >
        <SafeAreaView className="flex-1">
          <View className="flex-1" style={{}}>
            <View className="flex-1 justify-center items-center">
              <Font.Bold type="body2" color="white">
                오류가 발생했어요.
              </Font.Bold>
              <Font.Bold type="body2" color="white">
                잠시 뒤에 시도해볼까요?
              </Font.Bold>
              <TouchableOpacity
                className="bg-Button-red rounded-xl px-4 py-2 mt-4"
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Splash' }],
                  })
                }
              >
                <Font type="body2" color="white">
                  새로고침
                </Font>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </LinearGradient>
  );
}
