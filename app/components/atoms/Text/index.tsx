import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

type CustomTextProps = TextProps & {
  style?: TextStyle | TextStyle[];
};

export default function Text({ style, ...props }: CustomTextProps) {
  return (
    <RNText
      {...props}
      style={[{ fontFamily: 'Poppins' }, style]}
    />
  );
}
