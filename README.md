# create-modern-react

Create a modern React application with Vite, TypeScript, and your choice of modern libraries.

## Quick Start

```bash
npx create-modern-react my-app
cd my-app
npm run dev
```

## Features

🚀 **Modern Stack**: Vite + React 18 + TypeScript
📦 **Interactive Setup**: Choose your preferred libraries
🎨 **UI Libraries**: Ant Design, Material-UI, Chakra UI support
🎯 **State Management**: Redux Toolkit, Zustand, Jotai options
🛣️ **Routing**: React Router or Wouter
🔧 **Development Tools**: ESLint, Prettier, Storybook, Testing
🎨 **Styling**: Tailwind CSS, CSS Modules, Styled Components
📱 **PWA Ready**: Optional Progressive Web App support

## Usage

### Basic Usage

```bash
npx create-modern-react my-project
```

### With Options

```bash
npx create-modern-react my-project --skip-install --skip-git
```

## Interactive Prompts

The CLI will guide you through selecting:

- **Project Name**: Your project directory name
- **Package Manager**: npm, yarn, or pnpm
- **UI Library**: Ant Design, Material-UI, Chakra UI, or none
- **CSS Framework**: Tailwind CSS, CSS Modules, Styled Components, or plain CSS
- **State Management**: Redux Toolkit, Zustand, Jotai, or React state only
- **Data Fetching**: React Query, SWR, Apollo Client, or Fetch API
- **Routing**: React Router, Wouter, or none
- **Development Tools**: Storybook, ESLint/Prettier, Husky, Testing
- **Icons**: Lucide React, React Icons, Heroicons, or none
- **PWA**: Progressive Web App features
- **Git**: Initialize Git repository

## Template Combinations

### Minimal Setup

- Vite + React + TypeScript + Tailwind CSS

### Enterprise Ready

- Vite + React + TypeScript + Ant Design + Redux Toolkit + React Query + React Router

### Modern Stack

- Vite + React + TypeScript + Tailwind + Zustand + React Query + Wouter

### Full Featured

- All libraries with Storybook, testing, and PWA support

## CLI Options

- `--skip-install`: Skip automatic dependency installation
- `--skip-git`: Skip Git repository initialization
- `--template <name>`: Use a specific template (future feature)

## Requirements

- Node.js 16.0.0 or higher
- npm, yarn, or pnpm

## Generated Project Structure

```
my-app/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   ├── styles/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT © [Your Name]
