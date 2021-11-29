import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {AssetsState} from '../reducers/assets';

import Asset from '../../models/Asset';
import {balanceHistory} from '../../data/BalanceHistory';
import Coin from '../../models/Coin';
import {changeAssetsPosition, getCoinData, getCoinPrice} from '../../utils';

import cmpData from '../../data/CoinMarketCapData';
import {Balance} from './history';

export const SET_ASSETS_DATA = 'SET_ASSETS_DATA';

export const fetchAssetsData = () => {
  return async (dispatch: ThunkDispatch<AssetsState, void, Action>) => {
    try {
      const coinResponse = await fetch(
        `https://www.coinbase.com/api/v2/assets/search?base=USD&country=US&filter=all&include_prices=false&limit=5&order=asc&page=1&query=&resolution=day&sort=rank`
      );
      const coinResponseJson = await coinResponse.json();
      const coinResponseData = coinResponseJson['data'];

      const allStaticCoins: any = coinResponseData.map(item => item.base);
      const staticCoins: any = allStaticCoins.filter(item => item !== 'ETH2');

      let assetsData: Asset[] = [];
      let objectBalance: any = {};
      let coins: string[] = [];
      let usdCoinIndex: number = 0;
      balanceHistory.forEach(item => {
        let coinKey = item[1];
        objectBalance[coinKey] = objectBalance[coinKey] ? objectBalance[coinKey] + item[2] : item[2];
      });

      Object.keys(objectBalance).forEach(key => {
        if (key === 'USD') {
          return;
        }
        coins.push(key);
      });

      let coinsLength: number = coins.length;
      if (coinsLength < 3) {
        staticCoins
          .filter(o1 => !coins.some(o2 => o1 === o2))
          .forEach(item => {
            coins.push(item);
          });
        coins = coins.slice(0, 3);
      }
      const cryptoResponse = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${coins.join()}`
      );
      const cryptoResponseData = await cryptoResponse.json();
      const coinData = coins.map(item => {
        const coinDetails = cryptoResponseData.RAW[item].USD;
        const cmpDetails = cmpData.data.find(cmpCoin => coinDetails.FROMSYMBOL === cmpCoin.symbol);
        const coinID = cmpDetails?.id ?? 0;
        const coinName = cmpDetails?.name ?? 'Unknown';
        return new Coin(coinID, coinName, item, coinDetails.PRICE, coinDetails.CHANGEPCT24HOUR, coinDetails.IMAGEURL);
      });

      assetsData = coinData.map(datum => {
        let id = datum.id;
        let name = datum.name;
        let symbol = datum.symbol;
        let price = datum.price;
        let balance = objectBalance[datum.symbol] ? objectBalance[datum.symbol] : 0;
        let imgUrl = datum.imgUrl;
        return {id: id, name: name, symbol: symbol, price: price, balance: balance, imgUrl};
      });
      assetsData.sort((a: any, b: any) => b.balance * b.price - a.balance * a.price);
      usdCoinIndex = assetsData.findIndex(val => val.symbol === 'USDC') == -1 ? 0 : assetsData.findIndex(val => val.symbol === 'USDC');
      assetsData = changeAssetsPosition(assetsData, usdCoinIndex, 0);

      if (objectBalance['USDC'] === undefined || objectBalance['USDC'] == null) {
        assetsData.unshift({id: 3408, name: 'USD Coin', symbol: 'USDC', price: 0, balance: 0, imgUrl: '/media/34835941/usdc.png'});
      }
      if (objectBalance['USD'] === undefined || objectBalance['USD'] == null) {
        assetsData.unshift({id: 0, name: 'USD Dollar', symbol: 'USD', price: 0, balance: 0, imgUrl: ''});
      } else {
        assetsData.unshift({id: 0, name: 'USD Dollar', symbol: 'USD', price: 1, balance: objectBalance['USD'], imgUrl: ''});
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
