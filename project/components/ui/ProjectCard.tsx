import React from 'react';
import { View, StyleSheet, Image, Pressable, ImageSourcePropType } from 'react-native';
import { ChevronRight, Clock, PenTool as Tool, Check, Heart, Trophy } from 'lucide-react-native';
import { Card } from './Card';
import { Text } from './Text';
import { SkillLevelBadge } from './SkillLevelBadge';
import { useTheme } from '@/hooks/useTheme';

interface ProjectCardProps {
  title: string;
  image: ImageSourcePropType;
  skillLevel: 1 | 2 | 3 | 4 | 5;
  duration: string;
  toolCount: number;
  isCompleted?: boolean;
  isSaved?: boolean;
  onToggleSave?: () => void;
  isDeleteMode?: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onPress: () => void;
}

export function ProjectCard({
  title,
  image,
  skillLevel,
  duration,
  toolCount,
  isCompleted = false,
  isSaved = false,
  onToggleSave,
  isDeleteMode = false,
  isSelected = false,
  onToggleSelect,
  onPress,
}: ProjectCardProps) {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card} elevation={1} padded={false}>
        <Image source={image} style={styles.image} />
        {isCompleted && (
          <View 
            style={[
              styles.completedBadge,
              { backgroundColor: theme.colors.success }
            ]}
          >
            <Trophy size={14} color="white" />
            <Text 
              variant="caption" 
              weight="medium" 
              style={styles.completedText}
            >
              Completed
            </Text>
          </View>
        )}
        {isDeleteMode && (
          <Pressable 
            onPress={onToggleSelect}
            style={[
              styles.checkbox,
              isSelected && { backgroundColor: theme.colors.primary }
            ]}
          >
            {isSelected && (
              <Check size={20} color="white" />
            )}
          </Pressable>
        )}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text variant="h4" weight="medium" numberOfLines={2} style={styles.title}>
              {title}
            </Text>
            <View style={styles.headerRight}>
              {onToggleSave && (
                <Pressable 
                  onPress={onToggleSave}
                  style={styles.heartButton}
                  hitSlop={8}
                >
                  <Heart
                    size={20}
                    color={isSaved ? theme.colors.error : theme.colors.textSecondary}
                    fill={isSaved ? theme.colors.error : 'none'}
                  />
                </Pressable>
              )}
              <ChevronRight 
                size={20} 
                color={theme.colors.textSecondary}
                style={styles.chevron}
              />
            </View>
          </View>
          
          <View style={styles.footer}>
            <SkillLevelBadge level={skillLevel} size="sm" />
            
            <View style={styles.metaContainer}>
              <View style={styles.meta}>
                <Clock size={14} color={theme.colors.textSecondary} />
                <Text variant="caption" style={styles.metaText}>
                  {duration}
                </Text>
              </View>
              
              <View style={styles.meta}>
                <Tool size={14} color={theme.colors.textSecondary} />
                <Text variant="caption" style={styles.metaText}>
                  {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedText: {
    color: 'white',
    marginLeft: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  checkbox: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartButton: {
    marginRight: 8,
  },
  chevron: {
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaContainer: {
    flexDirection: 'row',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  metaText: {
    marginLeft: 4,
  },
});