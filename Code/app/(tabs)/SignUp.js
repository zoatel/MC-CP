import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../../components/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import InputField from "../../components/InputField";
import AuthButton from "../../components/AuthButton";
import SocialLogin from "../../components/SocialLogin";
import DividerWithText from "../../components/DividerWithText";
import AuthFooter from "../../components/AuthFooter";
import PolicyLinks from "../../components/PolicyLinks";

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (text.length > 0 && text.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else if (confirmPassword && text !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (text) => {
    setConfirmPassword(text);
    if (password && text !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setEmailError("");
    setPasswordError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (!fullName.trim()) {
      setPasswordError("Full name is required");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("SignIn");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setEmailError("This email is already in use");
          break;
        case "auth/invalid-email":
          setEmailError("Invalid email address");
          break;
        case "auth/weak-password":
          setPasswordError("Password is too weak");
          break;
        default:
          setPasswordError("An error occurred. Please try again.");
          console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Google Sign-Up Error:", error);
      setPasswordError("Google sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignUp = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, facebookProvider);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Facebook Sign-Up Error:", error);
      setPasswordError("Facebook sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Intro statement */}
      <Text style={styles.introText}>Create account to get started</Text>

      {/* Form Fields */}
      <InputField
        label="Full name"
        placeholder="Enter your full name"
        iconName="person-outline"
        value={fullName}
        onChangeText={setFullName}
      />

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
      />

      <InputField
        label="Confirm Password"
        placeholder="Confirm your password"
        iconName="lock-closed-outline"
        secureTextEntry
        value={confirmPassword}
        onChangeText={validateConfirmPassword}
        error={passwordError}
      />

      {/* Sign Up Button */}
      <AuthButton title="Sign Up" onPress={handleSignUp} disabled={loading} />

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
        onFacebookPress={handleFacebookSignUp}
        onGooglePress={handleGoogleSignUp}
      />

      {/* Already have account */}
      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        onPress={() => navigation.navigate("SignIn")}
      />

      {/* Footer Links */}
      <PolicyLinks
        onPrivacyPress={() => console.log("Privacy Policy")}
        onTermsPress={() => console.log("Terms of Service")}
      />
    </KeyboardAvoidingView>
  );
};

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
  loading: {
    marginVertical: 10,
  },
});

export default SignUpScreen;
