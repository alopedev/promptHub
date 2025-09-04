# PromptHub - Development Guide

## Project Overview

**PromptHub** is an AI prompt marketplace inspired by Raycast's design philosophy. It allows users to discover, preview, and share AI prompts for various workflows without requiring authentication.

### Key Features
- **Enhanced Search**: Prominent search bar with real-time filtering
- **Interactive Demo**: Edit and test prompts before copying
- **Download Tracking**: LocalStorage-based download counters
- **Category Filtering**: 7 main categories for prompt organization
- **Raycast-Inspired UI**: Dark theme with glassmorphism effects

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

## Technical Architecture

### Tech Stack
- **Frontend**: React 18 with functional components and hooks
- **Styling**: CSS custom properties (CSS variables) with utility classes
- **Data**: Static mock data in JavaScript files
- **Storage**: Browser LocalStorage for download tracking
- **Build**: Create React App (CRA) setup

### File Structure
```
src/
├── components/           # React components
│   ├── Header.js
│   ├── CategoryFilter.js
│   ├── PromptCard.js
│   └── PromptModal.js
├── data/                # Mock data and utilities
│   └── prompts.js
├── styles/              # CSS files
│   └── globals.css
└── App.js              # Main application component
```

### Design System

#### Color Palette (Raycast-inspired)
- **Primary Background**: `#0F1115`
- **Secondary Background**: `#1B1F24`
- **Tertiary Background**: `#2A2F36`
- **Accent Colors**: Coral (`#FF6363`), Mint (`#59D499`), Sky (`#56C2FF`), Saffron (`#FFC531`)

#### Typography
- **Font Family**: Inter (Google Fonts)
- **Scale**: Based on rem units with consistent spacing variables
- **Weights**: 300, 400, 500, 600, 700

#### Component Patterns
- **Glass Effect**: `backdrop-filter: blur(20px)` with subtle borders
- **Hover States**: Subtle transform and shadow changes
- **Keyboard Focus**: Visible focus states for accessibility

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

---

## Key Functions & Features

### Search & Filter (`searchPrompts`)
- Searches across title, description, and author fields
- Case-insensitive matching
- Combines with category filtering

### Keyboard Shortcuts
- `Cmd/Ctrl + K`: Focus search input
- `Escape`: Close modal

### LocalStorage Integration
- Download counts stored as `prompt-{id}-downloads`
- Persists between browser sessions
- No user authentication required

### Copy-to-Clipboard
- Uses modern `navigator.clipboard.writeText()`
- Visual feedback with temporary state change
- Updates download counter automatically

---

## Styling Guidelines

### CSS Custom Properties
Use CSS variables for consistency:
- Spacing: `--spacing-xs` through `--spacing-2xl`
- Colors: `--bg-primary`, `--accent-coral`, etc.
- Radius: `--radius-sm` through `--radius-xl`

### Utility Classes
- Typography: `.text-xs`, `.font-semibold`, etc.
- Layout: `.flex`, `.items-center`, `.gap-md`, etc.
- Components: `.btn`, `.glass`, `.badge`, etc.

### Responsive Design
- Mobile-first approach
- Grid layout adjusts with `auto-fill` and `minmax(350px, 1fr)`
- Consistent spacing on all screen sizes

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

## Deployment Notes

### Build Process
```bash
npm run build      # Creates optimized production build
npm start         # Runs development server
```

### Static Hosting Requirements
- Any static hosting service (Vercel, Netlify, GitHub Pages)
- No server-side requirements
- No database dependencies
- Environment variables not required for basic functionality

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
