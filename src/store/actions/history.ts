import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import Balance from '../../models/Balance';
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

export enum DateRange {
  '1H' = '1H',
  '1D' = '1D',
  '1W' = '1W',
  '1M' = '1M',
  '1Y' = '1Y',
  'All' = 'All',
}

type Props = {
  balanceHistoryData: Balance[];
  range: DateRange;
};

export const fetchGraphData = ({balanceHistoryData, range}: Props) => {
  const coins = balanceHistoryData.reduce((prev, current) => [...prev, current['coinSymbol']], []);
  return async (dispatch: ThunkDispatch<AssetsState, void, Action>) => {
    try {
      const fetchHistoryData = coins.map(coin => {
        const response = fetch(
          `https://min-api.cryptocompare.com/data/v2/${API_PARAMS[range].url}?fsym=${coin}&tsym=USD&limit=${API_PARAMS[range].limit}`
        )
          .then(res => res.json())
          .catch(err => console.log(err));

        return response;
      });

      const _historyData = await Promise.all(fetchHistoryData);
      const historyData = _historyData.reduce((prev, current, index) => ({...prev, [coins[index]]: current}), {});

      const graphData = balanceHistoryData.reduce((prev, current) => {
        const data = historyData[current['coinSymbol']].Data.Data.map(item =>
          item.time > current['exchangeTime'] ? item.high * current['balance'] : 0
        );

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
