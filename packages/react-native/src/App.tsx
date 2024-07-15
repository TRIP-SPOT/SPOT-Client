import { Button } from 'design-system';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function App(): React.JSX.Element {
  const [state, setState] = useState(1);

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
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text className="text-white">
          Open up App.js to start working on your app!
          {state}
        </Text>
        <TouchableOpacity onPress={() => setState((prev) => prev + 1)}>
          <Text>Click Me!</Text>
        </TouchableOpacity>
        <Button text="응애2" onPress={() => setState((prev) => prev + 1)} />
      </LinearGradient>
    </LinearGradient>
  );
}

export default App;
