import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import CategoryFilter from "./components/CategoryFilter.jsx";
import PromptCard from "./components/PromptCard.jsx";
import PromptModal from "./components/PromptModal.jsx";
import { searchPrompts } from "./data/prompts";
import { safeGetLocalStorage, safeSetLocalStorage } from "./utils/security";
import "./styles/globals.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update filtered prompts when search or category changes
  useEffect(() => {
    const results = searchPrompts(searchQuery, selectedCategory);
    setFilteredPrompts(results);
  }, [searchQuery, selectedCategory]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      // CMD/Ctrl + K for search focus
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Focus search input (basic implementation)
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
    // Safely update download count in localStorage with validation
    if (!prompt || !prompt.id) {
      console.warn("Invalid prompt data");
      return;
    }

    const downloadKey = `prompt-${prompt.id}-downloads`;
    const currentDownloads = safeGetLocalStorage(downloadKey) || "0";

    // Validate the stored value is a valid number
    const currentCount = parseInt(currentDownloads, 10) || 0;
    const newDownloads = currentCount + 1;

    // Prevent unrealistic download counts (security measure)
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
    <div style={{ minHeight: "100vh" }}>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 var(--spacing-lg)",
          paddingBottom: "var(--spacing-2xl)",
        }}
      >
        {/* Results Header */}
        <div style={{ marginBottom: "var(--spacing-xl)" }}>
          <h2 className="text-lg font-medium mb-sm">
            {searchQuery ? (
              <>
                Search results for{" "}
                <span style={{ color: "var(--accent-coral)" }}>
                  "{searchQuery}"
                </span>
              </>
            ) : selectedCategory === "All" ? (
              "All Prompts"
            ) : (
              `${selectedCategory} Prompts`
            )}
          </h2>
          <p className="text-secondary text-sm">
            {filteredPrompts.length} prompt
            {filteredPrompts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Empty State */}
        {filteredPrompts.length === 0 ? (
          <div
            className="glass"
            style={{
              borderRadius: "var(--radius-xl)",
              padding: "var(--spacing-2xl)",
              textAlign: "center",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <div
              style={{ fontSize: "4rem", marginBottom: "var(--spacing-lg)" }}
            >
              🔍
            </div>
            <h3 className="text-xl font-semibold mb-sm">No prompts found</h3>
            <p className="text-secondary mb-lg">
              {searchQuery
                ? `No prompts match "${searchQuery}". Try different keywords or browse categories.`
                : `No prompts in ${selectedCategory} category. Try a different category.`}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="btn btn-primary"
            >
              <span>🌟</span>
              <span>Show All Prompts</span>
            </button>
          </div>
        ) : (
          /* Prompts Grid */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "var(--spacing-lg)",
            }}
          >
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onViewDetails={handlePromptClick}
              />
            ))}
          </div>
        )}
      </main>

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
