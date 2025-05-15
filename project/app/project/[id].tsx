import React from 'react';
import { View, StyleSheet, Image, ScrollView, Platform, Animated, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card'; 
import { Button } from '@/components/ui/Button'; 
import { RefreshCw } from 'lucide-react-native';
import { CompletionCelebration } from '@/components/ui/CompletionCelebration';
import { Clock, PenTool as Tool, ArrowLeft, Heart, TriangleAlert as AlertTriangle, Check, Square, SquareCheck as CheckSquare } from 'lucide-react-native';
import { allProjects } from '@/data/projects';
import { SkillLevelBadge } from '@/components/ui/SkillLevelBadge';
import { ToolItem } from '@/components/ui/ToolItem';
import { useSavedProjects } from '@/contexts/SavedProjectsContext';
import { useTheme } from '@/hooks/useTheme';

const tools = [
  { id: '1', name: 'Adjustable Wrench', essential: true },
  { id: '2', name: 'Pliers', essential: true },
  { id: '3', name: 'Screwdriver Set', essential: false },
  { id: '4', name: 'Plumber\'s Tape', essential: true },
  { id: '5', name: 'Bucket', essential: false },
];

const safetyTips = [
  'Turn off water supply before starting',
  'Wear safety glasses when working with tools',
  'Keep work area clean and dry',
  'Have emergency contact numbers ready',
];

const steps = [
  {
    title: 'Preparation',
    description: 'Before starting, gather all necessary tools and materials. Turn off the water supply to the faucet at the shutoff valve under the sink.',
    duration: '5 min'
  },
  {
    title: 'Identify the Leak',
    description: 'Inspect the faucet carefully to determine where the leak is coming from. Common spots include the spout, handles, or base.',
    duration: '5 min'
  },
  {
    title: 'Disassemble the Faucet',
    description: 'Remove the faucet handle by unscrewing the decorative cap and removing the screw underneath. Then remove the stem.',
    duration: '10 min'
  },
  {
    title: 'Replace Worn Parts',
    description: 'Inspect O-rings and washers for wear. Replace any damaged parts with exact matches.',
    duration: '5 min'
  },
  {
    title: 'Reassemble and Test',
    description: 'Put everything back together in reverse order. Turn the water back on and test for leaks.',
    duration: '5 min'
  },
];

export default function ProjectDetailsScreen() {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const { id } = useLocalSearchParams();
  const [showCelebration, setShowCelebration] = React.useState(false);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const theme = useTheme();
  const { savedProjects, completedProjects, toggleSaveProject, completeProject } = useSavedProjects();
  const project = allProjects.find(p => p.id === id);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const handleComplete = () => {
    completeProject(project.id);
    setShowCelebration(true);
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    router.push('/profile');
  };

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const generateAIContent = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/generate-project-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: project.id,
          type: 'description',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      // In a real app, you would update the UI with the new content
      console.log('Generated content:', data);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!project) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text variant="h3">Project not found</Text>
      </View>
    );
  }

  const isSaved = savedProjects.includes(project.id);

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <Animated.ScrollView 
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: project.imageUrl }} style={styles.image} />
        </View>

        <View style={styles.content}>
          <Text variant="h2" weight="bold" style={styles.title}>
            {project.title}
          </Text>

          <View style={styles.meta}>
            <SkillLevelBadge level={project.skillLevel} size="md" />
            <View style={styles.metaItem}>
              <Clock size={16} color={theme.colors.textSecondary} />
              <Text variant="bodySmall" style={styles.metaText}>
                {project.duration}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Tool size={16} color={theme.colors.textSecondary} />
              <Text variant="bodySmall" style={styles.metaText}>
                {project.toolCount} {project.toolCount === 1 ? 'tool' : 'tools'}
              </Text>
            </View>
          </View>

          <Card style={styles.section}>
            <Text variant="h4" weight="medium" style={styles.sectionTitle}>
              Description
            </Text>
            <Button
              title="Generate with AI"
              onPress={generateAIContent}
              variant="outline"
              size="sm"
              loading={isGenerating}
              icon={<RefreshCw size={16} color={theme.colors.primary} />}
              style={styles.generateButton}
            />
            <Text variant="body">
              Learn how to fix a leaky faucet with this step-by-step guide. This common household repair can save you money on your water bill and prevent damage to your fixtures.
            </Text>
          </Card>

          <Card style={[styles.section, { backgroundColor: `${theme.colors.warning}15` }]}>
            <View style={styles.safetyHeader}>
              <AlertTriangle size={24} color={theme.colors.warning} />
              <Text variant="h4" weight="medium" style={[styles.sectionTitle, { marginLeft: 8 }]}>
                Safety First
              </Text>
            </View>
            {safetyTips.map((tip, index) => (
              <Text key={index} variant="body" style={styles.safetyTip}>
                • {tip}
              </Text>
            ))}
          </Card>
          
          <Card style={styles.section}>
            <Text variant="h4" weight="medium" style={styles.sectionTitle}>
              Required Tools
            </Text>
            {tools.map((tool) => (
              <ToolItem
                key={tool.id}
                name={tool.name}
                essential={tool.essential}
              />
            ))}
          </Card>

          <Card style={styles.section}>
            <Text variant="h4" weight="medium" style={styles.sectionTitle}>
              Step-by-Step Guide
            </Text>
            {steps.map((step, index) => (
              <View key={index} style={styles.step}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepTitleContainer}>
                    <TouchableOpacity 
                      onPress={() => toggleStep(index)}
                      style={styles.checkbox}
                    >
                      {completedSteps.includes(index) ? (
                        <CheckSquare size={24} color={theme.colors.primary} />
                      ) : (
                        <Square size={24} color={theme.colors.textSecondary} />
                      )}
                    </TouchableOpacity>
                    <Text 
                      variant="h4" 
                      weight="medium"
                      style={[
                        styles.stepTitle,
                        completedSteps.includes(index) && styles.completedStep
                      ]}
                    >
                      {step.title}
                    </Text>
                  </View>
                  <Text variant="bodySmall" color="primary">
                    {step.duration}
                  </Text>
                </View>
                <Text variant="body" style={styles.stepDescription}>
                  {step.description}
                </Text>
              </View>
            ))}
          </Card>
        </View>
      </Animated.ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: theme.colors.background }]}>
        <Button 
          title="Project Complete" 
          onPress={handleComplete}
          variant="primary"
          style={styles.completeButton}
          icon={<Check size={20} color="white" />}
          disabled={completedProjects.includes(project.id)}
          fullWidth
        />
      </View>
      
      <Animated.View 
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.background,
            borderBottomColor: theme.colors.border,
          }
        ]}
      >
        <View style={styles.headerContent}>
          <Button
            icon={<ArrowLeft size={24} color={theme.colors.text} />}
            variant="ghost"
            onPress={() => router.back()}
            style={styles.backButton}
          />
          <Animated.Text
            style={[
              {
                fontFamily: 'Inter-Medium',
                fontSize: 18,
                color: theme.colors.text,
                opacity: headerOpacity,
              },
            ]}
            numberOfLines={1}
          >
            {project.title}
          </Animated.Text>
          <Button
            icon={
              <Heart
                size={24}
                color={isSaved ? theme.colors.error : theme.colors.text}
                fill={isSaved ? theme.colors.error : 'none'}
              />
            }
            variant="ghost"
            onPress={() => toggleSaveProject(project.id)}
            style={styles.saveButton}
          />
        </View>
      </Animated.View>
      
      {showCelebration && (
        <CompletionCelebration onClose={handleCelebrationClose} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === 'web' ? 16 : 44,
    paddingBottom: 16,
    borderBottomWidth: 1,
    zIndex: 1000,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
  },
  saveButton: {
    marginLeft: 'auto',
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  metaText: {
    marginLeft: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  safetyTip: {
    marginBottom: 8,
  },
  step: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  checkbox: {
    marginRight: 12,
  },
  stepTitle: {
    flex: 1,
  },
  completedStep: {
    opacity: 0.6,
    textDecorationLine: 'line-through',
  },
  stepDescription: {
    opacity: 0.8,
  },
  generateButton: {
    marginBottom: 16,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  completeButton: {
    marginBottom: Platform.OS === 'web' ? 0 : 16,
  },
});