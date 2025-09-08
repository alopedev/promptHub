import React from 'react';
import { motion } from 'framer-motion';
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
import { useSearch } from '../contexts/index.jsx';
import { staggerContainer, staggerItem } from '../utils/animations';

const PromptSuperpowers = () => {
  const { selectedSuperpower, setSelectedSuperpower } = useSearch();
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
    setSelectedSuperpower(newSelection);
  };

  return (
    <section className="relative py-24 border-b border-border/30">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Linear-style Section Header */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-foreground mb-6 font-geist"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Filter by Superpower
          </motion.h2>
          <motion.p 
            className="text-muted-foreground font-geist max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find the perfect prompt by selecting what you want to accomplish with AI.
          </motion.p>
        </motion.div>

        {/* Modern Grid Layout - Linear Style */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {superpowers.map((superpower) => {
            const IconComponent = superpower.icon;
            const isSelected = selectedSuperpower === superpower.id;
            
            return (
              <motion.div
                key={superpower.id}
                variants={staggerItem}
              >
                <motion.button
                  onClick={() => handleSuperpowerClick(superpower)}
                  className={`
                    w-full p-6 rounded-2xl border transition-all duration-200 font-geist
                    flex flex-col items-center text-center gap-3
                    ${isSelected
                      ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' 
                      : 'bg-card border-border hover:border-border/60 hover:bg-card/80'
                    }
                  `}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`p-3 rounded-xl ${isSelected ? 'bg-primary-foreground/20' : 'bg-muted'}`}
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent className="h-6 w-6" />
                  </motion.div>
                  
                  <div className="space-y-1">
                    <div className="font-semibold text-sm">
                      {superpower.name}
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      {superpower.description}
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Selected superpower info - Modern styling */}
        {selectedSuperpower && (
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 glass-strong border border-white/20 rounded-2xl shadow-colorful">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-foreground font-medium">Filtering by:</span>
              <span className="font-bold text-primary">
                {superpowers.find(s => s.id === selectedSuperpower)?.name}
              </span>
              <motion.button
                onClick={() => setSelectedSuperpower(null)}
                className="ml-2 w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PromptSuperpowers;