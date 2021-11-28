import {AnyAction} from 'redux';
import {SET_COIN_HISTORY_DATA} from '../actions/coinhistory';

export interface CoinHistoryState {
  coinGraphData: number[];
}

const initialState: CoinHistoryState = {
  coinGraphData: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_COIN_HISTORY_DATA:
      return {
        coinGraphData: action.coinGraphData,
      };
  }
  return state;
};
