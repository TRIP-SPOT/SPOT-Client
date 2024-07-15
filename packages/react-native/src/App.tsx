import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function App(): React.JSX.Element {
  return (
    <LinearGradient
      colors={['#FF1919', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.3 }}
      className="w-screen h-screen"
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.75)', 'rgba(0, 0, 0, 0.75)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          flex: 1,
          padding: 16,
        }}
      >
        <View className="w-full top-20">
          <Text className="font-pr text-white font-[400] text-[22px] leading-[30px]">
            {/* TODO: 실제 사용자 이름 넣기 */}
            안녕하세요, 아무개님.
          </Text>
          <Text className="font-pr text-white font-[400] text-[22px] leading-[30px]">
            오늘은 어디로 가 볼까요?
          </Text>
        </View>
      </LinearGradient>
    </LinearGradient>
  );
}

export default App;
