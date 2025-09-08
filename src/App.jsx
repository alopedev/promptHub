import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Header from "./components/Header.jsx";
import PromptSuperpowers from "./components/PromptSuperpowers.jsx";
import CuratedCollections from "./components/CuratedCollections.jsx";
import PromptCard from "./components/PromptCard.jsx";
import PromptModal from "./components/PromptModal.jsx";
import FloatingElements from "./components/FloatingElements.jsx";
import { AppProviders, useSearch, useUI } from "./contexts/index.jsx";
import { staggerContainer, staggerItem, fadeInUp } from "./utils/animations";
import "./styles/globals.css";

// Main App content component using contexts
const AppContent = () => {
  // Use contexts for state management
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedSuperpower, 
    setSelectedSuperpower, 
    filteredPrompts, 
    resetFilters 
  } = useSearch();
  
  const { 
    selectedPrompt, 
    isModalOpen, 
    handlePromptClick, 
    handleCloseModal, 
    handleCopyPrompt 
  } = useUI();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      // CMD/Ctrl + K for search focus
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Focus search input
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingElements />
      
      {/* Header with Hero Section */}
      <Header />

      {/* Curated Collections - Featured first */}
      <CuratedCollections />

      {/* Prompt Superpowers Explorer - Filter before content */}
      <PromptSuperpowers />

      {/* Main Content with Page Transition */}
      <motion.main 
        className="container mx-auto max-w-7xl px-6 py-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 15,
          delay: 0.5 
        }}
      >
        {/* Results Header */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-3 font-geist">
            {searchQuery ? (
              <>
                Search results for{" "}
                <span className="text-foreground font-semibold">
                  "{searchQuery}"
                </span>
              </>
            ) : selectedSuperpower ? (
              <>
                <span className="text-foreground font-semibold">
                  {selectedSuperpower.toUpperCase()}
                </span>
                {" "}Superpowers
              </>
            ) : selectedCategory === "All" ? (
              "All Prompts"
            ) : (
              `${selectedCategory} Prompts`
            )}
          </h2>
          <p className="text-muted-foreground font-geist">
            {filteredPrompts.length} prompt
            {filteredPrompts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Content */}
        {filteredPrompts.length === 0 ? (
          /* Empty State - Raycast Style */
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative mb-8">
              <div className="h-24 w-24 rounded-2xl bg-muted/50 flex items-center justify-center">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-muted/20 via-muted/30 to-muted/20 blur opacity-30" />
            </div>
            
            <h3 className="text-2xl font-semibold text-foreground mb-4 font-geist">
              No prompts found
            </h3>
            <p className="text-muted-foreground mb-8 text-center max-w-md leading-7 font-geist">
              {searchQuery
                ? `No prompts match "${searchQuery}". Try different keywords or browse categories.`
                : `No prompts in ${selectedCategory} category. Try a different category.`}
            </p>
            
            <button
              onClick={resetFilters}
              className="btn-secondary px-6 py-3"
            >
              <span className="mr-2">✨</span>
              Show All Prompts
            </button>
          </div>
        ) : (
          /* Clean Grid - Uniform Card Layout with Linear.app Style */
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <AnimatePresence>
              {filteredPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  layout
                  variants={staggerItem}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="h-full"
                >
                  <PromptCard
                    prompt={prompt}
                    onViewDetails={handlePromptClick}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More Button - Modern Style */}
        {filteredPrompts.length > 0 && filteredPrompts.length >= 6 && (
          <div className="flex justify-center mt-20">
            <button className="btn-modern group text-foreground">
              <span>Load more prompts</span>
              <div className="ml-2 w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
                <div className="w-4 h-4 rounded-full bg-accent/20 animate-pulse"></div>
              </div>
            </button>
          </div>
        )}
      </motion.main>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card/20">
        <div className="container mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-6 w-6 rounded bg-muted border border-border/30" />
              <span className="text-lg font-semibold text-foreground font-geist">PromptHub</span>
            </div>
            <p className="text-sm text-muted-foreground font-geist">
              PromptVault - Curated AI Prompts
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <PromptModal
        prompt={selectedPrompt}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCopy={handleCopyPrompt}
      />
    </div>
  );
};

// Main App component with providers
function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}

export default App;