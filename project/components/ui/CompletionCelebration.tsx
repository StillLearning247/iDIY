import React from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { Text } from './Text';
import { Card } from './Card';
import { PartyPopper, Trophy } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface CompletionCelebrationProps {
  onClose: () => void;
}

export function CompletionCelebration({ onClose }: CompletionCelebrationProps) {
  const theme = useTheme();

  return (
    <Pressable 
      style={[
        styles.overlay,
        { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
      ]} 
      onPress={onClose}
    >
      <Card style={styles.card}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Trophy size={48} color={theme.colors.primary} style={styles.trophyIcon} />
            <PartyPopper 
              size={32} 
              color={theme.colors.accent} 
              style={styles.partyIcon} 
            />
          </View>
          
          <Text variant="h2" weight="bold" style={styles.title}>
            Congratulations! 🎉
          </Text>
          
          <Text variant="body" style={styles.message}>
            You've successfully completed this project! Keep up the great work and continue building your DIY skills.
          </Text>

          <Text 
            variant="bodySmall" 
            style={[styles.tap, { color: theme.colors.textSecondary }]}
          >
            {Platform.OS === 'web' ? 'Click' : 'Tap'} anywhere to continue
          </Text>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  trophyIcon: {
    transform: [{ scale: 1.2 }],
  },
  partyIcon: {
    position: 'absolute',
    top: -10,
    right: -20,
    transform: [{ rotate: '15deg' }],
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 24,
  },
  tap: {
    textAlign: 'center',
  },
});