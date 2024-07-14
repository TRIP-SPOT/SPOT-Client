/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Button } from 'design-system';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
    </View>
  );
}

export default App;
