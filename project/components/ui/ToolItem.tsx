import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { Check } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface ToolItemProps {
  name: string;
  essential?: boolean;
  owned?: boolean;
  onToggleOwned?: () => void;
}

export function ToolItem({
  name,
  essential = false,
  owned = false,
  onToggleOwned
}: ToolItemProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.checkbox, 
          { 
            backgroundColor: owned ? theme.colors.success : 'transparent',
            borderColor: owned ? theme.colors.success : theme.colors.border,
          }
        ]}
      >
        {owned && <Check size={14} color="white" />}
      </View>
      <View style={styles.content}>
        <Text>{name}</Text>
        {essential && (
          <Text 
            variant="caption" 
            color="error" 
            weight="medium"
            style={styles.essentialTag}
          >
            Essential
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  essentialTag: {
    marginLeft: 8,
  },
});