import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

const BookItem = ({ book }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={commonStyles.bookItem}
      onPress={() =>
        navigation.navigate('BookDetails', {
          title: book.title,
          author: book.author,
          category: book.category,
        })
      }
    >
      <Image source={{ uri: book.photo }} style={commonStyles.bookImage} />
      <Text style={commonStyles.bookTitle}>{book.title}</Text>
      <Text style={commonStyles.normalText}>{book.author}</Text>
      <Text style={commonStyles.normalText}>{book.category}</Text>
    </TouchableOpacity>
  );
};

export default BookItem;

