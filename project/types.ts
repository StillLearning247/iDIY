export interface Project {
  id: string;
  title: string;
  imageUrl: string;
  skillLevel: number;
  duration: string;
  toolCount: number;
  category: string;
  description?: string;
  tools?: Array<{
    id: string;
    name: string;
    essential: boolean;
  }>;
  safetyTips?: string[];
  steps?: Array<{
    title: string;
    description: string;
    duration: string;
  }>;
}
