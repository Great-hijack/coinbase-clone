import {AnyAction} from 'redux';
import User from '../../models/User';
import {SET_USER_DATA} from '../actions/user';

export interface UserState {
  userData: User;
}

const initialState: UserState = {
  userData: {profileId: ''},
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        userData: action.userData,
      };
  }
  return state;
};
