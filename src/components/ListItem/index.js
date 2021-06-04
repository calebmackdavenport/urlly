import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Linking, Alert} from 'react-native';

const handlePress = url => {
  Linking.canOpenURL(url).then(success => {
    success ? Linking.openURL(url) : Alert.alert('Could not open url');
  });
};

const ListItem = ({link, url}) => (
  <TouchableOpacity onPress={() => handlePress(url)}>
    <Text style={styles.listText}>{link}</Text>
  </TouchableOpacity>
);

export default ListItem;

const styles = StyleSheet.create({
  listText: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
});
