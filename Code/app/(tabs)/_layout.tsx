import React from "react";
import {
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUp";
import HomeScreen from "./HomeScreen";
import AddLibraryScreen from "./AddLibraryScreen";
import LibraryView from "./LibraryView";
import BookDetailsScreen from "./BookDetailsScreen";

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  AddLibrary: undefined;
  Library: { libraryId: string; libraryName: string };
  BookDetails: {
    bookId: string;
    title: string;
    author: string;
    category: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Define a custom light theme for React Navigation
const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2563EB",
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#1A1A1A",
    border: "#E5E5E5",
    notification: "#2563EB",
  },
};

export default function TabLayout() {
  const colorScheme = "light"; // Force light mode

  return (
    <NavigationContainer theme={LightTheme}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          translucent={false} // Disable translucency to ensure the background is solid
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
        />
        <View style={styles.container}>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="AddLibrary" component={AddLibraryScreen} />
            <Stack.Screen
              name="Library"
              component={LibraryView}
              options={({ route }) => ({
                headerTitle: route.params.libraryName || "Library",
                headerStyle: {
                  backgroundColor: "#FFFFFF",
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: "#E5E5E5",
                },
                headerTintColor: "#1A1A1A",
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: "600",
                },
              })}
            />
            <Stack.Screen
              name="BookDetails"
              component={BookDetailsScreen}
              options={({ route }) => ({
                headerTitle: route.params.title || "Book Details",
                headerStyle: {
                  backgroundColor: "#FFFFFF",
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: "#E5E5E5",
                },
                headerTintColor: "#1A1A1A",
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: "600",
                },
              })}
            />
          </Stack.Navigator>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
