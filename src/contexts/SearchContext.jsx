import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { searchPrompts } from '../data/prompts';

// Create contexts
const SearchContext = createContext();

// Custom hooks for accessing contexts
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

// SearchProvider component
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSuperpower, setSelectedSuperpower] = useState(null);

  // Memoized superpower to category/keyword mapping for filtering
  const superpowerMap = useMemo(() => ({
    'automate': ['meeting', 'productivity', 'workflow'],
    'analyze': ['data analysis', 'research', 'review'],
    'create': ['creative writing', 'content', 'social media'],
    'optimize': ['optimization', 'improvement', 'enhancement'],
    'extract': ['summary', 'extract', 'facts'],
    'translate': ['conversion', 'format', 'transform'],
    'validate': ['review', 'check', 'validation'],
    'brainstorm': ['ideas', 'creative', 'brainstorm'],
    'summarize': ['summary', 'summarize', 'bullet points']
  }), []);

  const getSuperpowerKeywords = useCallback((superpower) => {
    return superpowerMap[superpower] || [];
  }, [superpowerMap]);

  // Memoized filter function by superpower
  const filterBySuperpower = useCallback((prompts, superpower) => {
    if (!superpower) return prompts;
    
    const keywords = getSuperpowerKeywords(superpower);
    return prompts.filter(prompt => 
      keywords.some(keyword => 
        prompt.title.toLowerCase().includes(keyword) ||
        prompt.description.toLowerCase().includes(keyword) ||
        prompt.prompt.toLowerCase().includes(keyword)
      )
    );
  }, [getSuperpowerKeywords]);

  // Memoized filtered prompts - optimized performance
  const filteredPrompts = useMemo(() => {
    let results = searchPrompts(searchQuery, selectedCategory);
    
    // Apply superpower filtering
    if (selectedSuperpower) {
      results = filterBySuperpower(results, selectedSuperpower);
    }
    
    return results;
  }, [searchQuery, selectedCategory, selectedSuperpower, filterBySuperpower]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedSuperpower(null);
  }, []);

  // Context value
  const contextValue = useMemo(() => ({
    // State
    searchQuery,
    selectedCategory,
    selectedSuperpower,
    filteredPrompts,
    
    // Actions
    setSearchQuery,
    setSelectedCategory,
    setSelectedSuperpower,
    resetFilters,
    
    // Utils
    superpowerMap,
    getSuperpowerKeywords,
    filterBySuperpower
  }), [
    searchQuery,
    selectedCategory,
    selectedSuperpower,
    filteredPrompts,
    resetFilters,
    superpowerMap,
    getSuperpowerKeywords,
    filterBySuperpower
  ]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};