import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Header from "./components/Header.jsx";
import PromptSuperpowers from "./components/PromptSuperpowers.jsx";
import CuratedCollections from "./components/CuratedCollections.jsx";
import PromptCard from "./components/PromptCard.jsx";
import PromptModal from "./components/PromptModal.jsx";
import { searchPrompts } from "./data/prompts";
import { safeGetLocalStorage, safeSetLocalStorage } from "./utils/security";
import "./styles/globals.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSuperpower, setSelectedSuperpower] = useState(null);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Superpower to category/keyword mapping for filtering
  const getSuperpowerKeywords = (superpower) => {
    const superpowerMap = {
      'automate': ['meeting', 'productivity', 'workflow'],
      'analyze': ['data analysis', 'research', 'review'],
      'create': ['creative writing', 'content', 'social media'],
      'optimize': ['optimization', 'improvement', 'enhancement'],
      'extract': ['summary', 'extract', 'facts'],
      'translate': ['conversion', 'format', 'transform'],
      'validate': ['review', 'check', 'validation'],
      'brainstorm': ['ideas', 'creative', 'brainstorm'],
      'summarize': ['summary', 'summarize', 'bullet points']
    };
    return superpowerMap[superpower] || [];
  };

  // Filter prompts by superpower
  const filterBySuperpower = (prompts, superpower) => {
    if (!superpower) return prompts;
    
    const keywords = getSuperpowerKeywords(superpower);
    return prompts.filter(prompt => 
      keywords.some(keyword => 
        prompt.title.toLowerCase().includes(keyword) ||
        prompt.description.toLowerCase().includes(keyword) ||
        prompt.prompt.toLowerCase().includes(keyword)
      )
    );
  };

  // Update filtered prompts when search, category, or superpower changes
  useEffect(() => {
    let results = searchPrompts(searchQuery, selectedCategory);
    
    // Apply superpower filtering
    if (selectedSuperpower) {
      results = filterBySuperpower(results, selectedSuperpower);
    }
    
    setFilteredPrompts(results);
  }, [searchQuery, selectedCategory, selectedSuperpower]);

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

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPrompt(null);
  };

  const handleCopyPrompt = (prompt) => {
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
    } else {
      console.warn("Failed to update download count");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Hero Section */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />


      {/* Prompt Superpowers Explorer */}
      <PromptSuperpowers
        selectedSuperpower={selectedSuperpower}
        onSuperpowerSelect={setSelectedSuperpower}
      />

      {/* Curated Collections */}
      <CuratedCollections />

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-6 py-12">
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
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedSuperpower(null);
              }}
              className="btn-secondary px-6 py-3"
            >
              <span className="mr-2">✨</span>
              Show All Prompts
            </button>
          </div>
        ) : (
          /* Bento Grid - Modern Asymmetric Layout */
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
            {filteredPrompts.map((prompt, index) => {
              // Create asymmetric bento grid pattern
              const gridPattern = [
                'md:col-span-2 md:row-span-1', // wide
                'md:col-span-1 md:row-span-2', // tall
                'md:col-span-1 md:row-span-1', // small
                'md:col-span-2 md:row-span-1', // wide
                'md:col-span-1 md:row-span-1', // small
                'md:col-span-1 md:row-span-1', // small
                'md:col-span-1 md:row-span-2', // tall
                'md:col-span-2 md:row-span-1', // wide
                'md:col-span-1 md:row-span-1', // small
              ];
              
              const gridClass = gridPattern[index % gridPattern.length];
              
              return (
                <div
                  key={prompt.id}
                  className={`
                    bento-item magnetic-hover animate-slide-in
                    ${gridClass} ${index <= 5 ? `animate-stagger-${Math.min(index + 1, 6)}` : ''}
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PromptCard
                    prompt={prompt}
                    onViewDetails={handlePromptClick}
                  />
                </div>
              );
            })}
          </div>
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
      </main>

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
}

export default App;