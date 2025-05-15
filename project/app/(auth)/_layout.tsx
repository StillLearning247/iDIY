import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/Text';

export default function AuthLayout() {
  const { user, loading } = useAuth();

  // Handle loading state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Handle authentication state
  if (user) {
    // Redirect to home if user is authenticated
    useEffect(() => {
      window.location.href = '/(tabs)';
    }, []);
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
