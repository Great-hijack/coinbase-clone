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
  BackImg: require('../../assets/back.png'),
  LoadingImg: require('../../assets/loading.gif'),
  DolloarImg: require('../../assets/dollar.png'),
  CardImg: require('../../assets/card.jpg'),
};
