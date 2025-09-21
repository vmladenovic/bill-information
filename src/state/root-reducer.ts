import {combineReducers} from '@reduxjs/toolkit';
import billsReducer from './bills/bills-slice';

const rootReducer = combineReducers({
    bills: billsReducer,
});

export default rootReducer;
