import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LandingScreen from './src/screens/LandingScreen';
import AudioPlayerScreen from './src/screens/AudioPlayerScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="AudioPlayer" component={AudioPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
