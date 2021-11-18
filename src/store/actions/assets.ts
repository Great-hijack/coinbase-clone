import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {AssetsState} from '../reducers/assets';

import Asset from '../../models/Asset';

export const SET_ASSETS_DATA = 'SET_ASSETS_DATA';

export const fetchAssetsData = () => {
  return async (dispatch: ThunkDispatch<AssetsState, void, Action>) => {
    try {
      let assetsData: Asset[] = [];

      assetsData = [
        {
          id: 4943,
          name: 'Dai',
          symbol: 'DAI',
          price: 0.999952,
          balance: 153598.32401928,
        },
        {
          id: 3890,
          name: 'Polygon',
          symbol: 'MATIC',
          price: 1.85,
          balance: 7934.86989999,
        },
        {
          id: 2010,
          name: 'Cardano',
          symbol: 'ADA',
          price: 2.32,
          balance: 6014.084393,
        },
        {
          id: 5177,
          name: 'Internet Computer',
          symbol: 'ICP',
          price: 54.02,
          balance: 1565.50587697,
        },
        {
          id: 1027,
          name: 'Ethereum',
          symbol: 'ETH',
          price: 4802.76,
          balance: 0.31960713,
        },
      ];

      dispatch({
        type: SET_ASSETS_DATA,
        assetsData: assetsData,
      });
    } catch (err) {
      throw err;
    }
  };
};
