import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DividerWithText = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{text}</Text>
      <View style={styles.dividerLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e1e1e1',
  },
  dividerText: {
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#999',
  },
});

export default DividerWithText;