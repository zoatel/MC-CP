import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AuthFooter = ({ text, linkText, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  link: {
    fontSize: 14,
    color: '#0066cc',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default AuthFooter;