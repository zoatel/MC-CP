import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../../components/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import InputField from "../../components/InputField";
import AuthButton from "../../components/AuthButton";
import SocialLogin from "../../components/SocialLogin";
import DividerWithText from "../../components/DividerWithText";
import AuthFooter from "../../components/AuthFooter";
import PolicyLinks from "../../components/PolicyLinks";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

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

    return () => subscription.remove();
  }, []);

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

  const validateEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text.length > 0 && !emailRegex.test(text)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (text) => {
    setPassword(text);
  };

  const handleSignIn = async () => {
    setLoading(true);
    setEmailError("");
    setPasswordError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Remember me:", rememberMe);
      await scheduleNotification(
        "Welcome Back!",
        `Successfully signed in as ${email}`,
        { screen: "Home" }
      );
      navigation.navigate("Home");
    } catch (error) {
      console.log("Sign-in error code:", error.code);
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/invalid-credential":
          setPasswordError("Invalid email or password");
          break;
        case "auth/invalid-email":
          setEmailError("Invalid email address");
          break;
        case "auth/too-many-requests":
          setPasswordError("Too many attempts. Try again later.");
          break;
        default:
          setPasswordError("An error occurred. Please try again.");
          console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      await scheduleNotification(
        "Welcome Back!",
        "Successfully signed in with Google",
        { screen: "Home" }
      );
      navigation.navigate("Home");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setPasswordError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, facebookProvider);
      await scheduleNotification(
        "Welcome Back!",
        "Successfully signed in with Facebook",
        { screen: "Home" }
      );
      navigation.navigate("Home");
    } catch (error) {
      console.error("Facebook Sign-In Error:", error);
      setPasswordError("Facebook sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setEmailError("Please enter your email address to reset your password");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      await scheduleNotification(
        "Password Reset",
        "A reset link has been sent to your email.",
        { screen: "SignIn" }
      );
      Alert.alert("Success", "Password reset email sent. Check your inbox!");
    } catch (error) {
      console.error("Forgot Password Error:", error.code);
      switch (error.code) {
        case "auth/invalid-email":
          setEmailError("Invalid email address");
          break;
        case "auth/user-not-found":
          setEmailError("No account found with this email");
          break;
        default:
          setEmailError("Failed to send reset email. Please try again.");
          console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "android" ? 0 : 25}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Intro statement */}
        <Text style={styles.introText}>Welcome back!</Text>

        {/* Form Fields */}
        <InputField
          label="Email address"
          placeholder="Enter your email"
          iconName="mail-outline"
          value={email}
          onChangeText={validateEmail}
          keyboardType="email-address"
          error={emailError}
        />

        <InputField
          label="Password"
          placeholder="Enter your password"
          iconName="lock-closed-outline"
          secureTextEntry
          value={password}
          onChangeText={validatePassword}
          error={passwordError}
        />

        {/* Remember Me & Forgot Password */}
        <View style={styles.optionsContainer}>
          <View style={styles.rememberMeContainer}>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              trackColor={{ false: "#ccc", true: "#007AFF" }}
              thumbColor={rememberMe ? "#fff" : "#f4f3f4"}
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <AuthButton title="Sign In" onPress={handleSignIn} disabled={loading} />

        {loading && (
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={styles.loading}
          />
        )}

        {/* Divider */}
        <DividerWithText text="or continue with" />

        {/* Social Login */}
        <SocialLogin
          onFacebookPress={handleFacebookSignIn}
          onGooglePress={handleGoogleSignIn}
        />

        {/* Don't have account */}
        <AuthFooter
          text="Don't have an account?"
          linkText="Sign up"
          onPress={() => navigation.navigate("SignUp")}
        />

        {/* Footer Links */}
        <PolicyLinks
          onPrivacyPress={() => console.log("Privacy Policy")}
          onTermsPress={() => console.log("Terms of Service")}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  introText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "500",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    alignItems: "center",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  loading: {
    marginVertical: 10,
  },
});
