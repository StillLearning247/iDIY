import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';

export default function CameraScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="h2" weight="bold">Coming Soon</Text>
        <Text variant="body" style={{ marginTop: 8 }}>
          This feature will be available in our premium version
        </Text>
      </View>

      <View style={styles.content}>
        <Text variant="h4" weight="medium" style={{ marginBottom: 16 }}>
          Premium Features Include:
        </Text>
        <View style={styles.features}>
          <Text style={styles.featureItem}>• Instant photo analysis</Text>
          <Text style={styles.featureItem}>• AI-powered problem detection</Text>
          <Text style={styles.featureItem}>• Custom repair recommendations</Text>
        </View>

        <Button 
          title="Upgrade to Premium"
          onPress={() => {}}
          style={{ marginTop: 24 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  features: {
    marginTop: 16,
  },
  featureItem: {
    marginBottom: 8,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  camera: {
    flex: 1,
  },
  captureContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  captureTopControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  flipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureControls: {
    alignItems: 'center',
    marginBottom: 30,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'white',
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  analyzingCard: {
    marginBottom: 16,
    alignItems: 'center',
    padding: 12,
  },
  resultCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  cameraInstructions: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 16,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionIcon: {
    marginBottom: 24,
  },
  permissionTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: 32,
  },
  permissionButton: {
    width: '100%',
    maxWidth: 300,
  },
  webCameraMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  webMessageTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  webMessageText: {
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 400,
  },
  webExampleCard: {
    width: '100%',
    maxWidth: 400,
  },
  webExampleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
});