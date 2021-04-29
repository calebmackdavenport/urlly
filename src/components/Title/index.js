import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Title = ({text, style = {}}) => (
  <Text style={[styles.primaryFont, style]}>{text}</Text>
);

export default Title;

const styles = StyleSheet.create({
  primaryFont: {
    fontFamily: 'American Typewriter',
    textAlign: 'center',
    color: 'white',
    fontSize: 36,
  },
});
