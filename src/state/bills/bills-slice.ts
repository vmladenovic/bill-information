import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {Bill} from './types';

interface BillsState {
    activeBill?: Bill;
    favourites: Bill[];
}

const initialState: BillsState = {
    activeBill: undefined,
    favourites: [],
};

const billsSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        setActiveBill(state, action: PayloadAction<Bill | undefined>) {
            state.activeBill = action.payload;
        },
        addFavourite(state, action: PayloadAction<Bill>) {
            if (
                !state.favourites.find((bill) => bill.id === action.payload.id)
            ) {
                state.favourites = [...state.favourites, action.payload];
            }
        },
        removeFavourite(state, action: PayloadAction<string>) {
            state.favourites = state.favourites.filter(
                (bill) => bill.id !== action.payload,
            );
        },
    },
});

export const {setActiveBill, addFavourite, removeFavourite} =
    billsSlice.actions;
export default billsSlice.reducer;
