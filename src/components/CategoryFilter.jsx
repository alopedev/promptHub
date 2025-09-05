import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  Code, 
  PenTool, 
  BarChart3, 
  GraduationCap, 
  Palette,
  Sparkles,
  Filter
} from 'lucide-react';
import { categories } from '../data/prompts';

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  // Category icons mapping using Lucide icons
  const categoryIcons = {
    'All': Sparkles,
    'Productivity': Zap,
    'Marketing & Sales': TrendingUp,
    'Development & Programming': Code,
    'Creative Writing': PenTool,
    'Data Analysis': BarChart3,
    'Education': GraduationCap,
    'Design & UX': Palette
  };

  return (
    <section className="border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground font-geist">Browse by category</h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            const IconComponent = categoryIcons[category];
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150 font-geist ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border border-border/50'
                    : 'bg-transparent hover:bg-muted/30 text-muted-foreground hover:text-foreground border border-border/20 hover:border-border/40'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                {category}
                {isSelected && (
                  <div className="h-1 w-1 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;