import React from 'react';
import { Search, Command, Plus, Star, GitBranch, Users } from 'lucide-react';
import { validateSearchQuery } from '../utils/security';

const Header = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  const handleSearch = (e) => {
    const sanitizedQuery = validateSearchQuery(e.target.value);
    setSearchQuery(sanitizedQuery);
  };

  return (
    <>
      {/* Top Navigation - Raycast Style */}
      <nav className="border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border/30">
                  <span className="text-sm font-semibold text-foreground font-geist">P</span>
                </div>
                <span className="text-xl font-semibold text-foreground font-geist">PromptHub</span>
              </div>
              
              {/* Navigation Links - Simplified */}
              <div className="hidden md:flex items-center gap-6">
                <button 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors font-geist"
                  onClick={() => setSelectedCategory("All")}
                >
                  Browse
                </button>
                <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors font-geist">
                  Pricing
                </button>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Shortcut */}
              <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground font-geist">
                <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded-md border border-border/50 bg-muted/50 px-2 font-geist-mono text-[10px] font-medium text-muted-foreground">
                  <Command className="h-3 w-3" />
                  K
                </kbd>
                <span>Search</span>
              </div>
              
              
              {/* User Menu Placeholder */}
              <div className="h-8 w-8 rounded-lg bg-muted border border-border/30 flex items-center justify-center">
                <span className="text-xs font-medium text-foreground font-geist">U</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced Premium */}
      <section className="relative overflow-hidden gradient-hero gradient-animated">
        {/* Premium background effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-secondary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-b from-accent/3 to-transparent rounded-full blur-2xl animate-float" />
        
        <div className="container mx-auto max-w-7xl px-6 pt-20 pb-16 relative">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/30 bg-card/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-muted-foreground font-geist">
              <Star className="h-3 w-3 text-muted-foreground" />
              <span>Discover premium AI prompts</span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl font-geist text-shadow-strong">
              Build better with{" "}
              <span className="text-foreground">
                AI prompts
              </span>
            </h1>

            {/* Subheading */}
            <p className="mb-10 text-xl text-muted-foreground leading-8 text-balance max-w-2xl mx-auto font-geist font-normal text-shadow-subtle">
              Meet the system for modern AI workflows. Streamline prompts, 
              enhance productivity, and build exceptional results.
            </p>

            {/* Search Bar - Raycast Style */}
            <div className="relative mb-10 mx-auto max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search prompts, categories, or authors..."
                className="input-raycast pl-12 pr-20 h-14 text-base shadow-sm font-geist"
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded-md border border-border/50 bg-muted/80 px-2 font-geist-mono text-xs font-medium text-muted-foreground">
                <Command className="h-3 w-3" />
                K
              </kbd>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button 
                className="btn-raycast px-8 py-4 text-base font-geist glow-hover"
                onClick={() => setSelectedCategory("All")}
              >
                <span className="flex items-center gap-2">
                  Browse Prompts
                  <div className="w-1 h-1 bg-accent rounded-full" />
                </span>
              </button>
            </div>

            {/* Stats - Raycast Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center gap-2 rounded-lg bg-muted/30 border border-border/20 px-4 py-2 text-sm font-medium text-foreground font-geist">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  8 prompts
                </div>
                <p className="mt-2 text-xs text-muted-foreground font-geist">Ready to use</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center gap-2 rounded-lg bg-muted/30 border border-border/20 px-4 py-2 text-sm font-medium text-foreground font-geist">
                  <Users className="h-3 w-3" />
                  7 categories
                </div>
                <p className="mt-2 text-xs text-muted-foreground font-geist">Organized collections</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center gap-2 rounded-lg bg-muted/30 border border-border/20 px-4 py-2 text-sm font-medium text-foreground font-geist">
                  <span>18K downloads</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground font-geist">Community trusted</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;