'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProjects: any[];
  setFilteredProjects: (projects: any[]) => void;
 filteredEvents: any[];
  setFilteredEvents: (events: any[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      filteredProjects,
      setFilteredProjects,
      filteredEvents,
      setFilteredEvents
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};