import React, { useState } from 'react';
import { 
  User,
  Download,
  Calendar,
  ArrowUpRight,
  Copy,
  ExternalLink 
} from 'lucide-react';

// Simplified image system using Unsplash Source API and reliable fallbacks
  const getCategoryImages = (category) => {
    // Using Unsplash Source API which is designed for direct embedding
    const imageOptions = {
      'Creative Writing': {
        primary: 'https://source.unsplash.com/random/400x250/?writing,typewriter,pen',
        gradient: 'from-amber-900 to-amber-700'
      },
      'Development & Programming': {
        primary: 'https://source.unsplash.com/random/400x250/?code,programming,computer', 
        gradient: 'from-blue-900 to-slate-700'
      },
      'Marketing & Sales': {
        primary: 'https://source.unsplash.com/random/400x250/?marketing,business,presentation',
        gradient: 'from-green-900 to-emerald-700'
      },
      'Productivity': {
        primary: 'https://source.unsplash.com/random/400x250/?productivity,desk,workspace',
        gradient: 'from-purple-900 to-indigo-700'
      },
      'Education': {
        primary: 'https://source.unsplash.com/random/400x250/?education,books,learning',
        gradient: 'from-red-900 to-pink-700'
      },
      'Design & UX': {
        primary: 'https://source.unsplash.com/random/400x250/?design,art,creative',
        gradient: 'from-cyan-900 to-teal-700'
      },
      'Data Analysis': {
        primary: 'https://source.unsplash.com/random/400x250/?data,analytics,charts',
        gradient: 'from-orange-900 to-yellow-700'
      },
    };
  
    return imageOptions[category] || {
      primary: 'https://source.unsplash.com/random/400x250/?prompt,ai,technology',
      gradient: 'from-gray-900 to-slate-700'
    };
};

const PromptCard = ({ prompt, onViewDetails }) => {
  const [imageState, setImageState] = useState('primary'); // 'primary' or 'fallback'
  const categoryImages = getCategoryImages(prompt.category);
  
  // Format download count for display
  const formatDownloads = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const handleImageError = () => {
    // If the Unsplash image fails, go directly to fallback
    setImageState('fallback');
  };

  const getCurrentImageSrc = () => {
    return imageState === 'primary' ? categoryImages.primary : null;
  };
  
  return (
    <div 
      onClick={() => onViewDetails(prompt)}
      className="
        relative group cursor-pointer
        bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50
        hover:border-gray-500/80 hover:shadow-[0_20px_70px_rgba(0,0,0,0.3)]
        transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
        hover:transform hover:-translate-y-1 hover:scale-[1.02]
        overflow-hidden animate-fade-in
      "
      style={{
        background: `
          linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%),
          linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.1) 100%)
        `,
        boxShadow: `
          inset 0 1px 0 rgba(255, 255, 255, 0.05),
          0 1px 3px rgba(0, 0, 0, 0.4),
          0 4px 16px rgba(0, 0, 0, 0.2)
        `
      }}
    >
      {/* Representative Image with Triple Fallback */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        {imageState !== 'fallback' ? (
          <img
            src={getCurrentImageSrc()}
            alt={prompt.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
          />
        ) : (
          // CSS Gradient Fallback
          <div 
            className={`w-full h-full bg-gradient-to-br ${categoryImages.gradient} transition-transform duration-300 group-hover:scale-105 flex items-center justify-center`}
          >
            <div className="text-center text-white/80">
              <div className="text-xl font-bold mb-2">{prompt.category}</div>
              <div className="text-sm opacity-60">Category Image</div>
            </div>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Category badge on image */}
        <div className="absolute top-4 left-4">
          <div className="
            flex items-center gap-2 px-3 py-1.5 rounded-lg
            bg-black/60 backdrop-blur-sm
            border border-white/10
            transition-all duration-300
          ">
            <span className="text-xs font-medium text-white uppercase tracking-wider font-geist">
              {prompt.category}
            </span>
          </div>
        </div>
        
        {/* Hover Action Icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
      
      <div className="relative p-6">
        {/* Enhanced Title */}
        <h3 className="text-xl font-semibold text-white mb-3 leading-tight line-clamp-2 font-geist group-hover:text-gray-50 transition-colors">
          {prompt.title}
        </h3>
        
        {/* Enhanced Description */}
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-6 font-geist">
          {prompt.description}
        </p>
        
        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4 font-geist">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <User className="h-3 w-3" />
              <span className="font-medium">{prompt.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(prompt.dateCreated)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 font-medium bg-gray-800/40 px-2 py-1 rounded-md">
            <Download className="h-3 w-3" />
            <span>{formatDownloads(prompt.downloads)}</span>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/40">
          <span className="text-xs text-gray-500 font-geist">Click to preview</span>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button 
              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-800/60 hover:bg-gray-700/60 px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white transition-all font-geist border border-gray-600/30 hover:border-gray-500/50"
              onClick={(e) => {
                e.stopPropagation();
                // Handle quick copy
              }}
            >
              <Copy className="h-3 w-3" />
              Copy
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-all font-geist border border-gray-500/30 hover:border-gray-400/50">
              <ExternalLink className="h-3 w-3" />
              View
            </button>
          </div>
        </div>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-400/20" />
      </div>
      
      {/* Subtle rim lighting effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-px rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent" />
      </div>
    </div>
  );
};

export default PromptCard;