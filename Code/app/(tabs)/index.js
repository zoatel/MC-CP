import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "../../components/firebase";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUp";
import HomeScreen from "./HomeScreen";
import { my_libraries } from "./my_libraries";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Pacifico-Regular": require("../../assets/fonts/pacifico/Pacifico-Regular.ttf"),
    Roboto: require("../../assets/fonts/reboto/Roboto-VariableFont_wdth,wght.ttf"),
  });

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsubscribe; // Cleanup subscription
  }, []);

  if (!fontsLoaded || initializing) {
    return null; // Show nothing until fonts and auth state are loaded
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Main"
            component={my_libraries}
            options={{ headerShown: false }}
          />
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
