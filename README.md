<p align="center">
  <img src="https://raw.githubusercontent.com/facebook/react/main/fixtures/dom/public/react-logo.svg" width="80" alt="React Logo" />
</p>

<h1 align="center">create-modern-react</h1>

<p align="center">
  <strong>Production-ready React + TypeScript + Tailwind in 30 seconds</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/create-modern-react"><img src="https://img.shields.io/npm/v/create-modern-react.svg?style=flat-square&color=00d8ff" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/create-modern-react"><img src="https://img.shields.io/npm/dm/create-modern-react.svg?style=flat-square&color=00d8ff" alt="npm downloads" /></a>
  <a href="https://github.com/abhay-rana/create-modern-react/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/create-modern-react.svg?style=flat-square&color=00d8ff" alt="license" /></a>
</p>

<p align="center">
  <code>npx create-modern-react my-app</code>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/create-modern-react">
    <img src="https://img.shields.io/badge/View%20on-npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="View on npm" />
  </a>
  <a href="https://stackblitz.com/github/abhay-rana/react-vite-tailwind-shadcn-starter?file=README.md">
    <img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="Open in StackBlitz" />
  </a>
</p>

---

## Why?

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   npm create vite@latest              vs       npx create-modern-react  │
│                                                                         │
│   ✗ Empty src/ folder                         ✓ Complete project        │
│   ✗ No styling solution                       ✓ Tailwind CSS ready      │
│   ✗ No routing                                ✓ Wouter + lazy loading   │
│   ✗ No API layer                              ✓ Axios + interceptors    │
│   ✗ No UI components                          ✓ Shadcn/ui (5 components)│
│   ✗ No icons                                  ✓ Lucide React            │
│   ✗ No toast notifications                    ✓ react-hot-toast         │
│   ✗ No error boundary                         ✓ Built-in                │
│   ✗ Basic ESLint                              ✓ 25+ rules configured    │
│   ✗ No state management                       ✓ Redux (optional)        │
│   ✗ ~2 hours setup                            ✓ 15 seconds              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Stop configuring. Start building.**

---

## Quick Start

```bash
npx create-modern-react my-app
cd my-app
yarn dev
```

That's it. Your app is running at `http://localhost:3000`

---

## 🚀 Try Before Install

**Experience it live without downloading anything:**

<p align="center">
  <a href="https://stackblitz.com/github/abhay-rana/react-vite-tailwind-shadcn-starter?file=README.md">
    <img src="https://img.shields.io/badge/Open_in-StackBlitz-1269D3?style=for-the-badge&logo=stackblitz&logoColor=white" alt="Open in StackBlitz" />
  </a>
</p>

<p align="center">
  <strong>👆 Click above to see the full project running in your browser</strong>
  <br />
  <em>No installation required • Full IDE in browser • See all features in action</em>
</p>

---

## What's Included

### Core Stack (Every Project)

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3 | Latest features, concurrent rendering |
| **TypeScript** | 5.5 | Strict mode, full type safety |
| **Vite + SWC** | 5.4 | 20x faster than Babel |
| **Tailwind CSS** | 3.4 | Dark mode, CSS variables |
| **Shadcn/ui** | Latest | Button, Input, Card, Skeleton, Separator |
| **Wouter** | 3.3 | 2KB router (vs 28KB React Router) |
| **Axios** | 1.7 | Interceptors, cancel tokens |
| **Lucide React** | Latest | Beautiful, consistent icons |

### Optional Features

Select during project creation:

```
[ ] Redux Toolkit + Redux Persist ── State management with persistence
[ ] Ant Design v5 ───────────────── Enterprise UI (replaces Shadcn/ui)
[ ] Husky + lint-staged ─────────── Git hooks for code quality
```

### Build Optimizations

```
┌────────────────────┬────────────────────────────────────────┐
│ SWC Compiler       │ 20x faster than Babel                  │
├────────────────────┼────────────────────────────────────────┤
│ Gzip Compression   │ Pre-compressed .gz files (1KB thresh.) │
├────────────────────┼────────────────────────────────────────┤
│ Chunk Splitting    │ Separate vendor + router bundles       │
├────────────────────┼────────────────────────────────────────┤
│ Tree Shaking       │ Dead code elimination                  │
├────────────────────┼────────────────────────────────────────┤
│ Console Removal    │ Auto-stripped in production            │
├────────────────────┼────────────────────────────────────────┤
│ SVG Components     │ Import SVGs as React components        │
└────────────────────┴────────────────────────────────────────┘
```

---

## Generated Structure

```
my-app/
├── src/
│   ├── components/
│   │   ├── ui/                 # Shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── separator.tsx
│   │   └── layout/
│   │       ├── root-layout.tsx
│   │       └── error-boundary.tsx
│   ├── hooks/
│   │   ├── use-loader.ts       # Loading state management
│   │   ├── use-debounce.ts     # Value debouncing
│   │   └── use-cancel-token.ts # Axios request cancellation
│   ├── routes/
│   │   └── index.tsx           # Wouter + lazy loading
│   ├── screens/
│   │   ├── home/
│   │   └── not-found/
│   ├── services/
│   │   ├── api/
│   │   │   ├── axios-instance.ts
│   │   │   └── api-helpers.ts  # getApi, postApi, patchApi...
│   │   └── alertify-services.ts
│   ├── providers/
│   │   └── theme-provider.tsx
│   ├── lib/
│   │   └── utils.ts            # cn() utility
│   └── types/
├── vite.config.ts              # SWC + SVGR + Compression
├── tailwind.config.js          # Dark mode + CSS variables
├── tsconfig.json               # Strict mode + path aliases
└── .eslintrc.cjs               # 25+ rules configured
```

---

## Features

### SVG as React Components

```tsx
import Logo from './logo.svg?react';

<Logo className="h-8 w-8 text-primary" />
```

### Type-Safe API Layer

```tsx
import { getApi, postApi } from '~/services/api';

const users = await getApi<User[]>('/users');
const newUser = await postApi<User>('/users', { name: 'John' });
```

### Toast Notifications

```tsx
import { Alertify } from '~/services/alertify-services';

Alertify.success('Saved successfully');
Alertify.error('Something went wrong');
Alertify.loading('Processing...');
```

### Custom Hooks

```tsx
// Loading state
const [isLoading, startLoader, endLoader] = useLoader();

const fetchData = async () => {
  startLoader();
  try {
    await getApi('/users');
  } finally {
    endLoader();
  }
};

// Debounced search
const debouncedQuery = useDebounce(searchQuery, 300);

// Cancel requests on unmount
const { cancelToken, cancel } = useCancelToken();
```

### Path Aliases

```tsx
// ❌ Instead of this:
import { Button } from '../../../components/ui/button';

// ✅ Write this:
import { Button } from '~/components/ui';
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start dev server (port 3000) |
| `yarn build` | Production build with gzip |
| `yarn preview` | Preview production build |
| `yarn lint` | Run ESLint |
| `yarn lint:fix` | Fix ESLint issues |
| `yarn format` | Format with Prettier |

---

## Build Output

```
dist/
├── assets/
│   ├── index-[hash].js         # Main bundle
│   ├── index-[hash].js.gz      # Gzipped (~70% smaller)
│   ├── vendor-[hash].js        # React + ReactDOM (cached)
│   ├── router-[hash].js        # Wouter (cached)
│   └── index-[hash].css.gz
└── index.html
```

---

## Comparison

| Feature | Vite | CRA | **create-modern-react** |
|---------|:----:|:---:|:-----------------------:|
| Build Speed | Fast | Slow | **Fastest (SWC)** |
| TypeScript | ✅ | ✅ | ✅ Strict |
| Tailwind CSS | ❌ | ❌ | ✅ |
| UI Components | ❌ | ❌ | ✅ |
| Routing | ❌ | ❌ | ✅ |
| API Layer | ❌ | ❌ | ✅ |
| Toast System | ❌ | ❌ | ✅ |
| Error Boundary | ❌ | ❌ | ✅ |
| Gzip Build | ❌ | ❌ | ✅ |
| SVG Components | ❌ | ✅ | ✅ |
| Dark Mode | ❌ | ❌ | ✅ |
| Path Aliases | ❌ | ❌ | ✅ |
| **Setup Time** | ~1hr | ~2hr | **30 sec** |

---

## Built With This Boilerplate

<p align="center">
  <a href="https://resumefreepro.com?utm_source=github&utm_medium=readme&utm_campaign=create-modern-react">
    <strong>ResumeFreePro.com</strong>
  </a>
  <br />
  <em>Free AI-powered resume builder — built entirely with create-modern-react</em>
</p>

> Want to showcase your project? [Open an issue](https://github.com/abhay-rana/create-modern-react/issues) to get featured!

---

## CLI Options

```bash
npx create-modern-react my-app              # Interactive mode
npx create-modern-react my-app --skip-install  # Skip npm install
npx create-modern-react my-app --skip-git      # Skip git init
```

---

## Requirements

- Node.js **18+**
- npm, yarn, or pnpm

---

## License

MIT © [Abhay Rana](https://github.com/abhay-rana)

---

<p align="center">
  <strong>From <code>npx</code> to production-ready in 30 seconds.</strong>
</p>

<p align="center">
  <a href="https://github.com/abhay-rana/create-modern-react">⭐ Star on GitHub</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/abhay-rana/create-modern-react/issues">Report Bug</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/abhay-rana/create-modern-react/issues">Request Feature</a>
</p>
