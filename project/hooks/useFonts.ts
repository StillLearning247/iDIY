import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';

export function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    async function loadFonts() {
      try {
        console.log('Attempting to load fonts...');
        const fonts = {
          'Inter-Regular': Inter_400Regular,
          'Inter-Medium': Inter_500Medium,
          'Inter-Bold': Inter_700Bold,
        };

        // Load fonts with retry logic
        console.log('Attempting to load fonts...');

        // Load fonts with retry logic
        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
          try {
            await Font.loadAsync(fonts);
            setFontsLoaded(true);
            console.log('Fonts loaded successfully');
            return;
          } catch (e) {
            console.log(`Font loading attempt ${attempt + 1} failed`, e);
            if (attempt === MAX_RETRIES - 1) {
              throw e;
            }
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retry
          }
        }

        // Load fonts with retry logic
        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
          try {
            await Font.loadAsync(fonts);
            setFontsLoaded(true);
            console.log('Fonts loaded successfully');
            return;
          } catch (e) {
            console.log(`Font loading attempt ${attempt + 1} failed`, e);
            if (attempt === MAX_RETRIES - 1) {
              throw e;
            }
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retry
          }
        }
      } catch (e) {
        const error = e instanceof Error ? e : new Error('Failed to load fonts');
        setError(error);
        console.error('Error loading fonts:', error);
      }
    }

    loadFonts();
  }, []);

  return { fontsLoaded, error };
}