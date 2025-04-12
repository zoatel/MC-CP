import React from 'react';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen  from './SignInScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Pacifico-Regular': require('../../assets/fonts/pacifico/Pacifico-Regular.ttf'),
    'Roboto': require('../../assets/fonts/reboto/Roboto-VariableFont_wdth,wght.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
  );
}

