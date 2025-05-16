import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useTheme } from '@/hooks/useTheme';
import { SavedProjectsProvider } from '@/contexts/SavedProjectsContext';
import { Text } from '@/components/ui/Text';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  useFrameworkReady();
  const theme = useTheme();

  useEffect(() => {
    // Load Inter font using Expo Font
    import('@expo-google-fonts/inter').then(({ Inter_400Regular, Inter_500Medium, Inter_700Bold }) => {
      // Fonts are loaded
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SavedProjectsProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
        </Stack>
        <StatusBar style={theme.isDark ? "light" : "dark"} />
      </SavedProjectsProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    marginTop: 10,
    textAlign: 'center',
    maxWidth: 300,
  },
});