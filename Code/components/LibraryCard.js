import { commonStyles } from '@/styles/commonStyles';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LibraryCard = ({ title, books, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={commonStyles.bookTitle}>{title}</Text>
      <Text style={commonStyles.normalText}>{books} books</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
    borderWidth: 0,
    borderColor: '#ddd',
  },
  title: { fontWeight: 'bold', marginBottom: 4},
  books: { color: '#555' }
});

export default LibraryCard;
