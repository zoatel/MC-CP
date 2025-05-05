import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../../components/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import InputField from "../../components/InputField";
import AuthButton from "../../components/AuthButton";
import SocialLogin from "../../components/SocialLogin";
import DividerWithText from "../../components/DividerWithText";
import AuthFooter from "../../components/AuthFooter";
import PolicyLinks from "../../components/PolicyLinks";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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
    // Removed password length validation, handled in sign-up
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
      navigation.navigate("Home");
    } catch (error) {
      console.log(error.code);
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
      navigation.navigate("Home");
    } catch (error) {
      console.error("Facebook Sign-In Error:", error);
      setPasswordError("Facebook sign-in failed. Please try again.");
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

        <TouchableOpacity onPress={() => console.log("Forgot Password")}>
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
