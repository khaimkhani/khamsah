
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home.js';
import { useEffect } from 'react';
import Settings from './components/Settings.js';
import * as Location from 'expo-location';


export default function App() {
  
  useEffect(() => {
    getLocation();
  });

  const getLocation = async () => {
    let { status } = await Location.getBackgroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission Denied');
    } else {
      let currLoc = await Location.getCurrentPositionAsync();
      console.log(currLoc);
    }

  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Home' screenOptions={{headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Settings' component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

