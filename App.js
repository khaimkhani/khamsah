
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home.js';
import Intro from './components/Intro.js';
import { useEffect, useState, createContext } from 'react';
import Settings from './components/Settings.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CityContext = createContext();

export default function App() {
  
  const [firstTime, setFirstTime] = useState(true);
  const [city, setCity] = useState('');

  useEffect(async () => {
    setFirstTime(checkFirstTime());
    console.log(firstTime);
    console.log(AsyncStorage.getItem('currCity'))
  }, []);

  const checkFirstTime = async () => {
    try {
      await AsyncStorage.getItem("currCity").then(
        (res) => {
          if (res == null) {
            return false;
          } else {
            setCity(res);
            return true;
          }
        }
      ).catch(
        (e) => {throw new Error('Failed to resolve AsyncStorage Promise')}
      );
      
    } catch(e) {
      throw new Error('Cannot access AsyncStorage');
    }
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <CityContext.Provider value={city}>
        { firstTime ?
        <Intro setCity={setCity} setTimeInst={setFirstTime} /> :
        <Stack.Navigator initialRouteName = 'Home' screenOptions={{headerShown: false}}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Settings' component={Settings} />
        </Stack.Navigator>
        }
      </CityContext.Provider>
    </NavigationContainer>
  );
}


