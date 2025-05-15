import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { SearchBar } from '@/components/ui/SearchBar';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/Button';
import { SlidersHorizontal, ArrowDownUp } from 'lucide-react-native';
import { useSavedProjects } from '@/contexts/SavedProjectsContext';
import { allProjects } from '@/data/projects';
import { useTheme } from '@/hooks/useTheme';


export default function ProjectsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { savedProjects, completedProjects, toggleSaveProject } = useSavedProjects();
  const theme = useTheme();


  // Filter projects based on search query
  const filteredProjects = allProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="h2" weight="bold">Projects</Text>
        <Text variant="body" style={{ marginTop: 8 }}>
          Find step-by-step guides for your DIY projects
        </Text>

        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search projects..."
            style={styles.searchBar}
          />
        </View>

        <View style={styles.filterContainer}>
          <Button
            title="Filter"
            onPress={() => {}}
            variant="outline"
            icon={<SlidersHorizontal size={16} color={theme.colors.primary} />}
            style={styles.filterButton}
          />
          <Button
            title="Sort"
            onPress={() => {}}
            variant="outline"
            icon={<ArrowDownUp size={16} color={theme.colors.primary} />}
            style={styles.filterButton}
          />
        </View>
      </View>

      {filteredProjects.length === 0 ? (
        <View style={styles.emptyState}>
          <Text variant="h4" weight="medium">No projects found</Text>
          <Text variant="body" style={styles.emptyStateMessage}>
            Try adjusting your search or filters to find what you're looking for
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProjects}
          renderItem={({ item }) => (
            <ProjectCard
              title={item.title}
              image={{ uri: item.imageUrl }}
              skillLevel={item.skillLevel as any}
              duration={item.duration}
              toolCount={item.toolCount}
              isCompleted={completedProjects.includes(item.id)}
              isSaved={savedProjects.includes(item.id)}
              onToggleSave={() => toggleSaveProject(item.id)}
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
    paddingBottom: 16,
  },
  searchContainer: {
    marginTop: 16,
  },
  searchBar: {
    marginVertical: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
  },
  filterButton: {
    marginRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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