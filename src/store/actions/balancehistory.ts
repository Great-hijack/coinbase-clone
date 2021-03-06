import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {BalanceHistoryState} from '../reducers/balancehistory';
import Balance from '../../models/Balance';
import {API} from '../../api/urls';
export const SET_BALANCE_HISTORY_DATA = 'SET_BALANCE_HISTORY_DATA';

export const fetchBalanceHistoryData = (profileId: string) => {
  return async (dispatch: ThunkDispatch<BalanceHistoryState, void, Action>) => {
    try {
      const coinResponseJson = await fetch(`${API.BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Access-Control-Origin': '*'},
        body: JSON.stringify({profileid: profileId}),
      })
        .then(res => res.json())
        .catch(err => {
          console.log('-----timeout-----', err);
        });

      if (coinResponseJson.success === 0) {
        return {success: 0, msg: coinResponseJson.msg};
      }
      const balanceHistory = coinResponseJson.msg['balanceHistory'];
      const notificationCount = coinResponseJson.msg['notificationcount'];
      const balanceHistoryData: Balance[] = balanceHistory.map(
        item => new Balance(item.exchangetime, item.coinsymbol, item.balance, notificationCount, item.froms, item.tos)
      );

      dispatch({
        type: SET_BALANCE_HISTORY_DATA,
        balanceHistoryData: balanceHistoryData,
      });
      return {success: 1};
    } catch (err) {
      throw err;
    }
  };
};
