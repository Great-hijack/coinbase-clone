import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {UserState} from '../reducers/user';

import User from '../../models/User';

export const SET_USER_DATA = 'SET_USER_DATA';

export const fetchUserData = (profileId: string) => {
  return async (dispatch: ThunkDispatch<UserState, void, Action>) => {
    try {
      const userData: User = {profileId: profileId};
      dispatch({
        type: SET_USER_DATA,
        userData: userData,
      });
    } catch (err) {
      throw err;
    }
  };
};
