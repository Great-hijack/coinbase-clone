import {AnyAction} from 'redux';
import {SET_BALANCE_HISTORY_DATA} from '../actions/balancehistory';
// import {Balance} from '../actions/balancehistory';
import Balance from '../../models/Balance';

export interface BalanceHistoryState {
  balanceHistoryData: Balance[];
}

const initialState: BalanceHistoryState = {
  balanceHistoryData: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_BALANCE_HISTORY_DATA:
      return {
        balanceHistoryData: action.balanceHistoryData,
      };
  }
  return state;
};
