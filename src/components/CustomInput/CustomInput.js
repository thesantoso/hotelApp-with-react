import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {BeakerIcon} from '@heroicons/react/solid';

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  numericKeyboard = false,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#9DA3AD"
      defaultValue={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={numericKeyboard ? 'numeric' : 'default'}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    // flex: 1,
    borderColor: '#FFF7EF',
    // borderColor: 'black',
    marginHorizontal: 16,
    marginBottom: 16,
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#0A1931',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.24,
  },
});

export default CustomInput;
