import { Suspense } from 'react';
import { Route, Switch } from 'wouter';
import { routes } from './routes';
import { Skeleton } from '~/components/ui';

/**
 * Loading fallback component
 */
function RouteLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}

/**
 * Application router using Wouter
 * - Lightweight (2KB) alternative to React Router
 * - Supports lazy loading with React.Suspense
 * - Simple API with <Route> and <Switch>
 */
export function AppRouter() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Switch>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} path={path}>
            <Component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}

export { routes } from './routes';
