import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddLibraryScreen = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleAdd = () => {
    // For now just log, you can add logic to save the code
    console.log('Library Code:', code);
    navigation.goBack(); // Go back to home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add the code of Library</Text>
      <TextInput
        placeholder="Enter library code"
        style={styles.input}
        value={code}
        onChangeText={setCode}
      />
      <Button title="Add Library" onPress={handleAdd} />
      <View style={{ marginTop: 16 }}>
        <Button title="Go Back" color="gray" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff'  },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderRadius: 8,
  },
});

export default AddLibraryScreen;
