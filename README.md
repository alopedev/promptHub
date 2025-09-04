# 🚀 PromptHub - AI Prompt Marketplace

> **CSS Skills Refresher Project** - A modern React application built to practice and refresh CSS techniques, featuring a Raycast-inspired design system.

![PromptHub Preview](https://img.shields.io/badge/Status-Active-success?style=flat-square) ![React](https://img.shields.io/badge/React-18-blue?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square) ![CSS](https://img.shields.io/badge/CSS-Modern-orange?style=flat-square)

## 📖 Project Overview

PromptHub is an AI prompt marketplace inspired by Raycast's elegant design philosophy. This project was created as a **CSS skills refresher exercise**, focusing on modern CSS techniques, custom properties, responsive design, and advanced styling patterns.

### 🎯 Learning Objectives
- **CSS Custom Properties (Variables)** - Consistent design tokens
- **Glassmorphism Effects** - Backdrop filters and transparency
- **Responsive Grid & Flexbox** - Modern layout techniques  
- **Component-Based Styling** - Utility classes and design systems
- **Dark Theme Implementation** - Color schemes and contrast
- **Interactive Animations** - Hover states and transitions

## ✨ Features

- **🔍 Smart Search** - Real-time prompt filtering with input validation
- **🏷️ Category Filtering** - 7 organized categories for easy browsing
- **📝 Interactive Editor** - Edit and customize prompts before copying
- **📊 Download Tracking** - LocalStorage-based usage analytics
- **🌙 Dark Theme** - Raycast-inspired UI with glassmorphism
- **🔒 Security First** - XSS prevention, CSP, and input sanitization
- **⚡ Fast Performance** - Vite bundling with optimized builds

## 🎨 CSS Techniques Practiced

### Design System
```css
:root {
  /* Color Palette */
  --bg-primary: #0F1115;
  --bg-secondary: #1B1F24;
  --accent-coral: #FF6363;
  --accent-mint: #59D499;
  
  /* Spacing Scale */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  
  /* Border Radius */
  --radius-sm: 6px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}
```

### Advanced CSS Features
- **Glassmorphism Effects** - `backdrop-filter: blur(20px)`
- **Custom Properties** - Consistent theming system
- **Grid Layouts** - `auto-fill` and `minmax()` for responsive cards
- **Flexbox Mastery** - Complex alignment and distribution
- **Smooth Animations** - Transform and opacity transitions
- **Focus States** - Accessibility-first interactive design

## 🛠️ Tech Stack

| Technology | Purpose | Learning Focus |
|------------|---------|----------------|
| **React 18** | Component Architecture | Modern Hooks, State Management |
| **Vite** | Build Tool | Fast Development, HMR |
| **CSS Custom Properties** | Theming | Design Token System |
| **Modern CSS** | Styling | Grid, Flexbox, Animations |
| **JavaScript ES6+** | Logic | Async/Await, Destructuring |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/alopedev/promptHub.git
cd promptHub

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📁 Project Structure

```
src/
├── components/           # React Components
│   ├── Header.jsx       # Navigation & Search
│   ├── CategoryFilter.jsx # Category Buttons
│   ├── PromptCard.jsx   # Individual Prompt Display
│   ├── PromptModal.jsx  # Interactive Editor
│   └── ErrorBoundary.jsx # Error Handling
├── data/
│   └── prompts.js       # Mock Data & Search Logic
├── styles/
│   └── globals.css      # Design System & Utilities
├── utils/
│   └── security.js      # Input Validation & XSS Prevention
└── App.jsx              # Main Application
```

## 🎨 Design Highlights

### Color Palette
```css
/* Primary Colors */
🔵 Sky Blue: #56C2FF     /* Links, Focus States */
🟠 Coral: #FF6363       /* Primary Actions, Errors */
🟢 Mint: #59D499        /* Success, Completed */
🟡 Saffron: #FFC531     /* Warnings, Highlights */

/* Backgrounds */
⚫ Primary: #0F1115     /* Main Background */
⚫ Secondary: #1B1F24   /* Cards, Inputs */
⚫ Tertiary: #2A2F36    /* Hover States */
```

### Typography Scale
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Scale**: rem-based with consistent line heights

### Component Patterns
- **Glass Cards** - Translucent backgrounds with blur effects
- **Hover Animations** - Subtle transforms and shadow changes
- **Focus Indicators** - Accessible keyboard navigation
- **Loading States** - Smooth transitions and feedback

## 🔒 Security Features

This project implements several security best practices as learning exercises:

- **Input Sanitization** - XSS prevention on all user inputs
- **Content Security Policy** - Restrictive CSP headers
- **Rate Limiting** - Client-side operation throttling  
- **Error Boundaries** - Graceful error handling
- **Safe LocalStorage** - Validated data persistence

## 🎯 CSS Learning Outcomes

Through this project, I practiced:

✅ **Modern CSS Architecture** - Component-based styling approach  
✅ **Design Token Systems** - Consistent spacing and colors  
✅ **Responsive Design** - Mobile-first, flexible layouts  
✅ **Advanced Selectors** - Pseudo-classes and attribute selectors  
✅ **Animation Techniques** - Keyframes, transforms, transitions  
✅ **Accessibility** - Focus states, semantic markup, ARIA  
✅ **Performance** - Efficient CSS, minimal reflows  
✅ **Browser Compatibility** - Vendor prefixes, fallbacks  

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px+ (stacked layout)
- **Tablet**: 768px+ (2-column grid)  
- **Desktop**: 1024px+ (3-column grid)
- **Large**: 1440px+ (4-column grid)

## 🌟 Deployment

### Production Build
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag & drop the `dist` folder 
- **GitHub Pages**: Use GitHub Actions workflow
- **Static Hosting**: Any CDN or static host

## 🤝 Contributing

This is a learning project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-css`)
3. Commit changes (`git commit -m 'Add amazing CSS technique'`)
4. Push to branch (`git push origin feature/amazing-css`)
5. Open a Pull Request

## 📚 Learning Resources

Resources that helped build this project:

- [CSS Custom Properties Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Modern CSS Layout](https://web.dev/learn/css/)
- [Glassmorphism in CSS](https://css-tricks.com/glassmorphism/)
- [React Security Best Practices](https://owasp.org/www-project-top-ten/)

## 📄 License

MIT License - feel free to use this project for learning!

## 🚀 Live Demo

[**View Live Demo**](https://prompthub-alopedev.vercel.app) _(Deploy when ready)_

---

⭐ **Star this repository** if it helped you learn CSS techniques!

**Built with ❤️ for CSS learning and practice**
