import React from 'react';
import { Text as RNText, TextStyle, StyleProp } from 'react-native';

interface TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  weight?: 'regular' | 'medium' | 'bold';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  numberOfLines?: number;
}

export function Text({
  children,
  style,
  weight = 'regular',
  align = 'auto',
  numberOfLines,
}: TextProps) {
  const getFontFamily = (weight: string) => {
    switch (weight) {
      case 'regular': return 'Inter-Regular';
      case 'medium': return 'Inter-Medium';
      case 'bold': return 'Inter-Bold';
      default: return 'Inter-Regular';
    }
  };

  return (
    <RNText
      style={[
        {
          textAlign: align,
          fontFamily: getFontFamily(weight),
        },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
}