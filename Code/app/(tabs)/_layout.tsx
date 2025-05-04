import React from 'react';
import { SafeAreaView, StatusBar, Platform, StyleSheet, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUp';
import HomeScreen from './HomeScreen';
import AddLibraryScreen from './AddLibraryScreen';
import LibraryView from './LibraryView';
import BookDetailsScreen from './BookDetailsScreen';

const Stack = createNativeStackNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Set translucent status bar so it overlays, and we manage spacing manually */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />

      <View style={styles.container}>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddLibrary" component={AddLibraryScreen} />
          <Stack.Screen name="Library" component={LibraryView} />
          <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Optional: match your app background
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
