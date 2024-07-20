import { ReactNode } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Overlay({ children }: { children: ReactNode }) {
  return (
    <LinearGradient
      colors={['#FF1919', '#000000']}
      start={{ x: 0, y: -0.6 }}
      end={{ x: 0, y: 0.3 }}
    >
      <SafeAreaView className="w-full h-full items-center p-4 flex">
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
}
