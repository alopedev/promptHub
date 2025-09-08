# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**PromptHub** is an AI prompt marketplace built with React 18, Vite, and shadcn/ui. It features a Raycast-inspired dark theme with glassmorphism effects and has been migrated from custom CSS to Tailwind CSS with shadcn/ui components.

### Key Features
- **Enhanced Search**: Prominent search bar with real-time filtering and XSS prevention
- **Interactive Modal**: Edit and test prompts before copying using Radix UI Dialog
- **Download Tracking**: LocalStorage-based download counters with validation
- **Superpower Filtering**: 9 different "superpowers" for semantic prompt discovery
- **Category Filtering**: 7 main categories for prompt organization
- **Modern UI**: Linear.app-inspired grayscale theme with shadcn/ui components

---

## Explore › Plan › Confirm › Code › Commit

When following this development workflow:

1. **Explore**: Deeply reflect on the requested change and understand the context.
2. **Plan**: Ask **4-6 clarifying questions** to assess scope and edge cases.
3. **Confirm**: Once questions are answered, draft a **step-by-step plan**.
4. **Code**: Ask for approval before implementing.
5. **Commit**: During implementation, after each phase:
   * Announce what was completed.
   * Summarize remaining steps.
   * Indicate next action.
6. **Ultrathink**

---

## Development Best Practices

- **Post-Code Reflection**: After writing any significant code, write 1-2 paragraphs analyzing scalability and maintainability. If applicable, recommend next steps or technical improvements.

- **Code Splitting**: When a file exceeds ~300 lines or becomes unwieldy, refactor it into smaller, more modular files. When a function exceeds ~30 lines or does more than one thing, split it into smaller, purpose-driven functions.

- **Test-Driven Development (TDD)**: Follow the cycle: Write tests › commit › implement code › iterate › commit.

  Example workflow:
  1. Write comprehensive tests for utility functions to verify behavior
  2. Commit the failing tests with descriptive messages
  3. Implement the minimum code required to make tests pass
  4. Refactor for clarity and performance while keeping tests green
  5. Commit the working implementation
  
  This ensures robust, well-tested code and provides clear documentation of expected behavior.

---

## Security & Performance Guidelines

### Security Best Practices
- **Input Validation**: Always validate and sanitize user inputs before processing
- **Environment Variables**: Never hardcode secrets; use .env files consistently
- **XSS Prevention**: Sanitize any user-generated content before rendering

### Performance Optimization
- **Component Size Limits**: Break down files >300 lines into smaller, focused components
- **Bundle Optimization**: Use React.memo() for expensive components

---

## Application Flow

### Core User Journey
1. **Discovery**: User lands on homepage with all prompts displayed
2. **Filtering**: User can filter by categories or search by keywords
3. **Preview**: Click on any prompt card to open interactive modal
4. **Customization**: Edit prompt text in the modal textarea
5. **Copy**: Copy customized prompt to clipboard (increments download count)

### Data Flow
```
User Input → Search/Filter → Display Results → Modal Interaction → LocalStorage Update
```

### Component Hierarchy
```
App.js
├── Header.js (search, stats, branding)
├── CategoryFilter.js (category buttons)
├── PromptCard.js (individual prompt display)
└── PromptModal.js (interactive preview & copy)
```

---

## Common Commands

### Development
```bash
# Start development server (auto-opens at localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing
```bash
# Run all tests in watch mode
npm run test

# Run tests with UI dashboard
npm run test:ui

# Run tests once (CI mode)
npm run test:run

# Run specific test file
npm run test -- PromptCard.test.jsx

# Run tests matching pattern
npm run test -- --reporter=verbose
```

### Key Development Files
- `vite.config.js` - Vite configuration with React plugin
- `vitest.config.js` - Test configuration with jsdom environment
- `tailwind.config.js` - Tailwind CSS with shadcn/ui theme tokens
- `src/test/setup.js` - Test environment setup with mocks

---

## Technical Architecture

### Tech Stack
- **Frontend**: React 18 with functional components and hooks
- **Build Tool**: Vite 7.1.4 with hot module replacement
- **UI Library**: shadcn/ui with Radix UI primitives
- **Styling**: Dual system - Tailwind CSS + legacy CSS custom properties
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library + jsdom
- **Data**: Static mock data with client-side search/filtering
- **Storage**: Browser LocalStorage for download tracking (with validation)

### Current File Structure
```
src/
├── components/           # React components (.jsx)
│   ├── Header.jsx       # Navigation, search, stats
│   ├── CategoryFilter.jsx # Category pill filters
│   ├── PromptSuperpowers.jsx # Semantic filtering UI
│   ├── CuratedCollections.jsx # Featured collections
│   ├── PromptCard.jsx   # Individual prompt display
│   ├── PromptModal.jsx  # Dialog for editing/copying
│   ├── ErrorBoundary.jsx # Error handling component
│   └── ui/              # shadcn/ui components
│       ├── button.jsx   # Button with variants
│       ├── dialog.jsx   # Modal dialog component
│       ├── input.jsx    # Form input component
│       ├── card.jsx     # Card container components
│       └── badge.jsx    # Badge/pill component
├── data/                # Mock data and utilities
│   └── prompts.js       # Static prompts data + search logic
├── hooks/               # Custom React hooks
│   └── useUnsplashPhoto.ts # Photo fetching hook
├── lib/                 # Utility functions
│   └── utils.js         # className merging utilities
├── services/            # External service integrations
├── styles/              # CSS files
│   └── globals.css      # Tailwind + custom CSS properties
├── test/                # Test configuration
│   └── setup.js         # Test environment setup
└── utils/               # Security and validation
    └── security.js      # XSS prevention, rate limiting
```

### Component Architecture

```
App.jsx                           # Main app orchestrator
├── Header.jsx                    # Search, branding, stats
├── PromptSuperpowers.jsx         # Semantic filtering (9 powers)
├── CuratedCollections.jsx        # Featured collections section
├── CategoryFilter.jsx            # Category pill filters
├── PromptCard.jsx               # Individual prompt display
└── PromptModal.jsx              # Dialog for editing/copying
    └── Uses shadcn Dialog component (Radix UI)
```

### Design System

#### Color Palette (Linear.app-inspired grayscale)
The project uses HSL color variables for a pure grayscale theme:
- **Background**: `hsl(0 0% 4%)` - Pure black background
- **Foreground**: `hsl(0 0% 100%)` - Pure white text
- **Card**: `hsl(240 2% 8%)` - Subtle card background
- **Primary**: `hsl(240 1% 15%)` - Medium gray for primary elements
- **Muted**: `hsl(0 0% 63%)` - Medium gray for muted text

#### Typography
- **Font Family**: Geist (system fallback: -apple-system, BlinkMacSystemFont)
- **Scale**: Tailwind typography classes with consistent spacing
- **Features**: Font feature settings for ligatures and contextual alternates

#### Component Patterns
- **Glass Effects**: `.glass-panel` and `.glass-strong` utility classes
- **Magnetic Hover**: `.magnetic-hover` with transform and shadow animations
- **Neumorphism**: `.neomorphic` and `.neomorphic-inset` for soft UI elements
- **Modern Interactions**: Cubic-bezier transitions and micro-animations

---

## Data Structure

### Prompt Object Schema
```javascript
{
  id: string,           // Unique identifier
  title: string,        // Prompt title
  description: string,  // Brief description
  category: string,     // One of the predefined categories
  author: string,       // Author name
  downloads: number,    // Download/copy count
  dateCreated: string,  // ISO date string
  prompt: string        // Full prompt text (multiline)
}
```

### Categories
1. Productivity
2. Marketing & Sales
3. Development & Programming
4. Creative Writing
5. Data Analysis
6. Education
7. Design & UX

### Superpowers (Semantic Filtering)
1. **Automate** - Meeting, productivity, workflow automation
2. **Analyze** - Data analysis, research, review tasks
3. **Create** - Creative writing, content, social media
4. **Optimize** - Improvement, enhancement, optimization
5. **Extract** - Summary, fact extraction, data mining
6. **Translate** - Conversion, format transformation
7. **Validate** - Review, checking, validation tasks
8. **Brainstorm** - Idea generation, creative thinking
9. **Summarize** - Summary generation, bullet points

---

## Key Functions & Features

### Search & Filter System
- **searchPrompts()**: Searches across title, description, and author fields
- **Case-insensitive matching** with XSS prevention via `validateSearchQuery()`
- **Triple filtering**: Combines text search + category + superpower filters
- **Real-time updates**: UseEffect-driven filtering with dependency array

### Security Implementation
- **Input Sanitization**: All user inputs processed through `utils/security.js`
- **XSS Prevention**: `sanitizeInput()` escapes HTML entities
- **Rate Limiting**: Client-side rate limiting for copy operations (50/minute)
- **LocalStorage Validation**: Safe get/set operations with error handling

### Modal System (Radix UI)
- **shadcn Dialog**: Uses Radix UI primitives for accessibility
- **Portal Rendering**: Proper z-index management and focus trapping
- **Keyboard Navigation**: Escape key, focus management
- **Backdrop Click**: Automatic close on outside click

### State Management Pattern
- **Lifted State**: All major state in App.jsx with prop drilling
- **Local State**: Component-specific state (modal open/close)
- **Derived State**: Filtered prompts computed from search/category/superpower
- **Persistent State**: Download counts in validated LocalStorage

---

## Styling Guidelines

### Dual Styling System
The project uses both Tailwind and legacy CSS during migration:

#### Tailwind CSS (Primary)
- **shadcn/ui components**: Use `cn()` utility from `lib/utils.js` for className merging
- **HSL Color Variables**: `hsl(var(--background))` format for theme tokens
- **Responsive Design**: Tailwind responsive prefixes (`md:`, `lg:`, `xl:`)
- **Typography**: Tailwind classes with Geist font family

#### Legacy CSS Properties (Being Migrated)
- **Custom Properties**: Still used in `globals.css` for some components
- **Utility Classes**: `.glass-panel`, `.magnetic-hover`, `.neomorphic`
- **Animations**: Custom keyframes for float, gradient-shift, etc.

### Component File Extensions
- **React Components**: Use `.jsx` extension
- **Utilities**: Use `.js` extension
- **TypeScript**: Limited to specific hooks (`.ts` extension)

### Responsive Design
- **Mobile-first approach**: Tailwind breakpoint system
- **Grid Layout**: `auto-fill` with `minmax(350px, 1fr)` for prompt cards
- **Container**: Tailwind container with center and padding utilities

---

## Future Enhancement Opportunities

### Phase 2 Features
- **Submit Prompt**: Allow users to contribute new prompts
- **Advanced Filters**: Filter by author, date range, popularity
- **Favorites**: LocalStorage-based favorites system
- **Copy History**: Track recently copied prompts

### Phase 3 Features
- **Community Features**: Comments, ratings, voting
- **Prompt Collections**: Curated themed collections
- **Export Options**: Download as JSON, markdown, etc.
- **PWA Support**: Offline functionality and installation

### Technical Improvements
- **Testing**: Add Jest + React Testing Library
- **TypeScript**: Migrate to TypeScript for better type safety
- **Accessibility**: WCAG AA compliance audit
- **Performance**: Code splitting and lazy loading

---

## Testing Infrastructure

### Test Setup
- **Framework**: Vitest with jsdom environment
- **Testing Library**: React Testing Library + jest-dom
- **Setup File**: `src/test/setup.js` with global mocks
- **Coverage**: Test coverage tracking available

### Mock Configuration
```javascript
// Global mocks in setup.js
- fetch API mock with vi.fn()
- AbortController mock for request cancellation
- sessionStorage mock for testing
- Environment variables (VITE_UNSPLASH_ACCESS_KEY)
```

### Running Tests
```bash
# Run single test file
npm run test -- PromptCard.test.jsx

# Run tests with coverage
npm run test -- --coverage

# Watch mode for specific directory
npm run test -- src/components/__tests__
```

---

## Deployment Notes

### Build Process
```bash
npm run build      # Creates optimized production build in dist/
npm run dev        # Runs development server at localhost:3000
npm run preview    # Preview production build locally
```

### Static Hosting Requirements
- **Hosting**: Any static hosting service (Vercel, Netlify, GitHub Pages)
- **Build Output**: `dist/` directory from Vite build
- **Environment**: No server-side requirements or database
- **Optional**: VITE_UNSPLASH_ACCESS_KEY for photo features

---

## Contributing Guidelines

### Code Style
- Use functional components with hooks
- Consistent naming: camelCase for functions, PascalCase for components
- Keep components under 300 lines
- Comment complex logic and business rules

### Git Workflow
- Feature branches for new development
- Descriptive commit messages
- Test before committing
- Keep commits focused and atomic

---

**Last Updated**: January 2024  
**Version**: 1.0 MVP
