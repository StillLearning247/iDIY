export const theme = {
  colors: {
    background: '#ffffff',
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    danger: '#FF3B30',

    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#CED0D2',

    // ✅ Additions:
    inputBackground: '#F2F2F7',   // used in SearchBar
    card: '#FAFAFA',              // ideal for suggestion containers or general surface UI
    surface: '#FFFFFF',           // neutral layer surface (can match background or contrast it)
  },

  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },

  typography: {
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal',
    },
  },
};