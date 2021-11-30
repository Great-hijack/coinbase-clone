export default class Coin {
  id: number;
  name: string;
  symbol: string;
  price: number;
  changeCount: number;
  percentChange: number;
  imgUrl: string;

  constructor(id: number, name: string, symbol: string, price: number, changeCount: number, percentChange: number, imgUrl: string) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.price = price;
    this.changeCount = changeCount;
    this.percentChange = percentChange;
    this.imgUrl = imgUrl;
  }
}
