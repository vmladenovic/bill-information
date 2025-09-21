import {useDispatch, useSelector, type TypedUseSelectorHook} from 'react-redux';
import type {RootState, StateDispatch} from '@/state/store';

export const useStateDispatch: () => StateDispatch = useDispatch;
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
