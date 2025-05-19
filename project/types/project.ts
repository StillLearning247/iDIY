export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Project {
  id: string;
  title: string;
  imageUrl: string;
  skillLevel: SkillLevel;
  duration: string;
  toolCount: number;
  category: string;
}
