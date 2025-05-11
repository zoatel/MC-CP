import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const BookItem = ({ book, libraryId }) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const cardWidth = (width - 40) / 2;
  const aspectRatio = 0.8;

  return (
    <TouchableOpacity
      style={[styles.bookItem, { width: cardWidth }]}
      onPress={() =>
        navigation.navigate("BookDetails", {
          libraryId: libraryId,
          bookId: book.id,
          title: book.title,
          author: book.author,
          category: book.category,
        })
      }
    >
      <Image
        source={{ uri: book.cover }}
        style={[
          styles.bookCover,
          { width: "100%", height: cardWidth / aspectRatio },
        ]}
        resizeMode="cover"
        defaultSource={require("../assets/images/placeholder-image.png")}
      />
      <Text style={styles.bookTitle} numberOfLines={1}>
        {book.title}
      </Text>
      <Text style={styles.author} numberOfLines={1}>
        {book.author}
      </Text>
      <Text style={styles.category} numberOfLines={1}>
        {book.genre}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    margin: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  bookCover: {
    borderRadius: 8,
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "center",
  },
  author: {
    fontSize: 14,
    color: "#4A4A4A",
    textAlign: "center",
  },
  category: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default BookItem;
