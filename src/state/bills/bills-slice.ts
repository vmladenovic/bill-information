import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {BillTabs, type Bill, type BillsState} from './types';

const initialState: BillsState = {
    activeBill: undefined,
    favourites: [],
    tab: BillTabs.All,
};

const billsSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        setActiveBill(state, action: PayloadAction<Bill | undefined>) {
            return {...state, activeBill: action.payload};
        },
        toggleFavourite(state, action: PayloadAction<Bill>) {
            if (
                !state.favourites.find((bill) => bill.id === action.payload.id)
            ) {
                return {
                    ...state,
                    favourites: [...state.favourites, action.payload],
                };
            } else {
                return {
                    ...state,
                    favourites: state.favourites.filter(
                        (bill) => bill.id !== action.payload.id,
                    ),
                };
            }
        },
        setTab(state, action: PayloadAction<BillTabs>) {
            return {...state, tab: action.payload};
        },
    },
});

export const {setActiveBill, toggleFavourite, setTab} = billsSlice.actions;
export default billsSlice.reducer;
