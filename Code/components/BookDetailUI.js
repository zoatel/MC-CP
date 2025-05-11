import { useState, useEffect } from "react";
import { commonStyles } from "@/styles/commonStyles";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { db, auth } from "@/components/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

// Set up notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * BookHeader component displays the book cover and basic info.
 */
function BookHeader({ book }) {
  return (
    <View style={styles.headerSection}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: book.cover }}
          style={styles.bookCover}
          resizeMode="cover"
        />
      </View>

      <View style={styles.bookInfoContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>By {book.author}</Text>
        <Text style={styles.genre}>{book.category}</Text>
        {book.available ? (
          <Text style={styles.available}>
            Available | {book.copiesLeft} copies left
          </Text>
        ) : (
          <View>
            <Text style={styles.notAvailable}>Not Available</Text>
            <Text style={styles.notAvailable}>{book.queue} in queue</Text>
          </View>
        )}
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
      <Text style={styles.sectionTitle}>Book Details</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>ISBN:</Text>
        <Text style={styles.detailValue}>{book.isbn}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Published:</Text>
        <Text style={styles.detailValue}>{book.published}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Pages:</Text>
        <Text style={styles.detailValue}>{book.pages}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Language:</Text>
        <Text style={styles.detailValue}>{book.language}</Text>
      </View>
    </View>
  );
}

/**
 * BookDescription component displays the book's description.
 */
function BookDescription({ book }) {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.descriptionText}>{book.description}</Text>
    </View>
  );
}

/**
 * BookFooter component displays either a rent button or rental details.
 */
function BookFooter({ book, onRent, rentalDetails }) {
  if (rentalDetails) {
    const startDate = new Date(rentalDetails.startDate).toDateString();
    const endDate = new Date(rentalDetails.endDate).toDateString();
    return (
      <View style={styles.footer}>
        <View style={styles.rentalInfoContainer}>
          <Text style={styles.rentalStatus}>Book Rented</Text>
          <Text style={styles.rentalDetail}>Start: {startDate}</Text>
          <Text style={styles.rentalDetail}>End: {endDate}</Text>
          <Text style={styles.rentalDetail}>
            Duration: {rentalDetails.rentalDays} days
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.footer}>
      <Pressable
        style={({ pressed }) => [
          styles.bookButton,
          !book.available
            ? styles.bookButtonUnavailable
            : pressed && styles.bookButtonPressed,
        ]}
        onPress={book.available ? onRent : null}
        disabled={!book.available}
      >
        <Text style={styles.bookButtonText}>
          {book.available ? "Rent" : "Unavailable"}
        </Text>
      </Pressable>
    </View>
  );
}

/**
 * RentalModal component to specify rental period.
 */
function RentalModal({ visible, onClose, onConfirm }) {
  const [rentalDays, setRentalDays] = useState("");

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Specify Rental Period</Text>
          <Text style={styles.modalLabel}>Rental Duration (days):</Text>
          <TextInput
            style={styles.modalInput}
            keyboardType="numeric"
            value={rentalDays}
            onChangeText={setRentalDays}
            placeholder="Enter number of days"
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setRentalDays("");
                onClose();
              }}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonConfirm]}
              onPress={() => {
                if (
                  rentalDays &&
                  !isNaN(rentalDays) &&
                  parseInt(rentalDays) > 0
                ) {
                  onConfirm(parseInt(rentalDays));
                  setRentalDays("");
                } else {
                  Alert.alert(
                    "Invalid Input",
                    "Please enter a valid number of days."
                  );
                }
              }}
            >
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

/**
 * BookDetailUI combines all components into a single screen.
 */
export function BookDetailUI({ book: initialBook, libraryId, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [rentalDetails, setRentalDetails] = useState(null);
  const [book, setBook] = useState(initialBook); // Local state for book
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    // Check if running in Expo Go
    const isExpoGo = Constants.appOwnership === "expo";
    console.log(
      "Expo environment:",
      isExpoGo ? "Expo Go" : "Development Build"
    );
    if (isExpoGo) {
      console.warn(
        "Running in Expo Go: Push notifications are not supported, and local notifications may be delayed."
      );
    } else {
      registerForPushNotificationsAsync();
    }

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        console.log("Notification response received:", data);
        if (data && data.screen) {
          try {
            navigation.navigate(data.screen);
          } catch (error) {
            console.error("Navigation error from notification:", error);
          }
        }
      }
    );

    const fetchRentalDetails = async () => {
      if (!userId) return;

      try {
        const rentalDoc = await getDoc(
          doc(db, "users", userId, "userRented", book.id)
        );
        if (rentalDoc.exists()) {
          setRentalDetails(rentalDoc.data());
        }
      } catch (error) {
        console.error("Error fetching rental details:", error);
      }
    };

    fetchRentalDetails();

    return () => subscription.remove();
  }, [userId, book.id, navigation]);

  async function registerForPushNotificationsAsync() {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      console.log("Existing notification permission status:", existingStatus);
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        console.log("Requested notification permission status:", finalStatus);
      }
      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Please enable notifications in settings to receive updates."
        );
        return;
      }
      console.log("Notification permissions granted.");
    } catch (error) {
      console.error("Error registering for push notifications:", error);
      Alert.alert(
        "Error",
        "Failed to register for notifications. Please check your settings."
      );
    }
  }

  async function scheduleNotification(title, body, data = {}) {
    try {
      console.log("Scheduling notification:", { title, body, data });
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
        },
        trigger: { seconds: 1 },
      });
      console.log("Notification scheduled successfully.");
    } catch (error) {
      console.error("Error scheduling notification:", error);
      Alert.alert(
        "Error",
        "Failed to schedule notification. Please check your notification settings."
      );
    }
  }

  const handleRent = async (days) => {
    if (!userId) {
      Alert.alert("Error", "You must be logged in to rent a book.");
      return;
    }

    if (!book.available) {
      Alert.alert(
        "Not Available",
        "This book is currently not available for rent."
      );
      return;
    }

    try {
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + days);

      const rentalData = {
        bookId: book.id,
        title: book.title,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        rentalDays: days,
        libraryId: libraryId, // Add libraryId to rental data
      };

      // Update book copies in Firestore
      const bookRef = doc(db, "books", book.id);
      const newCopiesLeft = book.copiesLeft - 1;
      const updatedBookData = {
        copiesLeft: newCopiesLeft,
        available: newCopiesLeft > 0,
      };

      // Perform both updates atomically
      await Promise.all([
        setDoc(doc(db, "users", userId, "userRented", book.id), rentalData),
        updateDoc(bookRef, updatedBookData),
      ]);

      // Update local book state to reflect new copies and availability
      setBook((prevBook) => ({
        ...prevBook,
        copiesLeft: newCopiesLeft,
        available: newCopiesLeft > 0,
      }));

      setRentalDetails(rentalData);
      await scheduleNotification(
        "Book Rented!",
        `You have successfully rented "${book.title}" for ${days} days.`,
        { screen: "Home" }
      );
      Alert.alert(
        "Success",
        `Book rented for ${days} days! You must return it by ${endDate.toDateString()}.`
      );
    } catch (error) {
      console.error("Error registering rental or updating book:", error);
      Alert.alert(
        "Error",
        "Failed to rent the book or update book availability. Please try again."
      );
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BookHeader book={book} />
        <BookDetails book={book} />
        <BookDescription book={book} />
      </ScrollView>

      <BookFooter
        book={book}
        onRent={() => setModalVisible(true)}
        rentalDetails={rentalDetails}
      />

      <RentalModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleRent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  headerSection: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    width: 120,
    height: 180,
    marginRight: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  bookCover: {
    width: "100%",
    height: "100%",
  },
  bookInfoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: "#4A4A4A",
    marginBottom: 4,
  },
  genre: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  available: {
    fontSize: 14,
    fontWeight: "600",
    color: "#16A34A",
  },
  notAvailable: {
    fontSize: 14,
    fontWeight: "600",
    color: "#DC2626",
  },
  bookDetailsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4A4A4A",
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: "#1A1A1A",
    flex: 1,
  },
  descriptionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4A4A4A",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  rentalInfoContainer: {
    alignItems: "center",
  },
  rentalStatus: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
    marginBottom: 8,
  },
  rentalDetail: {
    fontSize: 14,
    color: "#4A4A4A",
    marginBottom: 4,
  },
  bookButton: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  bookButtonPressed: {
    backgroundColor: "#1D4ED8",
  },
  bookButtonUnavailable: {
    backgroundColor: "#DC2626",
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 16,
    textAlign: "center",
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4A4A4A",
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "#E5E5E5",
  },
  modalButtonConfirm: {
    backgroundColor: "#2563EB",
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
});
