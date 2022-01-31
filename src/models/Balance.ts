export default class Balance {
  exchangeTime: number;
  coinSymbol: string;
  balance: number;
  notificationCount: number;
  froms: string;
  tos: string;

  constructor(exchangeTime: number, coinSymbol: string, balance: number, notificationCount: number, froms: string, tos: string) {
    this.exchangeTime = exchangeTime;
    this.coinSymbol = coinSymbol;
    this.balance = balance;
    this.notificationCount = notificationCount;
    this.froms = froms;
    this.tos = tos;
  }
}
