import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {AssetsState} from '../reducers/assets';

export const SET_GRAPH_DATA = 'SET_GRAPH_DATA';
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
    url: 'histohour',
    limit: 24 * 30,
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

export type Balance = Array<string | number>;
export enum DateRange {
  '1H' = '1H',
  '1D' = '1D',
  '1W' = '1W',
  '1M' = '1M',
  '1Y' = '1Y',
  'All' = 'All',
}

type Props = {
  balanceHistory: Balance[];
  range: DateRange;
};

export const fetchGraphData = ({balanceHistory, range}: Props) => {
  const timeFrom = Date.now() / 1000 - API_PARAMS[range].timeDiff;
  const coins = balanceHistory.reduce((prev, current) => [...prev, current[1]], []);
  return async (dispatch: ThunkDispatch<AssetsState, void, Action>) => {
    try {
      const fetchHistoryData = coins.map(coin => {
        const response = fetch(
          `https://min-api.cryptocompare.com/data/v2/${API_PARAMS[range].url}?fsym=${coin}&tsym=USD&limit=${API_PARAMS[range].limit}`
        ).then(res => res.json());

        return response;
      });

      const _historyData = await Promise.all(fetchHistoryData);
      const historyData = _historyData.reduce((prev, current, index) => ({...prev, [coins[index]]: current}), {});

      const graphData = balanceHistory.reduce((prev, current) => {
        const data = historyData[current[1]].Data.Data.map(item => (item.time > current[0] ? item.high * current[2] : 0));

        if (prev) {
          return prev.map((v, i) => v + data[i]);
        } else {
          return data;
        }
      }, null);

      if (range === '1D') {
        const filteredGraphData = graphData?.filter((item, index) => {
          return index % 6 === 0;
        });
        dispatch({
          type: SET_GRAPH_DATA,
          graphData: filteredGraphData,
        });
      } else if (range === '1M') {
        const filteredMonthGraphData = graphData?.filter((item, index) => {
          return index % 24 === 0;
        });
        dispatch({
          type: SET_GRAPH_DATA,
          graphData: filteredMonthGraphData,
        });
      } else {
        dispatch({
          type: SET_GRAPH_DATA,
          graphData: graphData,
        });
      }
    } catch (err) {
      throw err;
    }
  };
};
