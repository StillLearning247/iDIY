import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle | StyleProp<TextStyle>;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
  icon
}: ButtonProps) {
  const theme = useTheme();
  
  const getButtonStyle = (variant: ButtonVariant) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? theme.colors.disabled : theme.colors.primary,
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? theme.colors.disabled : theme.colors.secondary,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? theme.colors.disabled : theme.colors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
    }
  };

  const getTextStyle = (variant: ButtonVariant): TextStyle => {
    const style: TextStyle = {
      color: theme.colors.buttonText
    };

    if (variant === 'outline' || variant === 'ghost') {
      style.color = theme.colors.primary;
    }

    return style;
  };

  const getSizeStyle = (size: ButtonSize): ViewStyle => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
        };
      case 'md':
        return {
          paddingVertical: 12,
          paddingHorizontal: 20,
        };
      case 'lg':
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
        };
    }
  };
  
  const getTextSizeStyle = (size: ButtonSize): TextStyle => {
    switch (size) {
      case 'sm':
        return {
          fontSize: 14,
        };
      case 'md':
        return {
          fontSize: 16,
        };
      case 'lg':
        return {
          fontSize: 18,
        };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(variant),
        getSizeStyle(size),
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' || variant === 'secondary' 
            ? theme.colors.buttonText 
            : theme.colors.primary} 
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text 
            style={[
              styles.text,
              {
                color: disabled ? theme.colors.disabled : getTextStyle(variant).color
              },
              getTextSizeStyle(size),
              icon && styles.textWithIcon,
              textStyle || {}
            ] as StyleProp<TextStyle>}
            numberOfLines={1}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  textWithIcon: {
    marginLeft: 8,
  }
});