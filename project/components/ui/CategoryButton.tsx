import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from './Text.js';
import { useTheme } from '@/hooks/useTheme';

interface CategoryButtonProps {
  title: string;
  icon: React.ReactElement<IconProps>;
  onPress: () => void;
  isActive?: boolean;
}

interface IconProps {
  style?: React.CSSProperties;
  size?: number;
  color?: string;
};

export function CategoryButton({ 
  title, 
  icon, 
  onPress, 
  isActive = false 
}: CategoryButtonProps) {
  const theme = useTheme();
  
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: isActive ? theme.colors.primary : theme.colors.cardBackground,
          borderColor: isActive ? theme.colors.primary : theme.colors.border,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isActive 
              ? 'rgba(255, 255, 255, 0.2)' 
              : theme.colors.backgroundSecondary,
          },
        ]}
      >
        {React.cloneElement(icon as React.ReactElement<IconProps>, { 
           style: {
             color: isActive ? 'white' : theme.colors.primary,
           },
           size: 20,
         })}
      </View>
      <Text
        variant="bodySmall"
        weight="medium"
        style={{
          color: isActive ? 'white' : theme.colors.text,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    minWidth: 100,
    height: 90,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
});