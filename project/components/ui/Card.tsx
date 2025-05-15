import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: 0 | 1 | 2 | 3;
  padded?: boolean;
}

export function Card({ children, style, elevation = 1, padded = true }: CardProps) {
  const theme = useTheme();

  const getElevationStyle = (level: 0 | 1 | 2 | 3): ViewStyle => {
    const elevationStyles: Record<number, ViewStyle> = {
      0: { 
        shadowOpacity: 0, 
        elevation: 0,
        borderWidth: 1,
        borderColor: theme.colors.border,
      },
      1: { 
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
      },
      2: { 
        shadowOpacity: 0.15, 
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4, 
      },
      3: { 
        shadowOpacity: 0.2, 
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8, 
      },
    };
    
    return elevationStyles[level];
  };

  return (
    <View
      style={[
        styles.card,
        getElevationStyle(elevation),
        padded && styles.padded,
        { 
          backgroundColor: theme.colors.cardBackground,
          shadowColor: theme.colors.shadow,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  padded: {
    padding: 16,
  },
});