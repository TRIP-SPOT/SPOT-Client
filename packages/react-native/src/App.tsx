/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function App(): React.JSX.Element {
  const [state, setState] = useState(1);

  return (
    <View className="flex-1 items-center justify-center bg-blue-300">
      <Text className="text-red-300">
        Open up App.js to start working on your app!
        {state}
      </Text>
      <TouchableOpacity onPress={() => setState((prev) => prev + 1)}>
        <Text> Click Me!</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;
