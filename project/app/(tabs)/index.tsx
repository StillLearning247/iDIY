import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { Hammer, MessageCircle, CirclePlus as PlusCircle, ArrowRight } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryButton } from '@/components/ui/CategoryButton';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';

// Sample data for projects
const featuredProjects = [
  {
    id: '1',
    title: 'Fix a Leaky Faucet',
    imageUrl: 'https://images.pexels.com/photos/1027508/pexels-photo-1027508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    skillLevel: 1,
    duration: '30 min',
    toolCount: 3,
  },
  {
    id: '2',
    title: 'Install a Ceiling Fan',
    imageUrl: 'https://images.pexels.com/photos/7728082/pexels-photo-7728082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    skillLevel: 3,
    duration: '2 hours',
    toolCount: 6,
  },
  {
    id: '3',
    title: 'Paint a Room Like a Pro',
    imageUrl: 'https://images.pexels.com/photos/3255249/pexels-photo-3255249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    skillLevel: 2,
    duration: '1 day',
    toolCount: 8,
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text variant="h2" weight="bold">iDIY</Text>
          <Text variant="h3" weight="medium" style={styles.tagline}>
            Your DIY Assistant
          </Text>
          
          <View style={styles.searchContainer}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search for projects or questions..."
              style={styles.searchBar}
            />
          </View>

          <Card style={styles.aiCard}>
            <View style={styles.aiCardContent}>
              <View style={styles.aiCardTextContainer}>
                <Text variant="h4" weight="medium">
                  Ask me anything about your home!
                </Text>
                <Text variant="bodySmall" style={styles.aiCardDescription}>
                  Get instant help with repairs, maintenance, or DIY ideas.
                </Text>
              </View>
              <View 
                style={[
                  styles.aiCardIconContainer, 
                  { backgroundColor: `${theme.colors.accent}20` }
                ]}
              >
                <MessageCircle size={28} color={theme.colors.accent} />
              </View>
            </View>
            <Pressable 
              style={[
                styles.aiCardButton, 
                { backgroundColor: theme.colors.primary }
              ]}
            >
              <Text weight="medium" style={{ color: 'white' }}>
                Ask AI Assistant
              </Text>
              <ArrowRight size={18} color="white" style={{ marginLeft: 8 }} />
            </Pressable>
          </Card>
        </View>

        <View style={styles.categoriesSection}>
          <Text variant="h4" weight="medium" style={styles.sectionTitle}>
            Categories
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            <CategoryButton
              title="All"
              icon={<Hammer />}
              onPress={() => setActiveCategory('All')}
              isActive={activeCategory === 'All'}
            />
            <CategoryButton
              title="Plumbing"
              icon={<Hammer />}
              onPress={() => setActiveCategory('Plumbing')}
              isActive={activeCategory === 'Plumbing'}
            />
            <CategoryButton
              title="Electrical"
              icon={<Hammer />}
              onPress={() => setActiveCategory('Electrical')}
              isActive={activeCategory === 'Electrical'}
            />
            <CategoryButton
              title="Painting"
              icon={<Hammer />}
              onPress={() => setActiveCategory('Painting')}
              isActive={activeCategory === 'Painting'}
            />
            <CategoryButton
              title="Furniture"
              icon={<Hammer />}
              onPress={() => setActiveCategory('Furniture')}
              isActive={activeCategory === 'Furniture'}
            />
          </ScrollView>
        </View>

        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text variant="h4" weight="medium">
              Featured Projects
            </Text>
            <Button 
              title="View All" 
              onPress={() => {}} 
              variant="ghost" 
              size="sm"
              icon={<ArrowRight size={16} color={theme.colors.primary} />}
            />
          </View>
          
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              image={{ uri: project.imageUrl }}
              skillLevel={project.skillLevel as any}
              duration={project.duration}
              toolCount={project.toolCount}
              onPress={() => router.push(`/project/${project.id}`)}
            />
          ))}
        </View>

        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text variant="h4" weight="medium">
              Recent Activities
            </Text>
            <Button 
              title="View All" 
              onPress={() => {}} 
              variant="ghost" 
              size="sm"
              icon={<ArrowRight size={16} color={theme.colors.primary} />}
            />
          </View>
          
          <Card style={styles.emptyCard}>
            <View style={styles.emptyCardContent}>
              <PlusCircle size={40} color={theme.colors.textSecondary} />
              <Text 
                variant="body" 
                weight="medium" 
                style={[styles.emptyCardText, { color: theme.colors.textSecondary }]}
              >
                No recent activities
              </Text>
              <Text variant="bodySmall" style={{ textAlign: 'center' }}>
                Start tracking your DIY projects and they'll appear here
              </Text>
              <Button 
                title="Explore Projects" 
                onPress={() => {}} 
                variant="primary" 
                size="sm"
                style={styles.emptyCardButton}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  tagline: {
    marginTop: 4,
  },
  searchContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 8,
  },
  aiCard: {
    marginTop: 8,
  },
  aiCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiCardTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  aiCardDescription: {
    marginTop: 4,
    opacity: 0.7,
  },
  aiCardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
  },
  categoriesSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingRight: 16,
    gap: 12,
  },
  featuredSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  emptyCard: {
    padding: 24,
  },
  emptyCardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  emptyCardText: {
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCardButton: {
    marginTop: 24,
  },
});