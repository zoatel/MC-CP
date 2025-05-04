import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Switch,
} from 'react-native';

import InputField from '../../components/InputField';
import AuthButton from '../../components/AuthButton';
import SocialLogin from '../../components/SocialLogin';
import DividerWithText from '../../components/DividerWithText';
import AuthFooter from '../../components/AuthFooter';
import PolicyLinks from '../../components/PolicyLinks';

export default function SignInScreen ({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const validateEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (text.length > 0 && !emailRegex.test(text)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (text) => {
    setPassword(text);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (text.length > 0 && !passwordRegex.test(text)) {
      setPasswordError('Password must be at least 8 characters, include a capital letter, a lowercase letter, and a number');
    } else {
      setPasswordError('');
    }
  };
  const handleSignIn = () => {
    if (email.length > 0 && !email.includes('@')) {
      setEmailError('Please enter a valid email address');
    } else if (password.length < 11){
      setPasswordError('Please enter a valid password');
    }
    else {
      navigation.navigate('Home');
    }
    console.log('Remember me:', rememberMe);
    // Handle sign in logic
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
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
            trackColor={{ false: '#ccc', true: '#007AFF' }}
            thumbColor={rememberMe ? '#fff' : '#f4f3f4'}
          />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>

        <TouchableOpacity onPress={() => console.log('Forgot Password')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <AuthButton title="Sign In" onPress={handleSignIn} />

      {/* Divider */}
      <DividerWithText text="or continue with" />

      {/* Social Login */}
      <SocialLogin
        onFacebookPress={() => console.log('Facebook login')}
        onGooglePress={() => console.log('Google login')}
      />

      {/* Don't have account */}
      <AuthFooter
        text="Don't have an account?"
        linkText="Sign up"
        onPress={() => navigation.navigate('SignUp')}
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
});

