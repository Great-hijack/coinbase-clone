import Coin from '../models/Coin';

// import VisaImg from '../../assets/visa.png';

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
  VisaImg: require('../../assets/visa.png'),
  BackImg: require('../../assets/back.png'),
  LoadingImg: require('../../assets/loading.gif'),
  DolloarImg: require('../../assets/dollar.png'),
};
