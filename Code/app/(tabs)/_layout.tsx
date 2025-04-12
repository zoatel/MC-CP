import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen  from './SignInScreen';
import HomeScreen from './HomeScreen';
import AddLibraryScreen from './AddLibraryScreen';
import LibraryView from "./LibraryView";
import BookDetailsScreen from "./BookDetailsScreen";


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();
  
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="AddLibrary" component={AddLibraryScreen} />
      <Stack.Screen name="Library" component={LibraryView} />
      <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
    </Stack.Navigator>
  );
}

