import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SocialLogin = ({ onFacebookPress, onGooglePress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.socialButton} onPress={onFacebookPress}>
        <Image 
          source={require('../assets/images/facebook_icon.png')}
          style={styles.socialIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton} onPress={onGooglePress}>
        <Image 
          source={require('../assets/images/google_icon.png')}
          style={styles.socialIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
});

export default SocialLogin;