import { useBookDetails } from '../../hooks/useBookDetails';
import { BookDetailUI, CustomHeader } from '../../components/BookDetailUI';
import { View, Text, ActivityIndicator, ScrollView } from "react-native";

function BookDetailsScreen() {
  // const route = useRoute();
  // const { bookId, userId } = route.params;
  const bookId = "fake";
  const { book, loading } = useBookDetails(bookId);
  
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
