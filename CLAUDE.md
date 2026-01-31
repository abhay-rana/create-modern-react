# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**CLI Development:**

- `npm run lint` - Run ESLint on all files
- `npm run format` - Format code with Prettier
- `npm test` - Currently placeholder (no tests configured)

**CLI Testing:**

- `node bin/index.js [project-name]` - Test the CLI locally
- `npm link` - Link the CLI globally for testing with `create-modern-react`

**Generated Project Commands:**

- `yarn dev` - Development server with auto-browser opening (port 3000)
- `yarn build` - Production build with TypeScript checking
- `yarn lint` - Code linting with zero warnings policy
- `yarn format` - Code formatting with Prettier
- `yarn storybook` - Component documentation server (port 6006)
- `yarn preview` - Preview production build locally

## Architecture Overview

This is a CLI tool that scaffolds production-ready React applications with enterprise-grade tooling and modern development practices. The CLI generates comprehensive Single Page Applications (SPAs) with customizable configurations.

### Core Structure

**CLI Architecture:**

- `bin/index.js` - Main CLI entry point using Commander.js for argument parsing
- `lib/prompts.js` - Interactive questionnaire using Inquirer.js for user preferences
- `lib/install.js` - Dependency installation logic with package manager detection
- `lib/setup.js` - Project scaffolding and file generation logic
- `templates/` - Base templates and configuration files for generated projects

**Generated Project Foundation:**

- **React 18** with concurrent features and improved performance
- **TypeScript** with strict configuration for full type safety
- **Vite** with SWC compiler for lightning-fast builds and HMR
- **ESM** native ES modules support for better tree-shaking

### Interactive Configuration Flow

The CLI guides users through 11 configuration choices:

1. **Project Setup** - Name validation, directory creation, package manager selection
2. **UI Layer** - Component libraries (Ant Design, MUI, Chakra UI) and CSS frameworks (Tailwind, CSS Modules, Styled Components)
3. **State & Data** - State management (Redux Toolkit, Zustand, Jotai) and data fetching (React Query, SWR, Apollo)
4. **Development Tools** - Routing, testing, linting, Storybook, git hooks
5. **Additional Features** - Icons, PWA support, Git initialization

### Generated Project Features

**Routing & Navigation:**

- **Wouter** - Lightweight routing library (2KB) with lazy loading support
- **Private Routes** - Authentication-aware route protection
- **Code Splitting** - React.Suspense for optimal performance

**State Management:**

- **Redux Toolkit** with Redux Persist for session persistence
- **Typed Hooks** - Custom `useAppDispatch`, `useAppSelector` for type safety
- **Redux DevTools** integration for debugging

**UI & Styling:**

- **Ant Design v5** - Enterprise-class components with theme customization
- **Custom Component Library** - Design system with Button, Input, Tabs, Loader
- **Tailwind CSS** with custom theme and dark mode support
- **CSS Modules** for component-specific scoped styles
- **Class Variance Authority (CVA)** for type-safe component variants
- **Lucide React** for consistent icon library

**Development Tools:**

- **ESLint** with strict rules and unused imports detection
- **Prettier** with Tailwind plugin for code formatting
- **Husky + lint-staged** for pre-commit quality checks
- **Storybook** for component documentation and testing
- **Error Boundary** for graceful error handling

**Custom Hooks & Utilities:**

- `useLoader` - Loading state management
- `useDebounce` - Input debouncing for performance
- `useCancelToken` - Request cancellation for API calls
- `useTheme` - Theme switching and management
- `cn()` - Conditional className composition with clsx + tailwind-merge

**API & Services:**

- **Axios** with interceptors and error handling
- **Centralized API Services** for organized API call management
- **Request Cancellation** to prevent memory leaks
- **Alertify Services** for centralized toast/error messaging

### Key Dependencies

**CLI Dependencies:**

- `commander` - Command-line interface framework
- `inquirer` - Interactive command-line prompts
- `chalk` - Terminal output styling
- `fs-extra` - Enhanced file system operations

**Generated Project Architecture:**

```
src/
├── components/
│   ├── library/          # Design system components
│   └── container.js/     # App container & error boundary
├── screens/              # Page components
├── routes/               # Routing configuration
├── redux/                # State management
├── providers/            # Context providers (Theme, WebSocket, Antd)
├── hooks/                # Custom React hooks
├── services/             # API services
├── utils/                # Utility functions
├── types/                # TypeScript definitions
└── styles/               # Global styles & Ant Design overrides
```

## Development Patterns

**File Generation Strategy:**

- Copy base template as foundation
- Apply incremental modifications based on user selections
- Generate appropriate configuration files (package.json, vite.config.ts, etc.)
- Add library-specific components and setup files

**Configuration Management:**

- User selections stored in configuration object
- Passed through setup pipeline for conditional file generation
- Supports CLI flags (`--skip-install`, `--skip-git`, `--template`)
- Path aliases with `~/` prefix for clean imports from src

**Performance Optimizations:**

- Console statement removal in production builds
- SVG as React components with SVGR plugin
- Bundle optimization with tree-shaking and code splitting
- Network access for development server

**Error Handling:**

- Project name validation with regex patterns
- Directory existence checking with overwrite confirmation
- Graceful error reporting with colored output

## Antd vs Shadcn/ui Component Replacement

The base template uses **Shadcn/ui** components (`~/components/ui`). When the user selects **Ant Design**, this folder is deleted and replaced with antd configuration. This creates a dependency issue for any file that imports from `~/components/ui`.

### Architecture

```
templates/optional/
├── antd/                      # Core antd config → copied to src/antd/
│   ├── config-provider.tsx    # Theme provider wrapper
│   ├── theme.ts               # Light/dark theme tokens
│   ├── index.ts               # Exports
│   └── styles/                # CSS overrides
│
└── antd-replacements/         # Files that replace shadcn imports
    ├── components/layout/
    │   └── error-boundary.tsx # Button from 'antd'
    ├── routes/
    │   └── index.tsx          # Skeleton from 'antd'
    ├── screens/
    │   ├── home/index.tsx     # Button, Card from 'antd'
    │   └── not-found/index.tsx# Button from 'antd'
    └── redux/
        └── provider.tsx       # Skeleton from 'antd'
```

### Files That Import from ~/components/ui

When adding new screens or components, check if they use shadcn components:

| File | Shadcn Imports | Antd Equivalent |
|------|----------------|-----------------|
| `error-boundary.tsx` | `Button` | `Button` from 'antd' |
| `routes/index.tsx` | `Skeleton` | `Skeleton.Avatar`, `Skeleton.Input` |
| `screens/home/index.tsx` | `Button`, `Card`, `CardHeader`, etc. | `Button`, `Card` with `title` prop |
| `screens/not-found/index.tsx` | `Button` with `asChild` | `Button` with `href` prop |
| `redux/provider.tsx` | `Skeleton` | `Skeleton.Avatar`, `Skeleton.Input` |

### Key API Differences

```tsx
// Shadcn Button
<Button variant="outline" size="icon" asChild>
  <Link href="/">Go home</Link>
</Button>

// Antd Button
<Button type="default" shape="circle" href="/">
  Go home
</Button>
```

```tsx
// Shadcn Skeleton
<Skeleton className="h-12 w-12 rounded-full" />

// Antd Skeleton
<Skeleton.Avatar active size={48} shape="circle" />
```

### Adding New Components/Screens

When creating new files that use UI components:

1. **Create the base version** in `templates/base/` using Shadcn imports
2. **Create antd version** in `templates/optional/antd-replacements/` with same path structure
3. **Update `lib/setup.js`** to include the file in `replaceComponentsForAntd()` or `replaceReduxProviderForAntd()`

### Setup.js Flow

```
1. Copy base template (includes ~/components/ui)
2. If antd selected:
   a. Delete src/components/ui folder
   b. Copy antd/ → src/antd/
   c. Run replaceComponentsForAntd() → overwrites base files
3. If redux selected:
   a. Copy redux/ → src/redux/
   b. If antd: Run replaceReduxProviderForAntd() → overwrites provider.tsx
```

## Template Combinations

The CLI supports these pre-defined stacks:

- **Minimal**: Vite + React + TypeScript + Tailwind CSS
- **Enterprise**: + Ant Design + Redux Toolkit + React Query + React Router
- **Modern**: + Zustand + React Query + Wouter (lightweight routing)
- **Full Featured**: All libraries with Storybook, testing, and PWA support

## CLI Testing & Development

**Local Testing:**

```bash
# Test CLI locally
node bin/index.js my-test-project

# Test with options
node bin/index.js my-test-project --skip-install --skip-git
```

**Link for Global Testing:**

```bash
npm link
create-modern-react test-project
npm unlink
```

The CLI validates project names, handles directory conflicts, and provides detailed configuration summaries before project generation. Generated projects include comprehensive documentation, type safety throughout, and enterprise-grade tooling for scalable development.
