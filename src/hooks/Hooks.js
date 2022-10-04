import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type {AppDispatch, StateAppType} from "../store/store";


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StateAppType> = useSelector;