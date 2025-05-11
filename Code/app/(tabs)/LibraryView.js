import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import BooksTab from "./BooksTab";
import RentedTab from "./RentedTab";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const LibraryView = ({ route }) => {
  const { libraryId, libraryName } = route.params;

  return (
    <>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Disable the tab navigator's header
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E5E5E5",
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: "#2563EB",
          tabBarInactiveTintColor: "#6B7280",
        }}
      >
        <Tab.Screen
          name="Books"
          children={() => (
            <BooksTab libraryId={libraryId} libraryName={libraryName} />
          )}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="book" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Rented"
          children={() => <RentedTab libraryName={libraryName} />}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="book-open"
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A1A",
  },
});

export default LibraryView;
