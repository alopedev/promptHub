import React, { useState } from 'react';
import { 
  Zap, 
  BarChart3, 
  Sparkles, 
  TrendingUp, 
  FileText,
  ArrowLeftRight,
  ShieldCheck,
  Lightbulb,
  List
} from 'lucide-react';

const PromptSuperpowers = ({ onSuperpowerSelect, selectedSuperpower }) => {
  const superpowers = [
    {
      id: 'automate',
      name: 'AUTOMATE',
      icon: Zap,
      size: 'large',
      position: { top: '10%', left: '5%' },
      rotation: '-2deg',
      description: 'Streamline repetitive tasks'
    },
    {
      id: 'analyze', 
      name: 'ANALYZE',
      icon: BarChart3,
      size: 'medium',
      position: { top: '25%', left: '25%' },
      rotation: '1deg',
      description: 'Deep data insights'
    },
    {
      id: 'create',
      name: 'CREATE',
      icon: Sparkles,
      size: 'large',
      position: { top: '5%', left: '50%' },
      rotation: '3deg',
      description: 'Generate original content'
    },
    {
      id: 'optimize',
      name: 'OPTIMIZE',
      icon: TrendingUp,
      size: 'small',
      position: { top: '15%', left: '75%' },
      rotation: '-1deg',
      description: 'Improve performance'
    },
    {
      id: 'extract',
      name: 'EXTRACT',
      icon: FileText,
      size: 'medium',
      position: { top: '45%', left: '10%' },
      rotation: '2deg',
      description: 'Pull key information'
    },
    {
      id: 'translate',
      name: 'TRANSLATE',
      icon: ArrowLeftRight,
      size: 'small',
      position: { top: '50%', left: '40%' },
      rotation: '-3deg',
      description: 'Convert formats'
    },
    {
      id: 'validate',
      name: 'VALIDATE',
      icon: ShieldCheck,
      size: 'medium',
      position: { top: '35%', left: '65%' },
      rotation: '1deg',
      description: 'Verify and check'
    },
    {
      id: 'brainstorm',
      name: 'BRAINSTORM',
      icon: Lightbulb,
      size: 'large',
      position: { top: '65%', left: '15%' },
      rotation: '-2deg',
      description: 'Generate fresh ideas'
    },
    {
      id: 'summarize',
      name: 'SUMMARIZE',
      icon: List,
      size: 'medium',
      position: { top: '60%', left: '55%' },
      rotation: '2deg',
      description: 'Condense information'
    }
  ];

  const getSizeClasses = (size) => {
    switch (size) {
      case 'small':
        return 'px-3 py-2 text-xs';
      case 'large':
        return 'px-6 py-4 text-sm font-semibold';
      default:
        return 'px-4 py-3 text-xs font-medium';
    }
  };

  const handleSuperpowerClick = (superpower) => {
    const newSelection = selectedSuperpower === superpower.id ? null : superpower.id;
    onSuperpowerSelect(newSelection);
  };

  return (
    <section className="relative border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 font-geist">
            Prompt Superpowers
          </h2>
          <p className="text-muted-foreground font-geist max-w-2xl mx-auto">
            Unlock your AI potential. Click any superpower to discover matching prompts.
          </p>
        </div>

        {/* Organic Superpowers Layout */}
        <div className="relative h-96 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
          
          {superpowers.map((superpower) => {
            const IconComponent = superpower.icon;
            const isSelected = selectedSuperpower === superpower.id;
            
            return (
              <div
                key={superpower.id}
                className="absolute transition-all duration-300 hover:scale-105 hover:z-10"
                style={{
                  top: superpower.position.top,
                  left: superpower.position.left,
                  transform: `rotate(${superpower.rotation})`,
                }}
              >
                <button
                  onClick={() => handleSuperpowerClick(superpower)}
                  className={`
                    group relative inline-flex items-center gap-2 rounded-2xl border backdrop-blur-sm
                    transition-all duration-300 font-geist
                    hover:scale-110 hover:shadow-lg active:scale-95
                    ${getSizeClasses(superpower.size)}
                    ${isSelected
                      ? 'bg-primary text-primary-foreground border-primary/50 shadow-lg shadow-primary/20'
                      : 'bg-card/60 text-foreground border-border/40 hover:bg-card/80 hover:border-border/60'
                    }
                  `}
                  style={{
                    transform: `rotate(${isSelected ? '0deg' : superpower.rotation})`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <IconComponent className={`${superpower.size === 'large' ? 'h-5 w-5' : 'h-4 w-4'}`} />
                  <span className="tracking-wide">{superpower.name}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-card border border-border/50 rounded-lg text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    {superpower.description}
                  </div>

                  {/* Glow effect when selected */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-sm -z-10 animate-pulse" />
                  )}
                </button>
              </div>
            );
          })}

          {/* Floating particles effect */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-accent/30 rounded-full animate-float" />
          <div className="absolute bottom-32 right-24 w-1 h-1 bg-muted-foreground/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        </div>

        {/* Selected superpower info */}
        {selectedSuperpower && (
          <div className="mt-8 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg text-sm text-foreground font-geist">
              <span>Filtering by superpower:</span>
              <span className="font-semibold">
                {superpowers.find(s => s.id === selectedSuperpower)?.name}
              </span>
              <button
                onClick={() => onSuperpowerSelect(null)}
                className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default PromptSuperpowers;