import {useStateDispatch} from '@/state/state-hooks';
import {addFavourite, removeFavourite, setActiveBill} from './bills-slice';
import {Bill} from './types';

export function useSetActiveBill() {
    const dispatch = useStateDispatch();

    return (activeBill: Bill | undefined) =>
        dispatch(setActiveBill(activeBill));
}

export function useAddFavourite() {
    const dispatch = useStateDispatch();

    return (bill: Bill) => dispatch(addFavourite(bill));
}

export function useRemoveFavourite() {
    const dispatch = useStateDispatch();

    return (billId: string) => dispatch(removeFavourite(billId));
}
