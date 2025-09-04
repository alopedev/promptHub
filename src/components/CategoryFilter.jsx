import React from 'react';
import { categories } from '../data/prompts';

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  // Category icons mapping
  const categoryIcons = {
    'All': '🌟',
    'Productivity': '⚡',
    'Marketing & Sales': '📈',
    'Development & Programming': '💻',
    'Creative Writing': '✍️',
    'Data Analysis': '📊',
    'Education': '🎓',
    'Design & UX': '🎨'
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 var(--spacing-lg)',
      marginBottom: 'var(--spacing-xl)'
    }}>
      <div style={{
        display: 'flex',
        gap: 'var(--spacing-sm)',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <span className="text-sm text-secondary" style={{ marginRight: 'var(--spacing-sm)' }}>
          Filter by category:
        </span>
        
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn ${isSelected ? 'btn-primary' : 'btn-ghost'}`}
              style={{
                fontSize: '0.875rem',
                padding: 'var(--spacing-xs) var(--spacing-md)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ marginRight: 'var(--spacing-xs)' }}>
                {categoryIcons[category]}
              </span>
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
