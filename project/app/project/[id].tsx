import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Stack, Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card'; 
import { Button } from '@/components/ui/Button'; 
import { CompletionCelebration } from '@/components/ui/CompletionCelebration';
import { Clock, PenTool as Tool, ArrowLeft, Heart, TriangleAlert as AlertTriangle, Check, Square, SquareCheck as CheckSquare, ChevronLeft, X } from 'lucide-react-native';
import { useProject } from '@/contexts/ProjectContext';
import { SkillLevelBadge } from '@/components/ui/SkillLevelBadge';
import { ToolItem } from '@/components/ui/ToolItem';
import { useTheme } from '@/hooks/useTheme';
import { useSavedProjects } from '@/contexts/SavedProjectsContext';
import type { Project } from '@/types';

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const { savedProjects, completedProjects, toggleSaveProject, completeProject } = useSavedProjects();
  const { getProjectById, projects } = useProject();
  const project = projects.find(p => p.id === id) || null;

  if (!project) {
    return null;
  }

  const handleComplete = () => {
    completeProject(project.id);
    setShowCelebration(true);
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    useRouter().push('/profile');
  };

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
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
      <ScrollView 
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: project.imageUrl }}
            style={styles.image}
          />
        </View>

        <View style={styles.content}>
          <Text variant="h2" weight="bold" style={styles.title}>
            {project.title}
          </Text>

          <View style={styles.meta}>
            {project && (
              <SkillLevelBadge
                level={project.skillLevel as 1 | 2 | 3 | 4 | 5}
                size="lg"
              />
            )}
            {project && (
              <View style={styles.metaItem}>
                <Clock size={16} color={theme.colors.textSecondary} />
                <Text variant="bodySmall" style={styles.metaText}>
                  {project.duration}
                </Text>
              </View>
            )}
            {project && (
              <View style={styles.metaItem}>
                <Tool size={16} color={theme.colors.textSecondary} />
                <Text variant="bodySmall" style={styles.metaText}>
                  {project.toolCount} {project.toolCount === 1 ? 'tool' : 'tools'}
                </Text>
              </View>
            )}
          </View>

          <Card style={styles.section}>
            {project && (
              <>
                <Text variant="h4" weight="medium" style={styles.sectionTitle}>
                  Description
                </Text>
                <Text variant="body">
                  {project.description}
                </Text>
              </>
            )}

            {project && (
              <Card style={[styles.section, { backgroundColor: `${theme.colors.warning}15` }]}>
                <View style={styles.safetyHeader}>
                  <AlertTriangle size={24} color={theme.colors.warning} />
                  <Text variant="h4" weight="medium" style={[styles.sectionTitle, { marginLeft: 8 }]}>
                    Safety First
                  </Text>
                </View>
                {project.safetyTips?.map((tip, index) => (
                  <Text key={index} variant="body" style={styles.safetyTip}>
                    • {tip}
                  </Text>
                ))}
              </Card>
            )}
          </Card>

          {project && (
            <Card style={styles.section}>
              <Text variant="h4" weight="medium" style={styles.sectionTitle}>
                Required Tools
              </Text>
              {project.tools?.map((tool) => (
                <ToolItem
                  key={tool.id}
                  name={tool.name}
                  essential={tool.essential}
                />
              ))}
            </Card>
          )}

          {project && (
            <Card style={styles.section}>
              <Text variant="h4" weight="medium" style={styles.sectionTitle}>
                Step-by-Step Guide
              </Text>
              {project.steps?.map((step, index) => (
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
          )}
        </View>
      </ScrollView>

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
      
      <View 
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Button
            title="Back"
            icon={<ChevronLeft size={20} />}
            variant="ghost"
            onPress={() => router.back()}
          />
          <Text
            variant="h4"
            weight="medium"
            style={{
              fontSize: 18,
              color: theme.colors.text,
              opacity: 1,
            }}
            numberOfLines={1}
          >
            {project.title}
          </Text>
          <Button
            title="Close"
            icon={<X size={20} />}
            variant="ghost"
            onPress={() => router.replace('/(tabs)/projects')}
          />
          <Button
            title={isSaved ? 'Unsave' : 'Save'}
            icon={
              <Heart
                size={24}
                color={isSaved ? theme.colors.error : theme.colors.text}
                fill={isSaved ? theme.colors.error : 'none'}
              />
            }
            variant="ghost"
            onPress={() => toggleSaveProject(project.id)}
            style={{ marginLeft: 16 }}
          />
        </View>
      </View>
      
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