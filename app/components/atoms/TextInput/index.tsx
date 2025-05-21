import React from 'react';
import { TextInput as RNTextInput, TextInputProps, StyleSheet, View } from 'react-native';

interface CustomTextInputProps extends TextInputProps {}

const TextInput: React.FC<CustomTextInputProps> = ({ style, ...props }) => {
  return (
   
      <RNTextInput
        style={[styles.input, style]}
        placeholderTextColor="#B9B8C7"
        className='bg-white/70 text-xl min-h-16 p-3 border-b border-white/70  text-dark rounded-lg'
        {...props}
      />

  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  input: {
    fontFamily: 'Urbanist',
  },
});

export default TextInput;
