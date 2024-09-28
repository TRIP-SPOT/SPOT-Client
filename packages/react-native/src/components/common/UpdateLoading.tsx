import { SafeAreaView, View } from 'react-native';
import { Font } from 'design-system';
import LinearGradient from 'react-native-linear-gradient';
import { Bar } from 'react-native-progress';
import SPOTLogo from '@/assets/SPOTLogo';

interface UpdateLoadingProps {
  isRecent?: boolean;
  downloadProgress: number;
}

export default function UpdateLoading({
  isRecent,
  downloadProgress,
}: UpdateLoadingProps) {
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
        <SafeAreaView className="flex-1 justify-center items-center gap-1 flex-col">
          <View>
            <SPOTLogo />
          </View>

          {typeof isRecent === 'undefined' ? null : (
            <View className="flex-col justify-center items-center gap-2">
              <View>
                <Font.Bold type="body1" color="white">
                  최신 버전으로 업데이트중이에요...!
                </Font.Bold>
              </View>
              <View>
                <Bar progress={downloadProgress} width={200} color="#751010" />
              </View>
            </View>
          )}
        </SafeAreaView>
      </LinearGradient>
    </LinearGradient>
  );
}
