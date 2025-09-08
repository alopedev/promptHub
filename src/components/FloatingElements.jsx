import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  // Generate random floating elements
  const elements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20, // 20-80px
    x: Math.random() * 100, // 0-100%
    y: Math.random() * 100, // 0-100%
    duration: Math.random() * 10 + 15, // 15-25s
    delay: Math.random() * 5, // 0-5s delay
    opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity
  }));

  const floatingVariants = (duration, delay) => ({
    animate: {
      y: [0, -30, 0],
      x: [0, 15, -10, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.1, 0.9, 1],
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
            background: `linear-gradient(135deg, 
              rgba(102, 126, 234, ${element.opacity}), 
              rgba(118, 75, 162, ${element.opacity * 0.8}))`,
            filter: 'blur(1px)',
          }}
          variants={floatingVariants(element.duration, element.delay)}
          initial="initial"
          animate="animate"
        />
      ))}
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20 -top-48 -right-24"
        style={{
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-15 bottom-0 -left-40"
        style={{
          background: 'radial-gradient(circle, rgba(240, 147, 251, 0.4) 0%, transparent 70%)',
          filter: 'blur(35px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default FloatingElements;