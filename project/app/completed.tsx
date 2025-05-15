import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Stack, router } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Trophy } from 'lucide-react-native';
import { useSavedProjects } from '@/contexts/SavedProjectsContext';
import { useTheme } from '@/hooks/useTheme';
import { allProjects } from '@/data/projects';

export default function CompletedProjectsScreen() {
  const theme = useTheme();
  const { completedProjects } = useSavedProjects();
  
  const completedProjectsData = allProjects.filter(project => 
    completedProjects.includes(project.id)
  );

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Button
              icon={<ArrowLeft size={24} color={theme.colors.text} />}
              variant="ghost"
              onPress={() => router.back()}
              style={styles.backButton}
            />
            <Text variant="h2" weight="bold">Completed Projects</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View 
              style={[
                styles.statsCard, 
                { backgroundColor: `${theme.colors.success}15` }
              ]}
            >
              <Trophy size={24} color={theme.colors.success} />
              <Text 
                variant="h3" 
                weight="bold" 
                color="success" 
                style={styles.statsNumber}
              >
                {completedProjects.length}
              </Text>
              <Text variant="bodySmall">Projects Completed</Text>
            </View>
          </View>
        </View>

        {completedProjectsData.length === 0 ? (
          <View style={styles.emptyState}>
            <Trophy size={48} color={theme.colors.textSecondary} style={{ opacity: 0.5 }} />
            <Text variant="h4" weight="medium" style={styles.emptyTitle}>
              No completed projects yet
            </Text>
            <Text variant="body" style={styles.emptyMessage}>
              Start working on projects and they'll appear here once completed
            </Text>
            <Button 
              title="Browse Projects" 
              onPress={() => router.push('/projects')}
              variant="primary"
              style={styles.browseButton}
            />
          </View>
        ) : (
          <FlatList
            data={completedProjectsData}
            renderItem={({ item }) => (
              <ProjectCard
                title={item.title}
                image={{ uri: item.imageUrl }}
                skillLevel={item.skillLevel as any}
                duration={item.duration}
                toolCount={item.toolCount}
                isCompleted={true}
                onPress={() => router.push(`/project/${item.id}`)}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.projectsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  statsContainer: {
    marginBottom: 16,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  statsNumber: {
    marginHorizontal: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 24,
  },
  browseButton: {
    minWidth: 200,
  },
  projectsList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});