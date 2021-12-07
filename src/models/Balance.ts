export default class Balance {
  exchangeTime: number;
  coinSymbol: string;
  balance: number;

  constructor(exchangeTime: number, coinSymbol: string, balance: number) {
    this.exchangeTime = exchangeTime;
    this.coinSymbol = coinSymbol;
    this.balance = balance;
  }
}
