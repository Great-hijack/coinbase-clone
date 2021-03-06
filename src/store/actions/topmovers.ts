import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {TopMoversState} from '../reducers/topmovers';
import Coin from '../../models/Coin';
import cmpData from '../../data/CoinMarketCapData';

export const SET_TOPMOVERS_DATA = 'SET_TOPMOVERS_DATA';

export const fetchTopMoversData = () => {
  return async (dispatch: ThunkDispatch<TopMoversState, void, Action>) => {
    try {
      // Get all coins available on Coinbase
      const cbResponseData = await fetch('https://api.pro.coinbase.com/products')
        .then(res => res.json())
        .catch(err => console.log(err));

      let availableCoins: string[] = [];

      interface CBRequiredData {
        quote_currency: string;
        base_currency: string;
      }
      const filteredData = cbResponseData.filter((coin: CBRequiredData) => coin.quote_currency === 'USD');

      filteredData.forEach((coin: CBRequiredData) => {
        availableCoins.push(coin.base_currency);
      });

      // Get coin prices from cryptocompare API
      const cryptoResponseData = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${availableCoins.join()}`
      )
        .then(res => res.json())
        .catch(err => console.log(err));

      let dataAsArray = Object.values(cryptoResponseData.RAW);

      // Sort by percent change 24hrs (descending)
      dataAsArray.sort((a: any, b: any) => (Math.abs(a.USD.CHANGEPCT24HOUR) < Math.abs(b.USD.CHANGEPCT24HOUR) ? 1 : -1));

      // Get a maximum of 6 top movers which are available on Coinbase
      const coinData: Coin[] = [];
      for (const data of dataAsArray) {
        const cryptoData: any = data;
        // Get ID and name from coin market cap data
        const cmpDetails = cmpData.data.find(cmpCoin => cryptoData.USD.FROMSYMBOL === cmpCoin.symbol);
        if (cmpDetails?.id !== undefined) {
          const coinID = cmpDetails?.id ?? 0;
          const coinName = cmpDetails?.name ?? 'Unknown';

          coinData.push(
            new Coin(
              coinID,
              coinName,
              cryptoData.USD.FROMSYMBOL,
              cryptoData.USD.PRICE,
              cryptoData.USD.CHANGE24HOUR,
              cryptoData.USD.CHANGEPCT24HOUR,
              cryptoData.USD.IMAGEURL
            )
          );
        }

        if (coinData.length === 20) {
          break;
        }
      }
      dispatch({
        type: SET_TOPMOVERS_DATA,
        coinData: coinData,
      });
    } catch (err) {
      throw err;
    }
  };
};
