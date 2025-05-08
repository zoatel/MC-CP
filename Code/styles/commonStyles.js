import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  // General Styles
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },

  // Header Styles
  headerTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Pacifico',
  },

  // SearchBar Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontFamily: 'SpaceMono',
  },
  normalText: {
    fontFamily: 'SpaceMono',
  },
  searchIcon: {
    padding: 8,
  },

  // BookItem Styles
  bookItem: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    fontFamily: 'Roboto',
  },
  bookImage: {
    width: 100,
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },

  // BooksTab Styles
  tabContainer: {
    flex: 1,
    backgroundColor: '#fff', // Explicitly set light mode background
    padding: 16,
  },

  subHeader: { 
    fontSize: 14, 
    color: '#888', 
    textAlign: 'center', 
    marginBottom: 16, 
    fontFamily: 'Roboto',
  },
  subHeaderNoCenter: { 
    fontSize: 14, 
    color: '#888', 
    marginBottom: 16, 
    fontFamily: 'Roboto',
  },

});
