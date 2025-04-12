import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { books } from '../../data/booksData'; // Import mock data
import BookItem from '../../components/BookItem';
import { commonStyles } from '../../styles/commonStyles';

const SavedTab = () => {
  const savedBooks = books.filter(book => book.reserved);

  return (
    <View style={commonStyles.tabContainer}>
      {savedBooks.length > 0 ? (
        <FlatList
          data={savedBooks}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({ item }) => <BookItem book={item} />}
        />
      ) : (
        <Text>No books saved yet.</Text>
      )}
    </View>
  );
};

export default SavedTab;
