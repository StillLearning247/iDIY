import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';

export default function LoginScreen() {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async () => {
    try {
      setError('');
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      // Redirect to home after successful login
      window.location.href = '/(tabs)';
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h2" style={styles.title}>
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </Text>
      
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {error && (
        <Text variant="bodySmall" style={styles.error}>
          {error}
        </Text>
      )}

      <Button
        title={isSignUp ? 'Sign Up' : 'Sign In'}
        onPress={handleSubmit}
        style={styles.button}
      />

      <Button
        title={`Switch to ${isSignUp ? 'Sign In' : 'Sign Up'}`}
        onPress={() => setIsSignUp(!isSignUp)}
        variant="outline"
        style={styles.switchButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    marginBottom: 10,
  },
  switchButton: {
    alignSelf: 'center',
  },
});
