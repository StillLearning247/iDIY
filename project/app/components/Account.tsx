import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase.js'
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import { Text } from '@/components/ui/Text.js'
import { Card } from '@/components/ui/Card.js'
import { Button } from '@/components/ui/Button.js'
import { router } from 'expo-router'
import { Settings, Heart, History, PenTool as Tool, ChevronRight, Bell, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native'
import { useSavedProjects } from '@/contexts/SavedProjectsContext.js'
import { useTheme } from '@/hooks/useTheme.js'
import { allProjects } from '@/data/projects.js'
import { ProjectCard } from '@/components/ui/ProjectCard.js'
import { Session } from '@supabase/supabase-js'

interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  email: string;
  avatar_url: string;
  created_at: string;
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  badge?: string;
  theme: any;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress, badge, theme }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <View style={styles.menuItemIcon}>{icon}</View>
      <Text style={[styles.menuItemText, { color: theme.colors.text }]}>{title}</Text>
      {badge && (
        <Text style={[styles.menuItemBadge, { backgroundColor: theme.colors.primary }]}>
          {badge}
        </Text>
      )}
      <ChevronRight size={20} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );
}

export default function Account({ session }: { session: Session }) {
  const theme = useTheme();
  const { savedProjects, completedProjects } = useSavedProjects();
  const [showCompleted, setShowCompleted] = useState(false);
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      setUser(profileData);
      setUsername(profileData.username || '');
      setWebsite(profileData.website || '');
      setAvatarUrl(profileData.avatar_url || '');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to load profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchUser();
  }, [session]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')
      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }
      const { error } = await supabase.from('profiles').upsert(updates)
      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

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
              <Settings size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <Text variant="h3" weight="bold" style={styles.profileName}>
                Loading...
              </Text>
            </View>
          ) : user ? (
            <>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: avatarUrl || 'https://via.placeholder.com/80' }}
                  style={styles.profileImage}
                />
              </View>
              <Text variant="h3" weight="bold" style={styles.profileName}>
                {user.full_name || 'No name set'}
              </Text>
              <Text variant="body" style={styles.profileInfo}>
                {user.email}
              </Text>
            </>
          ) : (
            <View style={styles.errorContainer}>
              <Text variant="body" style={styles.errorText}>
                Failed to load profile data
              </Text>
              <Button
                title="Retry"
                variant="primary"
                onPress={fetchUser}
                style={styles.retryButton}
              />
            </View>
          )}
        </View>

        <View style={styles.menuSection}>
          <Card elevation={0} padded={false}>
            <MenuItem
              icon={<Bell size={20} color={theme.colors.primary} />}
              title="Notifications"
              onPress={() => router.push('../notifications')}
              theme={theme}
            />
            <MenuItem
              icon={<Heart size={20} color={theme.colors.primary} />}
              title="Saved Projects"
              badge={savedProjects.length.toString()}
              onPress={() => router.push('../saved-projects')}
              theme={theme}
            />
            <MenuItem
              icon={<History size={20} color={theme.colors.primary} />}
              title="Completed Projects"
              badge={completedProjects.length.toString()}
              onPress={() => router.push('../completed-projects')}
              theme={theme}
            />
            <MenuItem
              icon={<Tool size={20} color={theme.colors.primary} />}
              title="Your Projects"
              onPress={() => router.push('../your-projects')}
              theme={theme}
            />
            <MenuItem
              icon={<HelpCircle size={20} color={theme.colors.primary} />}
              title="Help & Support"
              onPress={() => router.push('../help')}
              theme={theme}
            />
          </Card>
        </View>

        <View style={styles.menuSection}>
          <Card elevation={0} padded={false}>
            <MenuItem
              icon={<LogOut size={20} color={theme.colors.primary} />}
              title="Sign Out"
              onPress={() => supabase.auth.signOut()}
              theme={theme}
            />
          </Card>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  profileInfo: {
    color: '#666',
    marginTop: 4,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 8,
  },
  retryButton: {
    width: '100%',
  },
  menuSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 16,
  },
})