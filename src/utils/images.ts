import {Asset} from 'expo-asset';
import Coin from '../models/Coin';

type Props = {
  coinData: Coin[];
  symbol: String;
};

export const getCoinPrice = ({coinData, symbol}: Props) => {
  return coinData.filter((value, index) => {
    return value.symbol == symbol;
  });
};

export const appImages = {
  BackImg: Asset.fromModule(require('../../assets/back.png')),
  LoadingImg: Asset.fromModule(require('../../assets/loading.gif')),
  DolloarImg: Asset.fromModule(require('../../assets/dollar.png')),
  CardImg: Asset.fromModule(require('../../assets/card.png')),
};
