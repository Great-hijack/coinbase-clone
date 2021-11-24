import Coin from '../models/Coin';
import cmpData from '../data/CoinMarketCapData';
import Asset from '../models/Asset';

export const getLocaleCurrencyString: (value: String | Number) => String = value => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

type Props = {
  coinData: Coin[];
  symbol: String;
};

export const getCoinPrice = ({coinData, symbol}: Props) => {
  return coinData.filter((value, index) => {
    return value.symbol == symbol;
  });
};

export const getCoinData = async () => {
  // Will change when user can favorite coins
  const coins = ['BTC', 'XRP', 'BCH', 'ETH', 'DOGE', 'LTC'];

  try {
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

    return coinData;
  } catch (err) {
    throw err;
  }
};

export function changeAssetsPosition(arr: Asset[], old_index: number, new_index: number): Asset[] {
  while (old_index < 0) {
    old_index += arr.length;
  }
  while (new_index < 0) {
    new_index += arr.length;
  }
  if (new_index >= arr.length) {
    var k = new_index - arr.length;
    while (k-- + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

export const getMinMax: (data: number[]) => number[] = data => {
  const dataLength = data.length;
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const minValIndex = data.indexOf(minVal);
  const maxValIndex = data.indexOf(maxVal);
  return [Number(minVal.toFixed(2)), minValIndex, Number(maxVal.toFixed(2)), maxValIndex, dataLength];
};
