import { Stack } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useTheme } from '@/hooks/useTheme';
import { SavedProjectsProvider } from '@/contexts/SavedProjectsContext';
import { Text } from '@/components/ui/Text';
import { AuthProvider } from '@/contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { AuthWrapper } from '@/components/AuthWrapper';

export default function RootLayout() {
  useFrameworkReady();
  const theme = useTheme();

  return (
    <AuthProvider>
      <SavedProjectsProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.text,
          }}
        >
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style={theme.isDark ? "light" : "dark"} />
      </SavedProjectsProvider>
    </AuthProvider>
  );
}