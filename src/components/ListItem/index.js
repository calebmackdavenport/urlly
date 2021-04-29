import React from 'react';
import {Text, StyleSheet} from 'react-native';

const ListItem = ({url}) => (
  <Text style={styles.listText}>
    {url}
  </Text>
);

export default ListItem;

const styles = StyleSheet.create({
  listText: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
});
