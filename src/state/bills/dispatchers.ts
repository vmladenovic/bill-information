import {useStateDispatch} from '@/state/state-hooks';
import {setActiveBill, toggleFavourite, setTab} from './bills-slice';
import type {Bill, BillTabs} from './types';

export function useSetActiveBill() {
    const dispatch = useStateDispatch();

    return (activeBill: Bill | undefined) =>
        dispatch(setActiveBill(activeBill));
}

export function useToggleFavourite() {
    const dispatch = useStateDispatch();

    return (bill: Bill) => dispatch(toggleFavourite(bill));
}

export function useSetTab() {
    const dispatch = useStateDispatch();

    return (tab: BillTabs) => dispatch(setTab(tab));
}
