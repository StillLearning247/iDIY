import React, { createContext, useContext, useState } from 'react';
import { Project } from './types';

// Sample project data
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Fix a Leaky Faucet',
    imageUrl: 'https://images.pexels.com/photos/1027508/pexels-photo-1027508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    skillLevel: 1,
    duration: '30 min',
    toolCount: 3,
    category: 'Plumbing',
    description: 'Learn how to fix a leaky faucet in your home',
    tools: [
      { id: '1', name: 'Wrench', essential: true },
      { id: '2', name: 'Plumber Tape', essential: true }
    ],
    safetyTips: [
      'Turn off water supply before starting',
      'Use proper safety gloves'
    ],
    steps: [
      { title: 'Preparation', description: 'Turn off water supply and gather tools', duration: '5 min' },
      { title: 'Disassembly', description: 'Remove faucet handle and trim', duration: '10 min' },
      { title: 'Repair', description: 'Replace washer or O-ring', duration: '10 min' },
      { title: 'Reassembly', description: 'Reinstall faucet parts', duration: '5 min' }
    ]
  },
  {
    id: '2',
    title: 'Install a Ceiling Fan',
    imageUrl: 'https://images.pexels.com/photos/7728082/pexels-photo-7728082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    skillLevel: 3,
    duration: '2 hours',
    toolCount: 6,
    category: 'Electrical',
    description: 'Step-by-step guide to installing a ceiling fan',
    tools: [
      { id: '1', name: 'Screwdriver', essential: true },
      { id: '2', name: 'Wire Strippers', essential: true },
      { id: '3', name: 'Voltage Tester', essential: true }
    ],
    safetyTips: [
      'Turn off power at breaker',
      'Use proper safety equipment',
      'Work with a partner'
    ],
    steps: [
      { title: 'Preparation', description: 'Turn off power and gather tools', duration: '15 min' },
      { title: 'Installation', description: 'Install bracket and wiring', duration: '1 hour' },
      { title: 'Assembly', description: 'Install fan blades', duration: '30 min' },
      { title: 'Testing', description: 'Test fan operation', duration: '15 min' }
    ]
  }
];

interface ProjectContextType {
  projects: Project[];
  getProjectById: (id: string) => Project | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const getProjectById = (id: string): Project | null => {
    return sampleProjects.find(p => p.id === id) || null;
  };

  return (
    <ProjectContext.Provider value={{ projects: sampleProjects, getProjectById }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
