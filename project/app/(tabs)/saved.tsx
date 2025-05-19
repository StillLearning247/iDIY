import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { SkillLevel } from '@/types/project';
import { Button } from '@/components/ui/Button';
import { useSavedProjects } from '@/contexts/SavedProjectsContext';
import { useTheme } from '@/hooks/useTheme';
import { Trash2 } from 'lucide-react-native';
import { allProjects } from '../../data/projects';

export default function SavedProjectsScreen() {
  const theme = useTheme();
  const { savedProjects, toggleSaveProject } = useSavedProjects();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<string[]>([]);
  
  const savedProjectsData = allProjects.filter(project => 
    savedProjects.includes(project.id)
  );

  const handleToggleSelect = (projectId: string) => {
    setSelectedToDelete(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleDelete = () => {
    selectedToDelete.forEach(id => toggleSaveProject(id));
    setSelectedToDelete([]);
    setIsDeleteMode(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text variant="h2" weight="bold">Saved Projects</Text>
          {savedProjectsData.length > 0 && (
            <Button
              title="Delete"
              icon={<Trash2 size={20} color={isDeleteMode ? theme.colors.error : theme.colors.text} />}
              variant="ghost"
              onPress={() => setIsDeleteMode(!isDeleteMode)}
              style={styles.deleteButton}
            />
          )}
        </View>
        <Text variant="body" style={{ marginTop: 8 }}>
          Projects you've bookmarked for later
        </Text>
        {isDeleteMode && selectedToDelete.length > 0 && (
          <View style={styles.deleteBar}>
            <Text variant="body">
              {selectedToDelete.length} project{selectedToDelete.length > 1 ? 's' : ''} selected
            </Text>
            <Button
              title="Delete Selected"
              onPress={handleDelete}
              variant="outline"
              textStyle={{ color: theme.colors.error }}
              style={[styles.deleteSelectedButton, { borderColor: theme.colors.error }]}
            />
          </View>
        )}
      </View>

      {savedProjectsData.length === 0 ? (
        <View style={styles.emptyState}>
          <Text variant="h4" weight="medium">No saved projects yet</Text>
          <Text variant="body" style={styles.emptyStateMessage}>
            Projects you save will appear here for easy access
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedProjectsData}
          renderItem={({ item }) => (
            <ProjectCard
              title={item.title}
              image={{ uri: item.imageUrl }}
              skillLevel={item.skillLevel as SkillLevel}
              duration={item.duration}
              toolCount={item.toolCount}
              isCompleted={false}
              isDeleteMode={isDeleteMode}
              isSelected={selectedToDelete.includes(item.id)}
              onToggleSelect={() => handleToggleSelect(item.id)}
              onPress={() => router.push(`/project/${item.id}`)}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.projectsList}
          showsVerticalScrollIndicator={false}
        />
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
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 8,
  },
  deleteBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  deleteSelectedButton: {
    marginLeft: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyStateMessage: {
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.7,
  },
  projectsList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});