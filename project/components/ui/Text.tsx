import React from 'react';
import { Text as RNText, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption';
  weight?: 'regular' | 'medium' | 'bold';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'default';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  numberOfLines?: number;
}

export function Text({
  children,
  style,
  variant = 'body',
  weight = 'regular',
  color = 'default',
  align = 'auto',
  numberOfLines,
}: TextProps) {
  const theme = useTheme();

  const getFontFamily = (weight: string) => {
    switch (weight) {
      case 'regular': return 'Inter-Regular';
      case 'medium': return 'Inter-Medium';
      case 'bold': return 'Inter-Bold';
      default: return 'Inter-Regular';
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'accent': return theme.colors.accent;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      case 'default': return theme.colors.text;
      default: return theme.colors.text;
    }
  };

  const variantStyles = {
    h1: { fontSize: 32, lineHeight: 40, letterSpacing: -0.5 },
    h2: { fontSize: 24, lineHeight: 32, letterSpacing: -0.25 },
    h3: { fontSize: 20, lineHeight: 28, letterSpacing: -0.25 },
    h4: { fontSize: 18, lineHeight: 24, letterSpacing: 0 },
    body: { fontSize: 16, lineHeight: 24, letterSpacing: 0 },
    bodySmall: { fontSize: 14, lineHeight: 20, letterSpacing: 0 },
    caption: { fontSize: 12, lineHeight: 16, letterSpacing: 0.25 },
  };

  return (
    <RNText
      style={[
        { 
          fontFamily: getFontFamily(weight),
          color: getTextColor(color),
          textAlign: align,
        },
        variantStyles[variant],
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({});

export default Text;