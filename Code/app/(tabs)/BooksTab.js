import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import SearchBar from '../../components/SearchBar';
import { books } from '../../data/booksData'; // Import mock data
import BookItem from '../../components/BookItem';
import { commonStyles } from '../../styles/commonStyles';

const BooksTab = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={commonStyles.tabContainer}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        data={filteredBooks}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => 
           (
            <BookItem
            book={item}
            />
          )
      }
      />
    </View>
  );
};

export default BooksTab;
