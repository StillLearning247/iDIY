import React from 'react';
import { View, TextInput, StyleSheet, Pressable, ViewStyle, StyleProp } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search',
  style,
}: SearchBarProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.inputBackground,
          borderColor: theme.colors.border,
        },
        style,
      ]}
    >
      <Search size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
      <TextInput
        style={[
          styles.input,
          { color: theme.colors.text },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        selectionColor={theme.colors.primary}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <Pressable onPress={onClear} style={styles.clearButton} hitSlop={8}>
          <X size={16} color={theme.colors.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 32, // Increased from 8 to 32 to account for icon width
    marginRight: 8,
    position: 'relative',
    zIndex: 1,
    fontFamily: 'Inter-Regular',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 2,
  },
  clearButton: {
    position: 'absolute',
    right: 16,
    zIndex: 2,
    padding: 4,
  },
});