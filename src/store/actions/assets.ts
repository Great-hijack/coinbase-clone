import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {useSelector, useDispatch} from 'react-redux';

import {AssetsState} from '../reducers/assets';
import Asset from '../../models/Asset';
import {balanceHistory} from '../../data/BalanceHistory';
import Coin from '../../models/Coin';
import {changeAssetsPosition} from '../../utils';

import cmpData from '../../data/CoinMarketCapData';
import Balance from '../../models/Balance';

export const SET_ASSETS_DATA = 'SET_ASSETS_DATA';

export const fetchAssetsData = (balanceHistoryData: Balance[]) => {
  return async (dispatch: ThunkDispatch<AssetsState, void, Action>) => {
    try {
      const coinResponseJson = await fetch(
        `https://www.coinbase.com/api/v2/assets/search?base=USD&country=US&filter=listed&include_prices=false&limit=10&order=asc&page=1&query=&resolution=day&sort=rank`
      )
        .then(res => res.json())
        .catch(err => {
          console.log(err);
        });
      const coinResponseData = coinResponseJson['data'];
      const allStaticCoins: any = coinResponseData.map(item => item.base);
      const staticCoins: any = allStaticCoins.filter(item => {
        return item !== 'ETH2' && item !== 'BNB';
      });

      let assetsData: Asset[] = [];
      let objectBalance: any = {};
      let coins: string[] = [];
      let usdCoinIndex: number = 0;

      balanceHistoryData.forEach(item => {
        let coinKey = item['coinSymbol'];
        objectBalance[coinKey] = objectBalance[coinKey] ? Number(objectBalance[coinKey]) + Number(item['balance']) : item['balance'];
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

      const cryptoResponseData = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${coins.join()}`
      )
        .then(res => res.json())
        .catch(err => console.log(err));

      const coinData = coins.map(item => {
        const coinDetails = cryptoResponseData.RAW[item].USD;
        const cmpDetails = cmpData.data.find(cmpCoin => coinDetails.FROMSYMBOL === cmpCoin.symbol);
        const coinID = cmpDetails?.id ?? 0;
        const coinName = cmpDetails?.name ?? 'Unknown';
        return new Coin(
          coinID,
          coinName,
          item,
          coinDetails.PRICE,
          coinDetails.CHANGE24HOUR,
          coinDetails.CHANGEPCT24HOUR,
          coinDetails.IMAGEURL
        );
      });

      assetsData = coinData.map(datum => {
        let id = datum.id;
        let name = datum.name;
        let symbol = datum.symbol;
        let price = datum.price;
        let balance = objectBalance[datum.symbol]
          ? objectBalance[datum.symbol].toString().length > 6
            ? objectBalance[datum.symbol].toFixed(6)
            : objectBalance[datum.symbol]
          : 0;

        let imgUrl = datum.imgUrl;
        let changeCount = datum.changeCount;
        let percentChange = datum.percentChange;
        return {id: id, name: name, symbol: symbol, price: price, balance: balance, changeCount, percentChange, imgUrl};
      });
      assetsData.sort((a: any, b: any) => b.balance * b.price - a.balance * a.price);
      usdCoinIndex = assetsData.findIndex(val => val.symbol === 'USDC') == -1 ? 0 : assetsData.findIndex(val => val.symbol === 'USDC');
      assetsData = changeAssetsPosition(assetsData, usdCoinIndex, 0);

      if (objectBalance['USDC'] === undefined || objectBalance['USDC'] == null) {
        assetsData.unshift({
          id: 3408,
          name: 'USD Coin',
          symbol: 'USDC',
          price: 0,
          balance: 0,
          changeCount: 0,
          percentChange: 0,
          imgUrl: '/media/34835941/usdc.png',
        });
      }
      if (objectBalance['USD'] === undefined || objectBalance['USD'] == null) {
        assetsData.unshift({id: 0, name: 'USD Dollar', symbol: 'USD', price: 0, balance: 0, changeCount: 0, percentChange: 0, imgUrl: ''});
      } else {
        assetsData.unshift({
          id: 0,
          name: 'USD Dollar',
          symbol: 'USD',
          price: 1,
          balance: objectBalance['USD'],
          changeCount: 0,
          percentChange: 0,
          imgUrl: '',
        });
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
