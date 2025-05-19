import { Tabs } from 'expo-router'
import { Home, Search, Camera, User } from 'lucide-react-native'
import type { LucideProps } from 'lucide-react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '../../hooks/useTheme.js'

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  const TabIcon = (IconComponent: React.ElementType) =>
    function IconWrapper({ color, size }: { color: string; size: number }) {
      return (
        <View style={styles.iconContainer}>
          <IconComponent size={size} color={color} />
        </View>
      )
    }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          height: 60 + insets.bottom,
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: TabIcon(Home),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarIcon: TabIcon(Search),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Identify',
          tabBarIcon: TabIcon(Camera),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: TabIcon(User),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          href: null, // hidden route, no tab
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    shadowOpacity: 0,
    borderTopWidth: 1,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginBottom: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
})
