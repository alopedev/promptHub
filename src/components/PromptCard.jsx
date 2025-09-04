import React from 'react';

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

  // Category colors
  const getCategoryColor = (category) => {
    const colors = {
      'Productivity': 'var(--accent-mint)',
      'Marketing & Sales': 'var(--accent-coral)',
      'Development & Programming': 'var(--accent-sky)',
      'Creative Writing': 'var(--accent-saffron)',
      'Data Analysis': '#8B5CF6',
      'Education': '#F59E0B',
      'Design & UX': '#EC4899'
    };
    return colors[category] || 'var(--accent-sky)';
  };

  return (
    <div 
      className="glass glass-hover"
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-lg)',
        cursor: 'pointer',
        height: 'fit-content'
      }}
      onClick={() => onViewDetails(prompt)}
    >
      {/* Category Badge */}
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <span 
          className="badge"
          style={{
            backgroundColor: getCategoryColor(prompt.category),
            color: 'white',
            fontWeight: 500
          }}
        >
          {prompt.category}
        </span>
      </div>

      {/* Title and Description */}
      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h3 className="text-xl font-semibold mb-sm">
          {prompt.title}
        </h3>
        <p className="text-secondary text-sm" style={{ lineHeight: 1.5 }}>
          {prompt.description}
        </p>
      </div>

      {/* Author and Stats */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-sm text-tertiary">
          <div className="flex items-center gap-xs">
            <span>👤</span>
            <span>{prompt.author}</span>
          </div>
          <span>•</span>
          <span>{formatDate(prompt.dateCreated)}</span>
        </div>
        
        <div className="flex items-center gap-xs text-secondary">
          <span>⬇️</span>
          <span>{formatDownloads(prompt.downloads)}</span>
        </div>
      </div>

      {/* Action Hint */}
      <div 
        className="flex items-center justify-between mt-lg"
        style={{
          paddingTop: 'var(--spacing-md)',
          borderTop: '1px solid var(--border-subtle)'
        }}
      >
        <span className="text-xs text-tertiary">Click to preview and copy</span>
        <div className="flex items-center gap-xs">
          <span className="keycap">Enter</span>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
