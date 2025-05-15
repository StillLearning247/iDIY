import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  accent: string;
  accentLight: string;
  success: string;
  successLight: string;
  warning: string;
  warningDark: string;
  error: string;
  background: string;
  backgroundSecondary: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  buttonText: string;
  border: string;
  shadow: string;
  inputBackground: string;
  disabled: string;
}

export interface Theme {
  colors: ThemeColors;
  isDark: boolean;
}

// Light theme colors
const lightColors: ThemeColors = {
  primary: '#39A9DB',
  primaryLight: '#C4E8F8',
  primaryDark: '#1D7CA8',
  secondary: '#51A687',
  secondaryLight: '#C1E6D9',
  secondaryDark: '#358368',
  accent: '#FF8A5B',
  accentLight: '#FFD2BD',
  success: '#51A687',
  successLight: '#7BCBAA',
  warning: '#FFB347',
  warningDark: '#E98300',
  error: '#FF5C5C',
  background: '#FFFFFF',
  backgroundSecondary: '#F5F7FA',
  cardBackground: '#FFFFFF',
  text: '#1E2432',
  textSecondary: '#6D7A8B',
  buttonText: '#FFFFFF',
  border: '#E1E5EB',
  shadow: '#1E2432',
  inputBackground: '#F5F7FA',
  disabled: '#B8C1CE',
};

// Dark theme colors
const darkColors: ThemeColors = {
  primary: '#39A9DB',
  primaryLight: '#1D7CA8',
  primaryDark: '#C4E8F8',
  secondary: '#51A687',
  secondaryLight: '#358368',
  secondaryDark: '#C1E6D9',
  accent: '#FF8A5B',
  accentLight: '#E26334',
  success: '#51A687',
  successLight: '#358368',
  warning: '#FFB347',
  warningDark: '#E98300',
  error: '#FF5C5C',
  background: '#121826',
  backgroundSecondary: '#1E2634',
  cardBackground: '#1E2634',
  text: '#F5F7FA',
  textSecondary: '#B8C1CE',
  buttonText: '#F5F7FA',
  border: '#2E3846',
  shadow: '#000000',
  inputBackground: '#2A3241',
  disabled: '#4A5568',
};

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const theme: Theme = {
    colors: isDark ? darkColors : lightColors,
    isDark,
  };
  
  return theme;
}