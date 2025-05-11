import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import BookItem from "../../components/BookItem";
import { commonStyles } from "../../styles/commonStyles";
import { db, auth } from "../../components/firebase";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";

const RentedTab = () => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    // Fetch the user's rented books from users/{uid}/userRented
    const unsubscribe = onSnapshot(
      collection(doc(db, "users", userId), "userRented"),
      async (snapshot) => {
        const rentedBookIds = snapshot.docs.map((doc) => doc.data().bookId);
        if (rentedBookIds.length === 0) {
          setRentedBooks([]);
          return;
        }

        // Fetch the book details for each rented book
        const bookPromises = rentedBookIds.map(async (bookId) => {
          const bookDoc = await getDoc(doc(db, "books", bookId));
          return bookDoc.exists()
            ? { id: bookDoc.id, ...bookDoc.data() }
            : null;
        });

        const booksData = (await Promise.all(bookPromises)).filter(Boolean);
        setRentedBooks(booksData);
      },
      (error) => {
        console.error("Error fetching rented books:", error);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return (
    <View style={[commonStyles.tabContainer, styles.container]}>
      {rentedBooks.length > 0 ? (
        <FlatList
          data={rentedBooks}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <BookItem book={item} />}
        />
      ) : (
        <Text style={styles.noBooksText}>No books rented yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Match the background color from BooksTab
  },
  listContent: {
    padding: 10,
    paddingBottom: 20,
  },
  noBooksText: {
    fontSize: 16,
    color: "#4A4A4A",
    textAlign: "center",
    marginTop: 20,
  },
});

export default RentedTab;
