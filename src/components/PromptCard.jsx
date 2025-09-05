import React from 'react';
import { User, Download, Calendar, ArrowUpRight, Copy, ExternalLink } from 'lucide-react';

const PromptCard = ({ prompt, onViewDetails }) => {
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

  // Category styles - Minimal grayscale with tiny accent indicators
  const getCategoryStyle = (category) => {
    // All categories use the same minimal gray styling
    return 'bg-muted/30 text-muted-foreground border-border/20';
  };

  // Category indicator - subtle gray variations only (Linear.app style)
  const getCategoryIndicator = (category) => {
    const indicators = {
      'Productivity': 'bg-accent',
      'Marketing & Sales': 'bg-muted-foreground', 
      'Development & Programming': 'bg-secondary',
      'Creative Writing': 'bg-primary',
      'Data Analysis': 'bg-accent',
      'Education': 'bg-muted-foreground',
      'Design & UX': 'bg-secondary'
    };
    return indicators[category] || 'bg-muted-foreground';
  };

  return (
    <div 
      className="group card-raycast glass-hover cursor-pointer animate-fade-in font-geist glow-hover"
      onClick={() => onViewDetails(prompt)}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        {/* Minimal Category Badge - Linear style */}
        <div className={`badge-raycast ${getCategoryStyle(prompt.category)}`}>
          <span className={`h-1 w-1 rounded-full ${getCategoryIndicator(prompt.category)}`} />
          <span className="text-xs">{prompt.category}</span>
        </div>
        
        {/* Action Icon */}
        <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-foreground group-hover:scale-110" />
      </div>

      {/* Title and Description */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-foreground group-hover:text-foreground transition-colors duration-200 line-clamp-2 font-geist">
          {prompt.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 font-geist">
          {prompt.description}
        </p>
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 font-geist">
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
        
        <div className="flex items-center gap-1.5 font-medium">
          <Download className="h-3 w-3" />
          <span>{formatDownloads(prompt.downloads)}</span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <span className="text-xs text-muted-foreground font-geist">Click to preview</span>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button 
            className="inline-flex items-center gap-1.5 rounded-md bg-muted/30 hover:bg-muted/50 px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors font-geist"
            onClick={(e) => {
              e.stopPropagation();
              // Handle quick copy
            }}
          >
            <Copy className="h-3 w-3" />
            Copy
          </button>
          <button className="btn-secondary text-xs py-1 px-2">
            <ExternalLink className="h-3 w-3" />
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;