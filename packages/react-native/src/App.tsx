/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Button } from 'design-system';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function App(): React.JSX.Element {
  const [state, setState] = useState(1);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-300">
        Open up App.js to start working on your app!
        {state}
      </Text>
      <TouchableOpacity onPress={() => setState((prev) => prev + 1)}>
        <Text> Click Me!</Text>
      </TouchableOpacity>

      <Button
        text="버튼!!!!"
        onPress={() => setState((prev) => prev + 1)}
      ></Button>

      <Text style={styles.text}>프리텐다드</Text>
      <Text className="text-2xl">그냥 글자</Text>
      <Text className="font-pb text-2xl">굵은 프리텐다드</Text>
      <Text className="font-pl text-2xl">얇은 프리텐다드</Text>
      <Text
        style={{
          fontFamily: 'Pretendard-Light',
          fontSize: 24,
        }}
      >
        얇은 프리텐다드
      </Text>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Pretendard-Medium',
  },
});
