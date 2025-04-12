import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity
} from 'react-native';
import LibraryCard from '../../components/LibraryCard';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '@/styles/commonStyles';

const HomeScreen = ({ navigation }) => {
  const [libraries, setLibraries] = useState([
    { id: '1', title: 'Fiction Library', books: 120 },
    { id: '2', title: 'Science', books: 85 },
    { id: '3', title: 'History', books: 94 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLibraries = libraries.filter((lib) =>
    lib.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={commonStyles.headerTitle}>My Libraries</Text>
      <Text style={commonStyles.subHeader}>Your subscribed libraries and collections</Text>

      <View style={commonStyles.searchContainer}>
        <TextInput
          placeholder="  Search libraries..."
          style={commonStyles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Ionicons name="search" size={20} color="#888" />
      </View>

      <FlatList
        data={[...filteredLibraries, { id: 'add', isAddButton: true }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          item.isAddButton ? (
            <TouchableOpacity
              style={styles.addCard}
              onPress={() => navigation.navigate('AddLibrary')}
            >
              <Ionicons name="add" size={32} color="#555" />
            </TouchableOpacity>
          ) : (
            <LibraryCard
              title={item.title}
              books={item.books}
              onPress={() => navigation.navigate('Library', {libraryName: item.name})}
            />
          )
        }
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff'  },
  subHeader: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 16 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    paddingHorizontal: 1, marginBottom: 16, 
  },
  input: { flex: 1, height: 40 },
  list: { paddingBottom: 80 },
  addCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default HomeScreen;
