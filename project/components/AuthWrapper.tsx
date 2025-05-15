import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import LoginScreen from '@/app/(auth)/login';
import HomeScreen from '@/app/(tabs)/home';

export function AuthWrapper() {
  const { user, loading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize the component
    setIsInitialized(true);
  }, []);

  // Handle loading state
  if (!isInitialized || loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Handle authentication state
  if (!user) {
    return <LoginScreen />;
  }

  // Render main app when authenticated
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
