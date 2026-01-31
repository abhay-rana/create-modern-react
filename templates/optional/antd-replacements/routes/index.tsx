import { Suspense } from 'react';
import { Route, Switch } from 'wouter';
import { routes } from './routes';
import { Skeleton } from 'antd';

/**
 * Loading fallback component
 */
function RouteLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Skeleton.Avatar active size={48} shape="circle" />
        <Skeleton.Input active size="small" style={{ width: 128 }} />
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
