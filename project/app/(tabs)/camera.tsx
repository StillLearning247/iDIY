import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { CameraView, Camera as CameraType, useCameraPermissions } from 'expo-camera';
import { Camera, RotateCcw, Image as ImageIcon, Check, X } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/hooks/useTheme';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [photo, setPhoto] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const theme = useTheme();

  const handleCapture = async (camera: any) => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
      // Simulate analysis
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setResult('This appears to be a leaky faucet. Tap to see repair guides.');
      }, 2000);
    }
  };

  const handleRetake = () => {
    setPhoto(null);
    setResult(null);
  };

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <Text variant="h2" weight="bold">Identify</Text>
          <Text variant="body" style={{ marginTop: 8 }}>
            Take a photo to identify problems or items
          </Text>
        </View>
        
        <View style={styles.webCameraMessage}>
          <Camera size={64} color={theme.colors.textSecondary} style={{ opacity: 0.5 }} />
          <Text variant="h4" weight="medium" style={styles.webMessageTitle}>
            Camera Available on Mobile
          </Text>
          <Text style={styles.webMessageText}>
            This feature works best on iOS or Android devices. Please use the mobile app to access the camera for identifying home repair issues.
          </Text>
          <Card style={styles.webExampleCard}>
            <Text variant="bodySmall" weight="medium">
              With this feature you can:
            </Text>
            <View style={styles.webExampleItem}>
              <Check size={16} color={theme.colors.success} style={{ marginRight: 8 }} />
              <Text variant="bodySmall">Take photos of broken items for identification</Text>
            </View>
            <View style={styles.webExampleItem}>
              <Check size={16} color={theme.colors.success} style={{ marginRight: 8 }} />
              <Text variant="bodySmall">Get instant suggestions for repairs</Text>
            </View>
            <View style={styles.webExampleItem}>
              <Check size={16} color={theme.colors.success} style={{ marginRight: 8 }} />
              <Text variant="bodySmall">Save photos to your project gallery</Text>
            </View>
          </Card>
        </View>
      </View>
    );
  }

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.permissionContainer}>
          <Camera size={64} color={theme.colors.primary} style={styles.permissionIcon} />
          <Text variant="h3" weight="bold" style={styles.permissionTitle}>
            Camera Access Needed
          </Text>
          <Text style={styles.permissionText}>
            We need camera access to help you identify home repair issues and provide solutions.
          </Text>
          <Button 
            title="Grant Permission" 
            onPress={requestPermission} 
            variant="primary"
            style={styles.permissionButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {photo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.previewImage} />
          
          <View style={styles.previewOverlay}>
            {analyzing ? (
              <Card style={styles.analyzingCard}>
                <Text variant="body" weight="medium">Analyzing image...</Text>
              </Card>
            ) : result ? (
              <TouchableOpacity 
                style={[
                  styles.resultCard, 
                  { backgroundColor: theme.colors.cardBackground }
                ]}
              >
                <Text variant="body" weight="medium">{result}</Text>
              </TouchableOpacity>
            ) : null}
            
            <View style={styles.previewActions}>
              <Button 
                title="Retake" 
                onPress={handleRetake} 
                variant="outline"
                icon={<RotateCcw size={18} color={theme.colors.primary} />}
                style={styles.previewButton}
              />
              <Button 
                title="Use Photo" 
                onPress={() => {}} 
                variant="primary"
                icon={<Check size={18} color="white" />}
                style={styles.previewButton}
              />
            </View>
          </View>
        </View>
      ) : (
        <>
          <CameraView style={styles.camera} facing={facing} barCodeScannerSettings={{}} >
            {({ camera }) => (
              <View style={styles.captureContainer}>
                <View style={styles.captureTopControls}>
                  <TouchableOpacity 
                    style={[
                      styles.flipButton, 
                      { backgroundColor: 'rgba(0,0,0,0.3)' }
                    ]}
                    onPress={() => setFacing(prev => prev === 'back' ? 'front' : 'back')}
                  >
                    <RotateCcw size={20} color="white" />
                  </TouchableOpacity>
                </View>

                <View style={styles.captureControls}>
                  <TouchableOpacity 
                    style={[
                      styles.captureButton, 
                      { borderColor: 'white' }
                    ]} 
                    onPress={() => handleCapture(camera)}
                  >
                    <View style={styles.captureButtonInner} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </CameraView>
          
          <View style={styles.cameraInstructions}>
            <Text variant="body" weight="medium" style={{ color: 'white', textAlign: 'center' }}>
              Take a clear photo of the item or problem
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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