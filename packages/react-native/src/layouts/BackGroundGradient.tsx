import { SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BackGroundGradient({
  children,
  withHeader = false,
  marginTop = 0,
}: {
  children: React.ReactNode;
  withHeader?: boolean;
  marginTop?: number;
}) {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

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
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
            style={{
              marginTop: withHeader ? headerHeight - insets.top : marginTop,
            }}
          >
            {children}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </LinearGradient>
  );
}
