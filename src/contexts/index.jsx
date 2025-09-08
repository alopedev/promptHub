// Export all contexts and providers
export { SearchProvider, useSearch } from './SearchContext';
export { UIProvider, useUI } from './UIContext';

// Combined provider component for convenience
import React from 'react';
import { SearchProvider } from './SearchContext';
import { UIProvider } from './UIContext';

export const AppProviders = ({ children }) => {
  return (
    <SearchProvider>
      <UIProvider>
        {children}
      </UIProvider>
    </SearchProvider>
  );
};