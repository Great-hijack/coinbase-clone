import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {useSelector, useDispatch} from 'react-redux';
import {AssetsState} from '../reducers/assets';

import Asset from '../../models/Asset';
import {balanceHistory} from '../../data/BalanceHistory';
import Coin from '../../models/Coin';
import {getCoinData, getCoinPrice} from '../../utils';

import cmpData from '../../data/CoinMarketCapData';
import {Balance} from './history';

export const SET_ASSETS_DATA = 'SET_ASSETS_DATA';

export const fetchAssetsData = () => {
  return async (dispatch: ThunkDispatch<AssetsState, void, Action>) => {
    try {
      let assetsData: Asset[] = [];
      let objectBalance: any = {};
      let coins: string[] = [];
      balanceHistory.forEach(item => {
        let coinKey = item[1];
        objectBalance[coinKey] = objectBalance[coinKey] ? objectBalance[coinKey] + item[2] : item[2];
      });

      Object.keys(objectBalance).map((key, index) => {
        if (key === 'USD') {
          return;
        }
        coins.push(key);
      });

      const cryptoResponse = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${coins.join()}`
      );
      const cryptoResponseData = await cryptoResponse.json();

      const coinData: Coin[] = [];
      coins.forEach(coin => {
        // Find ID from CMP data, if it doesn't exist use 1
        const coinDetails = cryptoResponseData.RAW[coin].USD;
        const cmpDetails = cmpData.data.find(cmpCoin => coinDetails.FROMSYMBOL === cmpCoin.symbol);
        const coinID = cmpDetails?.id ?? 0;
        const coinName = cmpDetails?.name ?? 'Unknown';
        coinData.push(new Coin(coinID, coinName, coin, coinDetails.PRICE, coinDetails.CHANGEPCT24HOUR));
      });

      coinData.map((datum, index) => {
        let id = datum.id;
        let name = datum.name;
        let symbol = datum.symbol;
        let price = objectBalance[datum.symbol];
        let balance = datum.price;
        assetsData.push({id: id, name: name, symbol: symbol, price: price, balance: balance});
      });

      assetsData.sort(function (a: any, b: any) {
        return b.balance * b.price - a.balance * a.price;
      });

      if (!Object.keys(objectBalance).find(key => key === 'USDC')) {
        assetsData.unshift({id: 3408, name: 'USD Coin', symbol: 'USDC', price: 0, balance: 0});
      } else {
        assetsData.unshift({id: 3408, name: 'USD Coin', symbol: 'USDC', price: objectBalance['USDC'], balance: 0});
      }

      if (!Object.keys(objectBalance).find(key => key === 'USD')) {
        assetsData.unshift({id: 0, name: 'USD Dollar', symbol: 'USD', price: 0, balance: 0});
      } else {
        assetsData.unshift({id: 0, name: 'USD Dollar', symbol: 'USD', price: objectBalance['USD'], balance: 1});
      }

      dispatch({
        type: SET_ASSETS_DATA,
        assetsData: assetsData,
      });
    } catch (err) {
      throw err;
    }
  };
};
