# create-modern-react CLI - Enhanced Implementation Plan

## Executive Summary

A CLI tool distributed via **npx** that scaffolds production-ready React projects with an opinionated core stack and optional enterprise features. Enhanced with **Vercel React Best Practices** patterns baked in.

---

## Core Decisions (From Spec Interrogation)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Version strategy | Caret ranges (`^18.3.1`) | Auto-receive patches while staying stable |
| Distribution | `npx` only | No global install required |
| Non-empty directory | Prompt user | Warn but allow if confirmed |
| Failure handling | Auto-cleanup | Remove partial files on scaffold failure |
| Redux error handling | Conditional inclusion | Only add when Redux selected |
| Shadcn extension | Docs only | Keep simple, point to official CLI |
| localStorage hook | Skip | Let users add their own |
| ErrorBoundary | Console + fallback | Log to console, show retry UI |
| Testing | None | Users add their own test setup |
| Toast system | Thin wrapper | `success()`, `error()`, `info()` only |
| Route splitting | Lazy loading | React.lazy() for all routes |
| Antd theming | Dark/light toggle | ThemeProvider + useTheme hook |
| TypeScript | Strict mode | Maximum type safety |
| ESLint | Custom config | User-provided comprehensive ruleset |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     create-modern-react CLI                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   npx create-modern-react my-app                                    │
│              │                                                       │
│              ▼                                                       │
│   ┌──────────────────┐                                              │
│   │  5 Prompts       │                                              │
│   │  1. Project name │                                              │
│   │  2. Pkg manager  │                                              │
│   │  3. Features []  │  ← [redux, antd, husky]                      │
│   │  4. Init git?    │                                              │
│   │  5. Install deps?│                                              │
│   └────────┬─────────┘                                              │
│            │                                                         │
│            ▼                                                         │
│   ┌──────────────────────────────────────────────────────────┐      │
│   │                  TEMPLATE ENGINE                          │      │
│   ├──────────────────────────────────────────────────────────┤      │
│   │                                                           │      │
│   │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │      │
│   │  │   BASE      │    │  OPTIONAL   │    │  PROVIDER   │  │      │
│   │  │  TEMPLATE   │ +  │  FEATURES   │ +  │ COMPOSITION │  │      │
│   │  └─────────────┘    └─────────────┘    └─────────────┘  │      │
│   │        │                   │                  │          │      │
│   │        ▼                   ▼                  ▼          │      │
│   │   Always:             If selected:      Dynamic:        │      │
│   │   - Vite + SWC        - Redux           - Combine all   │      │
│   │   - React 18          - Antd            - Generate      │      │
│   │   - TypeScript        - Husky             providers.tsx │      │
│   │   - Tailwind                                            │      │
│   │   - Wouter (lazy)                                       │      │
│   │   - Axios                                               │      │
│   │   - Shadcn (5)                                          │      │
│   │     OR Antd                                             │      │
│   │   - Lucide icons                                        │      │
│   │   - react-hot-toast                                     │      │
│   │                                                          │      │
│   └──────────────────────────────────────────────────────────┘      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## React Best Practices Integration

The boilerplate will include these patterns from Vercel's React Best Practices guide:

### 1. Bundle Optimization (CRITICAL)

```typescript
// ❌ Generated code will NOT do this:
import { Check, X } from 'lucide-react'  // Loads 1,583 modules

// ✅ Generated code WILL do this:
import Check from 'lucide-react/dist/esm/icons/check'
import X from 'lucide-react/dist/esm/icons/x'
```

**Implementation:** Create a `src/components/icons/index.ts` that re-exports direct imports.

### 2. Lazy Route Loading (CRITICAL)

```typescript
// src/routes/index.tsx - Generated pattern
import { lazy, Suspense } from 'react'
import { Route, Switch } from 'wouter'

const Home = lazy(() => import('~/screens/home'))
const NotFound = lazy(() => import('~/screens/not-found'))

export function AppRouter() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  )
}
```

### 3. Functional setState (MEDIUM)

```typescript
// Generated hooks will use functional updates to prevent stale closures
const addItem = useCallback((newItem: Item) => {
  setItems(curr => [...curr, newItem])  // ✅ Always fresh state
}, [])
```

### 4. Lazy State Initialization (MEDIUM)

```typescript
// Generated patterns will use lazy init for expensive values
const [config, setConfig] = useState(() => {
  const stored = localStorage.getItem('config')
  return stored ? JSON.parse(stored) : defaultConfig
})
```

### 5. Explicit Conditional Rendering (LOW)

```typescript
// Generated components will use ternary for safety
{count > 0 ? <Badge>{count}</Badge> : null}  // ✅ Not {count && <Badge>}
```

---

## Generated Project Structure

```
my-app/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── components.json              # Only if Shadcn (not Antd)
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── .env.example
├── README.md
│
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── vite-env.d.ts
    │
    ├── lib/
    │   └── utils.ts             # cn() utility (clsx + tailwind-merge)
    │
    ├── components/
    │   ├── icons/               # Direct lucide imports
    │   │   └── index.ts
    │   │
    │   ├── ui/                  # Shadcn (ONLY if Antd NOT selected)
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── card.tsx
    │   │   ├── skeleton.tsx
    │   │   ├── separator.tsx
    │   │   └── index.ts
    │   │
    │   └── layout/
    │       ├── root-layout.tsx
    │       ├── page-skeleton.tsx
    │       └── error-boundary.tsx
    │
    ├── hooks/
    │   ├── use-debounce.ts
    │   └── use-cancel-token.ts  # Axios request cancellation
    │
    ├── routes/
    │   ├── index.tsx            # Lazy-loaded Wouter router
    │   └── routes.ts            # Route path constants
    │
    ├── screens/
    │   ├── home/
    │   │   └── index.tsx
    │   └── not-found/
    │       └── index.tsx
    │
    ├── services/
    │   ├── api/
    │   │   ├── axios-instance.ts
    │   │   └── api-helpers.ts
    │   └── alertify-services.ts  # Thin toast wrapper
    │
    ├── providers/
    │   ├── index.tsx             # Composed providers + <Toaster />
    │   └── theme-provider.tsx    # Only if Antd selected
    │
    ├── types/
    │   └── index.ts
    │
    ├── styles/
    │   └── globals.css           # Tailwind directives + CSS vars
    │
    │
    │ # === OPTIONAL: Redux (if selected) ===
    ├── store/
    │   ├── index.ts
    │   ├── root-reducer.ts
    │   └── persist-config.ts
    │
    ├── slices/
    │   └── app-slice.ts
    │
    └── hooks/
        └── redux-hooks.ts        # Typed useAppDispatch, useAppSelector
```

---

## Implementation Phases

### Phase 1: CLI Core (`lib/`)

**Files to create/modify:**

| File | Purpose |
|------|---------|
| `bin/index.js` | Entry point, shebang |
| `lib/prompts.js` | 5-prompt flow using `prompts` or `enquirer` |
| `lib/setup.js` | Main orchestration logic |
| `lib/validators.js` | Project name validation |
| `lib/template-engine.js` | Copy + transform templates |
| `lib/package-manager.js` | npm/yarn/pnpm detection and commands |
| `lib/git.js` | Git init + initial commit |
| `lib/cleanup.js` | Remove partial files on failure |
| `lib/logger.js` | Colored console output |

**Prompt Flow:**

```javascript
const prompts = [
  {
    name: 'projectName',
    type: 'text',
    message: 'Project name:',
    validate: validateProjectName  // alphanumeric, hyphens, underscores
  },
  {
    name: 'packageManager',
    type: 'select',
    message: 'Package manager:',
    choices: ['npm', 'yarn', 'pnpm']
  },
  {
    name: 'features',
    type: 'multiselect',
    message: 'Optional features:',
    choices: [
      { title: 'Redux Toolkit + Redux Persist', value: 'redux' },
      { title: 'Ant Design v5 (replaces Shadcn)', value: 'antd' },
      { title: 'Husky + lint-staged', value: 'husky' }
    ]
  },
  {
    name: 'initGit',
    type: 'confirm',
    message: 'Initialize git repository?',
    initial: true
  },
  {
    name: 'installDeps',
    type: 'confirm',
    message: 'Install dependencies now?',
    initial: true
  }
]
```

### Phase 2: Base Template (`templates/base/`)

**Core files (always included):**

```
templates/base/
├── _package.json.ejs         # EJS template with dynamic deps
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs             # User's custom config
├── .prettierrc
├── .gitignore
├── .env.example
├── index.html
├── README.md.ejs
│
└── src/
    ├── main.tsx
    ├── App.tsx.ejs
    ├── vite-env.d.ts
    │
    ├── lib/
    │   └── utils.ts
    │
    ├── components/
    │   ├── icons/
    │   │   └── index.ts
    │   └── layout/
    │       ├── root-layout.tsx
    │       ├── page-skeleton.tsx
    │       └── error-boundary.tsx
    │
    ├── hooks/
    │   ├── use-debounce.ts
    │   └── use-cancel-token.ts
    │
    ├── routes/
    │   ├── index.tsx
    │   └── routes.ts
    │
    ├── screens/
    │   ├── home/
    │   │   └── index.tsx
    │   └── not-found/
    │       └── index.tsx
    │
    ├── services/
    │   ├── api/
    │   │   ├── axios-instance.ts
    │   │   └── api-helpers.ts
    │   └── alertify-services.ts
    │
    ├── providers/
    │   └── index.tsx.ejs       # Dynamic based on features
    │
    ├── types/
    │   └── index.ts
    │
    └── styles/
        └── globals.css
```

### Phase 3: Shadcn Components (`templates/shadcn/`)

**Only copied when Antd is NOT selected:**

```
templates/shadcn/
├── components.json
└── src/components/ui/
    ├── button.tsx
    ├── input.tsx
    ├── card.tsx
    ├── skeleton.tsx
    ├── separator.tsx
    └── index.ts
```

### Phase 4: Optional Feature Templates

**Redux (`templates/optional/redux/`):**

```
templates/optional/redux/
├── src/
│   ├── store/
│   │   ├── index.ts
│   │   ├── root-reducer.ts
│   │   └── persist-config.ts
│   ├── slices/
│   │   └── app-slice.ts
│   └── hooks/
│       └── redux-hooks.ts
│
└── _api-helpers-redux.ts     # Redux-specific handleApiError
```

**Antd (`templates/optional/antd/`):**

```
templates/optional/antd/
└── src/
    ├── providers/
    │   └── theme-provider.tsx   # ConfigProvider + dark/light toggle
    └── styles/
        └── antd-overrides.css
```

**Husky (`templates/optional/husky/`):**

```
templates/optional/husky/
├── .husky/
│   └── pre-commit
└── .lintstagedrc.json
```

### Phase 5: Dynamic File Generation

**Provider Composition Logic:**

```javascript
// lib/generate-providers.js
function generateProviders(features) {
  const imports = []
  const wrappers = []

  // Always include Toaster
  imports.push(`import { Toaster } from 'react-hot-toast'`)

  if (features.includes('redux')) {
    imports.push(`import { Provider as ReduxProvider } from 'react-redux'`)
    imports.push(`import { PersistGate } from 'redux-persist/integration/react'`)
    imports.push(`import { store, persistor } from '~/store'`)
    wrappers.push({ open: '<ReduxProvider store={store}>', close: '</ReduxProvider>' })
    wrappers.push({ open: '<PersistGate loading={null} persistor={persistor}>', close: '</PersistGate>' })
  }

  if (features.includes('antd')) {
    imports.push(`import { ThemeProvider } from './theme-provider'`)
    wrappers.push({ open: '<ThemeProvider>', close: '</ThemeProvider>' })
  }

  return renderTemplate('providers/index.tsx.ejs', { imports, wrappers })
}
```

---

## Key File Contents

### `src/services/api/axios-instance.ts`

```typescript
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### `src/services/api/api-helpers.ts` (Base - No Redux)

```typescript
import { api } from './axios-instance'
import type { AxiosRequestConfig, CancelToken } from 'axios'

type Headers = Record<string, string>

export async function getApi<T>(
  path: string,
  headers?: Headers,
  cancelToken?: CancelToken,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.get<T>(path, { headers, cancelToken, ...config })
  return response.data
}

export async function postApi<T>(
  path: string,
  data?: unknown,
  headers?: Headers,
  cancelToken?: CancelToken,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.post<T>(path, data, { headers, cancelToken, ...config })
  return response.data
}

export async function patchApi<T>(
  path: string,
  data?: unknown,
  headers?: Headers,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.patch<T>(path, data, { headers, ...config })
  return response.data
}

export async function putApi<T>(
  path: string,
  data?: unknown,
  headers?: Headers,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.put<T>(path, data, { headers, ...config })
  return response.data
}

export async function deleteApi<T>(
  path: string,
  data?: unknown,
  headers?: Headers,
  cancelToken?: CancelToken,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.delete<T>(path, { data, headers, cancelToken, ...config })
  return response.data
}
```

### `src/services/api/api-helpers.ts` (Redux variant - conditional)

```typescript
// Add this ONLY when Redux is selected
import type { SerializedError } from '@reduxjs/toolkit'
import axios from 'axios'

interface ApiError {
  message: string
  status?: number
  code?: string
}

export function handleApiError(
  error: unknown,
  rejectWithValue: (value: ApiError) => unknown
): unknown {
  if (axios.isAxiosError(error)) {
    return rejectWithValue({
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      code: error.code,
    })
  }

  return rejectWithValue({
    message: error instanceof Error ? error.message : 'Unknown error',
  })
}
```

### `src/services/alertify-services.ts`

```typescript
import toast from 'react-hot-toast'

// Auto-dismiss previous toast before showing new one
let currentToastId: string | undefined

const dismiss = () => {
  if (currentToastId) {
    toast.dismiss(currentToastId)
  }
}

export const alertify = {
  success(message: string) {
    dismiss()
    currentToastId = toast.success(message)
    return currentToastId
  },

  error(message: string) {
    dismiss()
    currentToastId = toast.error(message)
    return currentToastId
  },

  info(message: string) {
    dismiss()
    currentToastId = toast(message, { icon: 'ℹ️' })
    return currentToastId
  },
}
```

### `src/hooks/use-cancel-token.ts`

```typescript
import { useRef, useCallback, useEffect } from 'react'
import axios, { CancelTokenSource } from 'axios'

export function useCancelToken() {
  const sourceRef = useRef<CancelTokenSource | null>(null)

  const getToken = useCallback(() => {
    // Cancel previous request if exists
    if (sourceRef.current) {
      sourceRef.current.cancel('Request cancelled')
    }

    // Create new token
    sourceRef.current = axios.CancelToken.source()
    return sourceRef.current.token
  }, [])

  const cancel = useCallback((message = 'Request cancelled') => {
    if (sourceRef.current) {
      sourceRef.current.cancel(message)
      sourceRef.current = null
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancel('Component unmounted')
    }
  }, [cancel])

  return { cancelToken: getToken(), cancel, reset: getToken }
}
```

### `src/components/layout/error-boundary.tsx`

```typescript
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error)
    console.error('Component stack:', errorInfo.componentStack)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={this.handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

### `src/routes/index.tsx` (Lazy Loading)

```typescript
import { lazy, Suspense } from 'react'
import { Route, Switch } from 'wouter'
import { PageSkeleton } from '~/components/layout/page-skeleton'
import { ROUTES } from './routes'

// Lazy load all route components
const Home = lazy(() => import('~/screens/home'))
const NotFound = lazy(() => import('~/screens/not-found'))

export function AppRouter() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Switch>
        <Route path={ROUTES.HOME} component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  )
}
```

### `src/providers/theme-provider.tsx` (Antd only)

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

interface Props {
  children: ReactNode
}

export function ThemeProvider({ children }: Props) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Lazy init from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark' || stored === 'light') return stored
    }
    return 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    setThemeState(curr => curr === 'light' ? 'dark' : 'light')
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <ConfigProvider
        theme={{
          algorithm: theme === 'dark'
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
```

---

## ESLint Configuration (User Provided)

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "import"],
  "root": true,
  "rules": {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "import/no-unresolved": "error",
    "import/named": "error",
    "no-undef": ["error"],
    "no-var": ["error"],
    "react/prop-types": "off",
    "no-await-in-loop": "error",
    "no-constant-binary-expression": "error",
    "no-duplicate-imports": "error",
    "no-new-native-nonconstructor": "error",
    "no-promise-executor-return": "error",
    "no-self-compare": "error",
    "no-template-curly-in-string": "error",
    "no-unmodified-loop-condition": "error",
    "no-unreachable-loop": "error",
    "no-unused-private-class-members": "error",
    "no-use-before-define": "error",
    "react/react-in-jsx-scope": "off",
    "no-extra-boolean-cast": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": {},
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
        "moduleDirectory": ["node_modules", "src/"]
      }
    }
  }
}
```

---

## Dependencies (Final List)

### Core (Always Included)

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "wouter": "^3.3.0",
    "axios": "^1.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.0",
    "class-variance-authority": "^0.7.0",
    "lucide-react": "^0.400.0",
    "react-hot-toast": "^2.4.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react-swc": "^3.7.0",
    "vite": "^5.4.0",
    "typescript": "^5.5.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.57.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.0",
    "eslint-import-resolver-typescript": "^3.6.0",
    "prettier": "^3.3.0",
    "prettier-plugin-tailwindcss": "^0.6.0"
  }
}
```

### Shadcn (When Antd NOT selected)

```json
{
  "dependencies": {
    "@radix-ui/react-slot": "^1.1.0"
  }
}
```

### Redux (Optional)

```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.2.0",
    "react-redux": "^9.1.0",
    "redux-persist": "^6.0.0"
  }
}
```

### Antd (Optional - Replaces Shadcn)

```json
{
  "dependencies": {
    "antd": "^5.20.0",
    "@ant-design/icons": "^5.4.0"
  }
}
```

### Husky (Optional)

```json
{
  "devDependencies": {
    "husky": "^9.1.0",
    "lint-staged": "^15.2.0"
  }
}
```

---

## CLI Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                    npx create-modern-react my-app                │
└──────────────────────────────┬───────────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Check target dir    │
                    │  exists & not empty? │
                    └──────────┬───────────┘
                               │
              ┌────────────────┴────────────────┐
              │ Yes (non-empty)                 │ No (empty/new)
              ▼                                 ▼
    ┌──────────────────┐              ┌──────────────────┐
    │  Prompt user:    │              │  Continue        │
    │  "Dir contains   │              │                  │
    │  files. Proceed?"│              │                  │
    └────────┬─────────┘              └────────┬─────────┘
             │                                  │
    ┌────────┴────────┐                        │
    │ No              │ Yes                    │
    ▼                 ▼                        │
 ┌──────┐    ┌───────────────────────────┬─────┘
 │ Exit │    │                           │
 └──────┘    ▼                           ▼
         ┌──────────────────────────────────┐
         │  Run 5 prompts                   │
         │  1. Project name (validated)     │
         │  2. Package manager              │
         │  3. Features (multiselect)       │
         │  4. Init git?                    │
         │  5. Install deps?                │
         └──────────────┬───────────────────┘
                        │
                        ▼
         ┌──────────────────────────────────┐
         │  Copy base template              │
         └──────────────┬───────────────────┘
                        │
                        ▼
         ┌──────────────────────────────────┐
         │  Antd selected?                  │
         └──────────────┬───────────────────┘
                        │
          ┌─────────────┴─────────────┐
          │ No                        │ Yes
          ▼                           ▼
 ┌─────────────────┐       ┌─────────────────┐
 │ Copy Shadcn     │       │ Copy Antd       │
 │ components +    │       │ theme provider  │
 │ components.json │       │                 │
 └────────┬────────┘       └────────┬────────┘
          │                         │
          └────────────┬────────────┘
                       │
                       ▼
         ┌──────────────────────────────────┐
         │  Copy optional feature templates │
         │  (Redux if selected)             │
         │  (Husky if selected)             │
         └──────────────┬───────────────────┘
                        │
                        ▼
         ┌──────────────────────────────────┐
         │  Generate dynamic files:         │
         │  - package.json (with deps)      │
         │  - providers/index.tsx           │
         │  - api-helpers.ts (± Redux)      │
         │  - App.tsx                       │
         │  - README.md                     │
         └──────────────┬───────────────────┘
                        │
                        ▼
         ┌──────────────────────────────────┐
         │  Init git? (if selected)         │
         └──────────────┬───────────────────┘
                        │
                        ▼
         ┌──────────────────────────────────┐
         │  Install deps? (if selected)     │
         │  npm install / yarn / pnpm       │
         └──────────────┬───────────────────┘
                        │
                        ▼
         ┌──────────────────────────────────┐
         │  ✅ Success! Show next steps     │
         │                                  │
         │  cd my-app                       │
         │  yarn dev                        │
         └──────────────────────────────────┘

         ─────────────────────────────────────
         ON ANY ERROR:
         ─────────────────────────────────────
                        │
                        ▼
         ┌──────────────────────────────────┐
         │  Auto-cleanup: delete all        │
         │  created files/folders           │
         │  Show error message              │
         └──────────────────────────────────┘
```

---

## Verification Checklist

After implementation, test each scenario:

### 1. Core Only (No Options)
```bash
npx create-modern-react test-core
# Select: npm, no features, yes git, yes install
# Verify: Shadcn components included, no Redux, no Antd
```

### 2. Redux Only
```bash
npx create-modern-react test-redux
# Select: yarn, [redux], yes git, yes install
# Verify: store/, slices/, redux-hooks.ts, handleApiError in api-helpers.ts
```

### 3. Antd Only
```bash
npx create-modern-react test-antd
# Select: pnpm, [antd], yes git, yes install
# Verify: NO Shadcn ui/, NO components.json, theme-provider.tsx exists
```

### 4. Redux + Antd
```bash
npx create-modern-react test-full
# Select: yarn, [redux, antd], yes git, yes install
# Verify: Both Redux store and Antd theme provider in providers/index.tsx
```

### 5. Husky
```bash
npx create-modern-react test-husky
# Select: npm, [husky], yes git, yes install
# Verify: .husky/pre-commit exists, .lintstagedrc.json exists
```

### 6. All Features
```bash
npx create-modern-react test-all
# Select: yarn, [redux, antd, husky], yes git, yes install
# Verify: All optional features work together
```

### 7. Non-Empty Directory
```bash
mkdir test-nonempty && touch test-nonempty/existing.txt
npx create-modern-react test-nonempty
# Should prompt: "Directory contains 1 file. Continue? (y/N)"
```

### 8. Failure Recovery
```bash
# Simulate failure by killing process mid-scaffold
# Verify: partial files are cleaned up
```

### Quality Checks for Each Generated Project:
```bash
cd <project>
yarn dev        # Should start on port 5173
yarn lint       # Should pass with no errors
yarn build      # Should build successfully
yarn typecheck  # If added - should pass
```

---

## Files to Create/Modify

### CLI Package Structure

```
create-modern-react/
├── package.json
├── README.md
├── LICENSE
│
├── bin/
│   └── index.js              # CLI entry point
│
├── lib/
│   ├── prompts.js            # 5-prompt flow
│   ├── setup.js              # Main orchestration
│   ├── validators.js         # Project name validation
│   ├── template-engine.js    # Copy + transform
│   ├── package-manager.js    # npm/yarn/pnpm
│   ├── git.js                # Git operations
│   ├── cleanup.js            # Auto-cleanup on failure
│   └── logger.js             # Colored output
│
└── templates/
    ├── base/                 # Always copied
    ├── shadcn/               # When Antd NOT selected
    └── optional/
        ├── redux/
        ├── antd/
        └── husky/
```

---

## Summary of Enhancements

| Area | Original Spec | Enhanced Version |
|------|---------------|------------------|
| Bundle optimization | Not specified | Direct lucide imports, dynamic imports pattern |
| Route loading | Not specified | Lazy loading with Suspense |
| State patterns | Basic | Functional setState, lazy init |
| Error handling | Basic | Console + fallback ErrorBoundary |
| API layer | handleApiError always | Conditional Redux-specific code |
| UI extension | Not specified | Docs-only approach for Shadcn |
| TypeScript | Not specified | Strict mode |
| ESLint | Generic | User's comprehensive config |
| Storage hooks | Included | Removed (let users add own) |
| Non-empty dir | Not specified | Prompt user |
| Failure handling | Not specified | Auto-cleanup |

---

*Plan enhanced with Vercel React Best Practices and spec interrogation insights.*
