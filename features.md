# create-modern-react

> Production-ready React + TypeScript + Tailwind in seconds

## What Native Vite Gives You

```
npm create vite@latest my-app -- --template react-ts
```

- React + TypeScript
- Basic Vite config
- Empty `src/` folder
- **That's it.**

## What create-modern-react Gives You

```
npx create-modern-react my-app
```

Everything below is ready to use immediately:

### Build & Dev Tools

- **Vite 5.4 + SWC** - 20x faster than Babel
- **TypeScript 5.5** - Strict mode enabled
- **Path aliases** - `~/components` instead of `../../../`
- **ESLint** - 25+ rules with unused-imports detection
- **Prettier** - With Tailwind plugin for class sorting
- **Console removal** - Automatic in production builds
- **Gzip compression** - Pre-compressed `.gz` files for production (threshold: 1KB)
- **Chunk splitting** - Vendor and router chunks for better caching

### SVG as React Components

Import SVGs directly as React components with full TypeScript support:

```tsx
// Method 1: Named export
import { ReactComponent as Logo } from './logo.svg';

// Method 2: Query param (recommended)
import Logo from './logo.svg?react';

// Usage - SVGs scale with font-size and accept all SVG props
<Logo className="h-8 w-8 text-primary" />
```

Features:
- **SVGO optimization** - Removes unnecessary attributes
- **Icon mode** - SVGs scale with `font-size` (1em)
- **ViewBox preserved** - Proper scaling maintained
- **Full TypeScript support** - Type declarations included

### Styling

- **Tailwind CSS 3.4** - Pre-configured with dark mode
- **tailwind-merge** - No class conflicts
- **clsx** - Conditional classes made easy
- **CVA** - Type-safe component variants
- **CSS Variables** - Theme customization ready

### UI Components (Shadcn/ui)

- `<Button />` - 6 variants (default, destructive, outline, secondary, ghost, link)
- `<Input />` - Proper focus states and accessibility
- `<Card />` - With Header, Content, Footer subcomponents
- `<Skeleton />` - Loading states
- `<Separator />` - Horizontal and vertical dividers

### Routing

- **Wouter** - 2KB lightweight (vs 28KB React Router)
- **Lazy loading** - React.lazy() built-in
- **Suspense fallback** - Loading skeleton
- **404 page** - Included

### API Layer

- **Axios** - With request/response interceptors
- **Auto auth token** - Adds Bearer token from localStorage
- **Cancel token hook** - Prevent memory leaks
- **Type-safe helpers** - `getApi<T>()`, `postApi<T>()`, `patchApi<T>()`, etc.

### Toast Notifications

- **Alertify service** - react-hot-toast wrapper
- **Auto-dismiss** - Previous toast dismissed automatically
- `Alertify.success()`, `Alertify.error()`, `Alertify.info()`, `Alertify.loading()`

### Custom Hooks

- `useLoader()` - Loading state management (start/end)
- `useDebounce()` - Value debouncing
- `useCancelToken()` - Axios request cancellation

```tsx
// useLoader example
const [isLoading, startLoader, endLoader] = useLoader(false);

const fetchData = async () => {
  startLoader();
  try {
    await getApi('/users');
  } finally {
    endLoader();
  }
};
```

### Error Handling

- **ErrorBoundary** - With retry button
- **Console logging** - In development
- **Graceful fallback UI** - No blank screens

### Performance Optimizations

- **Gzip compression** - Files >1KB pre-compressed to `.gz`
- **Chunk splitting** - `vendor.js` (React) + `router.js` (Wouter) for optimal caching
- **Tree shaking** - Dead code elimination
- **Console removal** - `console.log` stripped in production
- **SVG optimization** - SVGO removes redundant attributes

### Organized Structure

```
src/
├── components/
│   ├── ui/             # Shadcn/ui components
│   └── layout/         # RootLayout, ErrorBoundary
├── hooks/              # Custom hooks
├── lib/                # Utilities (cn)
├── routes/             # Wouter router
├── screens/            # Pages (Home, NotFound)
├── services/           # API layer
│   └── api/            # Axios + helpers
├── providers/          # Context (Theme)
└── types/              # TypeScript definitions
```

## Optional Features

Select during project creation:

- **Redux Toolkit + Redux Persist** - State management with session persistence
- **Ant Design v5** - Enterprise UI library (replaces Shadcn/ui)
- **Husky + lint-staged** - Git hooks for code quality

## Comparison

```
FEATURE                  NATIVE VITE    CREATE-MODERN-REACT
─────────────────────────────────────────────────────────────
Tailwind CSS             ❌             ✅ Pre-configured
SVG as components        ❌             ✅ SVGR plugin
Gzip compression         ❌             ✅ Pre-compressed
Routing                  ❌             ✅ Wouter + lazy load
API layer                ❌             ✅ Axios + interceptors
UI components            ❌             ✅ Shadcn/ui (5)
Icons                    ❌             ✅ Lucide React
Toasts                   ❌             ✅ react-hot-toast
Error boundary           ❌             ✅ Built-in
ESLint                   Basic          ✅ 25+ rules
Path aliases             ❌             ✅ ~/components
Theme support            ❌             ✅ Light/dark mode
Chunk splitting          ❌             ✅ Vendor + router
Setup time               ~2 hours       ✅ 30 seconds
```

## Quick Start

```bash
# Create a new project
npx create-modern-react my-app

# Navigate to project
cd my-app

# Start development server
yarn dev
```

## Available Scripts

```bash
yarn dev          # Start dev server (port 3000)
yarn build        # Production build (with gzip)
yarn preview      # Preview production build
yarn lint         # Run ESLint
yarn lint:fix     # Fix ESLint issues
yarn format       # Format with Prettier
yarn format:check # Check formatting
```

## Build Output

After `yarn build`, your `dist/` folder contains:

```
dist/
├── assets/
│   ├── index-[hash].js       # Main bundle
│   ├── index-[hash].js.gz    # Gzipped (served by nginx/Apache)
│   ├── vendor-[hash].js      # React + ReactDOM
│   ├── vendor-[hash].js.gz
│   ├── router-[hash].js      # Wouter
│   ├── router-[hash].js.gz
│   ├── index-[hash].css
│   └── index-[hash].css.gz
└── index.html
```

Your server (nginx, Apache, Cloudflare) can serve `.gz` files directly for faster load times.

## Taglines

- "From `npx` to production-ready in 30 seconds"
- "Stop configuring. Start building."
- "The React starter you wish existed"
- "Batteries included React"

---

**Version:** 2.0.0

**Core Stack:** React 18.3 + TypeScript 5.5 + Vite 5.4 (SWC) + Tailwind CSS 3.4

**License:** MIT
