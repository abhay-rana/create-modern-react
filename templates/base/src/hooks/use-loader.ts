import { useState } from 'react';

/**
 * Hook for managing loading states
 * Returns a tuple of [isLoading, startLoader, endLoader]
 *
 * @param initialState - Initial loading state (default: false)
 *
 * @example
 * const [isLoading, startLoader, endLoader] = useLoader(false);
 *
 * const fetchData = async () => {
 *   startLoader();
 *   try {
 *     const data = await getApi('/users');
 *     setUsers(data);
 *   } finally {
 *     endLoader();
 *   }
 * };
 *
 * return (
 *   <div>
 *     <button onClick={fetchData} disabled={isLoading}>
 *       {isLoading ? 'Loading...' : 'Fetch Data'}
 *     </button>
 *   </div>
 * );
 */
export const useLoader = (
  initialState: boolean = false
): [boolean, () => void, () => void] => {
  const [loader, setLoader] = useState(initialState);

  const startLoader = () => setLoader(true);
  const endLoader = () => setLoader(false);

  return [loader, startLoader, endLoader];
};
