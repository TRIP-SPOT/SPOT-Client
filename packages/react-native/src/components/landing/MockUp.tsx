import { View } from 'react-native';

export default function MockUp() {
  return (
    <View
      style={{
        width: 330,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        height: 700,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 310,
          backgroundColor: '#EAEAEC',
          borderRadius: 20,
          height: 680,
        }}
      />
    </View>
  );
}
