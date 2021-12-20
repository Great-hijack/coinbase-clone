export default class Balance {
  exchangeTime: number;
  coinSymbol: string;
  balance: number;
  notificationCount: number;

  constructor(exchangeTime: number, coinSymbol: string, balance: number, notificationCount: number) {
    this.exchangeTime = exchangeTime;
    this.coinSymbol = coinSymbol;
    this.balance = balance;
    this.notificationCount = notificationCount;
  }
}
