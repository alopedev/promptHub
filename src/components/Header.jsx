import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Command, Star, Users, Sparkles, Package, Github, Zap, ArrowRight } from 'lucide-react';
import { validateSearchQuery } from '../utils/security';
import { useDebounce } from '../hooks/useDebounce';
import { useSearch } from '../contexts/index.jsx';
import { spectacularEntrance, magneticHover } from '../utils/animations';

const Header = () => {
  const { searchQuery, setSearchQuery, setSelectedCategory } = useSearch();
  // Local state for immediate input updates
  const [inputValue, setInputValue] = useState(searchQuery);
  
  // Debounced value that triggers search after 300ms
  const debouncedSearchQuery = useDebounce(inputValue, 300);
  
  // Effect to update parent search query when debounced value changes
  React.useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setSearchQuery]);
  
  // Effect to sync input with external search query changes
  React.useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e) => {
    const sanitizedQuery = validateSearchQuery(e.target.value);
    setInputValue(sanitizedQuery);
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
              
              {/* Navigation Links - Modern */}
              <div className="hidden md:flex items-center gap-8">
                <button 
                  className="group relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 font-geist flex items-center gap-2"
                  onClick={() => setSelectedCategory("All")}
                >
                  <Sparkles className="h-4 w-4" />
                  Explore
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button className="group relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 font-geist flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Collections
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
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
              
              {/* GitHub Link */}
              <button className="group h-9 w-9 rounded-lg bg-muted/50 hover:bg-muted/80 border border-border/30 hover:border-border/50 flex items-center justify-center transition-all duration-300">
                <Github className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Spectacular Modern Design */}
      <section className="relative overflow-hidden min-h-[80vh] gradient-hero gradient-animated">
        {/* Advanced background effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/30 via-accent/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-b from-accent/40 to-secondary/20 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-t from-primary/30 to-accent/20 rounded-full blur-2xl animate-ping" style={{ animationDuration: '6s' }} />
        
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 glass-panel opacity-50" />
        
        <div className="container mx-auto max-w-7xl px-6 pt-20 pb-32 relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            {/* Animated Badge */}
            <motion.div 
              className="mb-12"
              variants={spectacularEntrance}
              initial="initial"
              animate="animate"
            >
              <motion.div 
                className="inline-flex items-center gap-3 rounded-full glass-strong px-6 py-3 text-sm font-medium text-foreground shadow-colorful"
                whileHover={magneticHover}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="h-4 w-4 text-accent" />
                </motion.div>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
                  Discover premium AI prompts
                </span>
              </motion.div>
            </motion.div>

            {/* Spectacular Animated Heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                delay: 0.2 
              }}
            >
              <h1 className="mb-8 text-6xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl font-geist leading-tight">
                Build better with{" "}
                <motion.span 
                  className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  AI prompts
                </motion.span>
              </h1>
            </motion.div>

            {/* Animated Subheading */}
            <motion.p 
              className="mb-12 text-xl text-muted-foreground leading-8 text-balance max-w-3xl mx-auto font-geist"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                delay: 0.4 
              }}
            >
              Meet the system for modern AI workflows. Streamline prompts, 
              enhance productivity, and build exceptional results with our curated collection.
            </motion.p>

            {/* Enhanced Search Bar with Modern Design */}
            <motion.div 
              className="relative mb-16 mx-auto max-w-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                delay: 0.6 
              }}
            >
              <motion.div 
                className="group relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 hover:border-blue-300/60 focus-within:border-blue-400/80 transition-all duration-300"
                whileHover={{ 
                  scale: 1.01, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.3)" 
                }}
              >
                {/* Search Icon */}
                <motion.div
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-10"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Search className="h-6 w-6 text-blue-500 group-focus-within:text-blue-600" />
                </motion.div>
                
                {/* Input Field */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleSearch}
                  placeholder="Search prompts, categories, or authors..."
                  className="w-full pl-16 pr-28 py-6 text-lg font-geist bg-transparent border-none outline-none placeholder:text-gray-400 focus:placeholder:text-gray-500 text-gray-900 rounded-3xl font-medium transition-all duration-200"
                />
                
                {/* Keyboard Shortcut Badge */}
                <motion.div
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-10"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 group-focus-within:bg-blue-50 group-focus-within:border-blue-200 border border-gray-200 rounded-xl px-3 py-2 transition-all duration-200">
                    <Command className="h-3.5 w-3.5 text-gray-500 group-focus-within:text-blue-600" />
                    <span className="text-sm font-semibold text-gray-600 group-focus-within:text-blue-700 font-geist-mono">K</span>
                  </div>
                </motion.div>

                {/* Gradient Border Effect on Focus */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[1px] opacity-0 group-focus-within:opacity-100 transition-all duration-500 pointer-events-none">
                  <div className="h-full w-full rounded-3xl bg-white" />
                </div>

                {/* Subtle Glow Effect on Focus */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl shadow-[0_0_0_4px_rgba(59,130,246,0.1)] blur-sm" />
                </div>
              </motion.div>
              
              {/* Enhanced Search Suggestions */}
              <motion.div
                className="mt-6 flex items-center justify-center gap-3 flex-wrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <span className="text-sm text-gray-600 font-medium font-geist">Try:</span>
                {["Creative Writing", "Development", "Marketing"].map((term, index) => (
                  <motion.button
                    key={term}
                    onClick={() => {
                      setInputValue(term);
                      setSearchQuery(term);
                    }}
                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50 hover:border-blue-300/60 text-blue-700 hover:text-blue-800 font-medium text-sm transition-all duration-200"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    {term}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Spectacular CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                delay: 0.8 
              }}
            >
              <motion.button 
                className="group relative overflow-hidden gradient-primary px-10 py-5 rounded-2xl font-semibold text-white shadow-colorful font-geist text-lg"
                onClick={() => {
                  setSelectedCategory("All");
                  // Smooth scroll to All Prompts section
                  const promptsSection = document.querySelector('main');
                  if (promptsSection) {
                    promptsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative flex items-center gap-3">
                  <Sparkles className="h-5 w-5" />
                  Browse Prompts
                  <motion.div
                    className="flex items-center"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </span>
              </motion.button>

              <motion.button
                className="group px-10 py-5 rounded-2xl font-semibold glass-strong border border-white/20 text-foreground font-geist text-lg hover:shadow-colorful"
                onClick={() => {
                  // Smooth scroll to Curated Collections section
                  const collectionsSection = document.querySelector('[data-section="collections"]');
                  if (collectionsSection) {
                    collectionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  View Collections
                </span>
              </motion.button>
            </motion.div>

            {/* Redesigned Stats with High Contrast */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                delay: 1 
              }}
            >
              {[
                { icon: Sparkles, value: "9+", label: "Premium Prompts", gradient: "from-blue-500 to-purple-600" },
                { icon: Users, value: "7", label: "Categories", gradient: "from-purple-500 to-pink-600" },
                { icon: Zap, value: "∞", label: "Possibilities", gradient: "from-pink-500 to-orange-500" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Background Card */}
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 text-center border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:border-gray-300/60">
                    {/* Gradient Border Effect */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.gradient} p-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                      <div className="h-full w-full rounded-3xl bg-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon Container */}
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.gradient} mb-6 shadow-lg`}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                      >
                        <stat.icon className="h-8 w-8 text-white drop-shadow-sm" />
                      </motion.div>
                      
                      {/* Value */}
                      <motion.div
                        className="text-4xl font-bold text-gray-900 mb-3 font-geist"
                        animate={{ 
                          textShadow: ["0 0 0px rgba(0,0,0,0)", "0 2px 4px rgba(0,0,0,0.1)", "0 0 0px rgba(0,0,0,0)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        {stat.value}
                      </motion.div>
                      
                      {/* Label */}
                      <p className="text-gray-600 font-semibold font-geist text-lg">{stat.label}</p>
                    </div>

                    {/* Subtle Background Pattern */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                      <div className="h-full w-full rounded-3xl bg-[radial-gradient(circle_at_50%_50%,theme(colors.gray.400),transparent_70%)]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;