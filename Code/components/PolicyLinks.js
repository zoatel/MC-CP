import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const PolicyLinks = ({ onPrivacyPress, onTermsPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrivacyPress}>
        <Text style={styles.link}>Privacy Policy</Text>
      </TouchableOpacity>
      <Text style={styles.separator}>|</Text>
      <TouchableOpacity onPress={onTermsPress}>
        <Text style={styles.link}>Terms of Service</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingBottom: 20,
  },
  link: {
    fontSize: 12,
    color: '#666',
  },
  separator: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 10,
  },
});

export default PolicyLinks;