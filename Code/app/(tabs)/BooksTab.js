const BooksTab = ({ libraryId, libraryName }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookIds, setBookIds] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
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

  const filteredBooks = allBooks.filter(
    (book) =>
      bookIds.includes(book.id) &&
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <BookItem book={item} />}
        style={{ flex: 1, backgroundColor: "#F5F5F5" }} // Match background
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  listContent: {
    padding: 10,
    paddingBottom: 70, // Adjust to match tab bar height + buffer
  },
});

export default BooksTab;
