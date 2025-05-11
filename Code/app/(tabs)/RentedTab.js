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
    if (!userId) {
      console.log("No user ID found, skipping Firestore subscription.");
      setRentedBooks([]);
      return;
    }

    const unsubscribe = onSnapshot(
      collection(doc(db, "users", userId), "userRented"),
      async (snapshot) => {
        try {
          const rentedBookIds = snapshot.docs.map((doc) => doc.data().bookId);
          console.log("Rented book IDs:", rentedBookIds);

          if (rentedBookIds.length === 0) {
            setRentedBooks([]);
            return;
          }

          const bookPromises = rentedBookIds.map(async (bookId, index) => {
            try {
              const bookDoc = await getDoc(doc(db, "books", bookId));
              if (bookDoc.exists()) {
                return { id: bookDoc.id, ...bookDoc.data() };
              } else {
                console.warn(`Book with ID ${bookId} not found.`);
                return null;
              }
            } catch (error) {
              console.error(`Error fetching book ${bookId}:`, error);
              return null;
            }
          });

          const booksData = (await Promise.all(bookPromises)).filter(Boolean);
          console.log("Fetched books data:", booksData);

          // Ensure unique IDs by checking for duplicates
          const uniqueBooks = booksData.reduce((acc, book) => {
            if (!acc.some((b) => b.id === book.id)) {
              acc.push(book);
            } else {
              console.warn(`Duplicate book ID found: ${book.id}`);
            }
            return acc;
          }, []);

          setRentedBooks(uniqueBooks);
        } catch (error) {
          console.error("Error processing rented books snapshot:", error);
          setRentedBooks([]);
        }
      },
      (error) => {
        console.error("Firestore snapshot error:", error);
        setRentedBooks([]);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const renderItem = ({ item }) => {
    if (!item || !item.id) {
      console.warn("Invalid book item:", item);
      return null;
    }
    return <BookItem book={item} />;
  };

  return (
    <View style={[commonStyles.tabContainer, styles.container]}>
      {rentedBooks.length > 0 ? (
        <FlatList
          data={rentedBooks}
          keyExtractor={(item, index) =>
            item.id ? `${item.id}-${index}` : `index-${index}`
          }
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.noBooksText}>No books available.</Text>
          }
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
    backgroundColor: "#F5F5F5",
    paddingBottom: 0,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center", // Center items horizontally
  },
  noBooksText: {
    fontSize: 16,
    color: "#4A4A4A",
    textAlign: "center",
    marginTop: 20,
  },
});

export default RentedTab;
