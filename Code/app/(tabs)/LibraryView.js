import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BooksTab from './BooksTab';
import SavedTab from './SavedTab';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const LibraryView = ({ route }) => {
  const { libraryName } = route.params;

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Books"
        children={() => <BooksTab libraryName={libraryName} />}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        children={() => <SavedTab libraryName={libraryName} />}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookmark" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default LibraryView;


