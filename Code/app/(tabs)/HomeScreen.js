import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import LibraryCard from "../../components/LibraryCard";
import { Ionicons } from "@expo/vector-icons";
import { commonStyles } from "@/styles/commonStyles";
import { db, auth } from "../../components/firebase";
import { collection, onSnapshot, doc, getDocs } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [libraries, setLibraries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = onSnapshot(
      collection(doc(db, "users", userId), "userLibraries"),
      async (snapshot) => {
        const userLibraryIds = snapshot.docs.map((doc) => doc.id);
        if (userLibraryIds.length > 0) {
          onSnapshot(collection(db, "libraries"), async (libSnapshot) => {
            const libraryPromises = libSnapshot.docs
              .filter((doc) => userLibraryIds.includes(doc.id))
              .map(async (libDoc) => {
                const libraryId = libDoc.id;
                const libraryData = libDoc.data();
                const booksCollectionRef = collection(
                  db,
                  "libraries",
                  libraryId,
                  "books"
                );
                const booksSnapshot = await getDocs(booksCollectionRef);
                const bookCount = booksSnapshot.docs.length;

                return {
                  id: libraryId,
                  title: libraryData.title,
                  books: bookCount,
                };
              });

            const userLibraries = await Promise.all(libraryPromises);
            setLibraries(userLibraries);
          });
        } else {
          setLibraries([]);
        }
      },
      (error) => {
        console.error("Error fetching user libraries:", error);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const filteredLibraries = libraries.filter((lib) =>
    lib.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={commonStyles.headerTitle}>My Libraries</Text>
        <Text style={commonStyles.subHeader}>
          Your subscribed libraries and collections
        </Text>

        <View style={commonStyles.searchContainer}>
          <TextInput
            placeholder="  Search libraries..."
            style={commonStyles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Ionicons name="search" size={20} color="#888" />
        </View>

        <FlatList
          data={[...filteredLibraries, { id: "add", isAddButton: true }]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.isAddButton ? (
              <TouchableOpacity
                style={styles.addCard}
                onPress={() => navigation.navigate("AddLibrary")}
              >
                <Ionicons name="add" size={32} color="#555" />
              </TouchableOpacity>
            ) : (
              <LibraryCard
                title={item.title}
                books={item.books}
                onPress={() =>
                  navigation.navigate("Library", {
                    libraryId: item.id,
                    libraryName: item.title,
                  })
                }
              />
            )
          }
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  subHeader: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 1,
    marginBottom: 16,
  },
  input: { flex: 1, height: 40 },
  list: { paddingBottom: 80 },
  addCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
