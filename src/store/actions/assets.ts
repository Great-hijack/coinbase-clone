import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {useSelector, useDispatch} from "react-redux";
import {AssetsState} from '../reducers/assets';

import Asset from '../../models/Asset';
import {balanceHistory} from "../../data/BalanceHistory";
import Coin from "../../models/Coin";
import {getCoinData, getCoinPrice} from "../../utils";

import cmpData from "../../data/CoinMarketCapData";


export const SET_ASSETS_DATA = 'SET_ASSETS_DATA';


export const fetchAssetsData = () => {

    return async (dispatch: ThunkDispatch<AssetsState, void, Action>) => {

        const coins = ['BTC', 'XRP', 'BCH', 'ETH', 'DOGE', 'LTC'];

        try {
            const cryptoResponse = await fetch(
                `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${coins.join()}`
            );
            const cryptoResponseData = await cryptoResponse.json();

            const coinData: Coin[] = [];
            coins.forEach((coin) => {
                // Find ID from CMP data, if it doesn't exist use 1
                const coinDetails = cryptoResponseData.RAW[coin].USD;
                const cmpDetails = cmpData.data.find(
                    (cmpCoin) => coinDetails.FROMSYMBOL === cmpCoin.symbol
                );
                const coinID = cmpDetails?.id ?? 0;
                const coinName = cmpDetails?.name ?? 'Unknown';
                coinData.push(
                    new Coin(
                        coinID,
                        coinName,
                        coin,
                        coinDetails.PRICE,
                        coinDetails.CHANGEPCT24HOUR
                    )
                );
            });

            console.log('----fetchAssetsData----', coinData);

            let assetsData: Asset[] = [];
            balanceHistory.sort(function (a: any, b: any) {
                return b[2] - a[2]
            });
            balanceHistory.map((value, index) => {
                if (value[2] <= 0.0) {
                    console.log('balanceValue is empty', index);
                    return;
                }
                let id : number ;
                let name : string;
                let symbol: string;
                let price : number;
                let balance : number;
                switch (value[1]) {
                    case 'BTC':
                        id = 1;
                        name = 'Bitcoin';
                        symbol = 'BTC';
                        price = Number(value[2]);
                        balance = price * getCoinPrice({coinData, symbol})[0].price;
                        break;
                    case 'DAI':
                        id = 4943;
                        name = 'Dai';
                        symbol = 'DAI';
                        price = Number(value[2]);
                        balance = price * getCoinPrice({coinData, symbol})[0].price;
                        break;
                    case 'MATIC':
                        id = 3890;
                        name = 'Polygon';
                        symbol = 'MATIC';
                        price = Number(value[2]);
                        balance = price * getCoinPrice({coinData, symbol})[0].price;
                        break;
                    case 'ADA':
                        id = 2010;
                        name = 'Cardano';
                        symbol = 'ADA';
                        price = Number(value[2]);
                        balance = price * getCoinPrice({coinData, symbol})[0].price;
                        break;
                    case 'ICP':
                        id = 5177;
                        name = 'Internet Computer';
                        symbol = 'ICP';
                        price = Number(value[2]);
                        balance = price * getCoinPrice({coinData, symbol})[0].price;
                        break;
                    case 'ETH':
                        id = 1027;
                        name = 'Ethereum';
                        symbol = 'ETH';
                        price = Number(value[2]);
                        balance = price * getCoinPrice({coinData, symbol})[0].price;
                        break;
                    default:
                        break;
                }
                assetsData.push({id, name, symbol, price, balance});
            });

            dispatch({
               type: SET_ASSETS_DATA,
               assetsData: assetsData,
            });

        } catch (err) {
            throw err;
        }


    };
};
