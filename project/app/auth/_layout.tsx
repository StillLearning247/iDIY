import { View } from 'react-native';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

export default function AuthLayout() {
  // Check if user is already logged in
  const { data: { session } } = supabase.auth.getSession();

  // If user is logged in, redirect to home
  if (session) {
    router.replace('/(tabs)');
  }

  return <View />;
}
