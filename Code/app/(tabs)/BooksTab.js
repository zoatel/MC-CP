import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../../components/SearchBar";
import BookItem from "../../components/BookItem";
import { commonStyles } from "../../styles/commonStyles";
import { db } from "../../components/firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";

const BooksTab = ({ libraryId, libraryName }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookIds, setBookIds] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    // Fetch book IDs from the library's books subcollection
    const unsubscribeBooks = onSnapshot(
      collection(doc(db, "libraries", libraryId), "books"),
      (snapshot) => {
        const ids = snapshot.docs.map((doc) => doc.id);
        setBookIds(ids);
      },
      (error) => {
        console.error("Error fetching library books:", error);
      }
    );

    // Fetch all books from the root books collection
    const unsubscribeAllBooks = onSnapshot(
      collection(db, "books"),
      (snapshot) => {
        const booksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllBooks(booksData);
      },
      (error) => {
        console.error("Error fetching all books:", error);
      }
    );

    return () => {
      unsubscribeBooks();
      unsubscribeAllBooks();
    };
  }, [libraryId]);

  // Filter books based on library book IDs and search query
  const filteredBooks = allBooks.filter(
    (book) =>
      bookIds.includes(book.id) &&
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <BookItem book={item} />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Soft gray background
  },
  listContent: {
    padding: 10,
    paddingBottom: 20,
  },
});

export default BooksTab;
