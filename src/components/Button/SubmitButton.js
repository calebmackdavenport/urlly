import React from 'react';
import {ActivityIndicator, Text, Pressable, StyleSheet} from 'react-native';

const SubmitButton = ({onPress, disabled, busy}) => (
  <Pressable
    key={'submitButton'}
    onPress={onPress}
    disabled={disabled}
    style={({pressed}) => [
      {backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'},
      styles.wrapperCustom,
    ]}>
    {busy ? (
      <ActivityIndicator />
    ) : (
      <Text style={[styles.buttonText, disabled ? styles.disabledText : {}]}>
        {'Submit'}
      </Text>
    )}
  </Pressable>
);

export default SubmitButton;

const styles = StyleSheet.create({
  wrapperCustom: {
    marginVertical: 5,
    borderRadius: 8,
    padding: 6,
    width: 120,
    alignSelf: 'center',
    height: 32,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  disabledText: {
    color: 'gray',
  },
});
