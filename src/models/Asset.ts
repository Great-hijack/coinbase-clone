export default class Asset {
  id: number;
  name: string;
  symbol: string;
  price: number;
  balance: number;

  constructor(id: number, name: string, symbol: string, price: number, balance: number) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.price = price;
    this.balance = balance;
  }
}
