import {BillTabs} from '@/state/bills/types';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const initialState = {
    bills: {
        activeBill: undefined,
        favourites: [],
        tab: BillTabs.All,
    },
};
const store = mockStore(initialState);

export default store;
