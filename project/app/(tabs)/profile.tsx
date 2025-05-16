import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { router } from 'expo-router';
import { Settings, Heart, History, PenTool as Tool, ChevronRight, Bell, CircleHelp as HelpCircle, LogOut, Check } from 'lucide-react-native';
import { useSavedProjects } from '@/contexts/SavedProjectsContext';
import { useTheme } from '@/hooks/useTheme';
import { allProjects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';

export default function ProfileScreen() {
  const theme = useTheme();
  const { savedProjects, completedProjects } = useSavedProjects();
  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text variant="h2" weight="bold">Profile</Text>
            <TouchableOpacity>
              <Settings size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileSection}>
          <View 
            style={[
              styles.profileImageContainer, 
              { backgroundColor: theme.colors.backgroundSecondary }
            ]}
          >
            <Text variant="h1" weight="medium" style={{ color: theme.colors.primary }}>
              J
            </Text>
          </View>
          <Text variant="h3" weight="bold" style={styles.profileName}>
            Jane Smith
          </Text>
          <Text variant="body" style={styles.profileInfo}>
            Member since June 2023
          </Text>
          <Button 
            title="Edit Profile" 
            onPress={() => {}} 
            variant="outline"
            size="sm"
            style={styles.editButton}
          />
        </View>

        <View style={styles.statsSection}>
          <Card style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text variant="h3" weight="bold" color="primary">
                  {completedProjects.length}
                </Text>
                <Text variant="bodySmall">Projects Completed</Text>
              </View>
              <View 
                style={[
                  styles.statsDivider, 
                  { backgroundColor: theme.colors.border }
                ]} 
              />
              <View style={styles.statItem}>
                <Text variant="h3" weight="bold" color="primary">
                  3
                </Text>
                <Text variant="bodySmall">In Progress</Text>
              </View>
              <View 
                style={[
                  styles.statsDivider, 
                  { backgroundColor: theme.colors.border }
                ]} 
              />
              <View style={styles.statItem}>
                <Text variant="h3" weight="bold" color="primary">
                  {savedProjects.length}
                </Text>
                <Text variant="bodySmall">Saved Items</Text>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.menuSection}>
          <Card elevation={0} padded={false}>
            <MenuItem 
              icon={<Heart size={20} color={theme.colors.primary} />}
              title="Saved Projects"
              badge={savedProjects.length > 0 ? savedProjects.length.toString() : undefined}
              onPress={() => router.push('/saved')}
              theme={theme}
            />
            <View 
              style={[
                styles.menuDivider, 
                { backgroundColor: theme.colors.border }
              ]} 
            />
            <MenuItem 
              icon={<History size={20} color={theme.colors.primary} />}
              title="Project History"
              onPress={() => {}}
              theme={theme}
            />
            <View 
              style={[
                styles.menuDivider, 
                { backgroundColor: theme.colors.border }
              ]} 
            />
            <MenuItem 
              icon={<Tool size={20} color={theme.colors.primary} />}
              title="My Tools"
              badge="12"
              onPress={() => {}}
              theme={theme}
            />
          </Card>
        </View>

        <View style={styles.menuSection}>
          <Card elevation={0} padded={false}>
            <MenuItem 
              icon={<Check size={20} color={theme.colors.success} />}
              title={`Completed Projects (${completedProjects.length})`}
              badge={completedProjects.length > 0 ? completedProjects.length.toString() : undefined}
              onPress={() => router.push('/completed')}
              theme={theme}
            />
          </Card>
        </View>

        <View style={styles.menuSection}>
          <Card elevation={0} padded={false}>
            <MenuItem 
              icon={<Bell size={20} color={theme.colors.primary} />}
              title="Notifications"
              onPress={() => {}}
              theme={theme}
            />
            <View 
              style={[
                styles.menuDivider, 
                { backgroundColor: theme.colors.border }
              ]} 
            />
            <MenuItem 
              icon={<HelpCircle size={20} color={theme.colors.primary} />}
              title="Help & Support"
              onPress={() => {}}
              theme={theme}
            />
          </Card>
        </View>

        <Button 
          title="Log Out" 
          onPress={() => {}} 
          variant="outline"
          icon={<LogOut size={18} color={theme.colors.error} />}
          textStyle={{ color: theme.colors.error }}
          style={[
            styles.logoutButton, 
            { borderColor: theme.colors.error }
          ]}
        />
      </ScrollView>
    </View>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  onPress: () => void;
  theme: any;
}

function MenuItem({ icon, title, badge, onPress, theme }: MenuItemProps) {
  return (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View 
          style={[
            styles.menuItemIcon, 
            { backgroundColor: `${theme.colors.primary}10` }
          ]}
        >
          {icon}
        </View>
        <Text variant="body" style={styles.menuItemTitle}>
          {title}
        </Text>
      </View>
      
      <View style={styles.menuItemRight}>
        {badge && (
          <View 
            style={[
              styles.menuItemBadge, 
              { backgroundColor: `${theme.colors.primary}20` }
            ]}
          >
            <Text 
              variant="caption" 
              weight="medium" 
              color="primary"
            >
              {badge}
            </Text>
          </View>
        )}
        <ChevronRight size={20} color={theme.colors.textSecondary} />
      </View>
    </TouchableOpacity>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    marginTop: 16,
  },
  profileInfo: {
    marginTop: 4,
    opacity: 0.7,
  },
  editButton: {
    marginTop: 16,
  },
  statsSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  statsCard: {
    paddingVertical: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statsDivider: {
    width: 1,
    height: '80%',
  },
  menuSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemTitle: {
    
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  menuDivider: {
    height: 1,
    marginHorizontal: 16,
  },
  completedSnippets: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  snippetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  snippetText: {
    marginLeft: 12,
    flex: 1,
  },
  moreProjects: {
    marginTop: 8,
    textAlign: 'center',
  },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  completedSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.7,
  },
});