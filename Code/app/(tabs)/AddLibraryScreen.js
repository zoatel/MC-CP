import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { db, auth } from "../../components/firebase";
import { doc, setDoc } from "firebase/firestore";

const { width: screenWidth } = Dimensions.get("window");
const cameraSize = screenWidth - 40;

const AddLibraryScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      try {
        // Add library ID to user's userLibraries subcollection
        await setDoc(doc(db, "users", userId, "userLibraries", data), {});
        Alert.alert(
          "Library Added",
          `Library with ID ${data} has been added to your collection.`,
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } catch (error) {
        console.error("Error adding library:", error);
        Alert.alert("Error", "Failed to add library. Please try again.");
        setScanned(false);
      }
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Camera Permission Required</Text>
        <Text style={styles.message}>
          We need your permission to access the camera to scan QR codes.
        </Text>
        <Button title="Grant Permission" onPress={requestPermission} />
        <View style={{ marginTop: 16 }}>
          <Button
            title="Go Back"
            color="gray"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Library QR Code</Text>
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>
      </View>
      {scanned && (
        <TouchableOpacity
          style={styles.scanAgainButton}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.scanAgainText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
      <View style={{ marginTop: 16 }}>
        <Button
          title="Go Back"
          color="gray"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  cameraContainer: {
    width: cameraSize,
    height: cameraSize,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 20,
    position: "relative",
    alignSelf: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  scanArea: {
    width: cameraSize * 0.7,
    height: cameraSize * 0.7,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
  },
  scanAgainButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
  },
  scanAgainText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default AddLibraryScreen;
