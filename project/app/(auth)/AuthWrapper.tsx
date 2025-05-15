import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import LoginScreen from './login';
import { useRouter } from 'expo-router';

export default function AuthWrapper() {
  const { user, loading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

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

  // Navigate to tabs when authenticated
  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user]);

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
