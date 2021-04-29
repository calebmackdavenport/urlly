import React from 'react';
import {Platform, TextInput, StyleSheet} from 'react-native';

const Input = ({field, name, placeholder, maxLength, style}) => (
  <TextInput
    key={`${name}-input`}
    {...field}
    onChangeText={field.onChange}
    style={[styles.input, style]}
    placeholder={placeholder}
    placeholderTextColor={Platform.OS === 'android' ? 'lightgray' : undefined}
    maxLength={maxLength}
    autoCapitalize={'none'}
    autoCorrect={false}
    autoCompleteType={'off'}
  />
);

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 18,
    margin: 12,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
  }
});
