// Advanced Framer Motion animation presets and utilities

// Base animation variants with spring physics
export const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.8
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
};

// Spectacular entrance animation
export const spectacularEntrance = {
  initial: {
    opacity: 0,
    scale: 0.3,
    rotate: -10,
    y: 100
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      mass: 1,
      delay: 0.1
    }
  }
};

// Magnetic hover effect with spring
export const magneticHover = {
  scale: 1.05,
  y: -8,
  rotateX: 5,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};

// Floating animation with physics
export const floatingAnimation = {
  y: [-10, 10, -10],
  rotate: [-2, 2, -2],
  transition: {
    y: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    },
    rotate: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export const scaleIn = {
  initial: { 
    opacity: 0, 
    scale: 0.95 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Stagger animation for lists
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Hover animations
export const hoverScale = {
  scale: 1.02,
  y: -4,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};

export const hoverGlow = {
  boxShadow: "0 20px 70px rgba(0,0,0,0.3)",
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};

// Modal animations
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

export const modalContent = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    y: 50
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// Page transitions
export const pageTransition = {
  initial: { 
    opacity: 0,
    y: 20 
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Reduced motion variants for accessibility
export const reducedMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

// Utility function to check for reduced motion preference
export const useReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Spring configurations
export const springConfig = {
  type: "spring",
  stiffness: 400,
  damping: 25
};

export const gentleSpring = {
  type: "spring",
  stiffness: 200,
  damping: 20
};

// Easing functions
export const easings = {
  easeOut: [0.4, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  easeInOut: [0.4, 0, 0.6, 1],
  bounce: [0.68, -0.55, 0.265, 1.55]
};