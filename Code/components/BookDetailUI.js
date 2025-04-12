import { commonStyles } from '@/styles/commonStyles';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';


/** 
 * BookHeader component displays the book cover and basic info.
 */
function BookHeader({ book }) {
  return (
    <View style={styles.headerSection}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: book.cover}}
          style={styles.bookCover}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bookInfoContainer}>
        <Text style={commonStyles.bookTitle}>{book.title}</Text>
        <Text style={commonStyles.subHeaderNoCenter}>By {book.author}</Text>
        <Text style={commonStyles.subHeaderNoCenter}>{book.genre}</Text>
        {/* Example of an availability text */}
        {book.available ? 
          <Text style={styles.available}>Available | {book.copiesLeft} copies left</Text>:
            <View>
           <Text style={styles.notavailable}>Not Available</Text>
           <Text style={styles.notavailable}>{book.queue} in queue</Text>
           </View>}
      </View>
    </View>
  );
}

/**
 * BookDetails component displays additional information about the book.
 */
function BookDetails({ book }) {
  return (
    <View style={styles.bookDetailsContainer}>
      <Text style={commonStyles.normalText}>Book Details</Text>
      <Text style={commonStyles.normalText}>ISBN: {book.isbn}</Text>
      <Text style={commonStyles.normalText}>Published: {book.published}</Text>
      <Text style={commonStyles.normalText}>Pages: {book.pages}</Text>
      <Text style={commonStyles.normalText}>Language: {book.language}</Text>
    </View>
  );
}

/**
 * BookDescription component displays the book's description.
 */
function BookDescription({ book }) {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={commonStyles.normalText}>Description</Text>
      <Text style={commonStyles.normalText}>{book.description}</Text>
    </View>
  );
}

/**
 * BookFooter component provides footer actions such as rental information 
 * and a button to book the item.
 */
function BookFooter() {
  return (
    <View style={styles.footer}>
      <View style={styles.rentalInfo}>
        <Text style={commonStyles.normalText}>1 Week Rental</Text>
        <Text style={commonStyles.normalText}>Return by Feb 21, 2024</Text>
      </View>
      
      <Pressable style={styles.bookButton} onPress={() => { /* Your booking logic */ }}>
        <Text style={styles.bookButtonText}>Book</Text>
      </Pressable>
    </View>
  );
}

/**
 * BookDetailUI combines all components into a single screen.
 */
export function BookDetailUI({ book }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BookHeader book={book} />
        <BookDetails book={book} />
        <BookDescription book={book} />
      </ScrollView>
      
      {/* The Footer sits outside the ScrollView and stays fixed at the bottom */}
      <BookFooter />
    </View>
  );
}

// Example styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // To ensure the content doesn't hide behind the footer
  },
  headerSection: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  imageContainer: {
    width: 120,  
    height: 180, 
    marginRight: 16,
  },
  bookCover: {
    width: '100%',
    height: '100%',
  },
  bookInfoContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  genre: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  available: {
    fontSize: 14,
    color: 'green',
  },
  notavailable: {
    fontSize: 14,
    color: 'red',
  },
  bookDetailsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  detailItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#FFF',
  },
  rentalInfo: {
    flexDirection: 'column',
  },
  rentalPeriod: {
    fontSize: 14,
    fontWeight: '600',
  },
  returnDate: {
    fontSize: 12,
    color: '#777',
  },
  bookButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
