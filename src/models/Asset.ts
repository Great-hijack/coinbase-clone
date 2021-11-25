export default class Asset {
  id: number;
  name: string;
  symbol: string;
  price: number;
  balance: number;
  imgUrl: string;

  constructor(id: number, name: string, symbol: string, price: number, balance: number, imgUrl: string) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.price = price;
    this.balance = balance;
    this.imgUrl = imgUrl;
  }
}
