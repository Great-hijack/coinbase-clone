import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {AssetsState} from '../reducers/assets';

export const SET_COIN_HISTORY_DATA = 'SET_COIN_HISTORY_DATA';
export const API_PARAMS = {
  '1H': {
    url: 'histominute',
    limit: 60,
    timeDiff: 60 * 60,
  },
  '1D': {
    url: 'histominute',
    limit: 24 * 60,
    timeDiff: 24 * 60 * 60,
  },
  '1W': {
    url: 'histohour',
    limit: 24 * 7,
    timeDiff: 7 * 24 * 60 * 60,
  },
  '1M': {
    url: 'histoday',
    limit: 30,
    timeDiff: 30 * 24 * 60 * 60,
  },
  '1Y': {
    url: 'histoday',
    limit: 365,
    timeDiff: 365 * 24 * 60 * 60,
  },
  All: {
    url: 'histoday',
    limit: 2000,
    timeDiff: 2000 * 24 * 60 * 60,
  },
};

export type CoinBalance = Array<string | number>;
export enum DateRange {
  '1H' = '1H',
  '1D' = '1D',
  '1W' = '1W',
  '1M' = '1M',
  '1Y' = '1Y',
  'All' = 'All',
}

type Props = {
  symbol: string;
  range: DateRange;
};

export const fetchGraphData = ({symbol, range}: Props) => {
  return async (dispatch: ThunkDispatch<AssetsState, void, Action>) => {
    try {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/v2/${API_PARAMS[range].url}?fsym=${symbol}&tsym=USD&limit=${API_PARAMS[range].limit}`
      );
      const fetchHistoryData = await response.json();
      const _history = fetchHistoryData['Data']['Data'];
      const historyData = _history.map(item => item.high);

      if (range === '1D') {
        const filteredGraphData = historyData?.filter((item, index) => {
          return index % 6 === 0;
        });
        dispatch({
          type: SET_COIN_HISTORY_DATA,
          coinGraphData: filteredGraphData,
        });
      } else {
        dispatch({
          type: SET_COIN_HISTORY_DATA,
          coinGraphData: historyData,
        });
      }
    } catch (err) {
      throw err;
    }
  };
};
