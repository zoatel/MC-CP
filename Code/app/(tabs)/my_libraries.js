import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import AddLibraryScreen from './AddLibraryScreen';
import { Ionicons } from '@expo/vector-icons';

import { DefaultTheme } from '@react-navigation/native';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff', // Force light mode background
    card: '#fff',
    text: '#333',
  },
};
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = route.name === 'Home' ? 'home' : 'person';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
    </Tab.Navigator>
  );
}

export default function my_libraries() {
  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="AddLibrary" component={AddLibraryScreen} options={{ title: "Add Library" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
