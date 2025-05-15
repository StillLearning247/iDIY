import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Text } from './Text';

interface SkillLevelBadgeProps {
  level: 1 | 2 | 3 | 4 | 5;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function SkillLevelBadge({ level, showLabel = true, size = 'md' }: SkillLevelBadgeProps) {
  const theme = useTheme();

  const getColorForLevel = (skillLevel: number) => {
    switch (skillLevel) {
      case 1: return theme.colors.success;
      case 2: return theme.colors.successLight;
      case 3: return theme.colors.warning;
      case 4: return theme.colors.warningDark;
      case 5: return theme.colors.error;
      default: return theme.colors.success;
    }
  };

  const getLabelForLevel = (skillLevel: number) => {
    switch (skillLevel) {
      case 1: return 'Very Basic';
      case 2: return 'Basic';
      case 3: return 'Intermediate';
      case 4: return 'Advanced';
      case 5: return 'Expert';
      default: return 'Basic';
    }
  };

  const getSizeStyles = (sizeType: string) => {
    switch (sizeType) {
      case 'sm': 
        return { 
          container: { height: 20, paddingHorizontal: 6 },
          dot: { width: 8, height: 8, marginRight: showLabel ? 4 : 0 }
        };
      case 'md': 
        return { 
          container: { height: 24, paddingHorizontal: 8 },
          dot: { width: 10, height: 10, marginRight: showLabel ? 6 : 0 }
        };
      case 'lg': 
        return { 
          container: { height: 32, paddingHorizontal: 12 },
          dot: { width: 12, height: 12, marginRight: showLabel ? 8 : 0 }
        };
      default: 
        return { 
          container: { height: 24, paddingHorizontal: 8 },
          dot: { width: 10, height: 10, marginRight: showLabel ? 6 : 0 }
        };
    }
  };

  const sizeStyles = getSizeStyles(size);
  const color = getColorForLevel(level);
  const label = getLabelForLevel(level);

  return (
    <View style={[
      styles.container, 
      sizeStyles.container,
      { backgroundColor: `${color}20` }
    ]}>
      <View 
        style={[
          styles.dot, 
          sizeStyles.dot, 
          { backgroundColor: color }
        ]} 
      />
      {showLabel && (
        <Text 
          variant={size === 'lg' ? 'body' : size === 'sm' ? 'caption' : 'bodySmall'}
          weight="medium"
          style={{ color }}
        >
          {label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  dot: {
    borderRadius: 100,
  },
});