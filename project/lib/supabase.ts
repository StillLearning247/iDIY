import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// 👇 Manually assert the type to fix TS error
const extra = (Constants as any).expoConfig?.extra as {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};

const supabaseUrl = extra?.SUPABASE_URL;
const supabaseAnonKey = extra?.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
