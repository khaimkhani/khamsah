
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home.js';
import { useEffect, useState } from 'react';
import Settings from './components/Settings.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';


export default function App() {
  

  const [currCity, setCurrCity] = useState(null);
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    if (checkFirstTime()) {
      return; //remove return and add logic for first time login.
    }
  });

  const checkFirstTime = async () => {
    try {
      let val = await AsyncStorage.getItem("currCity");
      return val == null;
    } catch(e) {
      throw new Error('Cannot access AsyncStorage');
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

