import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BooksTab from "./BooksTab";
import RentedTab from "./RentedTab";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const LibraryView = ({ route }) => {
  const { libraryId, libraryName } = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#fff" },
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
            <MaterialCommunityIcons name="book-open" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default LibraryView;
