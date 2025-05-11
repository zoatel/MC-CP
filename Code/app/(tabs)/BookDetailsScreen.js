import { useState, useEffect } from "react";
import { BookDetailUI } from "../../components/BookDetailUI";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { db } from "../../components/firebase";
import { doc, getDoc } from "firebase/firestore";

function BookDetailsScreen() {
  const route = useRoute();
  const { bookId, title, author, category } = route.params; // Get bookId from navigation
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookDoc = await getDoc(doc(db, "books", bookId));
        if (bookDoc.exists()) {
          setBook({ id: bookDoc.id, ...bookDoc.data() });
        } else {
          setError("No book details found");
        }
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text>{error}</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text>No book details available</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }} // Ensure the ScrollView background is white
      contentContainerStyle={{ flexGrow: 1 }} // Ensure content fills the ScrollView
    >
      <BookDetailUI book={book} />
    </ScrollView>
  );
}

export default BookDetailsScreen;
