import { SafeAreaView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';

export default function BackGroundGradient({
  children,
  paddingTop = 0,
  withoutScroll = false,
}: {
  children: React.ReactNode;
  paddingTop?: number;
  withoutScroll?: boolean;
}) {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const defaultPaddingTop =
    headerHeight - insets.top > 0
      ? headerHeight - insets.top + paddingTop
      : paddingTop;

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
          {withoutScroll ? (
            <View
              className="flex-1"
              style={{
                marginTop: defaultPaddingTop,
              }}
            >
              {children}
            </View>
          ) : (
            <NestableScrollContainer
              showsVerticalScrollIndicator={false}
              className="flex-1"
              style={{
                marginTop: defaultPaddingTop,
              }}
            >
              {children}
            </NestableScrollContainer>
          )}
        </SafeAreaView>
      </LinearGradient>
    </LinearGradient>
  );
}
