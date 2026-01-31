import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Skeleton } from 'antd';

interface ReduxProviderProps {
  children: React.ReactNode;
}

function LoadingFallback() {
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
 * Redux Provider with persistence
 * Wraps the application with Redux store and persist gate
 */
export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingFallback />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
