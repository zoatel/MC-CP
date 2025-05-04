import { useBookDetails } from '../../hooks/useBookDetails';
import { BookDetailUI, CustomHeader } from '../../components/BookDetailUI';
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useRoute } from '@react-navigation/native';


function BookDetailsScreen() {
  const route = useRoute();
  const title = route.params.title;
  const author = route.params.author;
  const category = route.params.category;

  const bookId = "fake";
  const { book, loading } = useBookDetails(bookId, title, author, category);
  
  if (loading) {
    return (
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (book == null) {
  return <Text>No book details available</Text>;
}
   return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <BookDetailUI book={book} />
    </ScrollView>
  );

}

export default BookDetailsScreen; 
