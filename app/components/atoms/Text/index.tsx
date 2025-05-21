import React from 'react';
import { TextProps, TextStyle } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';

type CustomTextProps = AnimatedProps<TextProps> & {
  style?: TextStyle | TextStyle[];
  className?: string
};

export default function Text({ style = {}, className = '', ...props }: CustomTextProps) {
  return (
    <Animated.Text
      {...props}
      className={['text-dark', className].filter(Boolean).join(' ')}
      style={[{ fontFamily: 'Poppins' }, style]}
    />
  );
}
