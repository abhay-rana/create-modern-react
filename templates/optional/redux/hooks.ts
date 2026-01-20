import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Typed version of useDispatch hook
 * Use this instead of plain `useDispatch` for better type inference
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed version of useSelector hook
 * Use this instead of plain `useSelector` for better type inference
 *
 * @example
 * const isLoading = useAppSelector((state) => state.app.isLoading);
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
