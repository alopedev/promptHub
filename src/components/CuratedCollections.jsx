import React from 'react';
import { 
  Zap, 
  Sparkles, 
  BarChart3, 
  Code2, 
  Users,
  ArrowRight,
  Play
} from 'lucide-react';

const CuratedCollections = () => {
  const collections = [
    {
      id: 'productivity-powerhouse',
      title: 'Productivity Powerhouse',
      description: 'Essential workflow automation prompts to streamline your daily tasks',
      promptCount: 3,
      contributors: [
        { name: 'Sarah Chen', avatar: 'SC' },
        { name: 'Alex Kumar', avatar: 'AK' }
      ],
      gradient: 'from-blue-500/20 via-blue-600/10 to-purple-500/20',
      icon: Zap,
      size: 'large' // 2x2
    },
    {
      id: 'creative-studio',
      title: 'Creative Studio',
      description: 'Content creation and brainstorming tools for unlimited inspiration',
      promptCount: 2,
      contributors: [
        { name: 'Emma Thompson', avatar: 'ET' },
        { name: 'Taylor Swift', avatar: 'TS' }
      ],
      gradient: 'from-pink-500/20 via-rose-400/10 to-orange-500/20',
      icon: Sparkles,
      size: 'medium' // 2x1
    },
    {
      id: 'data-intelligence',
      title: 'Data Intelligence',
      description: 'Analysis and insights extraction for data-driven decisions',
      promptCount: 2,
      contributors: [
        { name: 'Dr. Michael Foster', avatar: 'MF' }
      ],
      gradient: 'from-green-500/20 via-emerald-400/10 to-teal-500/20',
      icon: BarChart3,
      size: 'medium' // 2x1
    },
    {
      id: 'developer-toolkit',
      title: 'Developer Toolkit',
      description: 'Code review and optimization helpers for better development',
      promptCount: 2,
      contributors: [
        { name: 'Jordan Kim', avatar: 'JK' },
        { name: 'Alex Kumar', avatar: 'AK' }
      ],
      gradient: 'from-slate-500/20 via-gray-400/10 to-zinc-500/20',
      icon: Code2,
      size: 'small' // 1x1
    }
  ];

  const getGridClasses = (size) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2'; // 2x2
      case 'medium':
        return 'md:col-span-2 md:row-span-1'; // 2x1
      case 'small':
        return 'md:col-span-1 md:row-span-1'; // 1x1
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  const getPadding = (size) => {
    switch (size) {
      case 'large':
        return 'p-8';
      case 'medium':
        return 'p-6';
      case 'small':
        return 'p-5';
      default:
        return 'p-6';
    }
  };

  return (
    <section className="relative py-20 overflow-hidden" data-section="collections">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-20 right-32 w-72 h-72 bg-gradient-to-b from-accent/3 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-b from-primary/2 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-card/50 border border-border/30 backdrop-blur-sm">
            <Play className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground font-geist">Curated for you</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-geist tracking-tight">
            Curated Collections
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-geist">
            Handpicked prompt combinations designed to solve specific workflows and challenges
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 auto-rows-fr">
          {collections.map((collection) => {
            const IconComponent = collection.icon;
            
            return (
              <div
                key={collection.id}
                className={`
                  group relative overflow-hidden rounded-3xl border border-border/30 
                  bg-gradient-to-br ${collection.gradient} 
                  backdrop-blur-sm hover:border-border/50 
                  transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20
                  cursor-pointer ${getGridClasses(collection.size)} ${getPadding(collection.size)}
                `}
              >
                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-card/60 backdrop-blur-sm rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-3xl" />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-background/40 border border-border/20 backdrop-blur-sm group-hover:bg-background/60 transition-colors">
                      <IconComponent className="h-6 w-6 text-foreground" />
                    </div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <div className="p-2 rounded-xl bg-accent/20 border border-accent/20 backdrop-blur-sm">
                        <ArrowRight className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 font-geist group-hover:text-white transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed font-geist text-sm md:text-base">
                        {collection.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 md:mt-8 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Contributors */}
                        <div className="flex -space-x-2">
                          {collection.contributors.map((contributor, index) => (
                            <div
                              key={index}
                              className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium text-foreground font-geist"
                              title={contributor.name}
                            >
                              {contributor.avatar}
                            </div>
                          ))}
                        </div>

                        {/* Prompt Count */}
                        <div className="text-xs text-muted-foreground font-geist bg-background/40 px-2 py-1 rounded-md border border-border/20">
                          {collection.promptCount} prompts
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="opacity-0 group-hover:opacity-100 transition-all duration-300 px-4 py-2 bg-accent/20 hover:bg-accent/30 border border-accent/30 hover:border-accent/50 rounded-lg text-xs font-medium text-accent font-geist">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.02] to-transparent" />
                  <div className="absolute inset-px rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-card/50 hover:bg-card/80 border border-border/30 hover:border-border/50 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 font-geist">
            <Users className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
              View All Collections
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CuratedCollections;