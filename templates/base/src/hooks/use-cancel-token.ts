import { useRef, useCallback, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';

/**
 * Hook for managing Axios request cancellation
 * Automatically cancels pending requests on component unmount
 *
 * @example
 * const { cancelToken, cancel, reset } = useCancelToken();
 *
 * useEffect(() => {
 *   getApi('/users', {}, cancelToken)
 *     .then(setUsers)
 *     .catch(err => {
 *       if (!axios.isCancel(err)) {
 *         console.error(err);
 *       }
 *     });
 *
 *   return () => cancel(); // Cancel on unmount
 * }, []);
 */
export function useCancelToken() {
  const sourceRef = useRef<CancelTokenSource | null>(null);

  // Create a new cancel token
  const getToken = useCallback(() => {
    // Cancel previous request if exists
    if (sourceRef.current) {
      sourceRef.current.cancel('Operation cancelled due to new request');
    }

    sourceRef.current = axios.CancelToken.source();
    return sourceRef.current.token;
  }, []);

  // Cancel the current request
  const cancel = useCallback((message?: string) => {
    if (sourceRef.current) {
      sourceRef.current.cancel(message || 'Operation cancelled by user');
      sourceRef.current = null;
    }
  }, []);

  // Reset the cancel token
  const reset = useCallback(() => {
    sourceRef.current = null;
  }, []);

  // Cancel on unmount
  useEffect(() => {
    return () => {
      cancel('Component unmounted');
    };
  }, [cancel]);

  return {
    cancelToken: getToken(),
    cancel,
    reset,
    isCancel: axios.isCancel,
  };
}
