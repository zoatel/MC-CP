import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar, StyleSheet, Platform, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import BooksTab from "./BooksTab";
import RentedTab from "./RentedTab";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const LibraryView = () => {
  const route = useRoute();
  const { libraryId, libraryName } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={false}
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E5E5E5",
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
    </View>
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
