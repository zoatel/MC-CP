import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { commonStyles } from '../styles/commonStyles';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <View style={commonStyles.searchContainer}>
    <TextInput
      style={commonStyles.searchInput}
      placeholder="Search for a book, author, or category"
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
    <TouchableOpacity style={commonStyles.searchIcon} onPress={() => alert('Searching...')}>
      <Icon name="search" size={20} color="#888" />
    </TouchableOpacity>
  </View>
);

export default SearchBar;
