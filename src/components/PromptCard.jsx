import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  User,
  Download,
  Calendar,
  ArrowUpRight,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useUnsplashPhoto } from "../hooks/useUnsplashPhoto";
import { fadeInUp, hoverScale, staggerItem, magneticHover, spectacularEntrance } from "../utils/animations";

// Enhanced category query mapping for better Unsplash relevance
const getCategoryQuery = (category) => {
  const queryMap = {
    "Creative Writing": "writing creativity typewriter pen notebook journal",
    "Development & Programming": "programming code developer workspace monitor keyboard",
    "Marketing & Sales": "marketing business strategy growth charts presentation",
    "Productivity": "productivity workspace organization planner calendar focus",
    "Education": "education learning study books classroom teaching",
    "Design & UX": "design creative interface mockup sketch wireframe",
    "Data Analysis": "data analytics visualization dashboard charts graphs statistics",
  };
  
  return queryMap[category] || "artificial intelligence technology innovation";
};

// Fallback images and gradients
const getCategoryImages = (category) => {
  const imageOptions = {
    "Creative Writing": {
      primary: "https://source.unsplash.com/random/400x250/?writing,typewriter,pen",
      gradient: "from-amber-900 to-amber-700",
    },
    "Development & Programming": {
      primary: "https://source.unsplash.com/random/400x250/?code,programming,computer", 
      gradient: "from-blue-900 to-slate-700",
    },
    "Marketing & Sales": {
      primary: "https://source.unsplash.com/random/400x250/?marketing,business,presentation",
      gradient: "from-green-900 to-emerald-700",
    },
    "Productivity": {
      primary: "https://source.unsplash.com/random/400x250/?productivity,desk,workspace",
      gradient: "from-purple-900 to-indigo-700",
    },
    "Education": {
      primary: "https://source.unsplash.com/random/400x250/?education,books,learning",
      gradient: "from-red-900 to-pink-700",
    },
    "Design & UX": {
      primary: "https://source.unsplash.com/random/400x250/?design,art,creative",
      gradient: "from-cyan-900 to-teal-700",
    },
    "Data Analysis": {
      primary: "https://source.unsplash.com/random/400x250/?data,analytics,charts",
      gradient: "from-orange-900 to-yellow-700",
    },
  };

  return imageOptions[category] || {
    primary: "https://source.unsplash.com/random/400x250/?prompt,ai,technology",
    gradient: "from-gray-900 to-slate-700",
  };
};

// Utility functions for fallback URLs
const withSig = (url, sig) => `${url}${url.includes("?") ? "&" : "?"}sig=${sig}`;
const picsum = (seed, w = 400, h = 250) => 
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

const PromptCard = React.memo(({ prompt, onViewDetails }) => {
  // Get Unsplash photo with professional API integration and lazy loading
  const unsplashQuery = getCategoryQuery(prompt.category);
  const { src: apiSrc, attribution, triggerDownloadOnce, elementRef } = useUnsplashPhoto(unsplashQuery);
  
  // Fallback cascade system
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const categoryImages = useMemo(() => getCategoryImages(prompt.category), [prompt.category]);
  
  // Build complete fallback cascade: API → Unsplash Source (2 attempts) → Picsum → Gradient
  const candidates = useMemo(() => {
    const arr = [];
    if (apiSrc) arr.push(apiSrc);
    
    const sig = Math.floor(Math.random() * 10000);
    arr.push(withSig(categoryImages.primary, sig));
    arr.push(withSig(categoryImages.primary, sig + 1));
    arr.push(picsum(prompt.category, 400, 250));
    
    return arr;
  }, [apiSrc, categoryImages.primary, prompt.category]);

  const currentSrc = fallbackIndex < candidates.length ? candidates[fallbackIndex] : "";
  
  const handleImageError = useCallback(() => {
    setFallbackIndex(prev => prev + 1);
  }, []);

  // Utility functions
  const formatDownloads = (count) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return String(count);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.ceil(Math.abs(+now - +date) / (1000 * 60 * 60 * 24));
    if (diff === 1) return "1 day ago";
    if (diff < 30) return `${diff} days ago`;
    if (diff < 365) return `${Math.floor(diff / 30)} months ago`;
    return `${Math.floor(diff / 365)} years ago`;
  };

  const handleCardClick = () => {
    void triggerDownloadOnce();
    onViewDetails(prompt);
  };

  return (
    <motion.div
      ref={elementRef}
      onClick={handleCardClick}
      variants={staggerItem}
      whileHover={magneticHover}
      whileTap={{ scale: 0.98 }}
      className="
        relative group cursor-pointer h-full
        glass-strong rounded-3xl border border-white/20
        shadow-glow hover:shadow-colorful
        overflow-hidden backdrop-blur-xl
        transition-all duration-500
      "
    >
      {/* Spectacular Image Header with Modern Overlay */}
      <div className="relative h-56 overflow-hidden">
        {currentSrc ? (
          <motion.img
            src={currentSrc}
            alt={prompt.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        ) : (
          // Gradient fallback with animated background
          <motion.div
            className={`w-full h-full bg-gradient-to-br ${categoryImages.gradient} flex items-center justify-center relative`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="text-center text-white/90 z-10">
              <motion.div 
                className="text-2xl font-bold mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {prompt.category}
              </motion.div>
              <div className="text-sm opacity-80">Category Image</div>
            </div>
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            </div>
          </motion.div>
        )}

        {/* Modern gradient overlay with glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

        {/* Animated Category Badge */}
        <motion.div 
          className="absolute top-4 left-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="glass-strong px-4 py-2 rounded-xl border border-white/30 shadow-colorful">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider font-geist bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {prompt.category}
            </span>
          </div>
        </motion.div>

        {/* Interactive Hover Action */}
        <motion.div 
          className="absolute top-4 right-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <div className="w-10 h-10 rounded-xl glass-strong border border-white/30 flex items-center justify-center shadow-colorful">
            <ArrowUpRight className="h-5 w-5 text-accent" />
          </div>
        </motion.div>

        {/* Floating accent elements */}
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-accent rounded-full animate-pulse" />
        <div className="absolute bottom-6 right-8 w-1 h-1 bg-primary rounded-full animate-ping" />
      </div>

      <div className="relative p-8">
        {/* Modern Title with Gradient */}
        <motion.h3 
          className="text-2xl font-bold text-foreground mb-4 leading-tight line-clamp-2 font-geist"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {prompt.title}
        </motion.h3>

        {/* Enhanced Description with better typography */}
        <p className="text-muted-foreground text-base leading-relaxed line-clamp-3 mb-6 font-geist">
          {prompt.description}
        </p>

        {/* Clean metadata - Only real information */}
        <div className="flex items-center justify-between text-sm mb-6 font-geist">
          <motion.div 
            className="flex items-center gap-2 glass-panel px-4 py-2 rounded-xl"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-foreground font-medium">New Prompt</span>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2 glass-strong px-4 py-2 rounded-xl border border-white/20 shadow-glow"
            whileHover={{ scale: 1.02 }}
          >
            <Download className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground font-medium">0 downloads</span>
          </motion.div>
        </div>

        {/* Spectacular Interactive Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-border/20">
          <motion.span 
            className="text-sm text-muted-foreground font-geist flex items-center gap-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-accent rounded-full" />
            Click to explore
          </motion.span>

          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <motion.button
              className="inline-flex items-center gap-2 rounded-xl gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-colorful"
              onClick={(e) => {
                e.stopPropagation();
                void triggerDownloadOnce();
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Copy className="h-4 w-4" />
              Copy
            </motion.button>
            
            <motion.button 
              className="inline-flex items-center gap-2 rounded-xl glass-strong border border-white/30 px-4 py-2 text-sm font-semibold text-foreground hover:shadow-colorful"
              onClick={(e) => {
                e.stopPropagation();
                void triggerDownloadOnce();
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="h-4 w-4" />
              View
            </motion.button>
          </div>
        </div>

        {/* Unsplash Attribution - Required by Terms */}
        {attribution && (
          <div className="mt-3 pt-3 border-t border-gray-700/30">
            <div className="text-xs text-gray-400 font-geist">
              Photo by{" "}
              <a
                href={attribution.photographerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white underline transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {attribution.photographer}
              </a>
              {" "}on{" "}
              <a
                href={attribution.photoUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white underline transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Unsplash
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-400/20" />
      </div>

      {/* Subtle rim lighting effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-px rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent" />
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  return (
    prevProps.prompt.id === nextProps.prompt.id &&
    prevProps.prompt.title === nextProps.prompt.title &&
    prevProps.prompt.description === nextProps.prompt.description &&
    prevProps.prompt.downloads === nextProps.prompt.downloads &&
    prevProps.onViewDetails === nextProps.onViewDetails
  );
});

// Set display name for debugging
PromptCard.displayName = 'PromptCard';

export default PromptCard;
