import { type ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { RootLayout } from '~/components/layout';
import { ErrorBoundary } from '~/components/layout';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Application providers composition
 * Wraps the app with all necessary context providers
 *
 * Order matters! Providers at the top are available to all children.
 * Add new providers here when needed (e.g., Redux, Auth, etc.)
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="app-theme">
        <RootLayout>{children}</RootLayout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export { ThemeProvider, useTheme } from './theme-provider';
