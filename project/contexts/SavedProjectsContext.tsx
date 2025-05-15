import React, { createContext, useContext, useState, useCallback } from 'react';

interface SavedProjectsContextType {
  savedProjects: string[];
  completedProjects: string[];
  toggleSaveProject: (projectId: string) => void;
  completeProject: (projectId: string) => void;
}

const SavedProjectsContext = createContext<SavedProjectsContextType | undefined>(undefined);

export function SavedProjectsProvider({ children }: { children: React.ReactNode }) {
  const [savedProjects, setSavedProjects] = useState<string[]>([]);
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);

  const toggleSaveProject = useCallback((projectId: string) => {
    setSavedProjects(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  }, []);

  const completeProject = useCallback((projectId: string) => {
    setCompletedProjects(prev => {
      if (prev.includes(projectId)) return prev;
      return [...prev, projectId];
    });
  }, []);

  return (
    <SavedProjectsContext.Provider value={{ 
      savedProjects, 
      completedProjects,
      toggleSaveProject, 
      completeProject 
    }}>
      {children}
    </SavedProjectsContext.Provider>
  );
}

export function useSavedProjects() {
  const context = useContext(SavedProjectsContext);
  if (context === undefined) {
    throw new Error('useSavedProjects must be used within a SavedProjectsProvider');
  }
  return context;
}