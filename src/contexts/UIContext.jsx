import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { safeGetLocalStorage, safeSetLocalStorage } from '../utils/security';

// Create contexts
const UIContext = createContext();

// Custom hooks for accessing contexts
export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

// UIProvider component
export const UIProvider = ({ children }) => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle opening modal with prompt
  const handlePromptClick = useCallback((prompt) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  }, []);

  // Handle closing modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPrompt(null);
  }, []);

  // Handle copying prompt with download tracking
  const handleCopyPrompt = useCallback((prompt) => {
    if (!prompt || !prompt.id) {
      console.warn("Invalid prompt data");
      return;
    }

    const downloadKey = `prompt-${prompt.id}-downloads`;
    const currentDownloads = safeGetLocalStorage(downloadKey) || "0";
    const currentCount = parseInt(currentDownloads, 10) || 0;
    const newDownloads = currentCount + 1;

    if (newDownloads > 1000000) {
      console.warn("Download count exceeds reasonable limit");
      return;
    }

    const success = safeSetLocalStorage(downloadKey, newDownloads.toString());
    if (success) {
      console.log(`Copied prompt: ${prompt.title}`);
      // Could add toast notification here in the future
    } else {
      console.warn("Failed to update download count");
    }
  }, []);

  // Context value
  const contextValue = useMemo(() => ({
    // State
    selectedPrompt,
    isModalOpen,
    
    // Actions
    setSelectedPrompt,
    setIsModalOpen,
    handlePromptClick,
    handleCloseModal,
    handleCopyPrompt
  }), [
    selectedPrompt,
    isModalOpen,
    handlePromptClick,
    handleCloseModal,
    handleCopyPrompt
  ]);

  return (
    <UIContext.Provider value={contextValue}>
      {children}
    </UIContext.Provider>
  );
};