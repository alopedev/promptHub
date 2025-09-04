import React from 'react';
import { validateSearchQuery } from '../utils/security';

const Header = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  const handleSearch = (e) => {
    // Validate and sanitize search input for security
    const sanitizedQuery = validateSearchQuery(e.target.value);
    setSearchQuery(sanitizedQuery);
  };

  return (
    <header className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderRadius: 0,
      borderLeft: 'none',
      borderRight: 'none'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'var(--spacing-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-lg)'
      }}>
        
        {/* Logo and Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-md">
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, var(--accent-coral), var(--accent-sky))',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: 'white'
            }}>
              P
            </div>
            <div>
              <h1 className="text-2xl font-bold">PromptHub</h1>
              <p className="text-sm text-secondary">Discover, test, and share AI prompts for any workflow</p>
            </div>
          </div>
          
          <div className="flex items-center gap-sm">
            <span className="keycap">⌘</span>
            <span className="keycap">K</span>
            <span className="text-xs text-tertiary">to search</span>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '100%' }}>
          <div style={{
            position: 'absolute',
            left: 'var(--spacing-md)',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-tertiary)',
            fontSize: '1rem'
          }}>
            🔍
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search prompts, categories, or authors..."
            className="input"
            style={{
              paddingLeft: '2.75rem',
              fontSize: '1rem',
              height: '3rem',
              borderRadius: 'var(--radius-md)'
            }}
          />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-lg text-sm text-secondary">
          <div className="flex items-center gap-xs">
            <span className="badge badge-accent">8</span>
            <span>prompts</span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="badge badge-sky">7</span>
            <span>categories</span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="badge badge-coral">18K</span>
            <span>total downloads</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
