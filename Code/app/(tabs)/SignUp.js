import React, { useState } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import InputField from '../../components/InputField';
import AuthButton from '../../components/AuthButton';
import SocialLogin from '../../components/SocialLogin';
import DividerWithText from '../../components/DividerWithText';
import AuthFooter from '../../components/AuthFooter';
import PolicyLinks from '../../components/PolicyLinks';


const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (text) => {
    setEmail(text);
    if (text.length > 0 && !text.includes('@')) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

const handleSignUp = () => {
  if (!email.includes('@')) {
    setEmailError('Please enter a valid email address');
    return;
  }
  if (password !== confirmPassword) {
    setPasswordError('Passwords do not match');
    return;
  }

  // Handle sign up logic

  navigation.navigate('SignIn');
};


  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/icon.png')}
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
        onChangeText={setPassword}
        onEndEditing={validatePassword}
      />

      <InputField
        label="Confirm Password"
        placeholder="Confirm your password"
        iconName="lock-closed-outline"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onEndEditing={validatePassword}
        error={passwordError}
      />

      {/* Sign Up Button */}
      <AuthButton 
        title="Sign Up" 
        onPress={handleSignUp} 
      />

      {/* Divider */}
      <DividerWithText text="or continue with" />

      {/* Social Login */}
      <SocialLogin 
        onFacebookPress={() => console.log('Facebook login')}
        onGooglePress={() => console.log('Google login')}
      />

      {/* Already have account */}
      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        onPress={() => navigation.navigate('SignIn')}
      />

      {/* Footer Links */}
      <PolicyLinks 
        onPrivacyPress={() => console.log('Privacy Policy')}
        onTermsPress={() => console.log('Terms of Service')}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  introText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
  },
});

export default SignUpScreen;