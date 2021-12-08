import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {BalanceHistoryState} from '../reducers/balancehistory';
import Balance from '../../models/Balance';
import Coin from '../../models/Coin';

export const SET_BALANCE_HISTORY_DATA = 'SET_BALANCE_HISTORY_DATA';

// export type Balance = Array<string | number>;

export const fetchBalanceHistoryData = () => {
  return async (dispatch: ThunkDispatch<BalanceHistoryState, void, Action>) => {
    try {
      const coinResponseJson = await fetch('http://192.168.6.203:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Access-Control-Origin': '*'},
        body: JSON.stringify({profileId: '75fi73Fkrr'}),
      })
        .then(res => res.json())
        .catch(err => {
          console.log(err);
        });
      if (coinResponseJson.success === 0) {
        return {success: 0, msg: coinResponseJson.msg};
      }
      const balanceHistory = coinResponseJson.msg['balanceHistory'];

      // const balanceHistoryData: Balance[] = [];
      const balanceHistoryData: Balance[] = balanceHistory.map(item => new Balance(item.exchangeTime, item.coinSymbol, item.balance));
      // balanceHistory.forEach(element => {
      //   balanceHistoryData.push(new Balance(element.exchangeTime, element.coinSymbol, element.balance));
      // });
      dispatch({
        type: SET_BALANCE_HISTORY_DATA,
        balanceHistoryData: balanceHistoryData,
      });
      return {success: 1};
    } catch (err) {
      // console.log('-----balanceHistoryError-----', err);
      throw err;
      return false;
    }
  };
};
