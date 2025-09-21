import {useStateSelector} from '@/state/state-hooks';
import {createSelector} from 'reselect';
import type {RootState} from '../store';

const selectActiveBill = (state: RootState) => state.bills.activeBill;
const selectFavourites = (state: RootState) => state.bills.favourites;
const selectFavouritesCount = (state: RootState) =>
    state.bills.favourites.length;
const selectTab = (state: RootState) => state.bills.tab;
const selectFavouriteIds = createSelector(
    (state: RootState) => state.bills.favourites,
    (favourites) => favourites.map(({id}) => id),
);

export function useActiveBill() {
    return useStateSelector(selectActiveBill);
}

export function useFavourites() {
    return useStateSelector(selectFavourites);
}

export function useFavouriteIds() {
    return useStateSelector(selectFavouriteIds);
}

export function useFavouritesCount() {
    return useStateSelector(selectFavouritesCount);
}

export function useBillTab() {
    return useStateSelector(selectTab);
}
