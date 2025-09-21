import {useStateSelector} from '@/state/state-hooks';

export function useActiveBill() {
    return useStateSelector((state) => state.bills.activeBill);
}

export function useFavourites() {
    return useStateSelector((state) => state.bills.favourites);
}
