# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PromptHub is an AI prompt marketplace built with React 18, Vite, and shadcn/ui. It features a Raycast-inspired dark theme with glassmorphism effects and has recently been migrated from custom CSS to Tailwind CSS v4 with shadcn/ui components.

## Claude Development Guidelines

### Explore → Plan → Confirm → Code → Commit

When following this development workflow:

1. **Explore**: Deeply reflect on the requested change and understand the context.
2. **Plan**: Ask **4-6 clarifying questions** to assess scope and edge cases.
3. **Confirm**: Once questions are answered, draft a **step-by-step plan**.
4. **Code**: Ask for approval before implementing.
5. **Commit**: During implementation, after each phase:
   - Announce what was completed
   - Summarize remaining steps
   - Indicate next action
6. **Ultrathink**: Use deep reasoning for complex problems

## Architecture Overview

### Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Build Tool**: Vite 7.1.4 with HMR
- **UI Library**: shadcn/ui with Radix UI primitives
- **Styling**: Dual system - Tailwind CSS v4 + legacy CSS custom properties
- **Icons**: Lucide React
- **Type Safety**: JavaScript (no TypeScript currently)

### Component Architecture

```
App.jsx                           # Main app orchestrator
├── Header.jsx                    # Search, branding, stats
├── CategoryFilter.jsx            # Category pill filters
├── PromptCard.jsx               # Individual prompt display
└── PromptModal.jsx              # Dialog for editing/copying prompts
    └── Uses shadcn Dialog component

components/ui/                    # shadcn/ui components
├── button.jsx                   # Button with variants
├── input.jsx                    # Form input component
├── card.jsx                     # Card container components
├── badge.jsx                    # Badge/pill component
├── dialog.jsx                   # Modal dialog component
└── index.js                     # Barrel export
```

### Data Flow

1. **Prompts Data**: Static mock data in `src/data/prompts.js`
2. **State Management**: React useState in App.jsx (lifted state pattern)
3. **Search/Filter**: Centralized in App.jsx, passed down via props
4. **LocalStorage**: Used for download tracking (with validation)

## Development Best Practices

### Post-Code Reflection

After writing any significant code, write 1-2 paragraphs analyzing scalability and maintainability. If applicable, recommend next steps or technical improvements.

### Code Splitting

- **File Size**: When a file exceeds ~300 lines, refactor into smaller, modular files
- **Function Size**: When a function exceeds ~30 lines or does multiple things, split into smaller, purpose-driven functions
- **Current Status**: Most components are well within limits except App.jsx (190 lines)

### Test-Driven Development (TDD)

Follow the cycle: Write tests → commit → implement code → iterate → commit

Example workflow:

1. Write comprehensive tests to verify expected behavior
2. Commit the failing tests with descriptive messages
3. Implement minimum code required to make tests pass
4. Refactor for clarity and performance while keeping tests green
5. Commit the working implementation

**Note**: Testing infrastructure needs to be set up. Consider Vitest for Vite compatibility.

## Security & Performance Guidelines

### Security Best Practices

- **Input Validation**: Already implemented in `utils/security.js` with:
  - `validateSearchQuery()` - XSS prevention for search
  - `validatePromptContent()` - Content sanitization
  - `copyRateLimit` - Client-side rate limiting
- **Environment Variables**: Use `.env` files for any API keys or secrets
- **LocalStorage**: Always validate data with `safeGetLocalStorage()` and `safeSetLocalStorage()`

### Performance Optimization

- **Component Size Limits**: Keep components under 300 lines
- **Lazy Loading**: Consider implementing for modal components
- **Bundle Size**: Monitor with `npm run build` output

## Key Implementation Details

### shadcn/ui Integration

- Components use `cn()` utility from `lib/utils.js` for className merging
- Color system uses HSL values with CSS variables
- Components are copied into project, not imported from node_modules
- Add new shadcn components manually by creating them in `components/ui/`

### Styling System Transition

The project uses a dual styling approach during migration:

- **Legacy**: CSS custom properties in `src/styles/globals.css` (--spacing-_, --radius-_, etc.)
- **Modern**: Tailwind utility classes with shadcn/ui design tokens
- Gradually migrate remaining inline styles to Tailwind classes

### Modal/Dialog System

- Uses Radix UI Dialog primitive via shadcn/ui
- Handles escape key and backdrop click automatically
- Portal rendering for proper z-index management
- Accessible with ARIA attributes

### Search Implementation

```javascript
// Search flow with security
1. User types in Header component input
2. validateSearchQuery() sanitizes input
3. App.jsx filters prompts using searchPrompts()
4. Results update in real-time
```

### Category System

- Categories defined in `src/data/prompts.js`
- Icons mapped using Lucide React components
- Filter state managed in App.jsx
- Visual feedback with variant prop on Button component

## Important Technical Context

### Current Limitations

- No backend API - all data is mock/static
- No user authentication system
- No real persistence (only LocalStorage)
- No test coverage

### File Structure Patterns

- Components use `.jsx` extension
- Utilities use `.js` extension
- No TypeScript configuration
- ES6 modules with named exports

### State Management

- Simple prop drilling for now (app is small enough)
- Consider Context API or Zustand if app grows
- LocalStorage for persistence with security wrappers

### Future Considerations

- Add TypeScript for better type safety
- Consider server-side rendering with Next.js for SEO
- Add proper backend API for real data persistence
- Implement user authentication system
