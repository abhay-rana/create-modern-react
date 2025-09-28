# Vite TypeScript React Template - Features

A comprehensive, production-ready React template with modern development practices and industry-standard tooling for building scalable Single Page Applications (SPAs).

## 🚀 Core Framework & Build

- **React 18** - Latest React with concurrent features and improved performance
- **TypeScript** - Full type safety with strict configuration
- **Vite** - Lightning-fast build tool with HMR and optimized production builds
- **SWC** - Super fast JavaScript/TypeScript compiler (faster than Babel)
- **ESM** - Native ES modules support for better tree-shaking

## 🛣️ Routing & Navigation

- **Wouter** - Lightweight routing library (2KB) as React Router alternative
- **Lazy Loading** - Code splitting with React.Suspense for optimal performance
- **Private Routes** - Authentication-aware route protection
- **404 Handling** - Custom 404 page for unmatched routes

## 🗄️ State Management

- **Redux Toolkit** - Modern Redux with simplified syntax and best practices
- **Redux Persist** - Automatic state persistence across sessions
- **Typed Hooks** - Custom hooks (`useAppDispatch`, `useAppSelector`) for type safety
- **Dev Tools** - Redux DevTools integration for debugging

## 🎨 UI & Styling

- **Ant Design v5** - Enterprise-class UI components with theme customization
- **Custom Component Library** - Reusable components with consistent design system
- **Tailwind CSS** - Utility-first CSS framework with custom theme
- **CSS Modules** - Scoped styling for component-specific styles
- **Dark Mode** - Built-in theme switching support
- **Class Variance Authority (CVA)** - Type-safe component variants
- **Lucide React** - Beautiful, consistent icon library

## 🎯 Component Architecture

- **Design System** - Consistent Button, Input, Tabs, Loader components
- **Storybook Integration** - Component documentation and testing
- **Error Boundary** - Graceful error handling and fallback UI
- **Container Pattern** - App-level layout and error management
- **Responsive Design** - Mobile-first approach with custom breakpoints

## 🛠️ Development Tools

- **ESLint** - Strict linting rules with unused imports detection
- **Prettier** - Code formatting with Tailwind plugin
- **Husky** - Git hooks for code quality enforcement
- **lint-staged** - Pre-commit checks for staged files
- **TypeScript Strict Mode** - Maximum type safety and error prevention

## 🔧 Utilities & Hooks

### Custom Hooks

- `useLoader` - Loading state management
- `useDebounce` - Input debouncing for performance
- `useCancelToken` - Request cancellation for API calls
- `useTheme` - Theme switching and management

### Utility Functions

- `cn()` - Conditional className composition with clsx + tailwind-merge
- Regex patterns collection for common validations
- Query parameter utilities
- Type-safe utility functions

## 📡 API & Services

- **Axios** - HTTP client with interceptors and error handling
- **Centralized API Services** - Organized API call management
- **Request Cancellation** - Prevent memory leaks with abort controllers
- **Alertify Services** - Centralized toast/error messaging system

## ⚡ Performance Optimizations

- **Console Removal** - Automatic console statement removal in production
- **SVG as Components** - Import SVGs as React components with SVGR
- **Bundle Optimization** - Tree-shaking and code splitting
- **Network Access** - Development server with network exposure

## 🛡️ Developer Experience

- **Path Aliases** - Clean imports with `~/` prefix for src directory
- **Type Definitions** - Comprehensive TypeScript interfaces
- **Environment Configuration** - Vite environment variables support
- **Git Integration** - Proper gitignore and branch management
- **Package Manager** - Yarn v3 with modern workspace features

## 📦 Build & Deployment

### Scripts Available

- `yarn dev` - Development server with auto-browser opening
- `yarn build` - Production build with TypeScript checking
- `yarn lint` - Code linting with zero warnings policy
- `yarn format` - Code formatting with Prettier
- `yarn storybook` - Component documentation server

### Production Ready

- Optimized build output
- Environment-specific configurations
- Preview mode for production testing
- CI/CD friendly setup

## 🏗️ Project Structure

```
src/
├── components/
│   ├── library/          # Design system components
│   └── container.js/     # App container & error boundary
├── screens/              # Page components
├── routes/               # Routing configuration
├── redux/                # State management
├── providers/            # Context providers
├── hooks/                # Custom React hooks
├── services/             # API services
├── utils/                # Utility functions
├── types/                # TypeScript definitions
└── styles/               # Global styles
```

## 🤝 Contributing

This template is designed for open source collaboration with:

- Comprehensive documentation in `CLAUDE.md`
- Consistent code style enforcement
- Type safety throughout
- Clear project structure
- Best practices implementation

Perfect for teams and individual developers who want a solid foundation for modern React applications with enterprise-grade tooling and practices.
